import Organisation from './organisation.entity';
export default class OrganisationShift {
    id: number;
    openTime: string;
    closeTime: string;
    markLateAfter: string;
    organisation: Organisation;
    createdAt: Date;
}
