const input = document.getElementById("nombrePersonaje");
const boton = document.getElementById("buscarBtn");
const resultado = document.getElementById("resultado");

// hago click en el boton para buscar
boton.addEventListener("click", () => {
  const nombre = input.value.trim();
  if (nombre) {
    obtenerPersonaje(nombre);
  } else {
    mostrarMensaje("Escribí el id de un personaje.");
  }
});

// me deja apretar enter para buscar
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") boton.click();
});


//asyn await para obtener datos de la pokeapi
async function obtenerPersonaje(nombre) {
  try {
    mostrarMensaje("🔎 Buscando Personaje...");

    const respuesta = await fetch(`https://rickandmortyapi.com/api/character/${nombre.toLowerCase()}`);
    if (!respuesta.ok) throw new Error("Personaje no encontrado");

    const data = await respuesta.json();

    // Construyo la card
    resultado.innerHTML = `
      <div class="personaje-card">
        <img src="${data.image}" alt="${data.name}">
        <h2>${data.name.toUpperCase()}</h2>
        <div class="personaje-stats">
          <p>Tipo: ${data.type || 'N/A'} </p>
          <p>Especie: ${data.species}</p>
          <p>Género: ${data.gender}</p>
          <p>Ubicación: ${data.location.name}</p>
        </div>
      </div>
    `;

  } catch (error) {
    mostrarMensaje(error.message);
  }
}

function mostrarMensaje(texto) {
  resultado.innerHTML = `<div class="placeholder">${texto}</div>`;
}
