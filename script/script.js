console.log("¡El JS está conectado!");

const conciertos = [
  {
    id: "bandaloschinos",
    nombre: "BANDALOS CHINOS",
    fecha: "2025-08-22T21:00:00",
    imagen: "BACH.jpg"
  },
  {
    id: "nd",
    nombre: "NECK DEEP",
    fecha: "2025-08-26T20:30:00",
    imagen: "nd.jpg"
  },
  {
    id: "gd",
    nombre: "GREEN DAY",
    fecha: "2025-09-03T22:00:00",
    imagen: "https://livepass-com-ar-uploads.ticketplus.global/images/thumbs/43d8167d49f12b3f0646-1080x1080_Greenday25_RRSS.png"
  },
  {
    id: "mcr",
    nombre: "MY CHEMICAL ROMANCE",
    fecha: "2026-02-01T22:00:00",
    imagen: "https://livepass-com-ar-uploads.ticketplus.global/images/thumbs/e80e87387c60924a3a28-1080x1080_MCM_RRSS_SIN_YPF.png"
  }
];

const selector = document.getElementById("selector");
const info = document.getElementById("info-concierto");
const nombre = document.getElementById("nombre");
const fechaTexto = document.getElementById("fecha");
const imagen = document.getElementById("imagen");
const contador = document.getElementById("contador");

let intervalo;

// Llenar el selector con las opciones de conciertos
conciertos.forEach(c => {
  const option = document.createElement("option");
  option.value = c.id;
  option.textContent = c.nombre;
  selector.appendChild(option);
});

// Evento cuando cambia el select
selector.addEventListener("change", () => {
  const id = selector.value;
  const concierto = conciertos.find(c => c.id === id);

  // Quitar estilos anteriores (clases que comienzan con "estilo-") y fondo-inicio
  document.body.className = document.body.className
    .split(" ")
    .filter(c => !c.startsWith("estilo-") && c !== "fondo-inicio")
    .join(" ");

  if (concierto) {
    const clase = "estilo-" + concierto.id;
    console.log("Clase aplicada:", clase);
    document.body.classList.add(clase);
    mostrarConcierto(concierto);
  } else {
    // Si no se seleccionó nada, volvemos al fondo inicial
    document.body.classList.add("fondo-inicio");
    info.style.display = "none";
    clearInterval(intervalo);
  }
});

function formatearFecha(fechaISO) {
  const fecha = new Date(fechaISO);
  const opciones = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  };
  return fecha.toLocaleDateString("es-ES", opciones);
}

function formatearHora(fechaISO) {
  const fecha = new Date(fechaISO);
  return fecha.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit"
  });
}

function mostrarConcierto(concierto) {
  nombre.textContent = concierto.nombre;
  imagen.src = concierto.imagen;
  imagen.alt = concierto.nombre;
  fechaTexto.innerHTML = `
    📅 <strong>${formatearFecha(concierto.fecha)}</strong><br>
    🕘 <strong>Hora: ${formatearHora(concierto.fecha)}</strong>
  `;

  clearInterval(intervalo);
  actualizarContador(concierto.fecha);
  intervalo = setInterval(() => actualizarContador(concierto.fecha), 1000);

  info.style.display = "block";
}

function actualizarContador(fechaConcierto) {
  const ahora = new Date();
  const evento = new Date(fechaConcierto);
  const tiempoRestante = evento - ahora;

  if (tiempoRestante <= 0) {
    contador.innerHTML = `<div class="contador-titulo">🎉 ¡Ya comenzó el concierto!</div>`;
    clearInterval(intervalo);
    return;
  }

  const dias = Math.floor(tiempoRestante / (1000 * 60 * 60 * 24));
  const horas = Math.floor((tiempoRestante / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((tiempoRestante / (1000 * 60)) % 60);
  const segundos = Math.floor((tiempoRestante / 1000) % 60);

  contador.innerHTML = `
    <div class="contador-titulo">⏳ Faltan</div>
    <div class="contador-unidades">
      <span><strong>${dias}</strong> días</span>,
      <span><strong>${horas}</strong> horas</span>,
      <span><strong>${minutos}</strong> minutos</span> y
      <span><strong>${segundos}</strong> segundos</span>
    </div>
  `;
}
