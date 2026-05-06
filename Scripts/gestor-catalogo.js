// Clase Producto
class Producto {
    constructor(id, nombre, descripcion, categoria, precio, imagen, estado = true) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.precio = precio;
        this.imagen = imagen;
        this.estado = estado;
    }

    obtenerDetalles() {
        return `${this.nombre} - $${this.precio}`;
    }

    cambiarEstado(nuevoEstado) {
        this.estado = nuevoEstado;
    }
}

// Clase GestorCatalogo
class GestorCatalogo {
    constructor() {
        this.productos = [];
        this.productosFiltrados = [];
        this.idContador = 1;
    }

    agregarProducto(nombre, descripcion, categoria, precio, imagen, estado = true) {
        const producto = new Producto(
            this.idContador++,
            nombre,
            descripcion,
            categoria,
            precio,
            imagen,
            estado
        );
        this.productos.push(producto);
        return producto;
    }

    eliminarProducto(id) {
        const indice = this.productos.findIndex(p => p.id === id);
        if (indice !== -1) {
            this.productos.splice(indice, 1);
            return true;
        }
        return false;
    }

    cambiarEstadoProducto(id, nuevoEstado) {
        const producto = this.productos.find(p => p.id === id);
        if (producto) {
            producto.cambiarEstado(nuevoEstado);
            return true;
        }
        return false;
    }

    filtrarPorCategoria(categoria) {
        this.productosFiltrados = this.productos.filter(p => 
            p.categoria.toLowerCase() === categoria.toLowerCase()
        );
        return this.productosFiltrados;
    }

    buscarPorNombre(nombre) {
        this.productosFiltrados = this.productos.filter(p => 
            p.nombre.toLowerCase().includes(nombre.toLowerCase())
        );
        return this.productosFiltrados;
    }

    obtenerTodos() {
        return this.productos;
    }

    limpiarFiltros() {
        this.productosFiltrados = [];
    }

    mostrarProductosEnPantalla(contenedorId, productosAMostrar = null) {
        const contenedor = document.getElementById(contenedorId);
        
        if (!contenedor) {
            console.error(`Contenedor con ID "${contenedorId}" no encontrado`);
            return;
        }

        const productosParaMostrar = productosAMostrar || this.productos;

        // Limpiar contenedor
        contenedor.innerHTML = '';

        // Validar si hay productos
        if (productosParaMostrar.length === 0) {
            contenedor.innerHTML = '<p class="sin-productos">No hay productos para mostrar</p>';
            return;
        }

        // Crear tarjetas de productos
        for (let i = 0; i < productosParaMostrar.length; i++) {
            const producto = productosParaMostrar[i];
            const tarjeta = this.crearTarjetaProducto(producto);
            contenedor.appendChild(tarjeta);
        }
    }

    crearTarjetaProducto(producto) {
        const tarjeta = document.createElement('div');
        tarjeta.className = `producto-dinamico ${producto.estado ? 'activo' : 'inactivo'}`;
        tarjeta.id = `producto-${producto.id}`;

        // Determinar estado visual
        const estadoClase = producto.estado ? 'estado-activo' : 'estado-inactivo';
        const estadoTexto = producto.estado ? 'Disponible' : 'Agotado';

        tarjeta.innerHTML = `
            <div class="producto-dinamico-imagen">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="img-producto-dinamico">
                <span class="estado-badge ${estadoClase}">${estadoTexto}</span>
            </div>
            <div class="producto-dinamico-info">
                <h4 class="producto-dinamico-nombre">${producto.nombre}</h4>
                <p class="producto-dinamico-categoria">Categoría: <strong>${producto.categoria}</strong></p>
                <p class="producto-dinamico-descripcion">${producto.descripcion}</p>
                <p class="producto-dinamico-precio">$${producto.precio}</p>
            </div>
            <div class="producto-dinamico-acciones">
                <button class="btn-cambiar-estado" data-id="${producto.id}" data-estado="${producto.estado}">
                    ${producto.estado ? 'Agotar' : 'Disponible'}
                </button>
                <button class="btn-eliminar" data-id="${producto.id}">
                    Eliminar
                </button>
            </div>
        `;

        return tarjeta;
    }

    actualizarVisualizacion(contenedorId) {
        this.mostrarProductosEnPantalla(contenedorId);
        this.adjuntarEventosBotones();
    }

    adjuntarEventosBotones() {
        // Eventos para cambiar estado
        const botonesEstado = document.querySelectorAll('.btn-cambiar-estado');
        botonesEstado.forEach(boton => {
            boton.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                const estadoActual = e.target.dataset.estado === 'true';
                this.cambiarEstadoProducto(id, !estadoActual);
                this.actualizarVisualizacion('contenedor-productos-dinamicos');
            });
        });

        // Eventos para eliminar
        const botonesEliminar = document.querySelectorAll('.btn-eliminar');
        botonesEliminar.forEach(boton => {
            boton.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                if (confirm('¿Está seguro de que desea eliminar este producto?')) {
                    this.eliminarProducto(id);
                    this.actualizarVisualizacion('contenedor-productos-dinamicos');
                }
            });
        });
    }
}

