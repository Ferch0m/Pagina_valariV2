// ===============================
// Diccionario Valari
// ===============================
const valariDict = {

    // Pronouns 
    "i": "mi", "am": "pa",
    "you": "tu", "your": "tur", "yours": "turs", "yourself": "turmelta",
    "he": "he", "his": "hes", "him": "hem", "himself": "hermelta",
    "she": "sa", "hers": "sar", "her": "sam", "herself": "sarmelta",
    "they": "se", "their": "ser", "theirs": "ses", "themself": "sermelta",
    "we": "on", "us": "us", "my": "mo", 
    "this": "dis", "these": "dise",
    "that": "sod", "those": "sode", 

    // Particles
    "the": "vor", "a": "va", "or": "or", "to": "na", "and": "pote", "in": "rin",
    "of": "del", "with": "mor", "when": "pon", "still": "kata",

    // Nouns
    "bird": "fel", "birds": "felin",
    "god": "valar", "gods": "valarin",
    "house": "doman", "moon": "narel", "sun": "solan",
    "stone": "vaen", "stones": "vaen", "truth": "esha",
    "death": "kala", "peace": "sil", "war": "toran",
    "light": "lior", "shadow": "shor", "under": "vash",
    "song": "melor",

    // Nature
    "sky": "shia", "earth": "mera", "water": "doren",
    "wind": "nalek", "fire": "kalor", "forest": "miren",
    "mountain": "ashen", "river": "hoval", "lake": "taren",
    "rain": "yure", "snow": "nalvia", "storm": "karnel",
    "fog": "visha",

    // Time Structure
    "day": "tari", "night": "narin", "morning": "veral",
    "evening": "lunek", "hour": "ethra", "minute": "setra",
    "time": "kavir", "yesterday": "veshan", "today": "niko",
    "tomorrow": "norik", "now": "nure", "future": "lenari",
    "past": "karath", "year": "dalen",

    "monday": "lunari", "tuesday": "mavari", "wednesday": "velkari",
    "thursday": "thalari", "friday": "frenari", "sunday": "solari",

    // People
    "friend": "selin", "enemy": "orvan", "leader": "tholar",
    "child": "shael", "parent": "mora", "teacher": "yuli",
    "soldier": "harnak", "healer": "viler", "children": "shaelin",
    "king": "kovan", "queen": "velar", "stranger": "norin",
    "priest": "shalen", "student": "nurel",
    "man": "daine", "men": "dainema",
    "woman": "leoma", "women": "leomane",
    "guys": "gomas", "ladies": "tergas",
    "guy": "goma", "ladie": "terga",
    "boy": "shaelo", "girl": "shaela",

    // Emotions
    "love": "kar", "loved": "karen", "hate": "zol", "hated": "zolten",
    "like": "kirma", "liked": "kirmaen", "joy": "venor", "enjoy": "venori",
    "sadness": "shiron", "sad": "shir", "anger": "ferik", "fear": "domir",
    "hope": "melin", "dream": "yasha", "destiny": "thivor",
    "soul": "kelan", "mind": "ilen", "memory": "urath",

    // Verbs
    "was": "men", "know": "ren", "knowing": "renun", "knew": "renen",
    "have": "heb", "having": "hebun", "has": "hus", "how": "kav",
    "is": "is", "are": "aren", "will": "mir", "should": "malaka",

    // ---------- Grupo 1: speak ----------
    "speak": "venar", "speaking": "venarun", "spoke": "venaren",
    // ---------- Grupo 2: sleep ----------
    "sleep": "domar", "sleeping": "domarun", "slept": "domaren",
    // ---------- Grupo 3: fight ----------
    "fight": "tharan", "fighting": "tharanun", "fought": "tharen",
    // ---------- Grupo 4: walk ----------
    "walk": "lirvan", "walking": "lirvanun", "walked": "lirven",
    // ---------- Grupo 5: run ----------
    "run": "yunar", "running": "yunarun", "ran": "yunen",
    // ---------- Grupo 6: build ----------
    "build": "kelor", "building": "kelorun", "built": "kelen",
    // ---------- Grupo 7: destroy ----------
    "destroy": "veshar", "destroying": "vesharun", "destroyed": "veshen",
    // ---------- Grupo 8: see ----------
    "see": "tovak", "seeing": "tovakun", "saw": "toven",
    // ---------- Grupo 9: listen ----------
    "listen": "mirenor", "listening": "mirenorun", "listened": "mirenen",
    // ---------- Grupo 10: read ----------
    "read": "naror", "reading": "narorun",
    // ---------- Grupo 11: write ----------
    "write": "sulkar", "writing": "sulkarun", "wrote": "sulken",
    // ---------- Grupo 12: sacrifice ----------
    "sacrifice": "kavael", "sacrificing": "kavaelun", "sacrificed": "kavaelen",
    // ---------- Grupo 13: kill ----------
    "kill": "marde", "killing": "mardeun", "killed": "mardeen",
    // ---------- Grupo 14: fall ----------
    "fall": "wond", "falling": "wondun", "fell": "wonden",
    // ---------- Grupo 15: sing ----------
    "sing": "fela", "singing": "felaun", "sang": "felaen",
    // ---------- Grupo 16: live ----------
    "live": "wiol", "living": "wiolun", "lived": "wiolen",
    // ---------- Grupo 17: go ----------
    "go": "navar", "going": "navarun", "went": "navaren",
    // ---------- Grupo 18: make ----------
    "make": "toril", "making": "torilun", "made": "torilen",
    // ---------- Grupo 19: get ----------
    "get": "gen", "getting": "genun", "got": "genen",

    // Religion
    "religion": "lytheris", "spirit": "nira", "deity": "kaerith",
    "sacred": "selvar", "cursed": "ovel", "prayer": "ishkar",
    "ritual": "relan", "blessing": "ythra", "diamond": "kerta",

    // Extras
    "hi": "ambulo", "hello": "ameo",
    "gay": "fah", "lesbian": "tenbua", "bitch": "sulekan",
    "no-binary": "binao", "shit": "kaeka"
};

