class Usuario {
  name: string;
  lastname: string;
  email: string;

  constructor(name: string, lastname: string, email: string) {
    this.name = name;
    this.lastname = lastname;
    this.email = email;
  }
}

class Salary {
  quantityTasksCompleted: number;
  salaryByTask: number = 100;
  usuario: Usuario;

  constructor(
    /*     name: string,
    lastname: string,
    email: string, */
    tasksCompleted: number,
    usuario: Usuario
  ) {
    //this.usuario = new Usuario(name, lastname, email);
    this.usuario = usuario;
    this.quantityTasksCompleted = tasksCompleted;
  }

  calculateSalary(): string {
    return `${this.usuario.name} ${this.usuario.lastname}: Salary: ${
      this.quantityTasksCompleted * this.salaryByTask
    }`;
  }
}

// Preparación de datos
//const usuario = new Usuario("Carlos", "Rodríguez", "sergio@correo.com");
const usuario = {
  name: "Mariana",
  lastname: "Carbajal",
  email: "mariana@correo.com",
};
const salary = new Salary(
  /*   "Carlos",
  "Rodríguez",
  "sergio@correo.com", */
  10,
  usuario
);
//console.log(salary.calculateSalary());

// Ejecución de la función
const result = salary.calculateSalary();

// Comprobación
if (
  result ===
  `${usuario.name} ${usuario.lastname}: Salary: ${
    10 * 100
  }` /*"Carlos Rodríguez: Salary: 1000"*/
) {
  console.log("Todo bien");
} else {
  console.log("Hay que revisar");
}

/*class Salary extends Usuario {
  quantityTasksCompleted: number;
  salaryByTask: number = 100;

  constructor(
    name: string,
    lastname: string,
    email: string,
    tasksCompleted: number
  ) {
    super(name, lastname, email);
    this.quantityTasksCompleted = tasksCompleted;
  }

  calculateSalary(): string {
    return `${this.name} ${this.lastname}: Salary: ${
      this.quantityTasksCompleted * this.salaryByTask
    }`;
  }
}*/
