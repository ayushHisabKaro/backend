import { Roles } from 'src/types/entity.attribute.types';
import Role from 'src/user/entities/role.entity';
import { User } from 'src/user/entities/user.entity';
import { connectionSource } from '../../ormconfig';

async function checkRole(name: string) {
  return connectionSource.getRepository(Role).findOne({ where: { name } });
}

async function createRoles() {
  const roles: Role[] = [];

  const business = connectionSource.getRepository(Role).create();
  business.name = Roles.BUSINESS;
  if (!(await checkRole(business.name))) roles.push(business);

  const employee = connectionSource.getRepository(Role).create();
  employee.name = Roles.EMPLOYEE;
  if (!(await checkRole(employee.name))) roles.push(employee);

  const result = await connectionSource.getRepository(Role).insert(roles);
  console.log('role inserted ', result);
}

async function createDefaultData() {
  await createRoles();
  // await createEmployees(2);
}

async function runSeeder() {
  try {
    await createDefaultData();
  } catch (error) {
    console.log(error);
  }
}
runSeeder();
