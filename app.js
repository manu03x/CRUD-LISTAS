const nombreInput = document.querySelector('#nombre')
const codigoInput = document.querySelector('#codigo')
const cantidadInput = document.querySelector('#cantidad')
const costoInput = document.querySelector('#costo')
const posicion = document.querySelector('#pos')
const eliminarInput = document.querySelector('#eliminar-input')
const form = document.querySelector('#nuevo-producto')
const botonBuscar = document.querySelector('#buscar');
const botonPosicion= document.querySelector('#insertar-posicion');


const botonListado = document.querySelector('#listar')
const botonEliminar = document.querySelector('#eliminar')
const botonListadoInverso = document.querySelector('#listar-inverso')


let productos = document.querySelector('#productos');


eventListeners();

const productoObj = {
    codigo: '',
    nombre: '',
    costo: '',
    cantidad: '',
}


function datosProducto(e) {
    productoObj[e.target.name] = e.target.value
}

class UI {
    mostrarProductos(producto) {


            productos.innerHTML += `<li>
            Nombre: ${producto.nombre} <br>
            Codigo: ${producto.codigo} <br>
            Cantidad: ${producto.cantidad} <br>
            Costo: ${producto.costo} <br>
            </li>
            `
    }

    mostrarInverso(producto) {
    productos.innerHTML = `<li>
                    Nombre: ${producto.nombre} <br>
                    Codigo: ${producto.codigo} <br>
                    Cantidad: ${producto.cantidad} <br>
                    Costo: ${producto.costo} <br>
                </li>
                ` + productos.innerHTML;
    }
}
const ui = new UI();

class Inventario {
    constructor() {
        this.head = null
    }

    addProducto(productoNuevo) {
        if(!this.head) {
            this.head = productoNuevo
            return;
        }

        let producto = this.head

        while(producto.next) {
            producto = producto.next
        }

        producto.next = productoNuevo


    }

    addProductoPos(productoNuevo, pos) {
        let count = 1;
        let producto = this.head
        if(pos == 1) {
            productoNuevo.next = this.head;
            this.head = productoNuevo;

            return;
        }

        while (count != pos - 1) {
            count++
            producto = producto.next
        }

        productoNuevo.next = producto.next.next
        producto.next = productoNuevo



    }


    eliminarProducto(codigo) {
        if (!this.head) {
            return;
        } else if (this.head.codigo == codigo ) {
            this.head = this.head.next
        }

        let producto = this.head
        let eliminado;
        while(producto) {
            if (producto.next.codigo == codigo) {
                eliminado = producto.next
                producto.next = producto.next.next
                return;
            }

            producto = producto.next;
        }

        return eliminado

    }

    listar() {
        let producto = this.head

        while(producto){
            ui.mostrarProductos(producto)
            producto = producto.next
        }
    }

    listarInverso() {
        let producto = this.head;
        while(!!producto){
            ui.mostrarInverso(producto)
            producto = producto.next; 
        }
    }
}
const inventario = new Inventario();

function eventListeners() {
    nombreInput.addEventListener('input', datosProducto)
    codigoInput.addEventListener('input', datosProducto)
    costoInput.addEventListener('input', datosProducto)
    cantidadInput.addEventListener('input', datosProducto)
    botonEliminar.addEventListener('click', eliminarProducto)
    botonListado.addEventListener('click', listar)
    botonListadoInverso.addEventListener('click', listarInverso)
    botonBuscar.addEventListener('click', buscarProducto)
    botonPosicion.addEventListener('click', nuevoPosicion)


    form.addEventListener('submit', nuevoProducto)
}

function listar() {
    limpiarHTML();
    inventario.listar()
}

class Producto {
    constructor(codigo, nombre, cantidad, costo) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.costo = costo;
        this.next = null
    }
}



function nuevoProducto(e) {
    e.preventDefault();
    const {codigo, nombre, costo , cantidad} = productoObj
    // if(!codigo || !nombre || !costo || !cantidad) {
    //     alert('Todos los campos son obligatorios')
    // } else {
        let producto = new Producto(codigo, nombre, costo, cantidad);
        reiniciarObj();
        inventario.addProducto(producto)
    // }
}


function reiniciarObj() {
    productoObj.nombre = '';
    productoObj.codigo = 0;
    productoObj.costo = '';
    productoObj.cantidad = '';
}

function limpiarHTML() {
    while(productos.firstChild) {
        productos.removeChild(productos.firstChild)
    }
}

function eliminarProducto() {
    const codigo = Number(eliminarInput.value)
    console.log(codigo)
    inventario.eliminarProducto(codigo)
    console.log('Eliminando')
}

function listarInverso() {
    limpiarHTML();
    inventario.listarInverso();
}

function buscarProducto() {
    const codigo = Number(eliminarInput.value)
    console.log(inventario.buscar(codigo));
}

function nuevoPosicion() {
    const {codigo, nombre, costo , cantidad} = productoObj
    let producto = new Producto(codigo, nombre, costo, cantidad);
    reiniciarObj();
    inventario.addProductoPos(producto, posicion.value)
}