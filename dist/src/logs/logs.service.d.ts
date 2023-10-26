import { DeepPartial, Repository } from 'typeorm';
import { UpdateLogDto } from './dto/update-log.dto';
import Log from './entities/log.entity';
export declare class LogsService {
    private logRepository;
    constructor(logRepository: Repository<Log>);
    create(data: DeepPartial<Log>): Promise<import("typeorm").InsertResult>;
    findAll(): Promise<Log[]>;
    findOne(name: string): Promise<Log[]>;
    update(id: number, updateLogDto: UpdateLogDto): string;
    removeAll(): Promise<import("typeorm").DeleteResult>;
}
