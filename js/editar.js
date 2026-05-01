// Obtenemos el ID de la URL
const urlParams = new URLSearchParams(window.location.search);
const pjId = parseInt(urlParams.get('id'));

// Cargamos la base de datos
let personajes = JSON.parse(localStorage.getItem('virelda_personajes')) || [];
let indicePj = personajes.findIndex(p => p.id === pjId);

// PROTECCIÓN 1: Si no hay personaje, devolvemos al usuario
if(indicePj === -1) {
    alert("⚠️ Personaje no encontrado. Volviendo a la galería.");
    window.location.href = "personajes.html";
} else {
    // Solo si el personaje existe, cargamos todo el resto del código
    const personajeActual = personajes[indicePj];

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

    const anoActualVirelda = 3705;

    const inputNombre = document.getElementById("edit-nombre");
    const inputArquetipo = document.getElementById("edit-arquetipo");
    const imgPreview = document.getElementById("preview-img");
    const fileInput = document.getElementById("edit-img");

    const selectDia = document.getElementById("edit-dia");
    const selectMes = document.getElementById("edit-mes");
    const inputAnio = document.getElementById("edit-anio");
    const inputEdad = document.getElementById("edit-edad");
    const displaySigno = document.getElementById("edit-signo");
    const chkDesvincular = document.getElementById("edit-desvincular");

    for(let i=1; i<=30; i++) {
        selectDia.innerHTML += `<option value="${i}">${i}</option>`;
    }

    inputEdad.addEventListener("input", () => {
        if (!chkDesvincular.checked) {
            if (inputEdad.value !== "") {
                inputAnio.value = anoActualVirelda - parseInt(inputEdad.value);
            } else {
                inputAnio.value = "";
            }
        }
    });

    inputAnio.addEventListener("input", () => {
        if (!chkDesvincular.checked) {
            if (inputAnio.value !== "") {
                inputEdad.value = anoActualVirelda - parseInt(inputAnio.value);
            } else {
                inputEdad.value = "";
            }
        }
    });

    chkDesvincular.addEventListener("change", () => {
        if (!chkDesvincular.checked && inputEdad.value !== "") {
            inputAnio.value = anoActualVirelda - parseInt(inputEdad.value);
        }
    });

    function actualizarSigno() {
        const mes = selectMes.value;
        if (mes && zodiacoVirelda[mes]) {
            displaySigno.textContent = `${zodiacoVirelda[mes].signo} (${zodiacoVirelda[mes].rep})`;
        } else {
            displaySigno.textContent = "-";
        }
    }
    selectMes.addEventListener("change", actualizarSigno);

    const txtConexiones = document.getElementById("edit-conexiones");
    const txtApariencia = document.getElementById("edit-apariencia");
    const txtPersonalidad = document.getElementById("edit-personalidad");
    const txtHabilidades = document.getElementById("edit-habilidades");
    const txtHistoria = document.getElementById("edit-historia");
    const txtCuriosidades = document.getElementById("edit-curiosidades");

    inputNombre.value = personajeActual.nombre || "";
    inputArquetipo.value = personajeActual.arquetipo || "";
    imgPreview.src = personajeActual.img || "https://via.placeholder.com/150/e0d5c1/4b3832?text=Sin+Foto";

    selectDia.value = personajeActual.diaNacimiento || "";
    selectMes.value = personajeActual.mesNacimiento || "";
    inputAnio.value = personajeActual.anioNacimiento || "";
    inputEdad.value = personajeActual.edad || "";
    
    chkDesvincular.checked = (personajeActual.vinculoEdadAnio === false);

    actualizarSigno();

    txtConexiones.value = personajeActual.conexiones || "";
    txtApariencia.value = personajeActual.apariencia || "";
    txtPersonalidad.value = personajeActual.personalidad || "";
    txtHabilidades.value = personajeActual.habilidades || "";
    txtHistoria.value = personajeActual.historia || "";
    txtCuriosidades.value = personajeActual.curiosidades || "";

    let nuevaImagenBase64 = personajeActual.img || "";

    fileInput.addEventListener("change", function(e) {
        const archivo = e.target.files[0];
        if(archivo) {
            const reader = new FileReader();
            reader.onload = function(evento) {
                
                // Creamos un objeto de imagen en la memoria
                const img = new Image();
                img.onload = function() {
                    // Creamos un "lienzo" (canvas) invisible
                    const canvas = document.createElement('canvas');
                    
                    // Definimos el tamaño máximo para la foto de perfil
                    const MAX_WIDTH = 400; 
                    const MAX_HEIGHT = 400;
                    let width = img.width;
                    let height = img.height;

                    // Calculamos las nuevas medidas manteniendo la proporción
                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }

                    // Ajustamos el lienzo e inyectamos la imagen
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);

                    nuevaImagenBase64 = canvas.toDataURL('image/jpeg', 0.7);
                    
                    // Mostramos la imagen comprimida en la pantalla
                    imgPreview.src = nuevaImagenBase64;
                };
                img.src = evento.target.result;
            };
            reader.readAsDataURL(archivo);
        }
    });

    // ==========================================
    // BOTÓN GUARDAR (Con protección de Errores)
    // ==========================================
    document.getElementById("btn-guardar-edit").addEventListener("click", () => {
        personajes[indicePj].nombre = inputNombre.value;
        personajes[indicePj].arquetipo = inputArquetipo.value;
        personajes[indicePj].img = nuevaImagenBase64;
        
        personajes[indicePj].diaNacimiento = selectDia.value;
        personajes[indicePj].mesNacimiento = selectMes.value;
        personajes[indicePj].anioNacimiento = inputAnio.value;
        personajes[indicePj].edad = inputEdad.value;
        personajes[indicePj].signo = selectMes.value ? zodiacoVirelda[selectMes.value].signo : "";
        
        personajes[indicePj].vinculoEdadAnio = !chkDesvincular.checked;
        
        personajes[indicePj].conexiones = txtConexiones.value;
        personajes[indicePj].apariencia = txtApariencia.value;
        personajes[indicePj].personalidad = txtPersonalidad.value;
        personajes[indicePj].habilidades = txtHabilidades.value;
        personajes[indicePj].historia = txtHistoria.value;
        personajes[indicePj].curiosidades = txtCuriosidades.value;

        // PROTECCIÓN 2: El Try-Catch
        try {
            localStorage.setItem('virelda_personajes', JSON.stringify(personajes));
            // Si funciona bien, te lleva a la página de ver
            window.location.href = `ver.html?id=${pjId}`;
        } catch (error) {
            // Si la memoria explota (imagen muy pesada), frena y te avisa
            alert("❌ ERROR AL GUARDAR.\n\nLa memoria de tu navegador está llena. Esto pasa casi siempre porque la imagen que subiste es demasiado pesada.\n\nPor favor, intenta subir una imagen de menor tamaño o guarda el personaje sin foto.");
            console.error(error);
        }
    });

    document.getElementById("btn-eliminar").addEventListener("click", () => {
        const confirmar = confirm(`¿Estás seguro de que deseas borrar a ${personajeActual.nombre}? Esta acción no se puede deshacer.`);
        if(confirmar) {
            personajes = personajes.filter(p => p.id !== pjId);
            localStorage.setItem('virelda_personajes', JSON.stringify(personajes));
            window.location.href = "personajes.html";
        }
    });
}