// import faker from '@faker-js/faker';
// import { rolesType } from '../types/eitity.attribute.types';
// import Role from '../user/entities/role.entity';
// import { User } from '../user/entities/user.entity';
// import { getConnection, getRepository } from 'typeorm';
// import { Seeder } from 'typeorm-seeding';
// import ProductCompany from 'src/product/entities/product.company.entity';

// async function createEmployees(n: number) {
//   const role = await getRepository(Role).findOne({
//     where: { name: rolesType.EMPLOYEE },
//   });

//   if (!role) {
//     console.error('Role not found');
//     return;
//   }
//   const users: User[] = [];
//   for (let index = 0; index < n; index++) {
//     const user = getRepository(User).create();
//     user.role = role;
//     user.name = faker.name.firstName();
//     user.address = faker.address.streetAddress();
//     user.email = faker.internet.email();
//     users.push(user);
//   }
//   const result = await getRepository(User).insert(users);
//   console.log('employees inserted ', result);
// }
// async function createAdmins(name?: string) {
//   const role = await getRepository(Role).findOne({
//     where: { name: rolesType.ADMIN },
//   });

//   if (!role) {
//     console.error('Role not found');
//     return;
//   }
//   const users: User[] = [];

//   const user = getRepository(User).create();
//   user.role = role;
//   user.name = name ? name : 'Admin ' + faker.name.firstName();
//   user.address = faker.address.streetAddress();
//   user.email = faker.internet.email();
//   users.push(user);

//   const result = await getRepository(User).insert(users);
//   console.log('admins inserted ', result);
// }

// async function createRoles() {
//   const roles: Role[] = [];

//   const admin = new Role();
//   admin.name = rolesType.ADMIN;
//   roles.push(admin);

//   const employee = new Role();
//   employee.name = rolesType.EMPLOYEE;
//   roles.push(employee);

//   const result = await getConnection().getRepository(Role).insert(roles);
//   console.log('role inserted ', result);
// }

// async function createCompanies(_n: number) {
//   const company = new ProductCompany();
//   company.name = 'COMPANY 1';
//   const result = await getRepository(ProductCompany).save(company);
//   console.log('role inserted ', result);
//   return result;
// }

// async function createDefaultData() {
//   await createRoles();
//   await createAdmins();
//   await createEmployees(2);
//   console.log('After Employees Inserted');

//   await createCompanies(2);
// }

// export default class CreateDefaultData implements Seeder {
//   public async run(): Promise<any> {
//     await createDefaultData();
//   }
// }
