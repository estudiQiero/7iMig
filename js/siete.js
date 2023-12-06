// Menu hamburguesa
function toggleMenu() {
  const barras = document.querySelectorAll('.barra');
  
  // Alternar clases para animar las barras al hacer clic
  barras[0].classList.toggle('cerrar1');
  barras[1].classList.toggle('cerrar2');
  barras[2].classList.toggle('cerrar3');
}

// mostrar/ocultar columna Menu
function toggleMenu() {
  const barras = document.querySelectorAll('.barra');
  const menuDesplegable = document.querySelector('.menu-desplegable');
  const overlay = document.querySelector('.overlay');

  barras[0].classList.toggle('cerrar1');
  barras[1].classList.toggle('cerrar2');
  barras[2].classList.toggle('cerrar3');
  menuDesplegable.classList.toggle('mostrar');
  overlay.style.display = 'block';
}

function cerrarMenu() {
  const barras = document.querySelectorAll('.barra');
  const menuDesplegable = document.querySelector('.menu-desplegable');
  const overlay = document.querySelector('.overlay');

  barras[0].classList.remove('cerrar1');
  barras[1].classList.remove('cerrar2');
  barras[2].classList.remove('cerrar3');
  menuDesplegable.classList.remove('mostrar');
  overlay.style.display = 'none';
}


// Definición de las cartas y las manos
let cartas = [
  { nombre: "1", valor: 1, imagen: "imgs/1.svg" },
  { nombre: "2", valor: 2, imagen: "imgs/2.svg" },
  { nombre: "3", valor: 3, imagen: "imgs/3.svg" },
  { nombre: "4", valor: 4, imagen: "imgs/4.svg" },
  { nombre: "5", valor: 5, imagen: "imgs/5.svg" },
  { nombre: "6", valor: 6, imagen: "imgs/6.svg" },
  { nombre: "7", valor: 7, imagen: "imgs/7.svg" }, // Cambiado de 7.5 a 7
  { nombre: "sota", valor: 0.5, imagen: "imgs/8.svg" }, // Cambiado de 10 a sota
  { nombre: "caballo", valor: 0.5, imagen: "imgs/9.svg" }, // Cambiado de 11 a caballo
  { nombre: "rey", valor: 0.5, imagen: "imgs/10.svg" }, // Cambiado de 12 a rey
];

let jugadorCartas = []; // Mano del jugador
let computadoraCartas = []; // Mano de la computadora

// Marcador de partidas ganadas
let jugadorGanadas = 0;
let computadoraGanadas = 0;

// Función para iniciar una nueva partida
function nuevaPartida() {
  jugadorCartas = [];
  computadoraCartas = [];
  repartirCarta(jugadorCartas);
  repartirCarta(computadoraCartas);
  actualizarPantalla();

  // Habilitar los botones "Pedir Carta" y "Plantarse"
  document.querySelector('button[onclick="pedirCarta()"]').disabled = false;
  document.querySelector('button[onclick="plantarse()"]').disabled = false;
}

// Función para repartir una carta a una mano
function repartirCarta(mano) {
  const carta = cartas[Math.floor(Math.random() * cartas.length)];
  mano.push(carta);
  // Mostrar la carta repartida en la mano del jugador
  actualizarPantalla();
}

// Función para calcular la puntuación de una mano
function calcularPuntuacion(mano) {
  return mano.reduce((total, carta) => total + carta.valor, 0);
}

// Función para pedir una carta
function pedirCarta() {
  repartirCarta(jugadorCartas);
  actualizarPantalla();

  // Verificar si el jugador ha superado los 7.5 puntos
  if (calcularPuntuacion(jugadorCartas) > 7.5) {
    finalizarPartida();
  }
}

// Función para que el jugador se plante
function plantarse() {
  // La computadora pide cartas automáticamente hasta alcanzar o superar la puntuación del jugador
  while (
    calcularPuntuacion(computadoraCartas) < calcularPuntuacion(jugadorCartas) &&
    calcularPuntuacion(computadoraCartas) < 7.5
  ) {
    repartirCarta(computadoraCartas);
  }
  finalizarPartida();
}

