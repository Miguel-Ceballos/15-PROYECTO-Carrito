const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const btnvaciarCarrito = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

cargaEventListeners();
function cargaEventListeners() {
  //Cuando agregaas un curso presionando "Agrear carrito"
  listaCursos.addEventListener("click", agregarCurso);

  //Elimina cursos del carrito
  carrito.addEventListener("click", eliminaCurso);

  //Vaciar carrito
  btnvaciarCarrito.addEventListener("click", () => {
    articulosCarrito = [];
    limpiarHTML();
  });
}

function agregarCurso(e) {
  e.preventDefault();

  if (e.target.classList.contains("agregar-carrito")) {
    //Usamos parentElement para salir a los elementos padres
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
  }
}

//Lee el contenido del Elemento HTML al que le dimos click y extrae informacion del curso
function leerDatosCurso(curso) {
  //Crear un objeto con el contenido del curso
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector("span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };
  //Revisa si un elemento ya existe en el carrito
  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);
  if (existe) {
    //Actualizamos la cantidad
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id == infoCurso.id) {
        curso.cantidad++;
        return curso; //Retorna el objeto actualzido
      } else {
        return curso; //Retorna los objetos que no son duplicados
      }
    });
    articulosCarrito = [...cursos];
  } else {
    //Agrega elementos al arreglo de carrito, los tres puntos crean una copia del arreglo
    articulosCarrito = [...articulosCarrito, infoCurso];
  }
  console.log(articulosCarrito);
  carritoHTML();
}

//Muestra el carrito de compras en el HTML
function carritoHTML() {
  //Limpiamos el HTML
  limpiarHTML();

  //General el HTML
  articulosCarrito.forEach((curso) => {
    const row = document.createElement("tr");
    row.innerHTML = `
              <td><img src="${curso.imagen}" width="110"></td>
              <td>${curso.titulo}</td>
              <td>${curso.precio}</td>
              <td>${curso.cantidad}</td>
              <td><a href="#" class="borrar-curso" data-id="${curso.id}">X</a></td>
          `;
    contenedorCarrito.appendChild(row);
  });
}


//Funcion para limpiar el carrito
function limpiarHTML() {
  contenedorCarrito.innerHTML = "";
}


//Elimina curso
function eliminaCurso(e) {
    if (e.target.classList.contains("borrar-curso")) {
      const idCurso = e.target.getAttribute("data-id");
  
      //Elimina del arreglo articulosCarrito por el ID
      articulosCarrito = articulosCarrito.filter((curso) => curso.id !== idCurso);
      console.log(articulosCarrito);
  
      carritoHTML();
    }
  }