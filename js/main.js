//---------------------Array de productos-----------------------------------//

let stock = [
  { id: 1, nombre: "Johnnie Walker Red Label", tamaño: "750cc", nombreCorto: "Whisky", img: "images/Whisky Johnnie Walker Red Label.jpg", unidades: false, cantidad: 1, precio: 3990 },
  { id: 2, nombre: "Bacardí Carta Oro 40°", tamaño: "980cc", nombreCorto: "Ron", img: "images/Bacardí Carta Oro 40° 980cc.jpg", unidades: true, cantidad: 1, precio: 1860 },
  { id: 3, nombre: "Vodka Absolut Clasic", tamaño: "700cc", nombreCorto: "Vodka", img: "images/Absolut Clasic 700cc.jpg", unidades: true, cantidad: 1, precio: 3200 },
  { id: 4, nombre: "Baileys The Original Irish Cream", tamaño: "750cc", nombreCorto: "Licor", img: "images/Baileys The Original Irish Cream 750cc.jpg", unidades: true, cantidad: 1, precio: 3230 },
  { id: 5, nombre: "Luigi Bosca Malbec", tamaño: "750cc", nombreCorto: "Vino", img: "images/Vino Luigi Bosca Malbec 750cc.jpg", unidades: true, cantidad: 1, precio: 1700 },
  { id: 6, nombre: "Brut Rose Louis Roederer", tamaño: "750cc", nombreCorto: "Champagne", img: "images/Champagne Brut Rose Louis Roederer 750cc.jpg", unidades: false, cantidad: 1, precio: 38000 },
  { id: 7, nombre: "Nero 53 Maracuya Premium", tamaño: "750cc", nombreCorto: "Fernet", img: "images/Fernet Nero 53 Maracuya.jpg", unidades: true, cantidad: 1, precio: 2850 },
  { id: 8, nombre: "Brokers London", tamaño: "750cc", nombreCorto: "Gin", img: "images/Gin Brokers London.jpg", unidades: true, cantidad: 1, precio: 7860 },
  { id: 9, nombre: "MAAD Ginegra Premium", tamaño: "700cc", nombreCorto: "Ginebra", img: "images/Maad ginebra.jpg", unidades: true, cantidad: 1, precio: 5690 },
  { id: 10, nombre: "Aconcagua Handcrafted Gin", tamaño: "750cc", nombreCorto: "Gin", img: "images/Gin Aconcagua.jpg", unidades: true, cantidad: 1, precio: 4800 },
  { id: 11, nombre: "Baudron Premium Malbec", tamaño: "750cc", nombreCorto: "Vino", img: "images/Baudron Premium.jpg", unidades: false, cantidad: 1, precio: 10200 },
  { id: 12, nombre: "Zyr Rusian Imported", tamaño: "750cc", nombreCorto: "Vodka", img: "images/Vodka Zyr Rusian.jpg", unidades: true, cantidad: 1, precio: 26950 },
];

const contenedorProductos = document.querySelector("#productos");
const contadorCarrito = document.getElementById("contadorCarrito");
const contenedorCarrito = document.getElementById("contenedorCarrito");
const total = document.getElementById("total");

let carrito = [];

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    actualizarCarrito();
  }
});

stock.forEach((producto) => {
  const div = document.createElement("div");
  div.classList.add("col-lg-4");
  div.classList.add("col-md-6");
  div.classList.add("col-sm-12");
  div.classList.add("d-flex");
  div.classList.add("justify-content-start");
  div.classList.add("my-5");

  div.innerHTML = `
    <img src="${producto.img}" alt="bebida" width="150" height="200" class="border border-dark border-2"/>
    <div>
      <h3 class="fs-5 px-4 pb-1">${producto.nombreCorto}</h3>
      <p class="px-4">${producto.nombre}</p>
      <p class="px-4">Precio: $${producto.precio}</p>
      
      <button class="btn btn-outline-dark ms-4 btn-sm" type="button" id="agregar${producto.id}"><i class="bi bi-cart-plus-fill"></i> Agregar al carrito</button>
    </div>
    `;

  contenedorProductos.appendChild(div);

  if (producto.unidades === false) {
    div.innerHTML = `
    <img src="${producto.img}" alt="bebida" width="150" height="200" class="border border-dark border-2"/>
    <div>
      <h3 class="fs-5 px-4 pb-1">${producto.nombreCorto}</h3>
      <p class="px-4">${producto.nombre}</p>
      <p class="px-4">Precio: $${producto.precio}</p>
      <button type="button" class="btn btn-outline-danger ms-4 btn-sm" disabled>SIN STOCK</button>
     
    </div>
    `;
  } else {
    const boton = document.getElementById(`agregar${producto.id}`);

    boton.addEventListener("click", () => {
      agregarCarrito(producto.id);
    });
  }
});

//-----------------------Eventos carrito-----------------------//