// Instancia global del gestor
const gestor = new GestorCatalogo();

// Inicializar productos de ejemplo
function inicializarProductos() {
    gestor.agregarProducto(
        'Anillo Dorado',
        'Anillo elegante de oro 24k con acabado espejo',
        'Anillos',
        1200,
        'imgsProductos/anillo2.png'
    );

    gestor.agregarProducto(
        'Aretes con Diamantes',
        'Aretes de oro blanco 14k con diamantes naturales',
        'Aretes',
        500,
        'imgsProductos/aretesDiamante.png'
    );

    gestor.agregarProducto(
        'Cadena de Oro',
        'Cadena artesanal de oro 10k, perfecta para diarios',
        'Collares',
        680,
        'imgsProductos/cadenaOro.png'
    );

    gestor.agregarProducto(
        'Tobillera Delicada',
        'Tobillera fina de oro 24k con diseño exclusivo',
        'Pulseras',
        450,
        'imgsProductos/Tobillera.png'
    );

    gestor.agregarProducto(
        'Collar Moderno',
        'Collar moderno en oro 18k con tendencia actual',
        'Collares',
        720,
        'imgsProductos/cadenaOro.png'
    );

    gestor.agregarProducto(
        'Aretes Infantiles',
        'Aretes seguros para niños, incrustados en oro 24k',
        'Aretes',
        380,
        'imgsProductos/aretesNino.png',
        false
    );
}

// Funciones manipuladoras del DOM

// Función 1: Mostrar/Ocultar formulario de búsqueda
function alternarFormularioBusqueda() {
    const formulario = document.getElementById('formulario-busqueda-dinamica');
    
    if (!formulario) {
        console.error('Formulario no encontrado');
        return;
    }

    // Obtener el estilo actual
    const estoActual = window.getComputedStyle(formulario).display;
    
    // Usar condicional para alternancia
    if (estoActual === 'none') {
        formulario.style.display = 'flex';
        formulario.classList.add('visible');
    } else {
        formulario.style.display = 'none';
        formulario.classList.remove('visible');
    }
}

// Función 2: Actualizar contador de productos
function actualizarContadorProductos() {
    const contador = document.getElementById('contador-productos');
    
    if (!contador) {
        console.error('Contador no encontrado');
        return;
    }

    const totalProductos = gestor.obtenerTodos().length;
    const productosActivos = gestor.obtenerTodos().filter(p => p.estado).length;
    
    // Cambiar texto del contador
    contador.textContent = `Total: ${totalProductos} productos | Disponibles: ${productosActivos}`;
    contador.classList.add('actualizado');
    
    // Eliminar clase después de animación
    setTimeout(() => {
        contador.classList.remove('actualizado');
    }, 500);
}

// Función 3: Ejecutar búsqueda
function ejecutarBusqueda(tipo = 'nombre', termino = '') {
    if (!termino.trim()) {
        gestor.limpiarFiltros();
        gestor.mostrarProductosEnPantalla('contenedor-productos-dinamicos');
        actualizarContadorProductos();
        return;
    }

    // Switch para manejar tipo de búsqueda
    switch(tipo.toLowerCase()) {
        case 'nombre':
            gestor.buscarPorNombre(termino);
            break;
        case 'categoria':
            gestor.filtrarPorCategoria(termino);
            break;
        default:
            console.warn('Tipo de búsqueda no válido');
            return;
    }

    const resultados = gestor.productosFiltrados;
    gestor.mostrarProductosEnPantalla('contenedor-productos-dinamicos', resultados);
    actualizarContadorProductos();
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    inicializarProductos();
    gestor.mostrarProductosEnPantalla('contenedor-productos-dinamicos');
    actualizarContadorProductos();
    gestor.adjuntarEventosBotones();

    // Eventos del formulario de búsqueda
    const formularioBusqueda = document.getElementById('formulario-busqueda-dinamica');
    if (formularioBusqueda) {
        const inputBusqueda = document.getElementById('input-busqueda-dinamica');
        const selectCategoria = document.getElementById('select-categoria-dinamica');
        const botonBuscar = document.getElementById('boton-buscar-dinamico');
        const botonLimpiar = document.getElementById('boton-limpiar-dinamico');

        if (botonBuscar) {
            botonBuscar.addEventListener('click', () => {
                const termino = inputBusqueda?.value || '';
                ejecutarBusqueda('nombre', termino);
            });
        }

        if (selectCategoria) {
            selectCategoria.addEventListener('change', (e) => {
                if (e.target.value) {
                    ejecutarBusqueda('categoria', e.target.value);
                }
            });
        }

        if (botonLimpiar) {
            botonLimpiar.addEventListener('click', () => {
                if (inputBusqueda) inputBusqueda.value = '';
                if (selectCategoria) selectCategoria.value = '';
                ejecutarBusqueda('nombre', '');
            });
        }
    }
     // Evento del botón de alternar búsqueda
    const botonAlternar = document.getElementById('boton-alternar-busqueda');
    if (botonAlternar) {
        botonAlternar.addEventListener('click', alternarFormularioBusqueda);
    }
});