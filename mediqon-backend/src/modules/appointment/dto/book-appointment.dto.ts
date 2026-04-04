import { IsUUID, IsDateString, IsString, IsOptional } from 'class-validator';

export class BookAppointmentDto {
  @IsUUID()
  patientId: string;

  @IsUUID()
  doctorId: string;

  @IsUUID()
  hospitalId: string;

  @IsDateString()
  appointmentDate: string; // YYYY-MM-DD

  @IsOptional()
  @IsString()
  patient_name?: string;

  @IsOptional()
  @IsString()
  reason?: string;
}
