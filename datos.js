// ===== SAINT SINNER · datos y funciones compartidas (todas las páginas) =====

// ---------- Variables y constantes ----------
const ORO = "#C9A227";
const CLAVE_CARRITO = "saintsinner-carrito";

// ---------- Objetos y arreglos ----------
// "looks" son los números de las fotos: img/look-1.png ... img/look-5.png
const colecciones = [
  { id: "cielo",      nombre: "Cielo",      lema: "Sastrería de luz",  looks: [5],    texto: "Blazers, camisas y pantalones de corte limpio para las noches que piden presencia." },
  { id: "infierno",   nombre: "Infierno",   lema: "Calle sin permiso", looks: [3, 4], texto: "Hoodies, cargos y bombers oversize para caminar la ciudad después de medianoche." },
  { id: "medianoche", nombre: "Medianoche", lema: "El punto medio",    looks: [1, 2], texto: "Piezas que sirven igual para una cena elegante que para una fiesta." }
];

const productos = [
  { id: 1, nombre: "Blazer Cardenal",       coleccion: "cielo",      tipo: "blazer",   color: "#5E0B1E", precio: 389000 },
  { id: 2, nombre: "Camisa Marfil",         coleccion: "cielo",      tipo: "camisa",   color: "#F5F1EA", precio: 219000 },
  { id: 3, nombre: "Pantalón Noir",         coleccion: "cielo",      tipo: "pantalon", color: "#262626", precio: 259000 },
  { id: 4, nombre: "Hoodie Oversize",       coleccion: "infierno",   tipo: "hoodie",   color: "#3A3A3A", precio: 199000 },
  { id: 5, nombre: "Cargo Dorado",          coleccion: "infierno",   tipo: "cargo",    color: "#2B2B2B", precio: 229000 },
  { id: 6, nombre: "Bomber Vino",           coleccion: "infierno",   tipo: "bomber",   color: "#7A1230", precio: 329000 },
  { id: 7, nombre: "Abrigo Largo Negro",    coleccion: "medianoche", tipo: "abrigo",   color: "#262626", precio: 459000 },
  { id: 8, nombre: "Camisa Satín Vino",     coleccion: "medianoche", tipo: "camisa",   color: "#5E0B1E", precio: 249000 },
  { id: 9, nombre: "Pantalón Ancho Crema",  coleccion: "medianoche", tipo: "pantalon", color: "#E8DFC8", precio: 269000 }
];

// ---------- Dibujo de las prendas (ilustraciones SVG) ----------
const formas = {
  camisa: (c) => `<path d="M62 52 L88 40 L100 62 L112 40 L138 52 L170 92 L148 108 L140 96 L140 196 L60 196 L60 96 L52 108 L30 92 Z" fill="${c}"/>
    <path stroke-opacity=".6" d="M100 62 V196 M88 40 L100 62 L112 40"/>
    <circle cx="100" cy="95" r="2"/><circle cx="100" cy="125" r="2"/><circle cx="100" cy="155" r="2"/>`,
  blazer: (c) => `<path d="M60 46 L90 36 L100 70 L110 36 L140 46 L174 98 L150 114 L142 102 L142 204 L58 204 L58 102 L50 114 L26 98 Z" fill="${c}"/>
    <path stroke-opacity=".6" d="M90 36 L100 128 L110 36 M100 128 V204 M70 160 H86"/>
    <circle cx="104" cy="150" r="2.5"/><circle cx="104" cy="172" r="2.5"/>`,
  abrigo: (c) => `<path d="M58 46 L90 34 L100 66 L110 34 L142 46 L176 100 L152 118 L144 106 L144 226 L56 226 L56 106 L48 118 L24 100 Z" fill="${c}"/>
    <path stroke-opacity=".6" d="M90 34 L100 130 L110 34 M100 130 V226 M56 150 H144"/>
    <circle cx="104" cy="170" r="2.5"/><circle cx="104" cy="194" r="2.5"/>`,
  hoodie: (c) => `<path d="M60 70 L84 56 L116 56 L140 70 L172 108 L150 124 L140 112 L140 196 L60 196 L60 112 L50 124 L28 108 Z" fill="${c}"/>
    <path d="M76 60 Q100 20 124 60 Q100 82 76 60 Z" fill="${c}"/>
    <path stroke-opacity=".6" d="M94 76 V102 M106 76 V102 M76 152 H124 L130 182 H70 Z"/>`,
  bomber: (c) => `<path d="M60 56 L86 46 L114 46 L140 56 L174 96 L152 112 L142 100 L142 180 L58 180 L58 100 L48 112 L26 96 Z" fill="${c}"/>
    <path stroke-opacity=".6" d="M86 46 Q100 64 114 46 M100 56 V180 M58 164 H142"/>`,
  pantalon: (c) => `<path d="M64 42 H136 L146 212 H108 L100 98 L92 212 H54 Z" fill="${c}"/>
    <path stroke-opacity=".6" d="M64 58 H136 M100 58 V98 M72 62 L80 84"/>`,
  cargo: (c) => `<path d="M64 42 H136 L146 212 H108 L100 98 L92 212 H54 Z" fill="${c}"/>
    <path stroke-opacity=".6" d="M64 58 H136 M100 58 V98 M62 130 H86 V158 H60 Z M114 130 H138 V158 H116 Z"/>`
};

// Función flecha: devuelve la imagen de la prenda lista para usar en <img>
const dibujarPrenda = (tipo, color) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240">
    <rect width="200" height="240" fill="#141414"/>
    <g stroke="${ORO}" stroke-width="2" stroke-linejoin="round" fill="none">${formas[tipo](color)}</g>
    <text x="100" y="234" text-anchor="middle" font-family="Georgia, serif" font-size="9" letter-spacing="4" fill="${ORO}">SAINT SINNER</text>
  </svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
};

// Función flecha: formato de precio en pesos
const formatearPrecio = (valor) => "$" + valor.toLocaleString("es-CO");

// Función tradicional: nombre de una colección a partir de su id
function nombreColeccion(id) {
  return colecciones.find((c) => c.id === id).nombre;
}

// ---------- Carrito (se guarda en el navegador para compartirlo entre páginas) ----------
function leerCarrito() {
  try {
    const guardado = localStorage.getItem(CLAVE_CARRITO);
    return guardado ? JSON.parse(guardado) : [];
  } catch (error) {
    return [];
  }
}

function guardarCarrito(ids) {
  try {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(ids));
  } catch (error) {
    // si el navegador no permite guardar, el carrito solo funciona en esta página
  }
  actualizarContador();
}

function agregarAlCarrito(id) {
  const ids = leerCarrito();
  ids.push(id);
  guardarCarrito(ids);
}

function actualizarContador() {
  const contador = document.getElementById("contador");
  if (contador) {
    contador.textContent = leerCarrito().length;
  }
}

// Aviso temporal (se crea solo la primera vez)
function avisar(texto) {
  let aviso = document.getElementById("aviso");
  if (!aviso) {
    aviso = document.createElement("p");
    aviso.id = "aviso";
    aviso.className = "aviso";
    aviso.setAttribute("role", "status");
    document.body.appendChild(aviso);
  }
  aviso.textContent = texto;
  aviso.classList.add("visible");
  setTimeout(() => aviso.classList.remove("visible"), 1800);
}

// ---------- Eventos comunes: menú móvil, año y contador ----------
document.getElementById("btn-menu").addEventListener("click", () => {
  document.getElementById("lista-menu").classList.toggle("abierto");
});
document.getElementById("anio").textContent = new Date().getFullYear();
actualizarContador();
