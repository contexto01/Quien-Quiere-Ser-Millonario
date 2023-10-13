import preguntas from "./preguntas.js";
import options from "./options.js";

function seleccionarAleatoriamente(obj, n) {
  const disponibles = Object.keys(obj); // Obtener todas las claves disponibles
  const resultado = [];

  for (let i = 0; i < n && disponibles.length > 0; i++) {
    const indiceAleatorio = Math.floor(Math.random() * disponibles.length);
    const claveAleatoria = disponibles[indiceAleatorio];
    const preguntaSeleccionada = obj[claveAleatoria];

    // Clonar la pregunta seleccionada para no modificar la original
    const preguntaClonada = { ...preguntaSeleccionada };

    // Aleatorizar las respuestas
    preguntaClonada.respuestas = shuffleArray(
      Object.values(preguntaClonada.respuestas)
    );

    resultado.push([preguntaClonada]);

    // Eliminar la clave seleccionada del array de disponibles
    disponibles.splice(indiceAleatorio, 1);
  }

  return resultado;
}

// Función para aleatorizar un array (Fisher-Yates shuffle)
function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default seleccionarAleatoriamente(preguntas, 10);

// let coso = seleccionarAleatoriamente(preguntas, 100);
// coso.forEach(element => {
//   element.forEach(element => console.log(element.titulo))
// });
