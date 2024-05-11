"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
class Student {
    constructor(props) {
        const regExp = new RegExp(/^([\w.-]+)@(\[(\d{1,3}\.){3}|(?!hotmail|gmail|googlemail|yahoo|gmx|ymail|outlook|bluewin|protonmail|t\-online|web\.|online\.|aol\.|live\.)(([a-zA-Z\d-]+\.)+))([a-zA-Z]{2,63}|\d{1,3})(\]?)$/);
        if (!regExp.test(props.email)) {
            throw new Error("Invalid email");
        }
        if (props.address.length < 5)
            throw new Error("Invalid address");
        if (props.city.length < 3)
            throw new Error("Invalid city");
        if (props.country.length < 3)
            throw new Error("Invalid country");
        if (!props.career.trim().toLowerCase().includes("ingenieria") &&
            !props.career.trim().toLowerCase().includes("ing"))
            throw new Error("Invalid career");
        Object.assign(this, props);
        if (props.id && props.id > 0) {
            this.id = props.id;
        }
        else if (props.id && props.id <= 0) {
            throw new Error("Invalid id");
        }
        if (!props.id) {
            this.id = Math.floor(Math.random() * 1000);
        }
        if (props.createdAt) {
            this.createdAt = props.createdAt;
        }
        else {
            this.createdAt = new Date();
        }
        if (props.updated)
            this.updatedAt = props.updated;
        if (props.deletedAt)
            this.deletedAt = props.deletedAt;
    }
    get properties() {
        return {
            id: this.id,
            name: this.name,
            lastname: this.lastname,
            age: this.age,
            email: this.email,
            phone: this.phone,
            address: this.address,
            city: this.city,
            country: this.country,
            gender: this.gender,
            career: this.career,
            semester: this.semester,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            deletedAt: this.deletedAt,
        };
    }
    update(props) {
        Object.assign(this, props);
        this.updatedAt = new Date();
    }
    delete() {
        this.deletedAt = new Date();
    }
}
exports.Student = Student;
