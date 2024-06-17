"use strict";var __awaiter=this&&this.__awaiter||function(e,s,r,t){return new(r||(r=Promise))((function(o,i){function a(e){try{c(t.next(e))}catch(e){i(e)}}function n(e){try{c(t.throw(e))}catch(e){i(e)}}function c(e){var s;e.done?o(e.value):(s=e.value,s instanceof r?s:new r((function(e){e(s)}))).then(a,n)}c((t=t.apply(e,s||[])).next())}))};Object.defineProperty(exports,"__esModule",{value:!0}),exports.AuthController=void 0;const crypt_1=require("../../../core/services/crypt"),otp_1=require("../../../core/services/otp"),tokens_1=require("../../../core/services/tokens"),user_factory_1=require("../../user/domain/roots/user.factory"),auth_factory_1=require("../domain/auth-factory");class AuthController{constructor(e,s){this.application=e,this.userApplication=s,this.login=this.login.bind(this),this.newAccessToken=this.newAccessToken.bind(this),this.register=this.register.bind(this),this.enable2FA=this.enable2FA.bind(this),this.verify2FA=this.verify2FA.bind(this)}login(e,s){return __awaiter(this,void 0,void 0,(function*(){const{email:r,password:t}=e.body,o=auth_factory_1.AuthFactory.create(r,t),i=yield this.application.login(o);s.status(200).json(i)}))}newAccessToken(e,s){return __awaiter(this,void 0,void 0,(function*(){const{refreshToken:r}=e.body,t=yield this.application.getNewAccessToken(r);s.status(200).json(t)}))}register(e,s,r){return __awaiter(this,void 0,void 0,(function*(){const r=e.body,t=Object.assign(Object.assign({},r),{password:yield crypt_1.Crypt.hash(r.password)}),o=user_factory_1.UserFactory.create(t);yield this.userApplication.save(o);const i=auth_factory_1.AuthFactory.create(r.email,r.password),a=yield this.application.login(i),{secret:n,qr:c}=yield otp_1.OneTimePassword.generateQRAndSecret();s.json(Object.assign(Object.assign({},a),{secret:n,qr:c}))}))}enable2FA(e,s,r){return __awaiter(this,void 0,void 0,(function*(){const{userId:r}=s.locals,{secret:t,token:o}=e.body;if(!(yield otp_1.OneTimePassword.verify2FA(t,o)))return s.status(401).json({message:"Unauthorized"});const i=yield this.userApplication.getById(r);if(i.isErr())return s.status(i.error.status).json({statusCodeId:i.error.statusCodeId,message:i.error.message,stack:i.error.stack,errorsDetails:i.error.errorsDetails});const a=i.value;a.update({secret:t});const n=yield this.userApplication.save(a);if(n.isErr())return s.status(n.error.status).json({statusCodeId:n.error.statusCodeId,message:n.error.message,stack:n.error.stack,errorsDetails:n.error.errorsDetails});s.status(200).json({message:"2FA enabled"})}))}verify2FA(e,s,r){return __awaiter(this,void 0,void 0,(function*(){const{userId:r}=s.locals,{token:t}=e.body,o=yield this.userApplication.getById(r);if(o.isErr())return s.status(o.error.status).json({statusCodeId:o.error.statusCodeId,message:o.error.message,stack:o.error.stack,errorsDetails:o.error.errorsDetails});const i=o.value,a=otp_1.OneTimePassword.verify2FA(i.properties.secret,t);if(a.isErr())return s.status(a.error.status).json({statusCodeId:a.error.statusCodeId,message:a.error.message,stack:a.error.stack,errorsDetails:a.error.errorsDetails});const n=yield tokens_1.Tokens.generateTokens(i,!0);s.status(200).json(n)}))}}exports.AuthController=AuthController;