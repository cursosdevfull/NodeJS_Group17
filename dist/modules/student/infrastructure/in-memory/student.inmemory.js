"use strict";var __awaiter=this&&this.__awaiter||function(t,e,n,i){return new(n||(n=Promise))((function(o,d){function r(t){try{s(i.next(t))}catch(t){d(t)}}function a(t){try{s(i.throw(t))}catch(t){d(t)}}function s(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(r,a)}s((i=i.apply(t,e||[])).next())}))};Object.defineProperty(exports,"__esModule",{value:!0}),exports.StudentInMemory=void 0;const node_fs_1=require("node:fs"),node_path_1=require("node:path"),student_dto_1=require("../dtos/student.dto"),student_entity_1=require("../entities/student.entity");class StudentInMemory{constructor(){}static getInstance(){return StudentInMemory.instance||(StudentInMemory.instance=new StudentInMemory),StudentInMemory.instance}findAll(){return __awaiter(this,void 0,void 0,(function*(){const t=yield this.readData();return yield Promise.resolve([...student_dto_1.StudentDto.fromDataToDomain(t.filter((t=>!t.deletedAt||null===t.deletedAt)))])}))}findOne(t){return __awaiter(this,void 0,void 0,(function*(){const e=(yield this.readData()).find((e=>e.id===t));if(e&&null===e.deletedAt)return yield Promise.resolve(student_dto_1.StudentDto.fromDataToDomain(e))}))}getByPage(t,e){return __awaiter(this,void 0,void 0,(function*(){const n=yield this.readData();return yield Promise.resolve(student_dto_1.StudentDto.fromDataToDomain(n.filter((t=>!t.deletedAt||null===t.deletedAt)).slice((t-1)*e,t*e)))}))}create(t){return __awaiter(this,void 0,void 0,(function*(){const e=yield this.readData(),n=student_dto_1.StudentDto.fromDomainToData(t);return n.id=e.length+1,e.push(n),this.writeData(e),yield Promise.resolve(student_dto_1.StudentDto.fromDataToDomain(n))}))}update(t,e){return __awaiter(this,void 0,void 0,(function*(){const n=yield this.readData(),i=n.findIndex((e=>e.id===t&&(!e.deletedAt||null===e.deletedAt)));if(-1===i)return yield Promise.resolve(void 0);const o=student_dto_1.StudentDto.fromDataToDomain(n[i]);o.update(e);const d=student_dto_1.StudentDto.fromDomainToData(o);return n[i]=d,this.writeData(n),yield Promise.resolve(o)}))}delete(t){return __awaiter(this,void 0,void 0,(function*(){const e=yield this.readData(),n=e.findIndex((e=>e.id===t&&(!e.deletedAt||null===e.deletedAt)));if(-1===n)return yield Promise.resolve(void 0);const i=student_dto_1.StudentDto.fromDataToDomain(e[n]);i.delete();const o=student_dto_1.StudentDto.fromDomainToData(i);return e[n]=o,this.writeData(e),yield Promise.resolve(i)}))}findByEmail(t){return __awaiter(this,void 0,void 0,(function*(){const e=(yield this.readData()).find((e=>e.email===t));if(e&&(!e.deletedAt||null===e.deletedAt))return yield Promise.resolve(student_dto_1.StudentDto.fromDataToDomain(e))}))}readData(){return __awaiter(this,void 0,void 0,(function*(){return JSON.parse(yield this.readFileJson()).map(this.convertToData)}))}readFileJson(){return new Promise(((t,e)=>{(0,node_fs_1.readFile)((0,node_path_1.join)(__dirname,"../data","student.json"),"utf-8",((e,n)=>{if(e)throw e;return t(n)}))}))}convertToData(t){const e=new student_entity_1.StudentEntity;return Object.assign(e,t),e}writeData(t){return new Promise(((e,n)=>{(0,node_fs_1.writeFile)((0,node_path_1.join)(__dirname,"../data","student.json"),JSON.stringify(t),(t=>{if(t)throw t;return e()}))}))}}exports.StudentInMemory=StudentInMemory;