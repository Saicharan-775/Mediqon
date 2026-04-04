import { Controller, Post, Get, Body, Query, All } from '@nestjs/common';
import { AppointmentService } from '../appointment/appointment.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from '../doctor/doctor.entity';
import { User, UserRole } from '../auth/user.entity';
import { Repository, ILike } from 'typeorm';
import { Appointment } from '../appointment/appointment.entity';
import { AppointmentStatus } from '../appointment/appointment.entity';

interface VapiPayload {
  message?: {
    type: string;
    toolCalls?: Array<{
      id: string;
      function: {
        name: string;
        args: Record<string, any>;
      };
    }>;
  };
  call?: {
    metadata?: Record<string, any>;
  };
  doctorName?: string;
  date?: string;
  appointmentId?: string;
}

interface ToolArgs {
  doctorName?: string;
  date?: string;
  patientId?: string;
  appointmentId?: string;
}

@Controller('vapi')
export class VapiController {
  constructor(
    private readonly appointmentService: AppointmentService,
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
  ) {}

  @Post('webhook')
  async handleWebhook(@Body() payload: VapiPayload) {
    console.log('Incoming Vapi Webhook:', JSON.stringify(payload, null, 2));
    const { message, call } = payload;
    const metadata = call?.metadata || {};

    if (message?.type === 'tool-calls') {
      const toolCalls = message.toolCalls || [];
      const toolCall = toolCalls[0];
      if (!toolCall) return { ok: true };

      const { name, args } = toolCall.function;
      const toolCallId = toolCall.id;
      const patientIdFromMeta = metadata.patientId;

      if (name === 'schedule_appointment') {
        const mergedArgs = {
          ...args,
          patientId: args.patientId || patientIdFromMeta,
        };
        return this.handleBookAppointment(mergedArgs, toolCallId);
      }

      if (name === 'check_doctor_availability' || name === 'get_availability') {
        return this.handleCheckAvailability(args, toolCallId);
      }

      if (name === 'cancel_appointment') {
        const mergedArgs = {
          ...args,
          patientId: args.patientId || patientIdFromMeta,
        };
        return this.handleCancelAppointment(mergedArgs, toolCallId);
      }

      if (name === 'check_my_appointments' || name === 'get_my_appointments') {
        const mergedArgs = {
          ...args,
          patientId: args.patientId || patientIdFromMeta,
        };
        return this.handleCheckMyAppointments(mergedArgs, toolCallId);
      }
    }

    if (payload.doctorName || payload.date || payload.appointmentId) {
      return {
        error:
          'Please use specialized endpoints like /vapi/schedule or /vapi/check-availability',
      };
    }

    return { ok: true };
  }

  @All('schedule')
  async scheduleAppointment(@Body() body: any, @Query() query: any) {
    const args = Object.keys(body || {}).length > 0 ? body : query;
    console.log('Direct Schedule Request:', args);
    return this.handleBookAppointment(args, 'direct-call');
  }

  @All('check-availability')
  async checkAvailability(@Body() body: any, @Query() query: any) {
    const args = Object.keys(body || {}).length > 0 ? body : query;
    console.log('Direct Availability Request:', args);
    return this.handleCheckAvailability(args, 'direct-call');
  }

  @All('cancel')
  async cancelAppointment(@Body() body: any, @Query() query: any) {
    const args = Object.keys(body || {}).length > 0 ? body : query;
    console.log('Direct Cancel Request:', args);
    return this.handleCancelAppointment(args, 'direct-call');
  }

  @All('check-my-appointments')
  async checkMyApts(@Body() body: any, @Query() query: any) {
    const args = Object.keys(body || {}).length > 0 ? body : query;
    console.log('Direct Check My Apts Request:', args);
    return this.handleCheckMyAppointments(args, 'direct-call');
  }

  private getResponse(toolCallId: string, result: string) {
    if (toolCallId === 'direct-call') {
      return { result };
    }
    return {
      results: [{ toolCallId, result }],
    };
  }

