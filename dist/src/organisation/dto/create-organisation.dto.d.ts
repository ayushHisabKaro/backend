export declare class CreateOrganisationPartner {
    name: string;
    phoneNumber: string;
    userId?: number;
}
export declare class CreateOrganisationShift {
    openTime: string;
    closeTime: string;
    markLateAfter: string;
}
export declare class CreateOrganisationBranch {
    id?: number;
    name: string;
    address: string;
    state: string;
    city: string;
    pinCode: string;
    landmark: string;
    code?: string;
}
export declare class CreateOrganisationDto {
    name: string;
    imageUrl: string;
    address?: string;
    state?: string;
    city?: string;
    pinCode?: string;
    landmark?: string;
    weekelyOff1?: number;
    weekelyOff2?: number;
    shifts: CreateOrganisationShift[];
    industrySector?: string;
    branch: CreateOrganisationBranch[];
    gstNumber?: string;
    gstFileUrl?: string;
    panNumber?: string;
    panFileUrl?: string;
    partners: CreateOrganisationPartner[];
}
export declare class CreateOrganisationJoinRequest {
    userId: number;
    organisationBranchCode: string;
}
