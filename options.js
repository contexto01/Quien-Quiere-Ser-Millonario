const fontFace = "Bahnschrift SemiBold SemiConden";
const fontSize = 14;

export const PreguntaStyle = {
  shape: "roundRect",
  fill: {
    color: "000000",
    transparency: "100",
  },
  color: "FFFFFF",
  align: "center",
};
const RespuestaStyle = {
  w: 4.1,
  h: 0.55,
  fontFace,
  fontSize,
};

export default {
  Inicio: {
    x: "52%",
    y: "75%",
    w: "35%",
    h: "17%",
  },
  InstruccionesInicio: {
    x: 1.3,
    y: "75%",
    w: "35%",
    h: "17%",
  },
  Instrucciones: {
    x: 0.74,
    y: 1.2,
    w: 8.5,
    h: 4.04,
  },
  InstruccionesText: {
    Text: `-El juego consta de una serie de preguntas de opción múltiple con diferentes niveles de dificultad.

-Cada pregunta tiene cuatro opciones de respuesta, de las cuales solo una es correcta. El jugador avanza en el juego ganando dinero con cada pregunta que responde correctamente. 

-El valor de las preguntas aumenta a medida que avanzas.

-El jugador puede optar por usar comodines como el "cincuenta-cincuenta", que elimina dos opciones incorrectas.

-Si el jugador responde incorrectamente, pierde parte o todo el dinero acumulado, dependiendo de la etapa del juego en la que se encuentre.`,
  },
  Preguntas: {
    Pregunta: {
      x: "5%",
      y: "57%",
      w: "90%",
      h: "17%",
      fontSize: 20,
      fontFace,
      ...PreguntaStyle,
    },

    Pregunta1: {
      x: 0.63,
      y: 4.28,
      ...RespuestaStyle,
    },
    Pregunta2: {
      x: 5.27,
      y: 4.28,
      ...RespuestaStyle,
    },
    Pregunta3: {
      x: 0.63,
      y: 5.03,
      ...RespuestaStyle,
    },
    Pregunta4: {
      x: 5.27,
      y: 5.03,
      ...RespuestaStyle,
    },
  },
  Objectos: {
    Comodin: {
      x: 0.5,
      y: 1.4,
      w: 1.92,
      h: 1.27,
    },
    Casa: {
      x: 0.96,
      path: "https://i.ibb.co/gdtghs4/pngwing-com-1.png",
      hyperlink: { slide: 1 },
    },
  },
};
