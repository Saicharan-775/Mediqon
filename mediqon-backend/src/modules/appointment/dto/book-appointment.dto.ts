import { IsUUID, IsDateString } from 'class-validator';

export class BookAppointmentDto {
  @IsUUID()
  patientId: string;

  @IsUUID()
  doctorId: string;

  @IsUUID()
  hospitalId: string;

  @IsDateString()
  appointmentDate: string; // YYYY-MM-DD
}
