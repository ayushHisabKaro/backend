import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLookupDto } from './dto/create-lookup.dto';
import { UpdateLookupDto } from './dto/update-lookup.dto';
import Lookup from './entities/lookup.entity';

@Injectable()
export class LookupService {
  constructor(
    @InjectRepository(Lookup)
    private lookupRepository: Repository<Lookup>,
  ) {}
  async create(createLookupDto: CreateLookupDto) {
    return this.lookupRepository.save(createLookupDto);
  }

  findAll() {
    return this.lookupRepository.find();
  }

  async findOneByName(name: string) {
    return this.lookupRepository.findOne({ where: { name } });
  }

  async findOne(id: number) {
    return this.lookupRepository.findOne({ where: { id } });
  }

  async update(id: number, updateLookupDto: UpdateLookupDto) {
    return this.lookupRepository.update(id, updateLookupDto);
  }

  remove(id: number) {
    return this.lookupRepository.delete(id);
  }
}
