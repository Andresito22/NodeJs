const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function mostrarOpciones() {
  console.log('Opciones:');
  console.log('1. Agregar tarea');
  console.log('2. Eliminar tarea');
  console.log('3. Marcar tarea como completada');
  console.log('4. Mostrar tareas');
  console.log('5. Salir');
}

const tareas = [];

function agregarTarea(indicador, descripcion) {
  return new Promise((resolve, reject) => {
    tareas.push({ indicador, descripcion, completada: false });
    guardarTareas()
      .then(() => {
        resolve('Tarea agregada.');
      })
      .catch(reject);
  });
}

function eliminarTarea(indicador) {
  return new Promise((resolve, reject) => {
    const tareaIndex = tareas.findIndex(tarea => tarea.indicador === indicador);
    if (tareaIndex !== -1) {
      tareas.splice(tareaIndex, 1);
      guardarTareas()
        .then(() => {
          resolve('Tarea eliminada.');
        })
        .catch(reject);
    } else {
      reject('La tarea no existe.');
    }
  });
}

function completarTarea(indicador) {
  return new Promise((resolve, reject) => {
    const tarea = tareas.find(tarea => tarea.indicador === indicador);
    if (tarea) {
      tarea.completada = true;
      guardarTareas()
        .then(() => {
          resolve('Tarea marcada como completada.');
        })
        .catch(reject);
    } else {
      reject('La tarea no existe.');
    }
  });
}

function mostrarTareas() {
  console.log('Lista de tareas:');
  tareas.forEach(tarea => {
    const estado = tarea.completada ? 'Completada' : 'Pendiente';
    console.log(`${tarea.indicador}: ${tarea.descripcion} (${estado})`);
  });
}

