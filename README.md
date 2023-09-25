¿Qué sucedio al usar async y await?

Async y await hacen que el código se vea más síncrono y fácil de leer. Permite escribir código asincrónico de una manera que se parece más a la programación síncrona.

¿Qué sucedio al usar el método then()?


Es una forma de gestionar promesas sin utilizar async y await. Requiere que encadenes .then() para manejar promesas sucesivas.

El código con .then() puede ser más verboso, ya que cada .then() anida el siguiente paso, lo que puede llevar a una estructura de código llamada "callback hell" si no se maneja cuidadosamente.


¿Qué diferencias encontraste entre async, await y el método then()?


Al usar async y await:

Async y await hacen que el código se vea más síncrono y fácil de leer. Permite escribir código asincrónico de una manera que se parece más a la programación síncrona.

El código que usa async y await se ejecutará de manera secuencial, a menos que se utilicen otras técnicas como Promise.all() para ejecutar múltiples tareas asincrónicas en paralelo.

await espera a que una promesa se resuelva antes de continuar con la ejecución del código en la función, lo que facilita la gestión del flujo de control.

Al usar el método .then():

.then() es una forma de gestionar promesas sin utilizar async y await. Requiere que encadenes .then() para manejar promesas sucesivas.

El código con .then() puede ser más verboso, ya que cada .then() anida el siguiente paso, lo que puede llevar a una estructura de código llamada "callback hell" si no se maneja cuidadosamente.

.then() permite una mayor flexibilidad en el manejo de promesas, como la posibilidad de realizar múltiples tareas asincrónicas en paralelo utilizando Promise.all() o Promise.race().

En resumen, tanto async/await como el método .then() son métodos para gestionar promesas en JavaScript, pero async/await tiende a ser más legible y fácil de entender, especialmente en programas con lógica más compleja o múltiples promesas encadenadas. El método .then() ofrece una mayor flexibilidad y control cuando se trabaja con múltiples promesas, pero a menudo resulta en un código más verboso y menos legible. 