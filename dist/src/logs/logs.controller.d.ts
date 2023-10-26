import { LogsService } from './logs.service';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
export declare class LogsController {
    private readonly logsService;
    constructor(logsService: LogsService);
    create(createLogDto: CreateLogDto): Promise<import("typeorm").InsertResult>;
    findAll(): Promise<import("./entities/log.entity").default[]>;
    findOne(name: string): Promise<import("./entities/log.entity").default[]>;
    update(id: string, updateLogDto: UpdateLogDto): string;
    removeAll(id: string): Promise<import("typeorm").DeleteResult>;
}