  private async handleBookAppointment(args: any, toolCallId: string) {
    try {
      const doctorName = args.doctorName || args.doctor_name;
      const date = args.date || args.appointment_date;
      const patientId = args.patientId || args.patient_id;

      const doctor = await this.doctorRepository.findOne({
        where: [{ name: ILike(`%${doctorName}%`), isActive: true }],
        relations: ['hospital'],
      });

      // Normalize date using our helper
      const finalDate = this.normalizeDate(date);

      if (!doctor) {
        return this.getResponse(
          toolCallId,
          `Doctor "${doctorName || 'requested'}" not found in our system. I have Dr. Sarah Johnson and Dr. Michael Chen available.`,
        );
      }

      let finalPatientId = patientId;
      const rawPatientName =
        args.patientName ||
        args.patient_name ||
        args.name ||
        args.customerName ||
        args.customer_name ||
        args.callerName ||
        args.patient ||
        args.individual;

      const isTech =
        typeof rawPatientName === 'string' &&
        /\{{2}.*\}{2}/.test(rawPatientName);
      const patientNameProvided = isTech ? null : rawPatientName;

      console.log('--- 🎙️ VAPI TOOL CALL DATA ---');
      console.log(`Arguments:`, JSON.stringify(args, null, 2));
      console.log(
        `Target Name: "${patientNameProvided || 'NONE (Using Account)'}"`,
      );
      console.log('----------------------------');

      const isUuid =
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
      let userRecord: User | null = null;
      if (finalPatientId && isUuid.test(finalPatientId)) {
        userRecord = await this.userRepository.findOne({
          where: { id: finalPatientId },
        });
      }

      if (!userRecord) {
        console.warn(
          `⚠️ Mismatched Patient ID. Syncing to account: saicharan000@gmail.com`,
        );
        userRecord = await this.userRepository.findOne({
          where: { email: ILike('newopaient@mediqon.com') },
        });

        // Last resort: Get ANY patient
        if (!userRecord) {
          userRecord = await this.userRepository.findOne({
            where: { role: UserRole.PATIENT },
          });
        }

        if (userRecord) {
          finalPatientId = userRecord.id;
        }
      }

      if (!userRecord || !finalPatientId) {
        return this.getResponse(
          toolCallId,
          "I'm sorry, I'm having trouble linking your patient profile. Please ensure you are logged into the dashboard.",
        );
      }

      const result = await this.appointmentService.bookAppointment({
        patientId: finalPatientId,
        doctorId: doctor.id,
        hospitalId: doctor.hospital?.id,
        appointmentDate: finalDate,
        patient_name: patientNameProvided,
        reason:
          args.reason || args.problem || args.checkup || 'General Checkup',
      });

      const msg = `Success! I've booked your appointment with ${doctor.name} for ${finalDate}. Token number: ${result.tokenNumber}.`;
      return this.getResponse(toolCallId, msg);
    } catch (error) {
      console.error('Vapi Booking Error:', error);
      return this.getResponse(
        toolCallId,
        `I apologize, but I couldn't complete the booking: ${(error as Error).message}`,
      );
    }
  }

  private async handleCheckAvailability(args: any, toolCallId: string) {
    try {
      const doctorName = args.doctorName || args.doctor_name;
      const rawDate = args.date || args.appointment_date || args.date_string;
      const finalDate = this.normalizeDate(rawDate);

      const query = this.doctorRepository
        .createQueryBuilder('doctor')
        .where('doctor.isActive = :isActive', { isActive: true });
      if (doctorName) {
        query.andWhere('doctor.name ILIKE :doctorName', {
          doctorName: `%${doctorName}%`,
        });
      }
      const doctors = await query
        .orderBy('doctor.name', 'ASC')
        .take(5)
        .getMany();

      if (!doctors.length) {
        return this.getResponse(
          toolCallId,
          `No doctors available on ${finalDate}. Please try another date or doctor name.`,
        );
      }

      const availabilities = await Promise.all(
        doctors.slice(0, 3).map(async (doctor) => {
          const count = await this.appointmentRepository.count({
            where: { doctor: { id: doctor.id }, appointmentDate: finalDate },
          });

          const startHour = parseInt(
            (doctor.dailyStartTime || '09:00').split(':')[0],
          );
          const estimatedTime = `${startHour + Math.floor(count * 0.5)}:${String((count * 30) % 60).padStart(2, '0')} AM`;

          return `${doctor.name} (available ~${estimatedTime})`;
        }),
      );

      const response = `Available doctors on ${finalDate}: ${availabilities.join(', ')}. Who would you like to book with first?`;

      return this.getResponse(toolCallId, response);
    } catch (error) {
      console.error('Vapi Check Availability Error:', error);
      return this.getResponse(
        toolCallId,
        `Sorry, I couldn't check availability right now: ${(error as Error).message}`,
      );
    }
  }

