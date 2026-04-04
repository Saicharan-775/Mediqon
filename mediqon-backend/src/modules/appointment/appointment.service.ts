import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
import { Doctor } from '../doctor/doctor.entity';
import { Hospital } from '../hospital/hospital.entity';
import { User } from '../auth/user.entity';
import { AppointmentStatus } from './appointment.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,

    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,

    @InjectRepository(Hospital)
    private hospitalRepository: Repository<Hospital>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async bookAppointment(params: {
    patientId: string;
    doctorId: string;
    hospitalId: string;
    appointmentDate: string; // YYYY-MM-DD
    patient_name?: string;
    reason?: string;
  }) {
    const {
      patientId,
      doctorId,
      hospitalId,
      appointmentDate,
      patient_name,
      reason,
    } = params;

    // 1. Validate patient
    const patient = await this.userRepository.findOne({
      where: { id: patientId },
    });
    if (!patient) {
      throw new Error('Patient not found');
    }

    // 2. Validate doctor
    const doctor = await this.doctorRepository.findOne({
      where: { id: doctorId, isActive: true },
    });
    if (!doctor) {
      throw new Error('Doctor not available');
    }

    // 3. Validate hospital
    const hospital = await this.hospitalRepository.findOne({
      where: { id: hospitalId, isActive: true },
    });
    if (!hospital) {
      throw new Error('Hospital not available');
    }

    // 4. Get last token for doctor on that date
    const lastAppointment = await this.appointmentRepository.findOne({
      where: {
        doctor: { id: doctorId },
        appointmentDate,
      },
      order: { tokenNumber: 'DESC' },
    });

    const nextToken = lastAppointment ? lastAppointment.tokenNumber + 1 : 1;

    // 5. Calculate expected time
    const [startHour, startMinute] = doctor.dailyStartTime
      .split(':')
      .map(Number);

    const totalMinutes = (nextToken - 1) * doctor.consultationDuration;

    const expectedStart = new Date();
    expectedStart.setHours(startHour, startMinute + totalMinutes, 0, 0);

    const expectedEnd = new Date(expectedStart);
    expectedEnd.setMinutes(
      expectedEnd.getMinutes() + doctor.consultationDuration,
    );

    // 6. Create appointment
    const appointment = this.appointmentRepository.create({
      patient,
      doctor,
      hospital,
      appointmentDate,
      tokenNumber: nextToken,
      patient_name,
      reason,
      expectedStartTime: expectedStart.toTimeString().slice(0, 5),
      expectedEndTime: expectedEnd.toTimeString().slice(0, 5),
    });

    const savedAppointment = await this.appointmentRepository.save(appointment);

    // Remove sensitive fields
    delete (savedAppointment.patient as any).password;

    return savedAppointment;
  }

  async getTodayQueue(doctorId: string) {
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    const appointments = await this.appointmentRepository.find({
      where: {
        doctor: { id: doctorId },
        appointmentDate: today,
      },
      relations: ['patient'],
      order: {
        priority: 'DESC', // URGENT first
        tokenNumber: 'ASC',
      },
    });

    // Remove sensitive data
    appointments.forEach((appointment) => {
      if (appointment.patient) {
        delete (appointment.patient as any).password;
      }
    });

    return appointments;
  }
  async updateAppointmentStatus(
    appointmentId: string,
    status: AppointmentStatus,
  ) {
    const appointment = await this.appointmentRepository.findOne({
      where: { id: appointmentId },
      relations: ['doctor', 'hospital', 'patient'],
    });

    if (!appointment) {
      throw new Error('Appointment not found');
    }

    appointment.status = status;
    const saved = await this.appointmentRepository.save(appointment);
    return this.mapAppointmentData(saved);
  }

  private mapAppointmentData(appointment: Appointment) {
    const dbName = appointment.patient_name || '';
    const accountName = appointment.patient?.fullName || '';
    const techRegex = /\{{2}.*\}{2}/;
    const isTechDb = techRegex.test(dbName);
    const isTechAccount = techRegex.test(accountName);

    let finalName = 'Saicharan';
    if (!isTechDb && dbName) {
      finalName = dbName;
    } else if (!isTechAccount && accountName) {
      finalName = accountName;
    }

    return {
      id: appointment.id,
      token_number: appointment.tokenNumber,
      patient_name: finalName,
      doctor: appointment.doctor?.name || 'Unknown Doctor',
      specialty: appointment.doctor?.specialization || 'General',
      date: appointment.appointmentDate ? (typeof appointment.appointmentDate === 'string' ? appointment.appointmentDate.split('T')[0] : new Date(appointment.appointmentDate).toISOString().split('T')[0]) : 'TBD',
      time: appointment.expectedStartTime,
      reason: appointment.reason || 'General Checkup',
      status: (appointment.status || 'BOOKED').toLowerCase().replace('_', ' '),
    };
  }

  async getMyAppointments(patientId: string) {
    // If patientId is a UUID, we filter. If it's something else (like "direct-call" from Vapi),
    // we still try to filter but might fallback if it fails.
    const isUuid = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    
    let whereClause: any = {};
    if (isUuid.test(patientId)) {
        whereClause = { patient: { id: patientId } };
    }

    const appointments = await this.appointmentRepository.find({
      where: whereClause,
      relations: ['doctor', 'hospital', 'patient'],
      order: {
        appointmentDate: 'DESC',
      },
    });

    return appointments.map((appointment) => this.mapAppointmentData(appointment));
  }
}
