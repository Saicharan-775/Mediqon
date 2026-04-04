import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
  Param,
  Patch,
  Req,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { BookAppointmentDto } from './dto/book-appointment.dto';
import { UpdateAppointmentStatusDto } from './dto/update-appointment-status.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Roles } from '../../common/decorator/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get('my')
  @Roles('patient')
  async getMyAppointments(@Req() req) {
    return this.appointmentService.getMyAppointments(req.user.userId);
  }

  @Post('book')
  @Roles('patient')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  async book(@Body() body: BookAppointmentDto) {
    return this.appointmentService.bookAppointment(body);
  }

  @Get('doctor/:doctorId/today')
  @Roles('doctor')
  async getTodayQueue(@Param('doctorId') doctorId: string) {
    return this.appointmentService.getTodayQueue(doctorId);
  }

  @Patch(':id/status')
  @Roles('doctor', 'patient')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  async updateStatus(
    @Param('id') appointmentId: string,
    @Body() body: UpdateAppointmentStatusDto,
  ) {
    console.log(
      `📡 PATCH RECEIVED: Appointment ${appointmentId} -> Status: ${body.status}`,
    );
    const result = await this.appointmentService.updateAppointmentStatus(
      appointmentId,
      body.status,
    );
    console.log(`✅ PATCH SUCCESS: ${appointmentId} is now ${body.status}`);
    return result;
  }
}