  private async handleCancelAppointment(args: any, toolCallId: string) {
    try {
      console.log('--- 🛑 VAPI CANCEL REQUEST ---');
      console.log('Arguments:', JSON.stringify(args, null, 2));

      let recordId = args.appointmentId || args.appointment_id || args.id;
      const patientId = args.patientId || args.patient_id;
      const doctorName = args.doctorName || args.doctor_name;

      console.log(`[VAPI] Processing Cancellation - ID: ${recordId}, Patient: ${patientId}, Doctor: ${doctorName}`);

      const rawToken =
        args.token ||
        args.tokenNumber ||
        args.token_number ||
        args.appointmentId ||
        args.appointment_id;
      const parsedToken = parseInt(rawToken);
      const isNumericToken =
        !isNaN(parsedToken) && String(rawToken).length <= 4;

      const isUuid =
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
      
      // If recordId is not a UUID, it's likely a token or generic ID
      if (recordId && !isUuid.test(recordId)) {
        recordId = null;
      }

      let finalPatientId = patientId;
      const idIsTech =
        typeof finalPatientId === 'string' &&
        /\{{2}.*\}{2}/.test(finalPatientId);

      if (
        !finalPatientId ||
        finalPatientId === 'unknown-patient' ||
        finalPatientId === 'direct-call' ||
        idIsTech
      ) {
        console.warn(
          `🕵️ Found Tech-ID or Unknown: "${finalPatientId}". Redirecting to Saicharan...`,
        );
        let fallbackUser = await this.userRepository.findOne({
          where: { email: ILike('newopaient@mediqon.com') },
        });
        
        if (!fallbackUser) {
          fallbackUser = await this.userRepository.findOne({
            where: { role: UserRole.PATIENT },
          });
        }
        
        if (fallbackUser) finalPatientId = fallbackUser.id;
      }

      if (finalPatientId && !recordId) {
        console.log(
          `🔍 Searching Appointments for Patient ID: ${finalPatientId}`,
        );
        const list =
          await this.appointmentService.getMyAppointments(finalPatientId);

        if (isNumericToken) {
          const match = list.find((a) => {
            const tokenMatch = a.token_number === parsedToken;
            const docMatch = !doctorName || a.doctor.toLowerCase().includes(doctorName.toLowerCase());
            return tokenMatch && docMatch;
          });
          if (match) recordId = match.id;
        }

        if (!recordId) {
          const match = list.find(
            (a) =>
              (doctorName &&
                a.doctor.toLowerCase().includes(doctorName.toLowerCase())) ||
              (args.date && a.date.includes(args.date)),
          );
          if (match) recordId = match.id;
        }
      }

      if (!recordId || !isUuid.test(recordId)) {
        return this.getResponse(
          toolCallId,
          `I'm sorry, I couldn't find the exact appointment to cancel. Could you please double-check the doctor's name or the 1-digit token number?`,
        );
      }

      await this.appointmentService.updateAppointmentStatus(
        recordId,
        AppointmentStatus.CANCELLED,
      );
      console.log(`✅ Appointment Cancelled Successfully: ${recordId}`);

      return this.getResponse(
        toolCallId,
        `Success! Your appointment has been successfully cancelled. Is there anything else I can help you with?`,
      );
    } catch (error) {
      console.error('Vapi Cancel Error:', error);
      return this.getResponse(
        toolCallId,
        `Couldn't cancel appointment: ${(error as Error).message}`,
      );
    }
  }

  private async handleCheckMyAppointments(args: any, toolCallId: string) {
    try {
      const patientId = args.patientId || args.patient_id;
      let finalPatientId = patientId;

      if (
        !finalPatientId ||
        finalPatientId === 'unknown-patient' ||
        finalPatientId === 'direct-call'
      ) {
        let fallbackUser = await this.userRepository.findOne({
          where: { email: ILike('newopaient@mediqon.com') },
        });

        // Last resort: Get ANY patient
        if (!fallbackUser) {
          fallbackUser = await this.userRepository.findOne({
            where: { role: UserRole.PATIENT },
          });
        }

        if (fallbackUser) finalPatientId = fallbackUser.id;
      }

      if (!finalPatientId) {
        return this.getResponse(
          toolCallId,
          "I'm sorry, I couldn't find your account to check appointments.",
        );
      }

      const appointments =
        await this.appointmentService.getMyAppointments(finalPatientId);

      if (appointments.length === 0) {
        return this.getResponse(
          toolCallId,
          "You don't have any upcoming appointments at the moment.",
        );
      }

      const summary = appointments
        .slice(0, 3)
        .map((a) => `${a.doctor} on ${a.date} at ${a.time}`)
        .join(', ');

      return this.getResponse(
        toolCallId,
        `You have ${appointments.length} upcoming appointments. The next ones are: ${summary}.`,
      );
    } catch (error) {
      console.error('Vapi Check My Appointments Error:', error);
      return this.getResponse(
        toolCallId,
        `Sorry, I couldn't check your appointments right now: ${(error as Error).message}`,
      );
    }
  }

  private normalizeDate(date: string): string {
    if (!date) return new Date().toISOString().split('T')[0];

    try {
      const months = {
        jan: '01', feb: '02', mar: '03', apr: '04',
        may: '05', jun: '06', jul: '07', aug: '08',
        sep: '09', oct: '10', nov: '11', dec: '12',
      };
      
      const lower = date.toLowerCase().replace('the ', '').replace('of ', '');
      const foundMonth = Object.keys(months).find((m) => lower.includes(m));
      
      const dayMatch = 
        lower.match(/(\d+)/) || 
        lower
          .replace('twenty eighth', '28')
          .replace('twenty seventh', '27')
          .replace('twenty sixth', '26')
          .replace('twenty fifth', '25')
          .replace('twenty fourth', '24')
          .replace('twenty third', '23')
          .replace('twenty second', '22')
          .replace('twenty first', '21')
          .replace('twentieth', '20')
          .match(/(\d+)/);

      if (foundMonth && dayMatch) {
        const day = dayMatch[0].padStart(2, '0');
        return `2026-${months[foundMonth]}-${day}`;
      } else {
        const parsed = new Date(date);
        if (!isNaN(parsed.getTime())) {
          return parsed.toISOString().split('T')[0];
        }
      }
    } catch (e) {
      console.warn('Date Normalization failed for:', date, e);
    }
    
    return date || new Date().toISOString().split('T')[0];
  }
}
