import { CreateOrganisationDto } from './create-organisation.dto';
export declare class UpdateOrganisationBranch {
    id?: number;
    name: string;
    address: string;
    state: string;
    city: string;
    pinCode: string;
    landmark: string;
}
export declare class updateOrganisationShift {
    openTime: string;
    closeTime: string;
    markLateAfter: string;
}
export declare class UpdateOrganisationPartner {
    id: number;
    name: string;
    phoneNumber: string;
    userId?: number;
}
declare const UpdateOrganisationDto_base: import("@nestjs/common").Type<Partial<CreateOrganisationDto>>;
export declare class UpdateOrganisationDto extends UpdateOrganisationDto_base {
    branch?: UpdateOrganisationBranch[];
    partners?: UpdateOrganisationPartner[];
    code?: string;
}
export {};
