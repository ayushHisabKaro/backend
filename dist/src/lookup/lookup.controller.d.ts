import { LookupService } from './lookup.service';
import { CreateLookupDto } from './dto/create-lookup.dto';
import { UpdateLookupDto } from './dto/update-lookup.dto';
export declare class LookupController {
    private readonly lookupService;
    constructor(lookupService: LookupService);
    create(createLookupDto: CreateLookupDto): Promise<CreateLookupDto & import("./entities/lookup.entity").default>;
    findAll(): Promise<import("./entities/lookup.entity").default[]>;
    findOne(name: string): Promise<import("./entities/lookup.entity").default>;
    update(name: string, updateLookupDto: UpdateLookupDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
export declare class LookupControllerV2 {
    private readonly lookupService;
    constructor(lookupService: LookupService);
    create(createLookupDto: CreateLookupDto): Promise<CreateLookupDto & import("./entities/lookup.entity").default>;
    findAll(): Promise<import("./entities/lookup.entity").default[]>;
    findOne(name: string): Promise<import("./entities/lookup.entity").default>;
    update(name: string, updateLookupDto: UpdateLookupDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
