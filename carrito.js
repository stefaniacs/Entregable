// ===== Página CARRITO =====
const listaCarrito = document.getElementById("lista-carrito");
const msgVacio = document.getElementById("msg-vacio");
const totalEl = document.getElementById("total");
const msgCupon = document.getElementById("msg-cupon");
let descuento = 0; // valor entre 0 y 1

function mostrarCarrito() {
  const ids = leerCarrito();
  const items = ids.map((id) => productos.find((p) => p.id === id));
  listaCarrito.innerHTML = "";

  items.forEach((item, indice) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <img src="${dibujarPrenda(item.tipo, item.color)}" alt="${item.nombre}">
      <span class="dato">${item.nombre}<br>${formatearPrecio(item.precio)}</span>`;
    const quitar = document.createElement("button");
    quitar.className = "btn-quitar";
    quitar.textContent = "Quitar";
    quitar.addEventListener("click", () => {
      ids.splice(indice, 1);
      guardarCarrito(ids);
      mostrarCarrito();
    });
    li.appendChild(quitar);
    listaCarrito.appendChild(li);
  });

  msgVacio.style.display = items.length === 0 ? "block" : "none";
  const subtotal = items.reduce((suma, item) => suma + item.precio, 0);
  totalEl.textContent = formatearPrecio(subtotal * (1 - descuento));
}

// Condicionales: código de descuento
document.getElementById("btn-cupon").addEventListener("click", () => {
  const codigo = document.getElementById("codigo").value.trim().toUpperCase();

  if (codigo === "SAINT10") {
    descuento = 0.10;
    msgCupon.textContent = "Código aplicado: 10% de descuento.";
    msgCupon.className = "mensaje ok";
  } else if (codigo === "SINNER20") {
    descuento = 0.20;
    msgCupon.textContent = "Código aplicado: 20% de descuento.";
    msgCupon.className = "mensaje ok";
  } else if (codigo === "") {
    descuento = 0;
    msgCupon.textContent = "Escribe un código primero.";
    msgCupon.className = "mensaje error";
  } else {
    descuento = 0;
    msgCupon.textContent = "Código no válido.";
    msgCupon.className = "mensaje error";
  }
  mostrarCarrito();
});

// Vaciar carrito
document.getElementById("btn-vaciar").addEventListener("click", () => {
  guardarCarrito([]);
  descuento = 0;
  msgCupon.textContent = "";
  mostrarCarrito();
});

mostrarCarrito();
