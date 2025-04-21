// Objeto para manejar el carrito
const carrito = {
  items: JSON.parse(localStorage.getItem("carrito")) || [],

  // Añadir producto al carrito (desde productos.html)
  agregarProducto: function (nombre, precio) {
    const productoExistente = this.items.find((item) => item.nombre === nombre);

    if (productoExistente) {
      productoExistente.cantidad += 1;
    } else {
      this.items.push({ nombre, precio, cantidad: 1 });
    }

    this.guardar();
    this.actualizarContador();
  },

  // Eliminar producto del carrito
  eliminarProducto: function (nombre) {
    this.items = this.items.filter((item) => item.nombre !== nombre);
    this.guardar();
    this.actualizarUI();
  },

  // Actualizar cantidad de un producto
  actualizarCantidad: function (nombre, nuevaCantidad) {
    const producto = this.items.find((item) => item.nombre === nombre);
    if (producto) {
      producto.cantidad = Math.max(1, nuevaCantidad); // Mínimo 1
      this.guardar();
      this.actualizarUI();
    }
  },

  // Vaciar todo el carrito
  vaciar: function () {
    this.items = [];
    this.guardar();
    this.actualizarUI();
  },

  // Guardar en localStorage
  guardar: function () {
    localStorage.setItem("carrito", JSON.stringify(this.items));
  },

  // Actualizar el contador del ícono del carrito
  actualizarContador: function () {
    const totalItems = this.items.reduce(
      (total, item) => total + item.cantidad,
      0
    );
    document.querySelectorAll("#contador-carrito").forEach((el) => {
      el.textContent = totalItems;
    });
  },

  // Renderizar la tabla del carrito
  actualizarUI: function () {
    const cuerpoCarrito = document.getElementById("cuerpo-carrito");
    if (!cuerpoCarrito) return; // Si no estamos en la página del carrito

    cuerpoCarrito.innerHTML = "";
    let total = 0;

    this.items.forEach((item) => {
      const subtotal =
        parseFloat(item.precio.replace(/[^0-9.]/g, "")) * item.cantidad;
      total += subtotal;

      cuerpoCarrito.innerHTML += `
          <tr>
            <td>${item.nombre}</td>
            <td>${item.precio}</td>
            <td>
              <input type="number" class="cantidad" 
                     value="${item.cantidad}" min="1"
                     onchange="carrito.actualizarCantidad('${
                       item.nombre
                     }', this.value)">
            </td>
            <td>$${subtotal.toFixed(2)}</td>
            <td>
              <button onclick="carrito.eliminarProducto('${
                item.nombre
              }')" class="btn-eliminar">🗑️</button>
            </td>
          </tr>
        `;
    });

    document.getElementById("total-pagar").textContent = `$${total.toFixed(2)}`;
    this.actualizarContador();
  },
};

// Inicializar el carrito al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  carrito.actualizarUI();

  // Evento para vaciar el carrito
  document.getElementById("vaciar-carrito")?.addEventListener("click", () => {
    if (confirm("¿Seguro que quieres vaciar el carrito?")) {
      carrito.vaciar();
    }
  });
});

// Desde productos.html: Ejemplo de cómo añadir productos
document.querySelectorAll(".btn-agregar")?.forEach((button) => {
  button.addEventListener("click", () => {
    const producto = button.closest(".producto");
    const nombre = producto.querySelector("h3").textContent;
    const precio = producto.querySelector("p").textContent;

    carrito.agregarProducto(nombre, precio);
    alert(`${nombre} añadido al carrito`);
  });
});
