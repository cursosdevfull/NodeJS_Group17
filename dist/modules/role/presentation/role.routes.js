"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.router=void 0;const express_1=require("express"),role_application_1=require("../application/role.application"),role_infrastructure_1=require("../infrastructure/role.infrastructure"),role_controller_1=require("./role.controller");class RoleRoutes{constructor(r){this.controller=r,this.router=(0,express_1.Router)(),this.mountRoutes()}mountRoutes(){this.router.get("/v1/",this.controller.getAll)}getRouter(){return this.router}}const repository=new role_infrastructure_1.RoleInfrastructure,application=new role_application_1.RoleApplication(repository),controller=new role_controller_1.RoleController(application),router=new RoleRoutes(controller).getRouter();exports.router=router;