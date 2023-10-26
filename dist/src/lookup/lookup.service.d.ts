import { Repository } from 'typeorm';
import { CreateLookupDto } from './dto/create-lookup.dto';
import { UpdateLookupDto } from './dto/update-lookup.dto';
import Lookup from './entities/lookup.entity';
export declare class LookupService {
    private lookupRepository;
    constructor(lookupRepository: Repository<Lookup>);
    create(createLookupDto: CreateLookupDto): Promise<CreateLookupDto & Lookup>;
    findAll(): Promise<Lookup[]>;
    findOneByName(name: string): Promise<Lookup>;
    findOne(id: number): Promise<Lookup>;
    update(id: number, updateLookupDto: UpdateLookupDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
