import pptxgen from "pptxgenjs";
import fs from "node:fs";
import path from "node:path";
import ReadLine from "node:readline";
import ora from "ora";
import chalk from "chalk";
import { PreguntaStyle } from "./options.js";
import options from "./options.js";
import PreguntasAleatorias from "./preguntasAleatorias.js";

const pres = new pptxgen();
const premios = 10;

const c = console.log;
const cl = console.clear;
const rl = ReadLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let slideIndex = 0;
let slide;
let slideActual;

function avanzarSlide() {
  slide = pres.addSlide();
  slideIndex++;
}

const respuestasCorrectas = [];

function obtenerRespuestaCorrecta(pregunta) {
  for (let i = 0; i < pregunta.respuestas.length; i++) {
    if (pregunta.respuestas[i].correcta) {
      return {
        pregunta: pregunta.titulo,
        respuesta: pregunta.respuestas[i].texto,
      };
    }
  }
  return null;
}

PreguntasAleatorias.forEach((pregunta) => {
  const respuestaCorrecta = obtenerRespuestaCorrecta(pregunta[0]);
  if (respuestaCorrecta !== null) {
    respuestasCorrectas.push(respuestaCorrecta);
  }
});

const respuestasCorrectasTxt = respuestasCorrectas.map(
  (respuesta, index) =>
    `Pregunta ${index + 1}:\n${respuesta.pregunta}\nRespuesta: ${
      respuesta.respuesta
    }\n`
);

fs.writeFileSync("respuestas_correctas.txt", respuestasCorrectasTxt.join("\n"));

console.log("Respuestas correctas guardadas en respuestas_correctas.txt");

avanzarSlide();

slide.background = { path: "https://i.ibb.co/WpLYn0N/inicio.png" };

slide.addShape(pres.ShapeType.rect, {
  ...options.InstruccionesInicio,
  hyperlink: { slide: "2" },
});

slide.addShape(pres.ShapeType.rect, {
  ...options.Inicio,
  hyperlink: { slide: "3" },
});

avanzarSlide();

slide.background = {
  path: "https://www.panoramaaudiovisual.com/wp-content/uploads/2020/09/Quien-quiere-ser-millonario-Ofer-Amram.jpg",
};

slide.addImage({
  ...options.Objectos.Casa,
});

slide.addShape(pres.ShapeType.rect, {
  ...options.Instrucciones,
  fill: {
    color: "000000",
    transparency: "30",
  },
});

slide.addText(options.InstruccionesText.Text, {
  ...options.Instrucciones,
  color: "FFFFFF",
  fontFace: "Bahnschrift SemiBold SemiConden",
  fontsize: 18,
});

for (let i = 0; i < 2; i++) {
  PreguntasAleatorias.forEach((preguntas, index) => {
    avanzarSlide();
    slide.background = {
      path: "https://i.ibb.co/9wNBgtC/imagen-2023-09-30-173316488.png",
    };
    if (i === 0) {
      slide.addImage({
        path: "https://i.ibb.co/cxPMcLm/5050-Juego.png",
        ...options.Objectos.Comodin,
        hyperlink: { slide: slideIndex + 20 },
      });
    }
    if (i === 0) {
      slideActual = 30;
    } else {
      slideActual = 20;
    }
    slide.addText(`${index + 1}) ${preguntas[0].titulo}`, {
      ...options.Preguntas.Pregunta,
    });

    slide.addText(preguntas[0].respuestas[0].texto, {
      ...options.Preguntas.Pregunta1,
      ...PreguntaStyle,
    });

    slide.addShape(pres.ShapeType.roundRect, {
      ...options.Preguntas.Pregunta1,
      hyperlink: {
        slide: preguntas[0].respuestas[0].correcta
          ? slideIndex + 1
          : slideIndex + slideActual,
      },
    });

    slide.addText(preguntas[0].respuestas[1].texto, {
      ...options.Preguntas.Pregunta2,
      ...PreguntaStyle,
    });

    slide.addShape(pres.ShapeType.roundRect, {
      ...options.Preguntas.Pregunta2,
      hyperlink: {
        slide: preguntas[0].respuestas[1].correcta
          ? slideIndex + 1
          : slideIndex + slideActual,
      },
    });

    slide.addText(preguntas[0].respuestas[2].texto, {
      ...options.Preguntas.Pregunta3,
      ...PreguntaStyle,
    });

    slide.addShape(pres.ShapeType.roundRect, {
      ...options.Preguntas.Pregunta3,
      hyperlink: {
        slide: preguntas[0].respuestas[2].correcta
          ? slideIndex + 1
          : slideIndex + slideActual,
      },
    });

    slide.addText(preguntas[0].respuestas[3].texto, {
      ...options.Preguntas.Pregunta4,
      ...PreguntaStyle,
    });

    slide.addShape(pres.ShapeType.roundRect, {
      ...options.Preguntas.Pregunta4,
      hyperlink: {
        slide: preguntas[0].respuestas[3].correcta
          ? slideIndex + 1
          : slideIndex + slideActual,
      },
    });
  });
}

