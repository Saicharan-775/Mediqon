import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Hospital } from '../hospital/hospital.entity';

@Entity('doctors')
export class Doctor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  specialization: string;

  @ManyToOne(() => Hospital)
  hospital: Hospital;

  @Column({ type: 'int', default: 10 })
  consultationDuration: number; // minutes

  @Column()
  dailyStartTime: string; // "09:00"

  @Column()
  dailyEndTime: string; // "17:00"

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
