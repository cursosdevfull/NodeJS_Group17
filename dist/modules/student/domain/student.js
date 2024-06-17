"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Student=void 0;class Student{constructor(e){if(!new RegExp(/^([\w.-]+)@(\[(\d{1,3}\.){3}|(?!hotmail|gmail|googlemail|yahoo|gmx|ymail|outlook|bluewin|protonmail|t\-online|web\.|online\.|aol\.|live\.)(([a-zA-Z\d-]+\.)+))([a-zA-Z]{2,63}|\d{1,3})(\]?)$/).test(e.email))throw new Error("Invalid email");if(e.address.length<5)throw new Error("Invalid address");if(e.city.length<3)throw new Error("Invalid city");if(e.country.length<3)throw new Error("Invalid country");if(!e.career.trim().toLowerCase().includes("ingenieria")&&!e.career.trim().toLowerCase().includes("ing"))throw new Error("Invalid career");if(Object.assign(this,e),e.id&&e.id>0)this.id=e.id;else if(e.id&&e.id<=0)throw new Error("Invalid id");e.id||(this.id=Math.floor(1e3*Math.random())),e.createdAt?this.createdAt=e.createdAt:this.createdAt=new Date,e.updated&&(this.updatedAt=e.updated),e.deletedAt&&(this.deletedAt=e.deletedAt)}get properties(){return{id:this.id,name:this.name,lastname:this.lastname,age:this.age,email:this.email,phone:this.phone,address:this.address,city:this.city,country:this.country,gender:this.gender,career:this.career,semester:this.semester,createdAt:this.createdAt,updatedAt:this.updatedAt,deletedAt:this.deletedAt}}update(e){Object.assign(this,e),this.updatedAt=new Date}delete(){this.deletedAt=new Date}}exports.Student=Student;