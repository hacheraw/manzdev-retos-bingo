# manzdev-retos-titulo

🌍 **URL del reto**: *https://lenguajejs.com/retos/nivel-medio/bingo/*

## Datos

- 🦄 **Desarrollador/a:** *Hache_raw*
- 🐇 **Link a red social:** *https://twitter.com/hache_raw*
- 🦾 **Perfil:** *Avanzado*
- 💬 **Un comentario breve o frase ingeniosa**: *¿Por qué no complicarme?*

## Observaciones

Se me ocurrieron muchas maneras de hacerlo.

Lo que tenía claro es que los cartones debían seguir las reglas del bingo original:

- 3 filas y 9 columnas (27 huecos)
- 15 números (12 huecos)
- 6 columnas con dos números y 3 columnas con un número
- Números ordenados por decenas (columnas del 1 al 9, 10 al 19, 20 al 29...)
- 5 números por fila (4 huecos)

A pesar de que lo lógico hubiera sido hacerlo por filas, para ordenar los números tuve que hacerlo por columnas.
Al principio se me ocurrió hacer lo siguiente:

```js
const numbersPerColumn = [2, 2, 2, 2, 2, 2, 1, 1, 1].sort(() => (Math.random() - 0.5));
```

De esta manera, ya tendría la cantidad de números y huecos por columna.
El problema era meter los huecos de manera aleatoria y, además, que cumpliesen todas las reglas.

Al final terminé por rellenar todo el cartón (27 números) y luego, con la función `generateGaps` taparía, según las reglas, las casillas corespondientes (sobrescribiendo el número de esa posición con `null`)

Añadí lógica para que los cartones no pudieran tener los mismos números aunque hay muy poca probabilidad.

Todo lo relacionado con la creacción de los cartones, llenado del bombo, etc, lo separé en `game.js`.

Por último, añadí algunas cosas innecesarias, pero que lo hacen sentir más real, como que al sacar una bola, primero se mezclen los números del bombo y luego se retire el primero, como en el juego físico.

En general, me compliqué tanto con `generateGaps` (que no forma parte del reto) que el resto se me hizo bastante fácil.

----

> Puedes encontrar otros retos de Manz.dev en: <br>▶ https://lenguajejs.com/retos/
