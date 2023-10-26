import Staff from '../../staff/entities/staff.entity';
import Job from '../../hiring/entities/job.entity';
import Organisation from './organisation.entity';
import OrganisationJoinRequest from './organisationJoinRequest.entity';
export default class OrganisationBranch {
    id: number;
    name: string;
    address: string;
    state: string;
    city: string;
    pinCode: string;
    landmark: string;
    staff: Staff[];
    organisation: Organisation;
    jobs: Job[];
    code: string;
    organisationJoinRequest: OrganisationJoinRequest[];
    createdAt: Date;
}
