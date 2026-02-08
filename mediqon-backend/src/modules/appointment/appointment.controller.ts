import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
  Param,
  Patch,
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
  constructor(
    private readonly appointmentService: AppointmentService,
  ) {}

    @Post('book')
    @Post('book')
    @Roles('PATIENT')
    @Get('doctor/:doctorId/today')
    @Roles('DOCTOR')
    @Patch(':id/status')
    @Roles('DOCTOR')

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
async getTodayQueue(
  @Param('doctorId') doctorId: string,
) {
  return this.appointmentService.getTodayQueue(doctorId);
}
@Patch(':id/status')
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
  return this.appointmentService.updateAppointmentStatus(
    appointmentId,
    body.status,
  );
}

}
