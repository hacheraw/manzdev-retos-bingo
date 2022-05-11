import shuffle from "./shuffle";

// Genera un cartón de X filas, Y columnas y Z huecos por fila
function generateCard(rowsNumber = 3, columnsNumber = 9, gapsPerRow = 4) {
  const columns = [];
  for (let i = 0; i < columnsNumber; i++) {
    const column = [];
    while (column.length < rowsNumber) {
      const number = Math.floor(Math.random() * 10); // Un número aleatorio entre 0 y 9
      const prefixedNumber = Number(`${i}${number}`); // Le anteponemos el número de las decenas
      if (prefixedNumber > 0 && column.indexOf(prefixedNumber) === -1) { // Evitamos repetidos y el 0
        column.push(prefixedNumber); // Lo añadimos a la columna
      }
    }
    columns.push(column.sort());
  }

  const rows = [];
  for (let i = 0; i < rowsNumber; i++) {
    const row = [];
    for (let j = 0; j < columnsNumber; j++) {
      row.push(columns[j][i]);
    }
    rows.push(row);
  }

  return generateGaps(rows, rowsNumber, columnsNumber, gapsPerRow);
}

// Genera los huecos en un cartón
function generateGaps(rows, rowsNumber, columnsNumber, gapsPerRow) {
  let rowsWithGaps = []; // Aquí se guardarán los gaps de cada fila
  let positions = [...Array(columnsNumber).keys()]; // Del 0 al 8
  let gap = 0; // Posición del hueco
  for (let i = 0; i < rowsNumber; i++) {
    const rowGaps = [];
    if (i < rowsNumber - 1) { // Para las dos primera filas
      for (let j = 0; j < gapsPerRow; j++) {
        [gap, positions] = pickPosition(positions);
        rowGaps.push(gap);
      }
    } else {
      rowGaps.push(positions[0]);
      positions = [...Array(columnsNumber).keys()]; // Del 0 al 8
      for (let j = 0; j < gapsPerRow - 1; j++) {
        [gap, positions] = pickPosition(positions);
        rowGaps.push(gap);
      }
    }
    rowsWithGaps.push(rowGaps);
  }

  rowsWithGaps = shuffle(rowsWithGaps); // Para hacer un poco más aleatorio

  for (let i = 0; i < rowsNumber; i++) {
    for (let j = 0; j < gapsPerRow; j++) {
      rows[i][rowsWithGaps[i][j]] = null;
    }
  }

  return rows;
}

// Recibe un array con posiciones y devuelve una posición aleatoria y el array sin esa posición
function pickPosition(positions) {
  const index = Math.round(Math.random() * (positions.length - 1)); // Elije una posición entre las positions
  const position = positions[index]; // La guarda
  positions.splice(index, 1); // La elimina del array original
  return [position, positions]; // Devuelve la posición extraida y el array modificado
}

// Genera los cartones, los números de cada jugador y los núnmeros del bombo
function generateGame(qty) {
  const drum = [...Array(qty).keys()].map(i => i + 1); // Array con los números del bombo
  const player = generateCard();
  let computer = []; // Se genra más abajo
  const playerNumbers = [];
  const computerNumbers = [];

  let duplicated = true;
  while (duplicated) {
    computer = generateCard(); // Genera el cartón de la máquina
    player.map(row => row.filter(a => a).map(number => playerNumbers.push(number))); // Guarda todos los números del cartón del jugador
    computer.map(row => row.filter(a => a).map(number => computerNumbers.push(number))); // Guarda todos los números del cartón de la máquina

    playerNumbers.sort((a, b) => a - b); // Ordena los números del jugador
    computerNumbers.sort((a, b) => a - b); // Ordena los números de la máquina
    duplicated = JSON.stringify(playerNumbers) === JSON.stringify(computerNumbers); // Comprueba que no sea igual que player
  }

  return [drum, player, computer, playerNumbers, computerNumbers];
}

export default generateGame;
