const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');

document.addEventListener('DOMContentLoaded', () => {
    formulario.addEventListener('submit', validarBusqueda);
});

function validarBusqueda(e) {
    e.preventDefault();

    const busqueda = document.querySelector('#busqueda').value;
    //console.log(busqueda)
    if (busqueda.length < 3) {
        mostrarMensaje('Busqueda muy corta..... añade mas informacion');
        return;
    }
    consultarAPI(busqueda);
}
function consultarAPI(busqueda) {
    const gitHubUrl = `https://www.freetogame.com/api/games?category=${busqueda}`;
    const url = `https://api.allorigins.win/get?url=${encodeURIComponent(gitHubUrl)}`;
   // console.log(url)
    axios.get(url)
        .then(respuesta => mostrarVacantes(JSON.parse(respuesta.data.contents)));
}

function mostrarVacantes(vacantes) {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }
    if (vacantes.length > 0) {
        resultado.classList.add('grid');
        vacantes.forEach(vacante => {
            const { title, platform, publisher, game_url, thumbnail, short_description } = vacante;

            resultado.innerHTML += `  <div class="shadow bg-white p-6 rounded">
                    <h2 class="text-3xl font-light mb-4"><b><u>${title}</u></b></h2><br>
                    <img src="${thumbnail}">
                    <p class="font-bold uppercase">Plataforma:  <span class="font-light normal-case">${platform} </span></p>
                    <p class="font-bold uppercase">Compañia:   <span class="font-light normal-case">${publisher} </span></p>
                     <p class="font-bold uppercase">Breve descripción:   <span class="font-light normal-case">${short_description} </span></p>
                    <a class="bg-teal-500 max-w-lg mx-auto mt-3 rounded p-2 block uppercase font-xl font-bold text-white text-center" href="${game_url}">Ver Juego</a>
                </div>`
         })
    } else {
        const noResultado = document.createElement('p');
        let termino = document.querySelector('#busqueda').value;
       // termino = termino.toUpperCase()
        resultado.classList.remove('grid');
        noResultado.classList.add('text-center', 'mt-10', 'text-gray-600', 'w-full');
        noResultado.innerHTML = `No hay resultados con el término  <b><u>${termino.toUpperCase()}</u></b>, intenta con otro término de búsqueda`;
        resultado.appendChild(noResultado)
    }
    
}

function mostrarMensaje(msg) {
    const alertaPrevia = document.querySelector('.alerta');
    if (!alertaPrevia) {
        const alerta = document.createElement('div');
        alerta.classList.add('bg-gray-100', 'p-3', 'text-center', 'mt-3', 'alerta');
        resultado.classList.remove('grid');
        alerta.textContent = msg;
        formulario.appendChild(alerta);
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
}