// Diccionario inverso
const invDict = {};
for (const [eng, val] of Object.entries(valariDict)) invDict[val] = eng;

// Utilidades
const PUNCT = /^[.,!?;:]$/;
function splitText(text) { return text.match(/[\w']+|[.,!?;:]/g) || []; }
function joinTokens(tokens) {
    return tokens.reduce((acc, t, i) => acc + (i && !PUNCT.test(t) ? " " : "") + t, "");
}

// ✅ Nueva función: capitaliza después de puntos, símbolos o inicio de texto
function capitalizeAfterPunctuation(text) {
    return text.replace(/(^\s*[a-záéíóúñ]|[.!?]\s*[a-záéíóúñ])/g, match => match.toUpperCase());
}

// Traducción base
function translate(sentence, dict) {
    const tokens = splitText(sentence.toLowerCase());
    let unknown = 0;
    const translated = tokens.map(t => {
        if (PUNCT.test(t) || /^\d+$/.test(t)) return t;
        const word = dict[t];
        if (!word) { unknown++; return `[${t}]`; }
        return word;
    });
    const result = joinTokens(translated);
    return { result: capitalizeAfterPunctuation(result), unknown };
}

// Traducción general
function toValari(s) { return translate(s, valariDict); }
function fromValari(s) { return translate(s, invDict); }

// Elementos del DOM
const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const modeSelect = document.getElementById("mode");
const translateBtn = document.getElementById("translateBtn");
const clearHistoryBtn = document.getElementById("clearHistory");

// Los dos cuerpos de tabla
const tbodyToValari = document.getElementById("tabla-to-valari");
const tbodyFromValari = document.getElementById("tabla-from-valari");

const HISTORY_KEY = "valariHistory";

// Cargar historial
let translationHistory = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");

// Adaptar datos viejos al nuevo formato con "modo"
translationHistory = translationHistory.map(item => {
    if (!item.id) {
        return {
            id: Date.now() + Math.random().toString(),
            ingles: item.ingles || item.input, 
            valari: item.valari || item.output,
            mode: 'to_valari' // Por defecto los viejos van a esta tabla
        };
    }
    if (!item.mode) item.mode = 'to_valari';
    return item;
});

// Renderizar ambas tablas
function renderHistory() {
    tbodyToValari.innerHTML = "";
    tbodyFromValari.innerHTML = "";
    
    // Separar el historial según el modo
    const toValariItems = translationHistory.filter(i => i.mode === 'to_valari');
    const fromValariItems = translationHistory.filter(i => i.mode === 'from_valari');

    // Llenar tabla Inglés -> Valari
    if (toValariItems.length === 0) {
        tbodyToValari.innerHTML = `<tr><td colspan="3" style="text-align: center; color: #656D3F;">No hay traducciones.</td></tr>`;
    } else {
        toValariItems.forEach((item, index) => {
            const tr = document.createElement("tr");
            tr.style.backgroundColor = index % 2 === 0 ? "#f8e5d6" : "#f2dfd3";
            tr.innerHTML = `
                <td style="color: #4b3832; font-weight: 500;">${item.ingles}</td>
                <td style="color: #656D3F; font-weight: bold;">${item.valari}</td>
                <td style="text-align: center;">
                    <button onclick="deleteHistoryItem('${item.id}')" class="btn-danger" style="padding: 6px 10px; font-size: 14px; margin: 0;" title="Borrar">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            `;
            tbodyToValari.appendChild(tr);
        });
    }

    // Llenar tabla Valari -> Inglés
    if (fromValariItems.length === 0) {
        tbodyFromValari.innerHTML = `<tr><td colspan="3" style="text-align: center; color: #656D3F;">No hay traducciones.</td></tr>`;
    } else {
        fromValariItems.forEach((item, index) => {
            const tr = document.createElement("tr");
            tr.style.backgroundColor = index % 2 === 0 ? "#f8e5d6" : "#f2dfd3";
            tr.innerHTML = `
                <td style="color: #656D3F; font-weight: bold;">${item.valari}</td>
                <td style="color: #4b3832; font-weight: 500;">${item.ingles}</td>
                <td style="text-align: center;">
                    <button onclick="deleteHistoryItem('${item.id}')" class="btn-danger" style="padding: 6px 10px; font-size: 14px; margin: 0;" title="Borrar">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            `;
            tbodyFromValari.appendChild(tr);
        });
    }
}

// Guardar historial
function saveHistory(textEng, textVal, mode) {
    const newItem = {
        id: Date.now().toString(),
        ingles: textEng,
        valari: textVal,
        mode: mode // Guardamos el modo (to_valari o from_valari)
    };
    
    translationHistory.unshift(newItem); 
    
    // Aumentamos el límite a 40 para que quepan 20 y 20 si está parejo
    if (translationHistory.length > 40) {
        translationHistory.pop();
    }
    
    localStorage.setItem(HISTORY_KEY, JSON.stringify(translationHistory));
    renderHistory();
}

// Borrar todo el historial
function clearHistory() {
    if (translationHistory.length === 0) return;
    
    const confirmar = confirm("¿Estás seguro de que quieres borrar todo el historial de traducciones?");
    if (confirmar) {
        translationHistory = [];
        localStorage.setItem(HISTORY_KEY, JSON.stringify(translationHistory));
        renderHistory();
        outputText.textContent = "🗑️ Historial borrado.";
        outputText.style.color = "#666";
        outputText.style.border = "1px dashed #aaa";
        outputText.style.backgroundColor = "#f2f2f2";
    }
}

// Borrar entrada específica
window.deleteHistoryItem = function(id) {
    translationHistory = translationHistory.filter(item => item.id !== id);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(translationHistory));
    renderHistory();
};

// Acción principal de traducción
function performTranslation() {
    const text = inputText.value.trim();
    if (!text) {
        outputText.textContent = "⚠️ Escribe algo.";
        return;
    }

    if (text.toLowerCase().includes("hetero")) {
        outputText.textContent = "💀 No aceptamos eso aquí.";
        return;
    }

    const currentMode = modeSelect.value;
    const isToValari = currentMode === "to_valari";
    const { result, unknown } = isToValari ? toValari(text) : fromValari(text);

    // Restaurar estilos normales si antes se borró el historial
    outputText.style.border = "1px solid #be9b7b";
    outputText.style.backgroundColor = "#fff4e6";
    
    outputText.textContent = result;
    if (unknown) {
        outputText.style.color = "#e67300"; 
    } else {
        outputText.style.color = "#3b2f2f";
    }
    
    // Determinar qué idioma es cuál
    const engText = isToValari ? text : result;
    const valText = isToValari ? result : text;

    // Pasamos el modo actual a saveHistory
    saveHistory(engText, valText, currentMode);
}

// Eventos
translateBtn.addEventListener("click", performTranslation);
clearHistoryBtn.addEventListener("click", clearHistory);
inputText.addEventListener("keydown", e => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        performTranslation();
    }
});

outputText.addEventListener("click", () => {
    if (!outputText.textContent.trim() || outputText.textContent === "🗑️ Historial borrado." || outputText.textContent === "⚠️ Escribe algo.") return;
    navigator.clipboard.writeText(outputText.textContent);
    
    const originalBg = outputText.style.backgroundColor;
    outputText.style.backgroundColor = "#e0d5c1";
    setTimeout(() => outputText.style.backgroundColor = originalBg, 300);
});

// Inicialización
renderHistory();