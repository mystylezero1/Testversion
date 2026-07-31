let gaeste = [];

const sprueche = [
    "🎉 Heey! Da bist du ja!",
    "🥳 Jackpot! Dein Tisch wartet!",
    "🍾 Jetzt wird gefeiert!",
    "🎊 Willkommen! Auf geht's!",
    "🥂 Viel Spaß auf der Hochzeit!",
    "😄 Schön, dass du da bist!"
];

// --- INITIALISIERUNG ---
document.addEventListener("DOMContentLoaded", () => {
    const saalplan = document.getElementById("saalplan");
    const overlay = document.getElementById("overlay");
    const welcome = document.getElementById("welcome");
    const neueSucheBtn = document.getElementById("neueSucheBtn");
    
    if (saalplan) saalplan.classList.add("hidden");
    if (overlay) overlay.classList.add("hidden");
    if (neueSucheBtn) neueSucheBtn.classList.add("hidden");
    if (welcome) welcome.classList.remove("hidden");

    // Event Listener für Buttons & Eingabe
    const findenBtn = document.getElementById("finden");
    if (findenBtn) findenBtn.addEventListener("click", sucheGast);

    const searchInput = document.getElementById("search");
    if (searchInput) {
        searchInput.addEventListener("keydown", e => {
            if (e.key === "Enter") sucheGast();
        });
    }

    const gesamtPlanBtn = document.getElementById("zeigeGesamtenPlanBtn");
    if (gesamtPlanBtn) {
        gesamtPlanBtn.addEventListener("click", () => {
            openSaalplanView();
            clearHighlights();
            if (overlay) overlay.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    if (neueSucheBtn) {
        neueSucheBtn.addEventListener("click", () => {
            if (saalplan) saalplan.classList.add("hidden");
            if (overlay) overlay.classList.add("hidden");
            if (neueSucheBtn) neueSucheBtn.classList.add("hidden");
            if (welcome) welcome.classList.remove("hidden");
            if (searchInput) {
                searchInput.value = "";
                searchInput.focus();
            }
            const modal = document.getElementById("auswahlModal");
            if (modal) modal.remove();
        });
    }

    // Admin Modal Event-Listener
    const adminOpenBtn = document.getElementById("adminOpenBtn");
    const adminCloseBtn = document.getElementById("adminCloseBtn");
    const adminModal = document.getElementById("adminModal");
    const adminSearch = document.getElementById("adminSearch");
    const downloadJsonBtn = document.getElementById("downloadJsonBtn");
    const addGastBtn = document.getElementById("addGastBtn");

    if (adminOpenBtn) {
        adminOpenBtn.addEventListener("click", () => {
            if (adminModal) adminModal.classList.remove("hidden");
            renderAdminListe();
        });
    }

    if (adminCloseBtn) {
        adminCloseBtn.addEventListener("click", () => {
            if (adminModal) adminModal.classList.add("hidden");
        });
    }

    if (adminSearch) {
        adminSearch.addEventListener("input", () => {
            renderAdminListe(adminSearch.value.trim().toLowerCase());
        });
    }

    if (addGastBtn) {
        addGastBtn.addEventListener("click", neuerGastHinzufuegen);
    }

    if (downloadJsonBtn) {
        downloadJsonBtn.addEventListener("click", downloadUpdatedJSON);
    }
});

// --- DATEN LADEN ---
fetch("data.json")
    .then(r => r.json())
    .then(data => {
        gaeste = data;
        sitzplanErstellen();
    })
    .catch(err => console.error("Fehler beim Laden der data.json:", err));

// --- SAALPLAN RENDERN ---
function sitzplanErstellen() {
    const braut = document.getElementById("brauttisch");
    const tische = document.getElementById("tische");

    if (!braut || !tische) return;

    braut.innerHTML = "";
    tische.innerHTML = "";

    // Brauttisch
    let brautGaeste = gaeste.filter(g => String(g.tisch).toLowerCase() === "braut");
    brautGaeste.sort((a, b) => a.platz - b.platz);

    let obenBraut = brautGaeste.filter(g => g.platz >= 1 && g.platz <= 8);
    let untenBraut = brautGaeste.filter(g => g.platz >= 9 && g.platz <= 14);

    braut.innerHTML = `
        <div class="braut-reihe braut-oben">
            ${obenBraut.map(g => platzHTML(g)).join("")}
        </div>
        <div class="braut-platte">
            <span class="tisch-tag">Tisch 1</span>
            <span>👰🤵 Brauttisch</span>
            <span class="tisch-tag">Tisch 2</span>
        </div>
        <div class="braut-reihe braut-unten">
            ${untenBraut.map(g => platzHTML(g)).join("")}
        </div>
    `;

    // Numerierte Tische (Positionierung im Grid)
    const tischPositionen = {
        3:  { col: 1, row: 1 }, 4:  { col: 2, row: 1 }, 5:  { col: 3, row: 1 }, 6:  { col: 4, row: 1 }, 7:  { col: 5, row: 1 },
        8:  { col: 1, row: 2 }, 9:  { col: 2, row: 2 }, 10: { col: 3, row: 2 }, 11: { col: 4, row: 2 }, 12: { col: 5, row: 2 },
        13: { col: 1, row: 3 }, 14: { col: 2, row: 3 }, 15: { col: 3, row: 3 }, 16: { col: 4, row: 3 },
        17: { col: 1, row: 4 }, 18: { col: 2, row: 4 }, 19: { col: 3, row: 4 }, 20: { col: 4, row: 4 }
    };

    let nummern = [...new Set(gaeste.filter(g => String(g.tisch).toLowerCase() !== "braut").map(g => Number(g.tisch)))];
    nummern.sort((a, b) => a - b);

    const isDesktop = window.innerWidth >= 1200;

    nummern.forEach(nummer => {
        let personen = gaeste.filter(g => Number(g.tisch) === nummer);
        personen.sort((a, b) => a.platz - b.platz);

        let haelfte = Math.ceil(personen.length / 2);
        let links = personen.slice(0, haelfte);
        let rechts = personen.slice(haelfte);

        let box = document.createElement("div");
        box.className = "tisch-box";
        box.dataset.tisch = nummer;

        if (isDesktop && tischPositionen[nummer]) {
            box.style.gridColumn = tischPositionen[nummer].col;
            box.style.gridRow = tischPositionen[nummer].row;
        }

        box.innerHTML = `
            <div class="tisch-inhalt">
                <div class="seite links">
                    ${links.map(g => platzHTML(g)).join("")}
                </div>
                <div class="tisch-label">
                    <span>${nummer}</span>
                </div>
                <div class="seite rechts">
                    ${rechts.map(g => platzHTML(g)).join("")}
                </div>
            </div>
        `;
        tische.appendChild(box);
    });

    // Buffet & Ausschank Box
    const buffetDiv = document.createElement("div");
    buffetDiv.className = "buffet-box";
    if (isDesktop) {
        buffetDiv.style.gridColumn = "6";
        buffetDiv.style.gridRow = "2";
    }
    buffetDiv.innerHTML = `
        <div class="arrow">➔</div>
        <div>Ausschank & Buffet</div>
    `;
    tische.appendChild(buffetDiv);
}

// HTML für einzelne Sitzplätze (Stern ⭐ wird nur angezeigt wenn g.kind true ist)
function platzHTML(g) {
    if (g.disabled) {
        return `<div class="platz disabled"></div>`;
    }
    const isKind = g.kind ? `<span class="kind-star" title="Kind">⭐</span>` : '';
    return `
        <div class="platz" data-name="${g.name.toLowerCase()}" data-platz="${g.platz}">
            <span class="platz-nr">${g.platz}</span>
            <span class="platz-name">${g.name}</span>
            ${isKind}
        </div>
    `;
}

// --- HIGHLIGHTS ZURÜCKSETZEN ---
function clearHighlights() {
    document.querySelectorAll(".highlight").forEach(t => t.classList.remove("highlight"));
    document.querySelectorAll(".highlight-name").forEach(n => n.classList.remove("highlight-name"));
}

// --- SUCH-LOGIK ---
function sucheGast() {
    const searchInput = document.getElementById("search");
    if (!searchInput) return;

    const eingabe = searchInput.value.trim().toLowerCase();
    if (eingabe === "") return;

    const tischMatch = eingabe.match(/^(?:tisch\s*)?(\d+)$/i);
    if (tischMatch) {
        const tischNummer = tischMatch[1];
        zeigeTischOnPlan(tischNummer);
        return;
    }

    const treffer = gaeste.filter(g => !g.disabled && g.name.toLowerCase().includes(eingabe));

    if (treffer.length === 0) {
        alert("Gast oder Tisch '" + searchInput.value + "' wurde leider nicht gefunden.");
        return;
    }

    if (treffer.length === 1) {
        zeigeGastOnPlan(treffer[0]);
    } else {
        auswahlMenueAnzeigen(treffer);
    }
}

function zeigeTischOnPlan(tischNummer) {
    openSaalplanView();
    clearHighlights();

    const targetTable = document.querySelector(`.tisch-box[data-tisch="${tischNummer}"]`);
    if (targetTable) {
        targetTable.classList.add("highlight");
        setTimeout(() => targetTable.scrollIntoView({ behavior: "smooth", block: "center" }), 300);
        anzeigeSprechblase(`Tisch ${tischNummer}`);
    } else {
        alert(`Tisch ${tischNummer} existiert nicht.`);
    }
}

function auswahlMenueAnzeigen(trefferListe) {
    const altesModal = document.getElementById("auswahlModal");
    if (altesModal) altesModal.remove();

    const modal = document.createElement("div");
    modal.id = "auswahlModal";
    modal.className = "auswahl-modal";

    let html = `
        <div class="auswahl-box">
            <h3>Wen meinst du genau?</h3>
            <div class="auswahl-liste">
    `;

    trefferListe.forEach((g, index) => {
        const tischBez = String(g.tisch).toLowerCase() === "braut" ? "Brauttisch" : `Tisch ${g.tisch}`;
        html += `
            <button class="auswahl-btn" onclick="waehleGastAus(${index})">
                <b>${g.name}</b>
                <span class="auswahl-tisch">${tischBez}</span>
            </button>
        `;
    });

    html += `
            </div>
            <button class="auswahl-abbrechen" onclick="document.getElementById('auswahlModal').remove()">Abbrechen</button>
        </div>
    `;

    modal.innerHTML = html;
    document.body.appendChild(modal);
    window.aktuelleTreffer = trefferListe;
}

window.waehleGastAus = function(index) {
    if (window.aktuelleTreffer && window.aktuelleTreffer[index]) {
        zeigeGastOnPlan(window.aktuelleTreffer[index]);
        const modal = document.getElementById("auswahlModal");
        if (modal) modal.remove();
    }
};

function openSaalplanView() {
    const welcome = document.getElementById("welcome");
    const overlay = document.getElementById("overlay");
    const saalplan = document.getElementById("saalplan");
    const neueSucheBtn = document.getElementById("neueSucheBtn");

    if (welcome) welcome.classList.add("hidden");
    if (overlay) overlay.classList.remove("hidden");
    if (saalplan) saalplan.classList.remove("hidden");
    if (neueSucheBtn) neueSucheBtn.classList.remove("hidden");
}

function zeigeGastOnPlan(gast) {
    openSaalplanView();
    clearHighlights();

    let zielElement;
    if (String(gast.tisch).toLowerCase() === "braut") {
        zielElement = document.getElementById("brauttisch");
    } else {
        zielElement = document.querySelector(`.tisch-box[data-tisch="${gast.tisch}"]`);
    }

    if (zielElement) {
        zielElement.classList.add("highlight");
        
        const nameCard = zielElement.querySelector(`.platz[data-platz="${gast.platz}"]`);
        if (nameCard) {
            nameCard.classList.add("highlight-name");
        }

        setTimeout(() => {
            zielElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 300);
    }

    anzeigeSprechblase(gast.name);
}

// --- SPRECHBLASE, SOUND & KONFETTI ---
function anzeigeSprechblase(name) {
    const speech = document.getElementById("speech");
    if (!speech) return;

    const audio = document.getElementById("ding");
    if (audio) {
        audio.currentTime = 0;
        audio.play().catch(err => {
            console.log("Audio konnte nicht automatisch abgespielt werden:", err);
        });
    }

    const zufallsSpruch = sprueche[Math.floor(Math.random() * sprueche.length)];
    speech.innerHTML = `<h2>${name}</h2><p>${zufallsSpruch}</p>`;
    speech.classList.remove("hidden");

    if (typeof confetti === "function") {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }

    setTimeout(() => {
        speech.classList.add("hidden");
    }, 4000);
}

// --- ADMIN KONSOLE LOGIK ---
function renderAdminListe(filter = "") {
    const listeContainer = document.getElementById("adminGaesteListe");
    if (!listeContainer) return;

    listeContainer.innerHTML = "";

    const gefilterteGaeste = gaeste.filter(g => !g.disabled && g.name.toLowerCase().includes(filter));

    gefilterteGaeste.forEach((gast) => {
        const row = document.createElement("div");
        row.className = "admin-row";

        const tischText = String(gast.tisch).toLowerCase() === "braut" ? "Brauttisch" : `Tisch ${gast.tisch}`;

        // Checkbox direkt hinter dem Namen platziert
        row.innerHTML = `
            <div class="admin-row-info">
                <span class="admin-row-name">
                    ${gast.name}
                    <label class="admin-checkbox-label">
                        <input type="checkbox" ${gast.kind ? "checked" : ""} onchange="toggleKindState('${gast.name}', '${gast.tisch}', ${gast.platz}, this.checked)">
                        Kind
                    </label>
                </span>
                <span class="admin-row-tisch">${tischText} (Platz ${gast.platz})</span>
            </div>
            <div class="admin-row-actions">
                <button class="btn-delete" title="Gast entfernen" onclick="entferneGast('${gast.name}', '${gast.tisch}', ${gast.platz})">🗑️</button>
            </div>
        `;
        listeContainer.appendChild(row);
    });
}

// Gast Hinzufügen
function neuerGastHinzufuegen() {
    const nameInput = document.getElementById("addGastName");
    const tischInput = document.getElementById("addGastTisch");
    const platzInput = document.getElementById("addGastPlatz");
    const kindInput = document.getElementById("addGastKind");

    const name = nameInput.value.trim();
    let tisch = tischInput.value.trim();
    const platz = Number(platzInput.value.trim());
    const isKind = kindInput.checked;

    if (!name || !tisch || !platz) {
        alert("Bitte fülle Name, Tisch und Platznummer aus.");
        return;
    }

    if (tisch.toLowerCase() !== "braut" && !isNaN(tisch)) {
        tisch = Number(tisch);
    }

    const neuerGast = {
        name: name,
        tisch: tisch,
        platz: platz
    };
    if (isKind) neuerGast.kind = true;

    gaeste.push(neuerGast);

    nameInput.value = "";
    tischInput.value = "";
    platzInput.value = "";
    kindInput.checked = false;

    sitzplanErstellen();
    renderAdminListe(document.getElementById("adminSearch").value.trim().toLowerCase());
}

// Gast Entfernen
window.entferneGast = function(name, tisch, platz) {
    if (!confirm(`Möchtest du ${name} wirklich vom Sitzplan entfernen?`)) return;

    const index = gaeste.findIndex(g => g.name === name && String(g.tisch) === String(tisch) && g.platz == platz);
    if (index !== -1) {
        gaeste.splice(index, 1);
        sitzplanErstellen();
        renderAdminListe(document.getElementById("adminSearch").value.trim().toLowerCase());
    }
};

// Wenn Kind-Haken gesetzt/entfernt wird
window.toggleKindState = function(name, tisch, platz, isKind) {
    const target = gaeste.find(g => g.name === name && String(g.tisch) === String(tisch) && g.platz == platz);
    if (target) {
        if (isKind) {
            target.kind = true;
        } else {
            delete target.kind;
        }
        sitzplanErstellen();
    }
};

// JSON Datei Herunterladen
function downloadUpdatedJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(gaeste, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "data.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
}