// Función para finalizar la partida y determinar el resultado
function finalizarPartida() {
  actualizarPantalla();
  mostrarResultado();
  actualizarMarcador();
  // Deshabilitar los botones "Pedir Carta" y "Plantarse"
  document.querySelector('button[onclick="pedirCarta()"]').disabled = true;
  document.querySelector('button[onclick="plantarse()"]').disabled = true;
}

// Función para mostrar el resultado de la partida
function mostrarResultado() {
  const jugadorPuntuacion = calcularPuntuacion(jugadorCartas);
  const computadoraPuntuacion = calcularPuntuacion(computadoraCartas);

  let resultado = "";
  // Determinar el ganador o empate
  if (
    jugadorPuntuacion > 7.5 ||
    (computadoraPuntuacion <= 7.5 && computadoraPuntuacion > jugadorPuntuacion)
  ) {
    resultado = "¡Gana la Computadora!";
    computadoraGanadas++;
  } else if (jugadorPuntuacion === computadoraPuntuacion) {
    resultado = "¡Empate!";
  } else {
    resultado = "¡Ganas tú!";
    jugadorGanadas++;
  }

  document.getElementById("resultado").innerText = resultado;
}

// Función para actualizar la pantalla con la información actualizada de las manos y el marcador
function actualizarPantalla() {
  // Actualizar la información del jugador
  const jugadorCartasHTML = jugadorCartas
    .map((carta) => {
      return carta.oculta
        ? `<img src="imgs/dorso_1.svg" alt="Carta Oculta" class="carta-oculta">`
        : `<img src="${carta.imagen}" alt="${carta.nombre}">`;
    })
    .join("");
  document.getElementById("jugadorCartas").innerHTML = jugadorCartasHTML;
  document.getElementById(
    "jugadorPuntuacion"
  ).innerText = `Puntuación: ${calcularPuntuacion(jugadorCartas)}`;

  // Mostrar la carta simulada de la computadora
  if (computadoraCartas.length > 0) {
    const cartaSimuladaComputadoraHTML =
      '<img src="imgs/dorso_1.svg" alt="Carta Oculta" class="carta-oculta" id="cartaSimuladaComputadora">';
    document.getElementById("computadoraCartas").innerHTML =
      cartaSimuladaComputadoraHTML;
  }

  // Actualizar la información de la computadora
  const computadoraCartasHTML = computadoraCartas
    .map((carta, index) => {
      return `<img src="${
        index === 0 && carta.oculta ? "imgs/dorso_1.svg" : carta.imagen
      }" alt="${carta.nombre}" class="${
        index === 0 && carta.oculta ? "carta-oculta" : ""
      }">`;
    })
    .join("");
  document.getElementById("computadoraCartas").innerHTML =
    computadoraCartasHTML;
  document.getElementById("computadoraPuntuacion").innerText =
    computadoraCartas.some((carta) => carta.oculta)
      ? "Puntuación: ??"
      : `Puntuación: ${calcularPuntuacion(computadoraCartas)}`;

  // Ocultar el resultado durante el juego
  document.getElementById("resultado").innerText = "";

  // Actualizar el marcador solo al final de la partida
  if (document.querySelector('button[onclick="pedirCarta()"]').disabled) {
    document.getElementById(
      "jugadorMarcador"
    ).innerText = `Tú: ${jugadorGanadas}`;
    document.getElementById(
      "computadoraMarcador"
    ).innerText = `Ordenador: ${computadoraGanadas}`;
  } else {
    // Ocultar el marcador si la partida no ha terminado
    document.getElementById(
      "jugadorMarcador"
    ).innerText = `Tú: ${jugadorGanadas}`;
    document.getElementById("computadoraMarcador").innerText = `Ordenador: ??`;
  }
}

// Función para actualizar el marcador
function actualizarMarcador() {
  // Actualizar el marcador
  document.getElementById(
    "jugadorMarcador"
  ).innerText = `Tú: ${jugadorGanadas}`;
  document.getElementById(
    "computadoraMarcador"
  ).innerText = `Ordenador: ${computadoraGanadas}`;
}

// Función para resetear el marcador
function resetearMarcador() {
  jugadorGanadas = 0;
  computadoraGanadas = 0;
  actualizarMarcador();
}
