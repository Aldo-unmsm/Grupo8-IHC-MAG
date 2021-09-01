const btnDepartamentos = document.getElementById('btn-departamentos'),
  btnCerrarMenu = document.getElementById('btn-menu-cerrar'),
  grid = document.getElementById('grid'),
  contenedorEnlacesNav = document.querySelector('#menu .contenedor-enlaces-nav'),
  contenedorSubCategorias = document.querySelector('#grid .contenedor-subcategorias'),
  esDispositivoMovil = () => window.innerWidth <= 800;

btnDepartamentos.addEventListener('mouseover', () => {
  if (!esDispositivoMovil()) {
    grid.classList.add('activo');
  }
});

grid.addEventListener('mouseleave', () => {
  if (!esDispositivoMovil()) {
    grid.classList.remove('activo');
  }
});

document.querySelectorAll('#menu .categorias a').forEach((elemento) => {
  elemento.addEventListener('mouseenter', (e) => {
    if (!esDispositivoMovil()) {
      document.querySelectorAll('#menu .subcategoria').forEach((categoria) => {
        categoria.classList.remove('activo');
        if (categoria.dataset.categoria == e.target.dataset.categoria) {
          categoria.classList.add('activo');
        }
      });
    };
  });
});

// EventListeners para dispositivo movil.
document.querySelector('#btn-menu-barras').addEventListener('click', (e) => {
  e.preventDefault();
  if (contenedorEnlacesNav.classList.contains('activo')) {
    contenedorEnlacesNav.classList.remove('activo');
    document.querySelector('body').style.overflow = 'visible';
  } else {
    contenedorEnlacesNav.classList.add('activo');
    document.querySelector('body').style.overflow = 'hidden';
  }
});

// Click en boton de todos los departamentos (Para version movil).
btnDepartamentos.addEventListener('click', (e) => {
  e.preventDefault();
  grid.classList.add('activo');
  btnCerrarMenu.classList.add('activo');
});

// Boton de regresar en el menu de categorias
document.querySelector('#grid .categorias .btn-regresar').addEventListener('click', (e) => {
  e.preventDefault();
  grid.classList.remove('activo');
  btnCerrarMenu.classList.remove('activo');
});

document.querySelectorAll('#menu .categorias a').forEach((elemento) => {
  elemento.addEventListener('click', (e) => {
    if (esDispositivoMovil()) {
      contenedorSubCategorias.classList.add('activo');
      document.querySelectorAll('#menu .subcategoria').forEach((categoria) => {
        categoria.classList.remove('activo');
        if (categoria.dataset.categoria == e.target.dataset.categoria) {
          categoria.classList.add('activo');
        }
      });
    }
  });
});

// Boton de regresar en el menu de categorias
document.querySelectorAll('#grid .contenedor-subcategorias .btn-regresar').forEach((boton) => {
  boton.addEventListener('click', (e) => {
    e.preventDefault();
    contenedorSubCategorias.classList.remove('activo');
  });
});

btnCerrarMenu.addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelectorAll('#menu .activo').forEach((elemento) => {
    elemento.classList.remove('activo');
  });
  document.querySelector('body').style.overflow = 'visible';
});

//Slider principal
let indice = 1;
muestraSlides(indice);

function avanzaSlide(n) {
  muestraSlides(indice += n);
}

function posicionSlide(n) {
  console.log('click');
  muestraSlides(indice = n);
}

setInterval(function tiempo() {
  muestraSlides(indice += 1)
}, 5000);

function muestraSlides(n) {
  let i;
  let slides = document.getElementsByClassName('miSlider');
  let barras = document.getElementsByClassName('barra');

  if (n > slides.length) {
    indice = 1;
  }
  if (n < 1) {
    indice = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  for (i = 0; i < barras.length; i++) {
    barras[i].className = barras[i].className.replace(" active", "");
  }

  slides[indice - 1].style.display = 'block';
  barras[indice - 1].className += ' active';

}
