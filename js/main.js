const productos = [

    {
        id: 1, tipo: 'polos', nombre: 'Polo Maui', descripcion: 'color negro', imagen: './images/imagen1.png', precio: 'S/. 55.00', stock: 10
    },
    {
        id: 2, tipo: 'polos', nombre: 'Polo Maui', descripcion: 'color verde', imagen: './images/imagen2.png', precio: 'S/. 55.00', stock: 12
    },
    {
        id: 3, tipo: 'polos', nombre: 'Polo Maui', descripcion: 'color azul', imagen: './images/imagen3.png', precio: 'S/. 65.50', stock: 14
    },
    {
        id: 4, tipo: 'polos', nombre: 'Polo Maui', descripcion: 'color celeste', imagen: './images/imagen4.png', precio: 'S/. 55.00', stock: 10
    },
    {
        id: 5, tipo: 'casacas', nombre: 'Casaca Navigata', descripcion: 'color verde / negro', imagen: './images/imagen5.png', precio: 'S/. 145.00', stock: 15
    },
    {
        id: 6, tipo: 'casacas', nombre: 'Casaca Navigata', descripcion: 'color negro', imagen: './images/imagen6.png', precio: 'S/. 175.00', stock: 20
    },
    {
        id: 7, tipo: 'casacas', nombre: 'Casaca Navigata', descripcion: 'color azul / crema', imagen: './images/imagen7.png', precio: 'S/. 170.00', stock: 18
    },
    {
        id: 8, tipo: 'casacas', nombre: 'Casaca Navigata', descripcion: 'color azul / rojo', imagen: './images/imagen8.png', precio: 'S/. 185.00', stock: 15
    },
    {
        id: 9, tipo: 'pantalones', nombre: 'Pantalon H&M', descripcion: 'color negro', imagen: './images/imagen9.png', precio: 'S/. 120.00', stock: 25
    },
    {
        id: 10, tipo: 'pantalones', nombre: 'Pantalon H&M', descripcion: 'color verde', imagen: './images/imagen10.png', precio: 'S/. 120.00', stock: 15
    },
    {
        id: 11, tipo: 'pantalones', nombre: 'Pantalon H&M', descripcion: 'color crema', imagen: './images/imagen11.png', precio: 'S/. 120.00', stock: 25
    },
    {
        id: 12, tipo: 'pantalones', nombre: 'Pantalon H&M', descripcion: 'color gris oscuro', imagen: './images/imagen12.png', precio: 'S/. 120.00', stock: 15
    }
]


/* Funciones para guardar y cargar productos */

const guardarProductosLS = () => {
    localStorage.setItem('productos', JSON.stringify(productos))
}

const cargarProductosLS = () => {
    return JSON.parse(localStorage.getItem("productos"))
}

guardarProductosLS()

/* Función para renderizar todos los productos */

const renderProductos = () => {

    let productos = cargarProductosLS()
    let contenidoProductos = ''

    productos.forEach(producto => {
        contenidoProductos += `
        <div class="col-md-3 mb-4">
            <div class="card">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text mb-1">${producto.descripcion}</p>
                    <p class="card-text">${producto.precio}</p>
                    <button type="button" class="btn btn-success" onclick="verProducto(${producto.id})" data-bs-toggle="modal" data-bs-target="#exampleModal">Ver Producto</button>
                </div>
            </div>
        </div>
        `
    })

    document.getElementById('contenido').innerHTML = contenidoProductos
}

renderProductos()

/* Función para renderizar producto en modal */

const renderVerProducto = () => {

    const producto = JSON.parse(localStorage.getItem('producto'))
    let contenidoVerProducto = `
    <div class="col-md-4">
        <img src="${producto.imagen}" class="img-fluid" alt="${producto.nombre}">
    </div>
    <div class="col-md-6">  
        <h5 class="card-title">${producto.nombre}</h5>
        <p class="card-text mb-1">${producto.descripcion}</p>
        <p class="card-text">${producto.precio}</p>
        <p class="card-text">stock: ${producto.stock}</p>
        <button class="btn btn-primary" onclick="agregarProducto(${producto.id})">Agregar</button>
    </div>
    `

    document.getElementById('contenido-producto').innerHTML = contenidoVerProducto
}

const verProducto = (id) => {
    let productos = cargarProductosLS()
    /* busca el primer elemento que coincida con el array */
    let producto = productos.find(item => item.id == id)
    localStorage.setItem('producto', JSON.stringify(producto))
    renderVerProducto()
}



/* Funciones para guardar y cargar productos en el carrito */

