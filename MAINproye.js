//Constructor

class Vehiculo{
    constructor(vehiculo){
        this.id = vehiculo.id,
        this.imagen= vehiculo.imagen,
        this.nombre = vehiculo.nombre,
        this.marca = vehiculo.marca;
        this.descripcion = vehiculo.descripcion;
        this.precio = vehiculo.precio
    }
}

//declaro variable carrito para mi carrito
let carrito = [];
//imprimo vehiculos en mi html
function cargarDatos(autos){
    //obtengo el elemento que va a ser mi contenedor
    let contenedor = document.querySelector("#contenedor");
    contenedor.innerHTML = "";                               
    console.log(autos);
    //recorro el array
    for (const vehiculo of autos){
        //contenedor para cada card
        let card = document.createElement("div");
        //comienzo a crear el contenido de la card
        card.setAttribute("class", "container");
        //agrego el atributo de container
        let foto = document.createElement("img");
        //agregas la ruta de la imagen al elemento imagen
        foto.src = vehiculo.imagen;
        //lo agregamos al div que va a contener los datos de la misma
        //agrego el evento mouseover
        card.appendChild(foto);
        let nombre = document.createElement("h2");
        //con textContent o innerText agregamos texto al elemto
        nombre.textContent = vehiculo.nombre;
        //lo agrego al div que va a contener los datos de la card
        card.appendChild(nombre);
        //creo un h3 para la marca
        let marca = document.createElement("h3");
        marca.textContent = vehiculo.marca;
        card.appendChild(marca);
        //creamos un elemento de parrafo para la descripcion
        let parrafo = document.createElement("p");
        //agrego texto con textContent
        parrafo.textContent = vehiculo.descripcion;
        //lo agregamos al div que va a contener los datos de la card
        card.appendChild(parrafo);
        let precio = document.createElement("h3");
        //agrego el precio con textContent
        precio.textContent = `$${vehiculo.precio}`;
        //lo agregamos al div que va a contener los datos de la card
        card.appendChild(precio);
        //creo el boton para comprar con sus atributos
        let botonComprar = document.createElement("button");
        //agrego variable dinamica para que cambie para cada id
        botonComprar.setAttribute("id", `agregar${vehiculo.id}`);
        botonComprar.setAttribute("type", "button");
        botonComprar.textContent = "Agregar al carrito";
        //agrego evento click segudo de la funmcion que se disparara cuando se haga click en el objeto
        botonComprar.onclick = ()=> agregarAlCarrito(vehiculo.id);
        botonComprar.addEventListener("click", ()=>{
            swal("Se ha añadido al carrito");
        })
        botonComprar.addEventListener("click", mostrarCarrito);
        card.appendChild(botonComprar);
        //envio todo mi contenido a mi contenedor
        contenedor.appendChild(card);
    }
}

//function buscador
function crearBuscador(){
    let buscador = document.querySelector("#buscador");
    let cuadroBusqueda = document.createElement("input");
    cuadroBusqueda.setAttribute("type", "Buscar");
    cuadroBusqueda.setAttribute("value", "Buscar por nombre");
    cuadroBusqueda.setAttribute("class", "estiloBuscador");
    cuadroBusqueda.setAttribute("id", "setBuscador");
    buscador.appendChild(cuadroBusqueda);
    cuadroBusqueda.addEventListener("focus", (e)=>{
        if(e.target.value === "Buscar por nombre"){
            cuadroBusqueda.value = "";
        }
    });
    cuadroBusqueda.addEventListener("blur", (e)=>{
        if(e.target.value === ""){
            e.target.value = "Buscar por nombre";
        }
    });
        //boton de busqueda
    let botonBuscar = document.createElement("div");
    botonBuscar.setAttribute("class", "botonBuscar");
    buscador.appendChild(botonBuscar);
    let lupita = document.createElement("i");
    lupita.setAttribute("class", "fa-solid fa-magnifying-glass");
    botonBuscar.appendChild(lupita);
    
    //Eventos 
    let encontrado = [];
    cuadroBusqueda.addEventListener("focus", (e)=>{
        if(e.target.value === "Buscar por nombre"){
            cuadroBusqueda.value = "";
        }
    });

    lupita.onclick=()=> {
        let nomBuscado = document.getElementById("setBuscador").value;
        encontrado.length=0;
        encontrado = vehiculos.filter((autito)=>{
            return  nomBuscado == autito.nombre ;
        });
        if(encontrado.length === 1){
            cargarDatos(encontrado);
        }
        else{
            alert("No se encontro el vehiculo");
        }
    }  

    cuadroBusqueda.addEventListener("blur", (e)=>{
        if(e.target.value === ""){
            e.target.value = "Buscar por nombre";
        }
    });
    

}

