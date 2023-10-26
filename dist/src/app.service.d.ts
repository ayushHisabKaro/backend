import { DataSource, Repository } from 'typeorm';
import AttendanceType from './staff/entities/attendanceType.entity';
import Role from './user/entities/role.entity';
import UserLanguage from './user/entities/UserLanguage';
export declare class AppService {
    private roleRepository;
    private userLanguageRepository;
    private attendanceTypeRepository;
    private dataSource;
    private db;
    constructor(roleRepository: Repository<Role>, userLanguageRepository: Repository<UserLanguage>, attendanceTypeRepository: Repository<AttendanceType>, dataSource: DataSource);
    getHello(): string;
    generateOTP(): string;
    addDefaultData(): Promise<void>;
    getUserReport(): Promise<any>;
    getOrgReport(): Promise<any>;
}
