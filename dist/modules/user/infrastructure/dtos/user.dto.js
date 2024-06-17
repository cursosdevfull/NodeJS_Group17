"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.UserDto=void 0;const role_1=require("../../../role/domain/role"),role_entity_1=require("../../../role/infrastructure/entities/role.entity"),user_factory_1=require("../../domain/roots/user.factory"),user_entity_1=require("../entities/user.entity");class UserDto{static fromDomainToData(e){if(Array.isArray(e))return e.map((e=>UserDto.fromDomainToData(e)));const r=new user_entity_1.UserEntity;return r.userId=e.properties.userId,r.email=e.properties.email,r.name=e.properties.name,r.lastname=e.properties.lastname,r.password=e.properties.password,r.refreshToken=e.properties.refreshToken,r.createdAt=e.properties.createdAt,r.updatedAt=e.properties.updatedAt,r.deletedAt=e.properties.deletedAt,r.secret=e.properties.secret,r.image=e.properties.image,r.roles=e.properties.roles.map((e=>{var r;const t=new role_entity_1.RoleEntity;return t.roleId=e.roleId,t.roleName=null!==(r=e.roleName)&&void 0!==r?r:"",t})),r}static fromDataToDomain(e){return Array.isArray(e)?e.map((e=>UserDto.fromDataToDomain(e))):user_factory_1.UserFactory.create({userId:e.userId,email:e.email,name:e.name,lastname:e.lastname,password:e.password,refreshToken:e.refreshToken,createdAt:e.createdAt,updatedAt:e.updatedAt,deletedAt:e.deletedAt,secret:e.secret,image:e.image,roles:e.roles.map((e=>new role_1.Role(e.roleId,e.roleName)))})}}exports.UserDto=UserDto;