PreguntasAleatorias.forEach((preguntas, index) => {
  avanzarSlide();
  slide.background = {
    path: "https://i.ibb.co/9wNBgtC/imagen-2023-09-30-173316488.png",
  };
  slide.addText(`${index + 1}) ${preguntas[0].titulo}`, {
    ...options.Preguntas.Pregunta,
  });

  const respuestasCorrectas = [];
  let trampa;

  preguntas[0].respuestas.forEach((e, i) => {
    if (e.correcta) {
      respuestasCorrectas.push(i);
      slide.addText(preguntas[0].respuestas[i].texto, {
        ...options.Preguntas[`Pregunta${i + 1}`],
        ...PreguntaStyle,
      });
      slide.addShape(pres.ShapeType.roundRect, {
        ...options.Preguntas[`Pregunta${i + 1}`],
        hyperlink: { slide: slideIndex - 9 },
      });

      preguntas[0].respuestas.splice(i, 1);
    }
  });

  do {
    trampa = Math.floor(Math.random() * preguntas[0].respuestas.length);
  } while (respuestasCorrectas.includes(trampa));

  slide.addText(preguntas[0].respuestas[trampa].texto, {
    ...options.Preguntas[`Pregunta${trampa + 1}`],
    ...PreguntaStyle,
  });

  slide.addShape(pres.ShapeType.roundRect, {
    ...options.Preguntas[`Pregunta${trampa + 1}`],
    hyperlink: { slide: slideIndex + 10 },
  });
});

for (let i = 1; i <= premios; i++) {
  avanzarSlide();

  slide.background = "FFFFFF";

  slide.addImage({
    path: `img/plata${i}.png`,
    x: 0,
    y: 0,
    w: "100%",
    h: "100%",
  });
}

cl();

function confirmAction(message, callback) {
  rl.question(message + " (S/N): ", (answer) => {
    if (answer.toLowerCase() === "s") {
      cl();
      callback();
    } else {
      console.log("Operación cancelada.");
      rl.close();
    }
  });
}

rl.question("Ingrese el autor: ", (author) => {
  pres.author = author;

  rl.question("Ingrese la compañía: ", (company) => {
    pres.company = company;

    rl.question("Ingrese la revisión: ", (revision) => {
      pres.revision = revision;

      rl.question("Ingrese el asunto: ", (subject) => {
        pres.subject = subject;

        rl.question("Ingrese el título: ", (title) => {
          pres.title = title;
          confirmAction("¿Desea continuar y crear la presentación?", () => {
            c("Valores ingresados:\n");
            c(`Autor: ${pres.author}`);
            c(`Compañía: ${pres.company}`);
            c(`Revisión: ${pres.revision}`);
            c(`Asunto: ${pres.subject}`);
            c(`Título: ${pres.title}\n`);
            const loadingSpinner = ora("Creando presentación...").start();
            pres
              .writeFile({ fileName: "JuegoSistemas.pptx" })
              .then((fileName) => {
                loadingSpinner.succeed(chalk.green(`Se guardó en ${fileName}`));
                rl.close();
              })
              .catch((err) => {
                if (err.code === "EBUSY") {
                  loadingSpinner.fail(chalk.red("Cierra el PowerPoint"));
                } else {
                  loadingSpinner.fail(chalk.red(err));
                }
                rl.close();
              });
          });
        });
      });
    });
  });
});