const guardarCarritoLS = (carrito) => {
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

const cargarCarritoLS = () => {
    return JSON.parse(localStorage.getItem('carrito')) || []
}

const buscarProducto = (id) => {
    const productos = cargarProductosLS()
    return productos.find(item => item.id == id)
}

const estaEnElCarrito = (id) => {

    const carrito = cargarCarritoLS()
    return carrito.some(item => item.id === id)

}



const agregarProducto = (id) => {
    const carrito = cargarCarritoLS()

    if (estaEnElCarrito(id)) {
        let pos = carrito.findIndex(item => item.id === id)
        carrito[pos].cantidad += 1
    } else {
        const producto = buscarProducto(id)
        producto.cantidad = 1
        carrito.push(producto)
    }


    guardarCarritoLS(carrito)
    renderBotonCarrito()
}

const limpiarAlertaStock = () => {
    const alertaStock = document.getElementById('alerta-stock')
    if (alertaStock) {
        alertaStock.innerHTML = ''
    }
}

const eliminarProducto = (id) => {
    const carrito = cargarCarritoLS()
    const nuevoCarrito = carrito.filter(item => item.id != id)
    guardarCarritoLS(nuevoCarrito)
    renderBotonCarrito()
    renderProductosCarrito()

    // Elimina el alert de stock si no hay productos
    limpiarAlertaStock()

}

const vaciarCarrito = () => {
    localStorage.removeItem('carrito')
    renderBotonCarrito()
    renderProductosCarrito()

    // Elimina el alert de stock al vaciar el carrito
    limpiarAlertaStock()

}

const cantidadTotalProductos = () => {
    const carrito = cargarCarritoLS()
    return carrito.reduce((acumulador, item) => acumulador += item.cantidad, 0)
}

const sumaTotalProductos = () => {
    const carrito = cargarCarritoLS()
    return carrito.reduce((acumulador, item) => acumulador + item.cantidad * parseFloat(item.precio.replace('S/.', '')), 0)
}

const renderBotonCarrito = () => {
    let botonCarrito = document.getElementById('botonCarrito')
    let contenido = `
    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    ${cantidadTotalProductos()}
    </span>
    `

    botonCarrito.innerHTML = contenido
}

renderBotonCarrito()


const renderProductosCarrito = () => {
    let productos = cargarCarritoLS()
    let contenido = ''

    if (cantidadTotalProductos() > 0) {
        contenido += `
        <table class="table">
          <thead>
            <tr>
                <th><button class="btn bg-light btn-sm" onclick="vaciarCarrito()">Vaciar carrito</button></th>
            </tr>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Cantidad</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
      `

        productos.forEach(producto => {
            contenido += `
          <tr>
            <td><img src="${producto.imagen}" width="60" alt="${producto.nombre}"></td>
            <td class="small">${producto.nombre}</td>
            <td class="small">
              <button class="btn btn-sm btn-secondary" onclick="disminuirCantidad(${producto.id})">-</button>
              ${producto.cantidad}
              <button class="btn btn-sm btn-secondary" onclick="aumentarCantidad(${producto.id})">+</button>
            </td>
            <td class="small">${producto.precio}</td>
            <td><i class="bi bi-trash3-fill  eliminar" onclick="eliminarProducto(${producto.id})"></i></td>
          </tr>
        `
        })

        contenido += `
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2"></td>
              <td>Total</td>
              <td class="small"><b>S/. ${sumaTotalProductos()}</b></td>
            </tr>
          </tfoot>
        </table>
      `
    } else {
        contenido += `
        <div class="alert alert-success text-center" role="alert">
          No hay productos en el carrito.
        </div>
      `
    }

    document.getElementById('contenido-carrito').innerHTML = contenido
}




const aumentarCantidad = (id) => {
    const carrito = cargarCarritoLS()
    const producto = buscarProducto(id)
    let contenido = ''

    if (producto.stock > 0) {
        const pos = carrito.findIndex(item => item.id === id)

        if (pos !== -1) {

            const cantidadDisponible = producto.stock
            const cantidadDeseada = 1
            const cantidadTotal = carrito[pos].cantidad + cantidadDeseada

            if (cantidadTotal <= cantidadDisponible) {
                carrito[pos].cantidad = cantidadTotal
                producto.stock -= cantidadDeseada
                guardarCarritoLS(carrito)
                renderProductosCarrito()
            } else {
                contenido += `
                <div class="alert alert-danger text-center" role="alert">
                    No hay suficiente stock disponible para agregar más productos
                </div>
              `

            }

            document.getElementById('alerta-stock').innerHTML = contenido
            
        }
    }
}


const disminuirCantidad = (id) => {
    const carrito = cargarCarritoLS()
    const pos = carrito.findIndex(item => item.id === id)

    if (pos !== -1) {
        if (carrito[pos].cantidad > 1) {
            carrito[pos].cantidad--
        } else {
            carrito.splice(pos, 1)
        }

        guardarCarritoLS(carrito)
        renderProductosCarrito()

        // Elimina el alert de stock si disminuye la cantidad según el stock
        limpiarAlertaStock()


    }
}

renderProductosCarrito()



// referencia al icono de carrito
const iconoCarrito = document.querySelector('.carrito')

// Evento clic al icono de carrito
iconoCarrito.addEventListener('click', renderProductosCarrito)


const renderProductosEncontrados = (productos) => {

    let contenidoProductosEncontrados = ''

    if (productos.length > 0) {

        productos.forEach(producto => {
            contenidoProductosEncontrados += `
            <div class="col-md-3">
              <div class="card">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body">
                  <h5 class="card-title">${producto.nombre}</h5>
                  <p class="card-text">${producto.precio}</p>
                  <button type="button" class="btn btn-success" onclick="verProducto(${producto.id})" data-bs-toggle="modal" data-bs-target="#exampleModal">Ver Producto</button>
                </div>
              </div>
            </div>
            `
        })

    }

    else {
        contenidoProductosEncontrados += `
        <div class="container">
            <div class="alert alert-success text-center" role="alert">
                No se encontraron resultados
            </div>
      
            <a href="index.html" class="btn btn-success">Volver</a>

            <div class="container d-flex justify-content-center">
                <img src="./images/noEncontrado.svg" class="no-encontrado">
            </div
        </div>
        `
    }

    document.getElementById('contenido').innerHTML = contenidoProductosEncontrados
}


const buscarProductos = () => {
    const textoBusqueda = document.getElementById('inputBusqueda').value.toLowerCase()

    // búsqueda
    const productos = cargarProductosLS()
    const productosEncontrados = productos.filter(producto =>
        producto.tipo.toLowerCase().includes(textoBusqueda)
    )

    // Renderiza los productos encontrados
    renderProductosEncontrados(productosEncontrados)
}

const btnBuscar = document.getElementById('btnBuscar')

btnBuscar.addEventListener('click', buscarProductos)


