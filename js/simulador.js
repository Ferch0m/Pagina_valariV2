const zodiacoVirelda = {
    1: { signo: "Auralis", rep: "Inicios" },
    2: { signo: "Lunara", rep: "Intuición" },
    3: { signo: "Pyrion", rep: "Pasión" },
    4: { signo: "Terravon", rep: "Estabilidad" },
    5: { signo: "Zephyros", rep: "Alegría y Juego" },
    6: { signo: "Solyra", rep: "Creatividad" },
    7: { signo: "Ocealis", rep: "Emoción" },
    8: { signo: "Ignara", rep: "Fuerza" },
    9: { signo: "Umbrith", rep: "Transformación" },
    10: { signo: "Stellara", rep: "Visión Cósmica" }
};

const coloresTabla = ["#f8e5d6", "#ebd5c1", "#f2dfd3", "#e6cca3", "#f9ece4"];

// Cargar historial del LocalStorage
let historialSim = JSON.parse(localStorage.getItem('virelda_sim_history')) || [];

function renderizarHistorial() {
    const tbody = document.getElementById("tabla-historial");
    tbody.innerHTML = ""; // Limpiamos la tabla
    
    // Si no hay historial, mostramos un mensaje
    if(historialSim.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: #656D3F;">No hay simulaciones recientes.</td></tr>`;
        return;
    }

    // Dibujamos cada fila guardada
    historialSim.forEach(item => {
        const tr = document.createElement("tr");
        tr.style.backgroundColor = item.colorFila;
        
        tr.innerHTML = `
            <td style="font-weight: bold; color: #4b3832;">${item.nombre}</td>
            <td>${item.edad}</td>
            <td>${item.anoNacimiento}</td>
            <td><strong>${item.signo}</strong></td>
            <td>${item.rep}</td>
            <td style="text-align: center;">
                <button onclick="borrarEntrada(${item.id})" class="btn-danger" style="padding: 6px 12px; font-size: 14px; margin: 0;" title="Borrar entrada">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function simular() {
    const nombre = document.getElementById("sim-nombre").value || "Desconocido";
    const edad = parseInt(document.getElementById("sim-edad").value);
    const mes = document.getElementById("sim-mes").value;
    const anoActual = 3705; // Año actual en Virelda
    
    if(!edad) { alert("Ingresa una edad válida"); return; }

    const anoNacimiento = anoActual - edad;
    const datosSigno = zodiacoVirelda[mes];
    const colorFila = coloresTabla[Math.floor(Math.random() * coloresTabla.length)];

    // Crear un objeto con los datos de esta simulación
    const nuevaSim = {
        id: Date.now(), // ID único basado en la fecha y hora
        nombre: nombre,
        edad: edad,
        anoNacimiento: anoNacimiento,
        signo: datosSigno.signo,
        rep: datosSigno.rep,
        colorFila: colorFila
    };

    // Agregar al principio del historial y guardar
    historialSim.unshift(nuevaSim);
    localStorage.setItem('virelda_sim_history', JSON.stringify(historialSim));
    
    // Actualizar la vista
    renderizarHistorial();

    // Limpiar inputs
    document.getElementById("sim-nombre").value = "";
    document.getElementById("sim-edad").value = "";
}

// Función para borrar UNA fila específica
function borrarEntrada(id) {
    historialSim = historialSim.filter(item => item.id !== id);
    localStorage.setItem('virelda_sim_history', JSON.stringify(historialSim));
    renderizarHistorial();
}

// Función para limpiar TODO el historial
function limpiarHistorial() {
    if(historialSim.length === 0) return;
    
    const confirmar = confirm("¿Estás seguro de que quieres borrar todo el historial de simulaciones?");
    if(confirmar) {
        historialSim = [];
        localStorage.setItem('virelda_sim_history', JSON.stringify(historialSim));
        renderizarHistorial();
    }
}

// Renderizar la tabla la primera vez que se carga la página
renderizarHistorial();