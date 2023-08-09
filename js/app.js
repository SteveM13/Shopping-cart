const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners(){
    listaCursos.addEventListener('click', agregarCurso);

    carrito.addEventListener('click', eliminarCurso)

    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; //resetear el carrito

        limpiarHTML(); //  elimina todo html 
    })
}

// functions

function agregarCurso(e) {
    e.preventDefault();
    if( e.target.classList.contains('agregar-carrito')){
        const curso = e.target.parentElement.parentElement;
        leerDatosCurso(curso);
    }
    
}

//eliminar un curso del carrito

function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        //elimina del articulo por el data id

        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);
        
        carritoHTML(); // volvemos a iterar sobre el carrito y traemos su HTML

    }

}


//lee el contenido HTLM al dar click y extrae info
function leerDatosCurso (curso){
    console.log(curso);
    const infoCurso = {
       titulo: curso.querySelector('h4').textContent,
       imagen: curso.querySelector('img').src,
       precio: curso.querySelector('.precio span').textContent,
       id: curso.querySelector('a').getAttribute('data-id'),
       cantidad: 1
}

if( articulosCarrito.some( curso => curso.id === infoCurso.id ) ) { 
    const cursos = articulosCarrito.map( curso => {
         if( curso.id === infoCurso.id ) {
              curso.cantidad++;
               return curso;
          } else {
               return curso;
       }
    })
    articulosCarrito = [...cursos];
}  else {
    articulosCarrito = [...articulosCarrito, infoCurso];
}


    console.log(articulosCarrito);

    carritoHTML();
}


function carritoHTML(){
    
    limpiarHTML();

    articulosCarrito.forEach( curso =>{
        const { imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
        <img src="${imagen}" width="100">
        </td> 
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
       <td> 
       <a href="#" class="borrar-curso" data-id="${id}" > X </a> 
       </td>
    `;

    //agregar HTML del carrito al tbody
    contenedorCarrito.appendChild(row);
});

}
//limpiar HTML del carrito para no duplicar 

function limpiarHTML(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}