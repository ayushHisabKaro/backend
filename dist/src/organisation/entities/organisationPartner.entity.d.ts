import { User } from 'src/user/entities/user.entity';
import Organisation from './organisation.entity';
export default class OrganisationPartner {
    id: number;
    name: string;
    phoneNumber: string;
    user: User;
    organisation: Organisation;
    createdAt: Date;
}
