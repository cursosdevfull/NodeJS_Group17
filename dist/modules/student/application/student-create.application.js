"use strict";var __awaiter=this&&this.__awaiter||function(t,e,i,r){return new(i||(i=Promise))((function(n,o){function a(t){try{c(r.next(t))}catch(t){o(t)}}function s(t){try{c(r.throw(t))}catch(t){o(t)}}function c(t){var e;t.done?n(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(a,s)}c((r=r.apply(t,e||[])).next())}))};Object.defineProperty(exports,"__esModule",{value:!0});class StudentCreateApplication{constructor(t){this.repository=t}execute(t){return __awaiter(this,void 0,void 0,(function*(){if(yield this.repository.findByEmail(t.properties.email))throw new Error("Email already exists");return yield this.repository.create(t)}))}}