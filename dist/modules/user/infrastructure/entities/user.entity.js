"use strict";var __decorate=this&&this.__decorate||function(t,e,r,a){var o,n=arguments.length,y=n<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,r):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)y=Reflect.decorate(t,e,r,a);else for(var i=t.length-1;i>=0;i--)(o=t[i])&&(y=(n<3?o(y):n>3?o(e,r,y):o(e,r))||y);return n>3&&y&&Object.defineProperty(e,r,y),y},__metadata=this&&this.__metadata||function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};Object.defineProperty(exports,"__esModule",{value:!0}),exports.UserEntity=void 0;const typeorm_1=require("typeorm"),role_entity_1=require("../../../role/infrastructure/entities/role.entity");let UserEntity=class{};exports.UserEntity=UserEntity,__decorate([(0,typeorm_1.PrimaryColumn)({type:"varchar",length:64}),__metadata("design:type",String)],UserEntity.prototype,"userId",void 0),__decorate([(0,typeorm_1.Column)({type:"varchar",length:100}),__metadata("design:type",String)],UserEntity.prototype,"name",void 0),__decorate([(0,typeorm_1.Column)({type:"varchar",length:100}),__metadata("design:type",String)],UserEntity.prototype,"lastname",void 0),__decorate([(0,typeorm_1.Column)({type:"varchar",length:100,unique:!0}),__metadata("design:type",String)],UserEntity.prototype,"email",void 0),__decorate([(0,typeorm_1.Column)({type:"varchar",length:100}),__metadata("design:type",String)],UserEntity.prototype,"password",void 0),__decorate([(0,typeorm_1.Column)({type:"varchar",length:100}),__metadata("design:type",String)],UserEntity.prototype,"refreshToken",void 0),__decorate([(0,typeorm_1.Column)({type:"varchar",length:100,nullable:!0}),__metadata("design:type",String)],UserEntity.prototype,"secret",void 0),__decorate([(0,typeorm_1.Column)({type:"varchar",length:100,nullable:!0}),__metadata("design:type",String)],UserEntity.prototype,"image",void 0),__decorate([(0,typeorm_1.Column)({type:"timestamp",nullable:!1}),__metadata("design:type",Date)],UserEntity.prototype,"createdAt",void 0),__decorate([(0,typeorm_1.Column)({type:"timestamp",nullable:!0}),__metadata("design:type",Date)],UserEntity.prototype,"updatedAt",void 0),__decorate([(0,typeorm_1.Column)({type:"timestamp",nullable:!0}),__metadata("design:type",Date)],UserEntity.prototype,"deletedAt",void 0),__decorate([(0,typeorm_1.ManyToMany)((()=>role_entity_1.RoleEntity),(t=>t.users)),(0,typeorm_1.JoinTable)(),__metadata("design:type",Array)],UserEntity.prototype,"roles",void 0),exports.UserEntity=UserEntity=__decorate([(0,typeorm_1.Index)("idx1",["name","lastname"],{unique:!0}),(0,typeorm_1.Entity)({name:"user"})],UserEntity);