function guardarTareas() {
  return new Promise((resolve, reject) => {
    fs.writeFile('tareas.json', JSON.stringify(tareas, null, 2), err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

if (fs.existsSync('tareas.json')) {
  const data = fs.readFileSync('tareas.json', 'utf8');
  tareas.push(...JSON.parse(data));
}

mostrarOpciones();

rl.on('line', input => {
  switch (input) {
    case '1':
      rl.question('Indicador de la tarea: ', indicador => {
        rl.question('Descripción de la tarea: ', descripcion => {
          agregarTarea(indicador, descripcion)
            .then(message => {
              console.log(message);
              mostrarOpciones();
            })
            .catch(error => {
              console.error(error);
              mostrarOpciones();
            });
        });
      });
      break;
    case '2':
      rl.question('Indicador de la tarea a eliminar: ', indicador => {
        eliminarTarea(indicador)
          .then(message => {
            console.log(message);
            mostrarOpciones();
          })
          .catch(error => {
            console.error(error);
            mostrarOpciones();
          });
      });
      break;
    case '3':
      rl.question('Indicador de la tarea a completar: ', indicador => {
        completarTarea(indicador)
          .then(message => {
            console.log(message);
            mostrarOpciones();
          })
          .catch(error => {
            console.error(error);
            mostrarOpciones();
          });
      });
      break;
    case '4':
      mostrarTareas();
      mostrarOpciones();
      break;
    case '5':
      rl.close();
      break;
    default:
      console.log('Opción no válida. Por favor, elige una opción válida.');
      mostrarOpciones();
  }
});


/* Prueba async y await.!!!
const readline = require('readline');
const fs = require('fs').promises; // Importamos fs.promises para utilizar promesas en fs

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function mostrarOpciones() {
  console.log('Opciones:');
  console.log('1. Agregar tarea');
  console.log('2. Eliminar tarea');
  console.log('3. Marcar tarea como completada');
  console.log('4. Mostrar tareas');
  console.log('5. Salir');
}

const tareas = [];

async function agregarTarea(indicador, descripcion) {
  tareas.push({ indicador, descripcion, completada: false });
  await guardarTareas();
  console.log('Tarea agregada.');
}

async function eliminarTarea(indicador) {
  const tareaIndex = tareas.findIndex(tarea => tarea.indicador === indicador);
  if (tareaIndex !== -1) {
    tareas.splice(tareaIndex, 1);
    await guardarTareas();
    console.log('Tarea eliminada.');
  } else {
    console.log('La tarea no existe.');
  }
}

async function completarTarea(indicador) {
  const tarea = tareas.find(tarea => tarea.indicador === indicador);
  if (tarea) {
    tarea.completada = true;
    await guardarTareas();
    console.log('Tarea marcada como completada.');
  } else {
    console.log('La tarea no existe.');
  }
}

function mostrarTareas() {
  console.log('Lista de tareas:');
  tareas.forEach(tarea => {
    const estado = tarea.completada ? 'Completada' : 'Pendiente';
    console.log(`${tarea.indicador}: ${tarea.descripcion} (${estado})`);
  });
}

async function guardarTareas() {
  try {
    await fs.writeFile('tareas.json', JSON.stringify(tareas, null, 2));
  } catch (error) {
    console.error('Error al guardar tareas:', error);
  }
}

async function main() {
  if (fs.existsSync('tareas.json')) {
    const data = await fs.readFile('tareas.json', 'utf8');
    tareas.push(...JSON.parse(data));
  }

  mostrarOpciones();

  rl.on('line', async input => {
    switch (input) {
      case '1':
        const indicador = await pregunta('Indicador de la tarea: ');
        const descripcion = await pregunta('Descripción de la tarea: ');
        await agregarTarea(indicador, descripcion);
        mostrarOpciones();
        break;
      case '2':
        const indicadorEliminar = await pregunta('Indicador de la tarea a eliminar: ');
        await eliminarTarea(indicadorEliminar);
        mostrarOpciones();
        break;
      case '3':
        const indicadorCompletar = await pregunta('Indicador de la tarea a completar: ');
        await completarTarea(indicadorCompletar);
        mostrarOpciones();
        break;
      case '4':
        mostrarTareas();
        mostrarOpciones();
        break;
      case '5':
        rl.close();
        break;
      default:
        console.log('Opción no válida. Por favor, elige una opción válida.');
        mostrarOpciones();
    }
  });

  function pregunta(texto) {
    return new Promise(resolve => {
      rl.question(texto, respuesta => {
        resolve(respuesta);
      });
    });
  }
}

main();
*/

/* Prueba Metodo then
const readline = require('readline');
const fs = require('fs').promises;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function mostrarOpciones() {
  console.log('Opciones:');
  console.log('1. Agregar tarea');
  console.log('2. Eliminar tarea');
  console.log('3. Marcar tarea como completada');
  console.log('4. Mostrar tareas');
  console.log('5. Salir');
}

const tareas = [];

function agregarTarea(indicador, descripcion) {
  tareas.push({ indicador, descripcion, completada: false });
  return guardarTareas()
    .then(() => {
      console.log('Tarea agregada.');
    })
    .catch(error => {
      console.error('Error al agregar tarea:', error);
    });
}

function eliminarTarea(indicador) {
  const tareaIndex = tareas.findIndex(tarea => tarea.indicador === indicador);
  if (tareaIndex !== -1) {
    tareas.splice(tareaIndex, 1);
    return guardarTareas()
      .then(() => {
        console.log('Tarea eliminada.');
      })
      .catch(error => {
        console.error('Error al eliminar tarea:', error);
      });
  } else {
    console.log('La tarea no existe.');
  }
}

function completarTarea(indicador) {
  const tarea = tareas.find(tarea => tarea.indicador === indicador);
  if (tarea) {
    tarea.completada = true;
    return guardarTareas()
      .then(() => {
        console.log('Tarea marcada como completada.');
      })
      .catch(error => {
        console.error('Error al completar tarea:', error);
      });
  } else {
    console.log('La tarea no existe.');
  }
}

function mostrarTareas() {
  console.log('Lista de tareas:');
  tareas.forEach(tarea => {
    const estado = tarea.completada ? 'Completada' : 'Pendiente';
    console.log(`${tarea.indicador}: ${tarea.descripcion} (${estado})`);
  });
}

function guardarTareas() {
  return fs.writeFile('tareas.json', JSON.stringify(tareas, null, 2))
    .catch(error => {
      console.error('Error al guardar tareas:', error);
    });
}

if (fs.existsSync('tareas.json')) {
  fs.readFile('tareas.json', 'utf8')
    .then(data => {
      tareas.push(...JSON.parse(data));
    })
    .catch(error => {
      console.error('Error al leer el archivo de tareas:', error);
    })
    .finally(() => {
      mostrarOpciones();
    });
} else {
  mostrarOpciones();
}

rl.on('line', input => {
  switch (input) {
    case '1':
      rl.question('Indicador de la tarea: ', indicador => {
        rl.question('Descripción de la tarea: ', descripcion => {
          agregarTarea(indicador, descripcion);
          mostrarOpciones();
        });
      });
      break;
    case '2':
      rl.question('Indicador de la tarea a eliminar: ', indicador => {
        eliminarTarea(indicador);
        mostrarOpciones();
      });
      break;
    case '3':
      rl.question('Indicador de la tarea a completar: ', indicador => {
        completarTarea(indicador);
        mostrarOpciones();
      });
      break;
    case '4':
      mostrarTareas();
      mostrarOpciones();
      break;
    case '5':
      rl.close();
      break;
    default:
      console.log('Opción no válida. Por favor, elige una opción válida.');
      mostrarOpciones();
  }
});
*/