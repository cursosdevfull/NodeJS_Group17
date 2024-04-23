export class Animal {
  clasificacion: string = "terrestre"; // Terrestre, acuático, aéreo
  especie!: string;
  lugares: string[];

  constructor(lugares: string[]) {
    this.lugares = lugares;
    //this.lugares = ["Bosque", "Desierto", "Océano"];
  }
}

/*const animal = new Animal(["Bosque", "Desierto", "Océano"]);
console.log(animal.clasificacion);
console.log(animal.lugares);*/
