"use strict";var __awaiter=this&&this.__awaiter||function(t,e,i,o){return new(i||(i=Promise))((function(n,r){function c(t){try{l(o.next(t))}catch(t){r(t)}}function a(t){try{l(o.throw(t))}catch(t){r(t)}}function l(t){var e;t.done?n(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(c,a)}l((o=o.apply(t,e||[])).next())}))};Object.defineProperty(exports,"__esModule",{value:!0}),exports.RoleApplication=void 0;class RoleApplication{constructor(t){this.repository=t}getAll(){return __awaiter(this,void 0,void 0,(function*(){return yield this.repository.getAll()}))}}exports.RoleApplication=RoleApplication;