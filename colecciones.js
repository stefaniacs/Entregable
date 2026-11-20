// ===== Página COLECCIONES: cada colección con sus looks y sus prendas =====
const contenedor = document.getElementById("lista-colecciones");

// Función tradicional: crea la tarjeta de UNA prenda
function crearPrenda(p) {
  return `
    <article class="prenda">
      <img src="${dibujarPrenda(p.tipo, p.color)}" alt="${p.nombre}">
      <h4>${p.nombre}</h4>
      <p class="etiqueta">Colección ${nombreColeccion(p.coleccion)}</p>
      <p class="precio">${formatearPrecio(p.precio)}</p>
      <button class="boton" data-id="${p.id}">Agregar</button>
    </article>`;
}

function mostrarColecciones() {
  contenedor.innerHTML = "";

  colecciones.forEach((col) => {
    // Ciclo for: una tarjeta por cada prenda de la colección
    const prendas = productos.filter((p) => p.coleccion === col.id);
    let tarjetas = "";
    for (let i = 0; i < prendas.length; i++) {
      tarjetas += crearPrenda(prendas[i]);
    }

    // Fotos de la colección (las imágenes se cargan desde el CSS)
    let fotos = "";
    col.looks.forEach((n) => {
      fotos += `<div class="look look-${n}" role="img" aria-label="Look ${n} de la colección ${col.nombre}"></div>`;
    });

    const bloque = document.createElement("article");
    bloque.className = "coleccion";
    bloque.id = col.id;
    bloque.innerHTML = `
      <div class="portada ${col.id}">
        <div class="portada-texto">
          <h2>${col.nombre}</h2>
          <p class="lema">${col.lema}</p>
        </div>
      </div>
      <p class="texto">${col.texto}</p>
      <h3 class="subtitulo">Looks</h3>
      <div class="looks">${fotos}</div>
      <h3 class="subtitulo">Prendas</h3>
      <div class="grid">${tarjetas}</div>
    `;
    contenedor.appendChild(bloque);
  });
}

// Evento click en "Agregar"
contenedor.addEventListener("click", (e) => {
  if (e.target.matches("button[data-id]")) {
    const id = Number(e.target.dataset.id);
    const prenda = productos.find((p) => p.id === id);
    agregarAlCarrito(id);
    avisar(`${prenda.nombre} agregado al carrito`);
  }
});

mostrarColecciones();