//creo la funcion para agregar los productos al carrito con el id del producto que presione
function agregarAlCarrito(idProducto){
        carrito.length=0;
        carrito.push(new Vehiculo(vehiculos[idProducto],1));
        localStorage.setItem("carritoEnStorage", JSON.stringify(carrito));
        agregarAlTotal(carrito);
}      

function mostrarCarrito() {
    document.getElementById("contenedorCarrito").classList.toggle("contenedorCarritoEstilo");
}

function agregarAlTotal(array){
    let contenedorCarrito = document.getElementById("botonCarrito");
    contenedorCarrito.innerHTML = "";

    for (const vehiculoCarrito of array){
    
        let imagenVehiculoCarrito = document.getElementById("imagenAutoCarrito");
        imagenVehiculoCarrito.src = vehiculoCarrito.imagen;
        let nombreVehiculoCarrito = document.getElementById("nombreAutoCarrito");
        nombreVehiculoCarrito.innerText = vehiculoCarrito.nombre;

        let totalCompra = document.createElement("p");
        let precioVehiculoCarrito = document.getElementById("precioTotal");
        precioVehiculoCarrito.innerText = `$${vehiculoCarrito.precio}`;
        
        console.table(array);
    }
}

//boton Borrar del carrito
let botonBorrar = document.getElementById("botonBorrar");
botonBorrar.addEventListener("click", (carrito)=>{
    carrito.length=0;
    document.getElementById("contenedorCarrito").classList.toggle("contenedorCarritoEstilo");
});

//evento inputcheck Marcas
let checkChev = document.getElementById("checkChev");
let vehiculosCheck = [];
checkChev.addEventListener("click", ()=>{
    vehiculosCheck.length = 0;
    if(checkChev.checked){
        vehiculosCheck = vehiculos.filter((marcaChev)=>{
            return marcaChev.marca === "Chevrolet";
        });
        cargarDatos(vehiculosCheck);
    }
    else {
        cargarDatos(vehiculos);
    }
}); 

let checkFord = document.getElementById("checkFord");
checkFord.addEventListener("click", ()=>{
    vehiculosCheck.length = 0;
    if(checkFord.checked){
        vehiculosCheck = vehiculos.filter((marcaFord)=>{
            return marcaFord.marca === "Ford";
        });
        cargarDatos(vehiculosCheck);
    }
    else {
        cargarDatos(vehiculos);
    }
}); 

let checkHonda = document.getElementById("checkHonda");
checkHonda.addEventListener("click", ()=>{
    vehiculosCheck.length = 0;
    if(checkHonda.checked){
        vehiculosCheck = vehiculos.filter((marcaHonda)=>{
            return marcaHonda.marca === "Honda";
        });
        cargarDatos(vehiculosCheck);
    }
    else {
        cargarDatos(vehiculos);
    }
}); 

let checkPeu = document.getElementById("checkPeugeot");
checkPeu.addEventListener("click", ()=>{
    vehiculosCheck.length = 0;
    if(checkPeu.checked){
        vehiculosCheck = vehiculos.filter((marcaChev)=>{
            return marcaPeu.marca === "Peugeot";
        });
        cargarDatos(vehiculosCheck);
    }
    else {
        cargarDatos(vehiculos);
    }
}); 

let checkToy = document.getElementById("checkToyota");
checkToy.addEventListener("click", ()=>{
    vehiculosCheck.length = 0;
    if(checkToy.checked){
        vehiculosCheck = vehiculos.filter((marcaToy)=>{
            return marcaToy.marca === "Toyota";
        });
        cargarDatos(vehiculosCheck);
    }
    else {
        cargarDatos(vehiculos);
    }
}); 

//INPUTS Precio
let checkCinco = document.getElementById("checkCinco");
checkCinco.addEventListener("click", ()=>{
    vehiculosCheck.length = 0;
    if(checkCinco.checked){
        vehiculosCheck = vehiculos.filter((cinco)=>{
            return cinco.precio <= 5000000;
        });
        cargarDatos(vehiculosCheck);
    }
    else {
        cargarDatos(vehiculos);
    }
}); 

let checkDiez = document.getElementById("checkDiez");
checkDiez.addEventListener("click", ()=>{
    vehiculosCheck.length = 0;
    if(checkDiez.checked){
        vehiculosCheck = vehiculos.filter((diez)=>{
            return diez.precio <= 10000000;
        });
        cargarDatos(vehiculosCheck);
    }
    else {
        cargarDatos(vehiculos);
    }
}); 

let checkVeinte = document.getElementById("checkVeinte");
checkVeinte.addEventListener("click", ()=>{
    vehiculosCheck.length = 0;
    if(checkDiez.checked){
        vehiculosCheck = vehiculos.find((veinte)=>{
            return veinte.precio <= 10000000;
        });
        cargarDatos(vehiculosCheck);
    }
    else {
        cargarDatos(vehiculos);
    }
}); 




//Funciones
cargarDatos(vehiculos);
crearBuscador();
