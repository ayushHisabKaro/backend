import { User } from 'src/user/entities/user.entity';
import OrganisationBranch from './organisationBranch.entity';
export default class OrganisationJoinRequest {
    id: number;
    seen: boolean;
    user: User;
    organisationBranch: OrganisationBranch;
    createdAt: Date;
}
