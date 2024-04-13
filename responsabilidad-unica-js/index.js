const { createUser, getFullname } = require("./user");
const { getTasks } = require("./task");
const { getSalary } = require("./salary");

const id = 10;
const name = "Luis";
const lastname = "Carbajal";

const args = process.argv.slice(2);
const userId = Number(args[0]);

console.log(createUser("Javier", "Lozano"));
console.log(getFullname(name, lastname));
console.log(getTasks(userId));
console.log(getSalary(userId));
