"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entity_attribute_types_1 = require("../types/entity.attribute.types");
const role_entity_1 = require("../user/entities/role.entity");
const ormconfig_1 = require("../../ormconfig");
async function checkRole(name) {
    return ormconfig_1.connectionSource.getRepository(role_entity_1.default).findOne({ where: { name } });
}
async function createRoles() {
    const roles = [];
    const business = ormconfig_1.connectionSource.getRepository(role_entity_1.default).create();
    business.name = entity_attribute_types_1.Roles.BUSINESS;
    if (!(await checkRole(business.name)))
        roles.push(business);
    const employee = ormconfig_1.connectionSource.getRepository(role_entity_1.default).create();
    employee.name = entity_attribute_types_1.Roles.EMPLOYEE;
    if (!(await checkRole(employee.name)))
        roles.push(employee);
    const result = await ormconfig_1.connectionSource.getRepository(role_entity_1.default).insert(roles);
    console.log('role inserted ', result);
}
async function createDefaultData() {
    await createRoles();
}
async function runSeeder() {
    try {
        await createDefaultData();
    }
    catch (error) {
        console.log(error);
    }
}
runSeeder();
//# sourceMappingURL=customSeeder.js.map