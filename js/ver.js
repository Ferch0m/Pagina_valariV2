const urlParams = new URLSearchParams(window.location.search);
const pjId = parseInt(urlParams.get('id'));

const personajes = JSON.parse(localStorage.getItem('virelda_personajes')) || [];
const pj = personajes.find(p => p.id === pjId);

if(!pj) {
    alert("Personaje no encontrado.");
    window.location.href = "personajes.html";
}

// Llenar datos básicos
document.getElementById("ver-img").src = pj.img || "https://via.placeholder.com/150/e0d5c1/4b3832?text=Sin+Foto";
document.getElementById("ver-nombre").textContent = pj.nombre;
document.getElementById("ver-edad").textContent = pj.edad || "?";
document.getElementById("ver-arquetipo").textContent = pj.arquetipo || "Desconocido";

const nombresMeses = {
    1: "Enero", 2: "Febrero", 3: "Marzo", 4: "Abril", 5: "Mayo", 
    6: "Junio", 7: "Julio", 8: "Agosto", 9: "Septiembre", 10: "Octubre"
};

// Insertar la Fecha de Nacimiento y el Signo en el mismo formato fijo
const cabeceraInfo = document.getElementById("ver-arquetipo").parentElement;

if (pj.diaNacimiento && pj.mesNacimiento && pj.anioNacimiento) {
    const pFecha = document.createElement("p");
    pFecha.style.cssText = "font-size: 18px; margin: 5px 0;";
    pFecha.innerHTML = `<strong>Nacimiento:</strong> ${pj.diaNacimiento} de ${nombresMeses[pj.mesNacimiento]}, Año ${pj.anioNacimiento}`;
    cabeceraInfo.appendChild(pFecha);
}

if (pj.signo) {
    const pSigno = document.createElement("p");
    pSigno.style.cssText = "font-size: 18px; margin: 5px 0;";
    pSigno.innerHTML = `<strong>Zodiaco:</strong> ${pj.signo}`;
    cabeceraInfo.appendChild(pSigno);
}

// Función para mostrar u ocultar secciones dependiendo de si tienen texto
function configurarSeccion(idSeccion, idTexto, contenido) {
    const contenedor = document.getElementById(idSeccion);
    const parrafo = document.getElementById(idTexto);
    
    if (contenido && contenido.trim() !== "") {
        parrafo.textContent = contenido;
        contenedor.style.display = "block"; // Mostrar si hay info
    } else {
        contenedor.style.display = "none"; // Ocultar si está vacío
    }
}

// Configurar cada sección dinámica
configurarSeccion("sec-conexiones", "txt-conexiones", pj.conexiones);
configurarSeccion("sec-apariencia", "txt-apariencia", pj.apariencia);
configurarSeccion("sec-personalidad", "txt-personalidad", pj.personalidad);
configurarSeccion("sec-habilidades", "txt-habilidades", pj.habilidades);
configurarSeccion("sec-historia", "txt-historia", pj.historia);
configurarSeccion("sec-curiosidades", "txt-curiosidades", pj.curiosidades);

// Botón para ir al editor
document.getElementById("btn-ir-editar").addEventListener("click", () => {
    window.location.href = `editar.html?id=${pj.id}`;
});