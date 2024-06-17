"use strict";var __awaiter=this&&this.__awaiter||function(e,o,t,r){return new(t||(t=Promise))((function(n,i){function l(e){try{c(r.next(e))}catch(e){i(e)}}function u(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var o;e.done?n(e.value):(o=e.value,o instanceof t?o:new t((function(e){e(o)}))).then(l,u)}c((r=r.apply(e,o||[])).next())}))};Object.defineProperty(exports,"__esModule",{value:!0}),exports.gracefullyShutdown=void 0;const logger_1=require("../utils/logger"),gracefullyShutdown=(e,...o)=>{const t=logger_1.Logger.createLogger();return()=>__awaiter(void 0,void 0,void 0,(function*(){t.logInfo(`${e} signal received`),t.logInfo("Closing server..."),yield Promise.all(o.map((e=>e.close()))),setTimeout((()=>{t.logError("Could not close server, forcefully shutting down"),process.exit(1)}),1e4)}))};exports.gracefullyShutdown=gracefullyShutdown;