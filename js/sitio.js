/* Iniciamos WOW */
new WOW().init();
/*----------------------------------
Iniciamos smoothScroll (Scroll Suave)
--------------------------------*/
var scroll = new SmoothScroll('a[href*="#"]', {
	// Speed & Easing
	speed: 1000, // Integer. How fast to complete the scroll in milliseconds
	offset: 90 // Integer or Function returning an integer. How far to offset the scrolling anchor location in pixels

});
/*---------------------------------
    OCULTAR Y MOSTRAR BOTON IR ARRIBA
 ----------------------------------*/
$(function () {
    $(window).scroll(function () {
        var scrolltop = $(this).scrollTop();
        if (scrolltop >= 50) {
            $(".ir-arriba").fadeIn();
        } else {
            $(".ir-arriba").fadeOut();
        }
    });

});


// Función para mostrar video
function mostrarVideo(videoId) {
    const modal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    
    // Configura aquí tus videos reales (reemplaza los IDs de YouTube)
    const videos = {
        'video1': 'https://www.youtube.com/embed/ID_VIDEO_TALLER?autoplay=1&rel=0',
        'video2': 'https://www.youtube.com/embed/ID_VIDEO_GASTRONOMIA?autoplay=1&rel=0',
        'video3': 'https://www.youtube.com/embed/ID_VIDEO_CAMINATA?autoplay=1&rel=0'
    };
    
    videoFrame.src = videos[videoId];
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Función para cerrar video
function cerrarVideo() {
    const modal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    
    videoFrame.src = '';
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Cerrar al hacer clic fuera del modal
window.addEventListener('click', function(event) {
    if (event.target === document.getElementById('videoModal')) {
        cerrarVideo();
    }
});



// Datos de los lugares
const lugaresData = {
    'tecoaque': {
        titulo: 'Zona Arqueológica de Tecoaque',
        descripcion: 'Importante sitio prehispánico donde se han encontrado vestigios de la cultura tlaxcalteca. El nombre Tecoaque significa "lugar donde se comieron a los dioses".',
        horario: '<p><i class="fa fa-clock mr-2"></i><strong>Horario:</strong> Martes a domingo de 9:00 a 17:00 hrs</p><p><i class="fa fa-ticket mr-2"></i><strong>Costo:</strong> $55 pesos</p>',
        mapa: 'https://maps.google.com/?q=19.284284,-98.244389&ll=19.284284,-98.244389&z=15'
    },
    'parroquia': {
        titulo: 'Parroquia de San Nicolás Tolentino',
        descripcion: 'Construida en el siglo XVI, esta joya arquitectónica de estilo barroco cuenta con impresionantes retablos dorados y una rica historia colonial.',
        horario: '<p><i class="fa fa-clock mr-2"></i><strong>Horario:</strong> Lunes a domingo de 7:00 a 20:00 hrs</p>',
        mapa: 'https://maps.google.com/?q=19.284284,-98.244389&ll=19.284284,-98.244389&z=16'
    },
    'cascada': {
        titulo: 'Cascada de Atlihuetzía',
        descripcion: 'Espectacular salto de agua de aproximadamente 30 metros de altura, rodeado de exuberante vegetación. Ideal para días de campo y contacto con la naturaleza.',
        horario: '<p><i class="fa fa-clock mr-2"></i><strong>Horario:</strong> Todos los días de 8:00 a 18:00 hrs</p><p><i class="fa fa-exclamation-triangle mr-2"></i><strong>Recomendaciones:</strong> Llevar zapatos cómodos</p>',
        mapa: 'https://maps.google.com/?q=19.284284,-98.244389&ll=19.284284,-98.244389&z=15'
    },
    'mirador': {
        titulo: 'Mirador de Terrenate',
        descripcion: 'Desde este punto estratégico podrás apreciar panorámicas espectaculares del valle de Terrenate y sus alrededores. Perfecto para fotografías al atardecer.',
        horario: '<p><i class="fa fa-clock mr-2"></i><strong>Horario:</strong> Acceso libre las 24 horas</p>',
        mapa: 'https://maps.google.com/?q=19.284284,-98.244389&ll=19.284284,-98.244389&z=15'
    },
    'artesanias': {
        titulo: 'Talleres de Artesanías',
        descripcion: 'Conoce el proceso de creación de textiles tradicionales, cerámica y cestería directamente con los artesanos locales. Puedes adquirir piezas únicas como recuerdo.',
        horario: '<p><i class="fa fa-clock mr-2"></i><strong>Horario:</strong> Lunes a sábado de 10:00 a 18:00 hrs</p>',
        mapa: 'https://maps.google.com/?q=19.284284,-98.244389&ll=19.284284,-98.244389&z=16'
    }
};

// Función para mostrar información del lugar
function mostrarLugar(lugarId, elemento) {
    // Actualizar lista activa
    document.querySelectorAll('.lugares-lista a').forEach(item => {
        item.classList.remove('active-lugar');
    });
    elemento.classList.add('active-lugar');
    
    // Actualizar marcadores del mapa
    document.querySelectorAll('.mapa-marcador').forEach(marcador => {
        marcador.classList.remove('active');
        if (marcador.dataset.lugar === lugarId) {
            marcador.classList.add('active');
        }
    });
    
    // Actualizar información del lugar
    const lugar = lugaresData[lugarId];
    document.getElementById('lugar-titulo').textContent = lugar.titulo;
    document.getElementById('lugar-descripcion').textContent = lugar.descripcion;
    document.getElementById('lugar-horario').innerHTML = lugar.horario;
    document.getElementById('lugar-mapa-link').href = lugar.mapa;
    
    // Centrar mapa en la ubicación (simulado con parámetros)
    const iframe = document.getElementById('mapa-interactivo');
    iframe.src = `https://maps.google.com/maps?q=${lugar.mapa.split('q=')[1].split('&')[0]}&z=15&output=embed`;
}

// Inicializar con el primer lugar
document.addEventListener('DOMContentLoaded', function() {
    mostrarLugar('tecoaque', document.querySelector('[data-lugar="tecoaque"]'));
});


// Función para mostrar información en ventana flotante
function mostrarInfo(numero) {
    event.preventDefault(); // Prevenir comportamiento por defecto
    
    // Ocultar todas las informaciones primero
    document.querySelectorAll('#ventana-info .info').forEach(info => {
        info.style.display = 'none';
    });
    
    // Mostrar la información seleccionada
    const info = document.getElementById(`info-${numero}`);
    if (info) {
        info.style.display = 'block';
    }
    
    // Mostrar la ventana
    document.getElementById('ventana-info').classList.remove('oculto');
    document.body.style.overflow = 'hidden'; // Evitar scroll en el fondo
}

// Función para cerrar ventana flotante
function cerrarVentana() {
    document.getElementById('ventana-info').classList.add('oculto');
    document.body.style.overflow = 'auto'; // Restaurar scroll
}

// Cerrar al hacer clic fuera del contenido
document.getElementById('ventana-info').addEventListener('click', function(e) {
    if (e.target === this) {
        cerrarVentana();
    }
});



// Función para mostrar información del lugar
function mostrarLugar(lugarId, elemento) {
    event.preventDefault(); // Añade esta línea para prevenir el comportamiento por defecto
    
    // Actualizar lista activa
    document.querySelectorAll('.lugares-lista a').forEach(item => {
        item.classList.remove('active-lugar');
    });
    elemento.classList.add('active-lugar');
    
    // Resto del código permanece igual...
    // Actualizar marcadores del mapa
    document.querySelectorAll('.mapa-marcador').forEach(marcador => {
        marcador.classList.remove('active');
        if (marcador.dataset.lugar === lugarId) {
            marcador.classList.add('active');
        }
    });
    
    // Actualizar información del lugar
    const lugar = lugaresData[lugarId];
    document.getElementById('lugar-titulo').textContent = lugar.titulo;
    document.getElementById('lugar-descripcion').textContent = lugar.descripcion;
    document.getElementById('lugar-horario').innerHTML = lugar.horario;
    document.getElementById('lugar-mapa-link').href = lugar.mapa;
    
    // Centrar mapa en la ubicación (simulado con parámetros)
    const iframe = document.getElementById('mapa-interactivo');
    iframe.src = `https://maps.google.com/maps?q=${lugar.mapa.split('q=')[1].split('&')[0]}&z=15&output=embed`;
}

// Array con todas las imágenes de la galería
const galleryImages = [
    {src: 'img/galeria1.jpg', title: 'Paisaje de Terrenate', desc: 'Hermosos paisajes naturales de nuestra región'},
    {src: 'img/galeria2.jpg', title: 'Arquitectura colonial', desc: 'Nuestro patrimonio histórico y cultural'},
    {src: 'img/galeria3.jpg', title: 'Gastronomía local', desc: 'Los sabores tradicionales de Terrenate'},
    {src: 'img/galeria4.jpg', title: 'Festividades', desc: 'Celebraciones y tradiciones de nuestra comunidad'},
    {src: 'img/galeria5.jpg', title: 'Artesanías', desc: 'Trabajos artesanales hechos por nuestros talentosos artistas'},
    {src: 'img/galeria6.jpg', title: 'Comunidad', desc: 'La calidez y amabilidad de nuestra gente'}
];

let currentImageIndex = 0;

// Función para abrir modal de galería
function abrirModal(src) {
    const modal = document.getElementById("modal-galeria");
    const modalImg = document.getElementById("img-modal");
    const caption = document.getElementById("caption");
    
    // Encontrar el índice de la imagen actual
    currentImageIndex = galleryImages.findIndex(img => img.src === src);
    
    // Mostrar la imagen y su descripción
    modalImg.src = src;
    caption.innerHTML = `<h3>${galleryImages[currentImageIndex].title}</h3><p>${galleryImages[currentImageIndex].desc}</p>`;
    
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
}

// Función para navegar entre imágenes
function navigateModal(direction) {
    currentImageIndex += direction;
    
    // Circular navigation
    if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    }
    
    const modalImg = document.getElementById("img-modal");
    const caption = document.getElementById("caption");
    
    modalImg.src = galleryImages[currentImageIndex].src;
    caption.innerHTML = `<h3>${galleryImages[currentImageIndex].title}</h3><p>${galleryImages[currentImageIndex].desc}</p>`;
}

function cerrarModal() {
    document.getElementById("modal-galeria").style.display = "none";
    document.body.style.overflow = "auto";
}

// Cerrar modal al hacer clic fuera de la imagen
window.onclick = function(event) {
    const modal = document.getElementById("modal-galeria");
    if (event.target == modal) {
        cerrarModal();
    }
}

// Botón "Ver más fotos" (simulado)
document.getElementById('load-more').addEventListener('click', function() {
    // En una implementación real, aquí cargarías más imágenes dinámicamente
    alert('En una implementación completa, aquí se cargarían más imágenes dinámicamente');
});

