"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.AuthorizationGuard=void 0;class AuthorizationGuard{rolesAllowed(...e){return{canActivate:(o,r,t)=>{const{roles:s}=r.locals;return s.map((e=>e.roleName)).some((o=>e.includes(o)))?t():r.status(403).json({message:"Forbidden"})}}}}exports.AuthorizationGuard=AuthorizationGuard;