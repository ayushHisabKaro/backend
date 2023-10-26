import { OrganisationService } from './organisation.service';
import { CreateOrganisationBranch, CreateOrganisationDto, CreateOrganisationJoinRequest } from './dto/create-organisation.dto';
import { UpdateOrganisationDto } from './dto/update-organisation.dto';
import { UserService } from '../user/user.service';
import { AuthRequest } from '../types/AuthRequest';
export declare class OrganisationController {
    private readonly organisationService;
    private readonly userService;
    constructor(organisationService: OrganisationService, userService: UserService);
    setOrgDefaultBranchAndCode(createOrganisationDto: CreateOrganisationDto): Promise<CreateOrganisationBranch[]>;
    create(req: AuthRequest, createOrganisationDto: CreateOrganisationDto): Promise<import("./entities/organisation.entity").default>;
    addCodeInAllOrganosation(): Promise<void>;
    createOrganisationJoinRequest(createOrganisationJoinReqDto: CreateOrganisationJoinRequest): Promise<import("./entities/organisationJoinRequest.entity").default>;
    addBranchV2(id: string, createOrganisationDto: CreateOrganisationBranch): Promise<import("./entities/organisationBranch.entity").default>;
    findAll(req: AuthRequest): Promise<import("./entities/organisation.entity").default[]>;
    findAllByUser(req: AuthRequest): Promise<import("./entities/organisation.entity").default[]>;
    getOrganisationJoinRequest(id: string): Promise<import("./entities/organisationJoinRequest.entity").default[]>;
    findOne(id: string): Promise<import("./entities/organisation.entity").default>;
    update(id: string, updateOrganisationDto: UpdateOrganisationDto): Promise<import("typeorm").UpdateResult>;
    removeBranch(id: string): Promise<import("typeorm").DeleteResult>;
    deleteOrganisationJoinRequest(id: string): Promise<import("typeorm").DeleteResult>;
    removeAll(): Promise<import("typeorm").DeleteResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