const agregarCarrito = (prodId) => {
  const existe = carrito.some((prod) => prod.id === prodId);
  if (existe) {
    const prod = carrito.map((prod) => {
      if (prod.id === prodId) {
        prod.cantidad++;
      }
    });
  } else {
    const item = stock.find((prod) => prod.id === prodId);
    carrito.push(item);
  }

  actualizarCarrito();
};

const actualizarCarrito = () => {
  contenedorCarrito.innerHTML = "";
  carrito.forEach((prod) => {
    const div = document.createElement("div");
    div.classList.add("border-bottom");
    div.classList.add("border-secondary");
    div.classList.add("d-flex");
    div.innerHTML = `
  <p class="w-100 mt-2"><img src="${prod.img}" alt="bebida" width="35" height="45" class="border border-dark border-2"/> ${prod.nombre} <p id="cantidad">Cantidad: ${prod.cantidad} <button class="btn btn-outline-dark btn-sm rounded-pill" onclick="aumentarCantidad(${prod.id})">+</button> <button class="btn btn-outline-dark btn-sm rounded-pill" onclick="disminuirCantidad(${prod.id})">-</button></p> </p>
  <p>Precio $${prod.precio}</p>
  <a class="link-warning" onclick="eliminarDelCarrito(${prod.id})">Eliminar</a>
  `;
    contenedorCarrito.appendChild(div);
    contadorCarrito.classList.remove("visually-hidden");
  });

  contadorCarrito.innerText = carrito.reduce((a, prod) => a + prod.cantidad, 0);
  total.innerText = carrito.reduce((a, prod) => a + prod.precio * prod.cantidad, 0);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  if (carrito.length === 0) {
    contadorCarrito.classList.add("visually-hidden");
    contenedorCarrito.innerHTML = "SU CARRITO ESTÁ VACÍO";
  }
};

function disminuirCantidad(prodId) {
  if (carrito[carrito.findIndex((el) => el.id == prodId)].cantidad > 1) {
    carrito[carrito.findIndex((el) => el.id == prodId)].cantidad -= 1;
  } else {
    eliminarDelCarrito(prodId);
  }
  actualizarCarrito();
}

const aumentarCantidad = (prodId) => {
  carrito[carrito.findIndex((el) => el.id == prodId)].cantidad += 1;
  actualizarCarrito();
};

const eliminarDelCarrito = (prodId) => {
  const item = carrito.find((prod) => prod.id === prodId);
  const indice = carrito.indexOf(item);
  carrito.splice(indice, 1);
  actualizarCarrito();
};

const botonVaciarCarrito = document.getElementById("vaciarCarrito");

botonVaciarCarrito.addEventListener("click", () => {
  carrito.length = 0;
  actualizarCarrito();
});

//-----------------------APP de typewriter-----------------------//

let app = document.getElementById("typewriter");

let typewriter = new Typewriter(app, {
  loop: true,
  delay: 62,
});

typewriter.pauseFor(2500).typeString("El corazón del páis").pauseFor(200).deleteChars(10).start();

let app2 = document.getElementById("typewriter2");

let typewriter2 = new Typewriter(app2, {
  loop: true,
  delay: 62,
});

typewriter2.pauseFor(2000).typeString("para personas únicas").pauseFor(150).deleteChars(15).start();

//--------------------------------Subcripción------------------------------//

const subcribirse = document.getElementById("suscribirse");
subcribirse.addEventListener("submit", enviarSuscripcion);

function enviarSuscripcion(sub) {
  sub.preventDefault();
  const correo = document.querySelector("#correo").value;
  console.log(correo);
  if (correo.length === 0) {
    Swal.fire({
      position: "center",
      title: "No se pudo completar",
      color: "#000000",
      confirmButtonText: "Entendido!",
      confirmButtonColor: "#000000",
      text: "Debe introducir su correo electrónico!",
      background: "#FEC260",
      width: 450,
      padding: "0",
      animation: false,
    });
  } else {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      color: "#FEC260",
      background: "#000000",
      timer: 3500,
      timerProgressBar: true,
    });
    Toast.fire({
      icon: "success",
      title: "Se subcribió con éxito",
    });
  }
}

//--------------------------------Finalizar Proceso Compra------------------------------//

const finalizar = document.getElementById("finalizar");
finalizar.addEventListener("click", finalizarCompra);

function finalizarCompra(fin) {
  fin.preventDefault();
  Swal.fire({
    position: "center",
    title: "Gracias por su compra!",
    color: "#000000",
    showConfirmButton: true,
    confirmButtonText: "Volver al inicio",
    confirmButtonColor: "#000000",
    willClose: "index.html",
    background: "#FEC260",
    width: 450,
    padding: "1",
    allowOutsideClick: false,
  }).then((result) => {
    if (result.value) {
      window.location.replace("index.html");
      carrito.length = 0;
      actualizarCarrito();
    }
  });
}
