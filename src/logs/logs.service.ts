import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import Log from './entities/log.entity';

@Injectable()
export class LogsService {
  constructor(
    @InjectRepository(Log)
    private logRepository: Repository<Log>,
  ) {}
  create(data: DeepPartial<Log>) {
    return this.logRepository.insert(data);
  }

  findAll() {
    return this.logRepository.find();
  }

  findOne(name: string) {
    return this.logRepository.find({ where: { name } });
  }

  update(id: number, updateLogDto: UpdateLogDto) {
    return `This action updates a #${id} log`;
  }

  removeAll() {
    return this.logRepository.delete({});
  }
}
