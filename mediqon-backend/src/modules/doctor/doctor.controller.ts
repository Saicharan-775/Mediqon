import { Controller, Get, Query, Param, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './doctor.entity';
import { Appointment } from '../appointment/appointment.entity';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('doctors')
export class DoctorController {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllDoctors() {
    return this.doctorRepository.find({
      where: { isActive: true },
      relations: ['hospital'],
    });
  }

  @Get(':id/availability')
  @UseGuards(JwtAuthGuard)
  async getAvailability(
    @Param('id') doctorId: string,
    @Query('date') date: string,
  ) {
    const doctor = await this.doctorRepository.findOne({
      where: { id: doctorId },
    });

    if (!doctor) {
      throw new Error('Doctor not found');
    }

    // Get existing appointments for that day
    const appointments = await this.appointmentRepository.find({
      where: {
        doctor: { id: doctorId },
        appointmentDate: date,
      },
    });

    const bookedSlots: string[] = appointments.map((a) => a.expectedStartTime);

    // Generate possible slots
    const slots: string[] = [];
    const [startH, startM] = doctor.dailyStartTime.split(':').map(Number);
    const [endH, endM] = doctor.dailyEndTime.split(':').map(Number);

    const current = new Date();
    current.setHours(startH, startM, 0, 0);

    const end = new Date();
    end.setHours(endH, endM, 0, 0);

    while (current < end) {
      const slotTime = current.toTimeString().slice(0, 5);
      if (!bookedSlots.includes(slotTime)) {
        // Convert to AM/PM for frontend
        const hours = current.getHours();
        const minutes = current.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;
        const displayTime = `${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
        slots.push(displayTime);
      }
      current.setMinutes(current.getMinutes() + doctor.consultationDuration);
    }

    return { slots };
  }
}
