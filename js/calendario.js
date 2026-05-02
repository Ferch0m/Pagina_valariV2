const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
    "Julio", "Agosto", "Septiembre", "Octubre"
];

// Aquí agregas las fechas importantes de tu Lore
const festividades = {
    // Ejemplo: 2 de Octubre (Índice 9 es Octubre)
    5: { 4: "Purification Day" }, 
    9: { 13: "Echo of Kaerith" },
    5: { 1: "The Day Of Sacrifice" },
};

let mesMostrado = 0; // 0 = Enero
let vistaLista = false; // Controla si vemos 1 mes o los 10 meses

function toggleVistaCalendario() {
    vistaLista = !vistaLista;
    const btn = document.getElementById("btn-vista-calendario");
    const controlesMes = document.getElementById("controles-mes");

    if (vistaLista) {
        btn.innerHTML = '<i class="fa-solid fa-calendar"></i> Ver por Mes';
        controlesMes.style.display = 'none'; // Ocultamos los botones de navegación
    } else {
        btn.innerHTML = '<i class="fa-solid fa-list-ul"></i> Ver como Lista';
        controlesMes.style.display = 'flex'; // Mostramos los botones de navegación
    }
    renderizarCalendario();
}

function generarHTMLMes(indiceMes, personajes) {
    let html = `<div style="margin-bottom: 40px;">`;
    
    // Título del mes (solo visible en vista de lista)
    if (vistaLista) {
        html += `<h3 style="color: #656D3F; border-bottom: 2px solid #84934A; padding-bottom: 10px; margin-bottom: 15px; text-align: left;">${meses[indiceMes]}</h3>`;
    }

    html += `<div class="calendar-grid">`;
    
    // Cabeceras de 6 días
    const diasSemana = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie"];
    diasSemana.forEach(dia => {
        html += `<div class="calendar-day-header">${dia}</div>`;
    });

    // 30 días del mes
    for (let i = 1; i <= 30; i++) {
        let clasesDia = "calendar-day";
        let contenidoEventos = "";

        // Buscar festividades
        if (festividades[indiceMes] && festividades[indiceMes][i]) {
            contenidoEventos += `<div class="event-badge event-festivity"><i class="fa-solid fa-star"></i> ${festividades[indiceMes][i]}</div>`;
        }

        // Buscar cumpleaños de personajes
        const cumpleaneros = personajes.filter(p => parseInt(p.mesNacimiento) === (indiceMes + 1) && parseInt(p.diaNacimiento) === i);
        cumpleaneros.forEach(p => {
            contenidoEventos += `<div class="event-badge"><i class="fa-solid fa-cake-candles"></i> ${p.nombre}</div>`;
        });

        html += `<div class="${clasesDia}">
                    <div class="date-num">${i}</div>
                    ${contenidoEventos}
                 </div>`;
    }
    
    html += `</div></div>`;
    return html;
}

function renderizarCalendario() {
    const contenedor = document.getElementById("calendario-contenedor");
    const tituloMes = document.getElementById("mes-actual");
    const personajes = JSON.parse(localStorage.getItem('virelda_personajes')) || [];
    
    contenedor.innerHTML = "";

    if (vistaLista) {
        // MODO LISTA: Renderizar los 10 meses
        for (let i = 0; i < 10; i++) {
            contenedor.innerHTML += generarHTMLMes(i, personajes);
        }
    } else {
        // MODO MES: Renderizar solo el mes actual
        tituloMes.textContent = meses[mesMostrado];
        contenedor.innerHTML = generarHTMLMes(mesMostrado, personajes);
    }
}

function cambiarMes(direccion) {
    mesMostrado += direccion;
    if (mesMostrado < 0) mesMostrado = 9; // Volver a Octubre
    if (mesMostrado > 9) mesMostrado = 0; // Volver a Enero
    renderizarCalendario();
}

// Iniciar calendario al cargar la página
renderizarCalendario();