"use strict";var __decorate=this&&this.__decorate||function(t,e,a,r){var o,s=arguments.length,i=s<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,a):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,a,r);else for(var c=t.length-1;c>=0;c--)(o=t[c])&&(i=(s<3?o(i):s>3?o(e,a,i):o(e,a))||i);return s>3&&i&&Object.defineProperty(e,a,i),i},__metadata=this&&this.__metadata||function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};Object.defineProperty(exports,"__esModule",{value:!0}),exports.ParametersAuthLogin=void 0;const class_validator_1=require("class-validator");class ParametersAuthLogin{}exports.ParametersAuthLogin=ParametersAuthLogin,__decorate([(0,class_validator_1.IsNotEmpty)(),(0,class_validator_1.IsEmail)(),(0,class_validator_1.IsString)(),__metadata("design:type",String)],ParametersAuthLogin.prototype,"email",void 0),__decorate([(0,class_validator_1.IsNotEmpty)(),(0,class_validator_1.IsString)(),(0,class_validator_1.Matches)(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i,{message:"El password debe cumplir con el siguiente patrón /^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$/i"}),__metadata("design:type",String)],ParametersAuthLogin.prototype,"password",void 0);