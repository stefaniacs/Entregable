// ===== Página CONTACTO: formulario con validación =====
document.getElementById("form-contacto").addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const interes = document.getElementById("interes").value;
  const mensaje = document.getElementById("mensaje").value.trim();
  const msg = document.getElementById("msg-form");

  if (nombre.length < 3) {
    msg.textContent = "El nombre debe tener al menos 3 letras.";
    msg.className = "mensaje error";
  } else if (!correo.includes("@") || !correo.includes(".")) {
    msg.textContent = "Escribe un correo válido.";
    msg.className = "mensaje error";
  } else if (interes === "") {
    msg.textContent = "Selecciona la colección que te interesa.";
    msg.className = "mensaje error";
  } else if (mensaje.length < 10) {
    msg.textContent = "El mensaje debe tener al menos 10 caracteres.";
    msg.className = "mensaje error";
  } else {
    msg.textContent = `Gracias, ${nombre}. Te escribiremos pronto.`;
    msg.className = "mensaje ok";
    e.target.reset();
  }
});
