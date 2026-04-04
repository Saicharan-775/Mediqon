import { Module } from '@nestjs/common';
import { VapiController } from './vapi.controller';
import { AppointmentModule } from '../appointment/appointment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from '../doctor/doctor.entity';
import { Hospital } from '../hospital/hospital.entity';
import { User } from '../auth/user.entity';
import { Appointment } from '../appointment/appointment.entity';

@Module({
  imports: [
    AppointmentModule, // Include to use AppointmentService
    TypeOrmModule.forFeature([Doctor, Hospital, User, Appointment]), // Register Doctor, Hospital, User, and Appointment repositories
  ],
  controllers: [VapiController],
})
export class VapiModule {}
