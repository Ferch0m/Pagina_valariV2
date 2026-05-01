let personajes = JSON.parse(localStorage.getItem('virelda_personajes')) || [];
let vistaActual = 'lista'; 

const contenedor = document.getElementById("galeria-personajes");
const inputBuscar = document.getElementById("buscar-pj");
const selectFiltro = document.getElementById("filtro-arquetipo");
const btnVista = document.getElementById("btn-vista");

const modalCrear = document.getElementById("modal-crear");
const btnNuevo = document.getElementById("btn-nuevo");
const btnGuardarNuevo = document.getElementById("btn-guardar-nuevo");
const btnCancelarNuevo = document.getElementById("btn-cancelar-nuevo");

const selectDia = document.getElementById("pj-dia");
if(selectDia){
    for(let i=1; i<=30; i++) {
        selectDia.innerHTML += `<option value="${i}">${i}</option>`;
    }
}

function actualizarEstadisticas() {
    const boxEdades = document.getElementById("stats-edades");
    const boxArq = document.getElementById("stats-arquetipos");
    if(!boxEdades || !boxArq) return;

    let edades = {};
    let arquetipos = {};

    personajes.forEach(p => {
        const edad = p.edad || "Desconocida";
        const arq = p.arquetipo || "Sin asignar";
        edades[edad] = (edades[edad] || 0) + 1;
        arquetipos[arq] = (arquetipos[arq] || 0) + 1;
    });

    boxEdades.innerHTML = Object.entries(edades).map(([e, total]) => `<span class="stat-item">${e} años: ${total}</span>`).join('');
    boxArq.innerHTML = Object.entries(arquetipos).map(([a, total]) => `<span class="stat-item">${a}: ${total}</span>`).join('');
}

function renderizarPersonajes() {
    actualizarEstadisticas();
    const busqueda = inputBuscar.value.toLowerCase();
    const filtroArq = selectFiltro.value;
    
    contenedor.innerHTML = "";
    contenedor.className = vistaActual === 'lista' ? 'vista-lista' : 'vista-cuadricula';

    const filtrados = personajes.filter(p => {
        const coincideNombre = p.nombre.toLowerCase().includes(busqueda);
        const coincideArq = filtroArq === "todos" || p.arquetipo === filtroArq;
        return coincideNombre && coincideArq;
    });

    if(filtrados.length === 0) {
        contenedor.innerHTML = "<p>No hay personajes que coincidan.</p>";
        return;
    }

    filtrados.forEach(p => {
        const card = document.createElement("div");
        card.className = "tarjeta-pj";
        card.onclick = () => { window.location.href = `ver.html?id=${p.id}`; };
        
        const imgSrc = p.img || "https://via.placeholder.com/150/e0d5c1/4b3832?text=Sin+Foto";
        
        card.innerHTML = `
            <img src="${imgSrc}" alt="${p.nombre}">
            <div class="info">
                <h3>${p.nombre}</h3>
                <p><strong>Edad:</strong> ${p.edad || '?'}</p>
                <p><strong>Arquetipo:</strong> ${p.arquetipo || 'Desconocido'}</p>
            </div>
        `;
        contenedor.appendChild(card);
    });
}

function crearPersonajeInicial() {
    const nombre = document.getElementById("pj-nombre").value;
    const dia = document.getElementById("pj-dia").value;
    const mes = document.getElementById("pj-mes").value;
    const edad = document.getElementById("pj-edad").value; 

    if(!nombre) { alert("El nombre es obligatorio"); return; }

    const anioActualVirelda = 3705;
    const anioCalculado = edad ? (anioActualVirelda - parseInt(edad)) : "";

    const idNuevo = Date.now();
    const nuevoPj = {
        id: idNuevo,
        nombre: nombre,
        edad: edad,
        arquetipo: "",
        img: "",
        diaNacimiento: dia,
        mesNacimiento: mes,
        anioNacimiento: anioCalculado,
        vinculoEdadAnio: true, 
        conexiones: "", apariencia: "", personalidad: "",
        habilidades: "", historia: "", curiosidades: ""
    };
    
    personajes.push(nuevoPj);
    localStorage.setItem('virelda_personajes', JSON.stringify(personajes));
    
    window.location.href = `editar.html?id=${idNuevo}`;
}

// ==========================================
// LÓGICA DE IMPORTACIÓN Y EXPORTACIÓN
// ==========================================

// 1. Exportar a JSON
document.getElementById('btn-exportar').addEventListener('click', () => {
    if (personajes.length === 0) {
        alert("No hay personajes para exportar.");
        return;
    }
    // Convertir el array a un string JSON con formato bonito (indentado)
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(personajes, null, 2));
    
    // Crear un enlace invisible y forzar el clic para descargar
    const enlaceDescarga = document.createElement('a');
    enlaceDescarga.setAttribute("href", dataStr);
    enlaceDescarga.setAttribute("download", "Copia_Universo_Virelda.json");
    document.body.appendChild(enlaceDescarga);
    enlaceDescarga.click();
    enlaceDescarga.remove();
});

// 2. Importar desde JSON
document.getElementById('input-importar').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const datosImportados = JSON.parse(e.target.result);
            
            if (Array.isArray(datosImportados)) {
                // Preguntar al usuario qué hacer con los datos
                const reemplazar = confirm("Se ha cargado el archivo correctamente.\n\n¿Deseas REEMPLAZAR todos tus personajes actuales?\n\n(Haz clic en 'Aceptar' para borrar los actuales y usar los del archivo. Haz clic en 'Cancelar' para FUSIONARLOS, conservando los actuales y sumando los nuevos).");
                
                if (reemplazar) {
                    personajes = datosImportados;
                } else {
                    // Concatenar los arrays (fusión)
                    personajes = personajes.concat(datosImportados);
                }
                
                localStorage.setItem('virelda_personajes', JSON.stringify(personajes));
                renderizarPersonajes();
                alert("¡Personajes importados con éxito!");
            } else {
                alert("El archivo subido no es válido o está corrupto.");
            }
        } catch (error) {
            alert("Error al leer el archivo. Asegúrate de que sea el JSON de Virelda.");
        }
    };
    reader.readAsText(file);
    
    // Reiniciar el input por si quieres subir el mismo archivo después
    event.target.value = '';
});

// ==========================================
// EVENT LISTENERS RESTANTES
// ==========================================

inputBuscar.addEventListener("input", renderizarPersonajes);
selectFiltro.addEventListener("change", renderizarPersonajes);

btnVista.addEventListener("click", () => {
    vistaActual = vistaActual === 'lista' ? 'cuadricula' : 'lista';
    const icono = vistaActual === 'lista' ? 'fa-border-all' : 'fa-list';
    btnVista.innerHTML = `<i class="fa-solid ${icono}"></i>`;
    renderizarPersonajes();
});

btnNuevo.addEventListener("click", () => modalCrear.showModal());

btnCancelarNuevo.addEventListener("click", () => {
    modalCrear.close();
    document.getElementById("pj-nombre").value = "";
    document.getElementById("pj-dia").value = "";
    document.getElementById("pj-mes").value = "";
    document.getElementById("pj-edad").value = "";
});

btnGuardarNuevo.addEventListener("click", crearPersonajeInicial);

renderizarPersonajes();