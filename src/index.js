import shuffle from "./shuffle";
import throwConfetti from "./confetti";
import generateGame from "./game";
import winnerImg from "./assets/winner.gif";
import loserImg from "./assets/loser.png";

const playerDiv = document.querySelector("#player .numbers");
const computerDiv = document.querySelector("#computer .numbers");
const drumDiv = document.getElementById("drum");
const drumNumberDiv = drumDiv.querySelector("div");
const pickedNumbersDiv = document.getElementById("picked-numbers");
const pickedNumbers = []; // Aquí se irán guardando los números que se han seleccionado
let [drum, player, computer, playerNumbers, computerNumbers] = generateGame(89);
let playing = true;

paintCard(player, playerDiv);
paintCard(computer, computerDiv);

drumDiv.addEventListener("click", () => {
  if (playing) {
    const pickedNumber = pickNumber();
    drumNumberDiv.textContent = pickedNumber;
    drumNumberDiv.classList.add("playing");
    checkNumber(pickedNumber);
  } else {
    if (!drum.length) {
      alert("No quedan números en el bombo"); // Imposible
    }
    drumNumberDiv.classList.remove("playing");
    drumNumberDiv.textContent = "Fin del juego";
  }
});

// Pinta un cartón
function paintCard(card, div) {
  for (let i = 0; i < card.length; i++) {
    for (let j = 0; j < card[i].length; j++) {
      div.appendChild(cellElement(card[i][j]));
    }
  }
}

// Función estética. Gira el bombo para recolocar los números
function shuffleDrum() {
  drum = shuffle(drum);
}

// Saca un número del bombo
function pickNumber() {
  shuffleDrum();
  const pickedNumber = drum.shift();
  updatePickedNumbers(pickedNumber);
  return pickedNumber;
}

// Comprueba si el número está en el cartón
// TODO: refactorizar
function checkNumber(number) {
  document.querySelectorAll(`.number-${number}`).forEach((cell) => {
    cell.classList.add("picked");
  });
  if (playerNumbers.includes(number)) {
    playerNumbers = playerNumbers.filter(n => n !== number);
    if (playerNumbers.length === 0) {
      playing = false;
      winnerDialog(true);
    }
  }
  if (computerNumbers.includes(number)) {
    computerNumbers = computerNumbers.filter(n => n !== number);
    if (computerNumbers.length === 0) {
      playing = false;
      winnerDialog(false);
    }
  }
}

// Añade un número a la lista de números seleccionados
function updatePickedNumbers(pickedNumber) {
  pickedNumbers.push(pickedNumber);
  pickedNumbersDiv.appendChild(cellElement(pickedNumber));
}

// Crea un elemento cell
function cellElement(n) {
  const cell = document.createElement("div");
  if (n !== null) {
    cell.classList.add("cell", `number-${n}`);
    cell.textContent = n;
  } else {
    cell.classList.add("gap");
  }
  return cell;
}

// Muestra un modal de ganador
function winnerDialog(winner) {
  const el = document.createElement("div");
  el.id = "finnish";
  el.innerHTML = `
    <div class="dialog">
      <h2>${winner ? "Felicidades ¡Has ganado!" : "Ha, ¡Perdedor!"}</h2>
      <img class="${winner ? "winner" : "loser"}" src="${winner ? winnerImg : loserImg}" alt="${winner ? "Ganaste" : "Perdiste"}">
      <button>Jugar de nuevo</button>
    </div>
  `;
  el.querySelector("button").addEventListener("click", () => {
    location.reload();
  });
  document.body.appendChild(el);
  throwConfetti();
}
