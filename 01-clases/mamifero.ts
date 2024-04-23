import { Animal } from "./animal";

class Mamifero extends Animal {
  name: string;

  constructor() {
    super(["Bosque", "Desierto", "Océano"]);
    this.name = "Elefante";
  }
}

const mamifero = new Mamifero();
console.log(mamifero.clasificacion);
console.log(mamifero.lugares);
console.log(mamifero.name);
