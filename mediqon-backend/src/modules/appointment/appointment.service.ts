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
}) {
  const { patientId, doctorId, hospitalId, appointmentDate } = params;

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

  const totalMinutes =
    (nextToken - 1) * doctor.consultationDuration;

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
  });

  if (!appointment) {
    throw new Error('Appointment not found');
  }

  appointment.status = status;
  return this.appointmentRepository.save(appointment);
}

}
