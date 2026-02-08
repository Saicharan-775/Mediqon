import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Doctor } from '../doctor/doctor.entity';
import { User } from '../auth/user.entity';
import { Hospital } from '../hospital/hospital.entity';

export enum AppointmentStatus {
  BOOKED = 'BOOKED',
  CHECKED_IN = 'CHECKED_IN',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  NO_SHOW = 'NO_SHOW',
}

export enum AppointmentPriority {
  NORMAL = 'NORMAL',
  URGENT = 'URGENT',
}

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  patient: User;

  @ManyToOne(() => Doctor)
  doctor: Doctor;

  @ManyToOne(() => Hospital)
  hospital: Hospital;

  @Column({ type: 'date' })
  appointmentDate: string;

  @Column()
  tokenNumber: number;

  @Column({
    type: 'enum',
    enum: AppointmentStatus,
    default: AppointmentStatus.BOOKED,
  })
  status: AppointmentStatus;

  @Column({
    type: 'enum',
    enum: AppointmentPriority,
    default: AppointmentPriority.NORMAL,
  })
  priority: AppointmentPriority;

  @Column()
  expectedStartTime: string;

  @Column()
  expectedEndTime: string;

  @CreateDateColumn()
  createdAt: Date;
}
