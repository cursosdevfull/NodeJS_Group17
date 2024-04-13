interface Tablero {
  equipos: string[];
  goles: { [key: string]: number }[];
  porcentajePosesionPelota: { [key: string]: number };
}

const tablero: Tablero = {
  equipos: [],
  goles: [],
  porcentajePosesionPelota: {},
};

function validarPosesionPelotaTotal(nombreEquipo: string, porcentaje: number) {
  const clonePorcentajePosesionPelota = {
    ...tablero.porcentajePosesionPelota,
  };
  clonePorcentajePosesionPelota[nombreEquipo] = porcentaje;

  const totalPosesionPelota = Object.keys(clonePorcentajePosesionPelota).reduce(
    (accum, value) => {
      accum += clonePorcentajePosesionPelota[value];
      return accum;
    },
    0
  );

  console.log("totalPosesionPelota", totalPosesionPelota);

  if (totalPosesionPelota > 100)
    throw new Error("La suma de los porcentajes no puede superar el 100%");
}

function agregarEquipo(nombreEquipo: string) {
  if (tablero.equipos.length === 2)
    throw new Error("Ya hay dos equipos registrados");
  tablero.equipos.push(nombreEquipo);
}

function agregarGol(nombreEquipo: string) {
  const equipoEncontrado = tablero.goles.find((equipo: any) => {
    return Object.keys(equipo)[0] === nombreEquipo;
  });
  if (!equipoEncontrado && tablero.goles.length < 2) {
    tablero.goles.push({ [nombreEquipo]: 1 });
  } else if (equipoEncontrado) {
    const index = tablero.goles.findIndex(
      (equipo: any) => Object.keys(equipo)[0] === nombreEquipo
    );
    tablero.goles[index][nombreEquipo] += 1;
  }
}

function agregarPorcentajePosesionPelota(
  nombreEquipo: string,
  porcentaje: number
) {
  if (porcentaje < 0 || porcentaje > 100)
    throw new Error("El porcentaje debe ser un número entre 0 y 100");

  if (
    !tablero.porcentajePosesionPelota[nombreEquipo] &&
    Object.keys(tablero.porcentajePosesionPelota).length < 2
  ) {
    validarPosesionPelotaTotal(nombreEquipo, porcentaje);

    tablero.porcentajePosesionPelota[nombreEquipo] = porcentaje;
  } else if (tablero.porcentajePosesionPelota[nombreEquipo]) {
    validarPosesionPelotaTotal(nombreEquipo, porcentaje);

    tablero.porcentajePosesionPelota[nombreEquipo] = porcentaje;
  }
}

agregarEquipo("Barcelona");
agregarEquipo("Real Madrid");
agregarGol("Benfica");
agregarGol("Barcelona");
agregarPorcentajePosesionPelota("Barcelona", 60);
agregarPorcentajePosesionPelota("Real Madrid", 30);
//agregarEquipo("Independiente");
console.log(tablero);
