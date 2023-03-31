import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Between, Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from './report.entity';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private readonly repo: Repository<Report>,
  ) {}

  create(body: CreateReportDto, user: User) {
    const report = this.repo.create(body);
    report.user = user;
    return this.repo.save(report);
  }

  async manageApproval(id: number, body: ApproveReportDto) {
    const report = await this.repo.findOne({ where: { id } });
    if (!report) {
      throw new NotFoundException('Report not found');
    }
    report.approved = body.approved;
    return await this.repo.save(report);
  }

  createEstimate(query: GetEstimateDto) {
    return this.repo
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where({ make: query.make })
      .andWhere({ model: query.model })
      .andWhere({ lng: Between(query.lng - 5, query.lng + 5) })
      .andWhere({ lat: Between(query.lat - 5, query.lat + 5) })
      .andWhere({
        mileage: Between(query.mileage - 10000, query.mileage + 10000),
      })
      .andWhere({ approved: true })
      .orderBy('mileage', 'DESC')
      .limit(3)
      .getRawOne();
  }
}
