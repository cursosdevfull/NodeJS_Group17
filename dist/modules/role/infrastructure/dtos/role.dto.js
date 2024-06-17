"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.RoleDto=void 0;const role_1=require("../../domain/role"),role_entity_1=require("../entities/role.entity");class RoleDto{static fromDomainToData(e){if(Array.isArray(e))return e.map((e=>RoleDto.fromDomainToData(e)));const o=new role_entity_1.RoleEntity;return o.roleId=e.properties.roleId,o.roleName=e.properties.roleName,o}static fromDataToDomain(e){return Array.isArray(e)?e.map((e=>RoleDto.fromDataToDomain(e))):new role_1.Role(e.roleId,e.roleName)}}exports.RoleDto=RoleDto;