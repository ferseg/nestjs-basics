import { Expose } from 'class-transformer';
import { Report } from '../../reports/report.entity';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  reports: Report[];
}
