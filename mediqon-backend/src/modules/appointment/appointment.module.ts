import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './appointment.entity';
import { AppointmentService } from './appointment.service';
import { Doctor } from '../doctor/doctor.entity';
import { Hospital } from '../hospital/hospital.entity';
import { User } from '../auth/user.entity';
import { AppointmentController } from './appointment.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Appointment,
      Doctor,
      Hospital,
      User,
    ]),
  ],
  providers: [AppointmentService],
  exports: [AppointmentService],
  controllers: [AppointmentController],
})
export class AppointmentModule {}
