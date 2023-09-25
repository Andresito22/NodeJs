require('colors');
const readline = require('readline');
const http = require('http');
const { agregarTarea, eliminarTarea, completarTarea, mostrarTareas } = require('./tareaFunciones');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const server = http.createServer((req, res) => {
  if (req.url === '/nuevasTareas' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    const listaTareasJSON = JSON.stringify(listaTareas);
    res.end(listaTareasJSON);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 Not Found</h1>');
  }
});

const mostrarMenu = () => {
  console.log('======================='.green);
  console.log('   Lista de Tareas    '.green);
  console.log('======================='.green);
  console.log(`${'Seleccione una opción:'.underline.cyan}`);
  console.log(`${'1.'.cyan} Crear nueva tarea`);
  console.log(`${'2.'.cyan} Mostrar nuevas tareas`);
  console.log(`${'3.'.cyan} Completar nueva tarea`);
  console.log(`${'4.'.cyan} Eliminar nueva tarea`);
  console.log(`${'5.'.cyan} Salir`);
};

const menu = () => {
  mostrarMenu();
  rl.question('', async (opcion) => {
    switch (opcion.trim()) {
      case '1':
        console.clear();
        rl.question('Añade la nueva tarea que desea realizar: ', async (description) => {
          try {
            await agregarTarea(description);
            console.log('\n Nueva tarea creada exitosamente!'.green);
          } catch (error) {
            console.error(error.message.red);
          }
          menu();
        });
        break;

      case '2':
        console.clear();
        mostrarTareas();
        menu();
        break;

      case '3':
        console.clear();
        mostrarTareas();
        rl.question('¿Qué nueva tarea desea marcar como completa? ', async (complete) => {
          try {
            await completarTarea(complete);
            console.log('\n Nueva tarea completada exitosamente'.green);
          } catch (error) {
            console.error(error.message.red);
          }
          menu();
        });
        break;

      case '4':
        console.clear();
        mostrarTareas();
        rl.question('¿Qué nueva tarea desea eliminar? ', async (eliminar) => {
          try {
            await eliminarTarea(eliminar);
            console.log('\n Nueva tarea eliminada exitosamente'.green);
          } catch (error) {
            console.error(error.message.red);
          }
          menu();
        });
        break;

      case '5':
        rl.close();
        break;

      default:
        console.clear();
        console.log('\n Ingresa una opción válida, por favor.'.red);
        menu();
        break;
    }
  });
};

server.listen(3001, () => {
  console.log('\n Nuevo servidor iniciado en http://localhost:3001'.green);
});

module.exports = {
  menu,
};
