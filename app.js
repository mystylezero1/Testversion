let gaeste = [];

const sprueche = [
    "🎉 Heey! Da bist du ja!",
    "🥳 Jackpot! Dein Tisch wartet!",
    "🍾 Jetzt wird gefeiert!",
    "🎊 Willkommen! Auf geht's!",
    "🥂 Viel Spaß auf der Hochzeit!",
    "😄 Schön, dass du da bist!"
];

document.addEventListener("DOMContentLoaded", () => {
    const saalplan = document.getElementById("saalplan");
    const overlay = document.getElementById("overlay");
    const welcome = document.getElementById("welcome");
    const neueSucheBtn = document.getElementById("neueSucheBtn");
    
    if (saalplan) saalplan.classList.add("hidden");
    if (overlay) overlay.classList.add("hidden");
    if (neueSucheBtn) neueSucheBtn.classList.add("hidden");
    if (welcome) welcome.classList.remove("hidden");

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
            if (welcome) welcome.classList.add("hidden");
            if (overlay) overlay.classList.remove("hidden");
            if (saalplan) saalplan.classList.remove("hidden");
            if (neueSucheBtn) neueSucheBtn.classList.remove("hidden");
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
});

fetch("data.json")
    .then(r => r.json())
    .then(data => {
        gaeste = data;
        sitzplanErstellen();
    })
    .catch(err => console.error("Fehler beim Laden:", err));

function sitzplanErstellen() {
    const braut = document.getElementById("brauttisch");
    const tische = document.getElementById("tische");

    if (!braut || !tische) return;

    braut.innerHTML = "";
    tische.innerHTML = "";

    let brautGaeste = gaeste.filter(g => g.tisch === "Braut");
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

    const tischPositionen = {
        3:  { col: 1, row: 1 }, 4:  { col: 2, row: 1 }, 5:  { col: 3, row: 1 }, 6:  { col: 4, row: 1 }, 7:  { col: 5, row: 1 },
        8:  { col: 1, row: 2 }, 9:  { col: 2, row: 2 }, 10: { col: 3, row: 2 }, 11: { col: 4, row: 2 }, 12: { col: 5, row: 2 },
        13: { col: 1, row: 3 }, 14: { col: 2, row: 3 }, 15: { col: 3, row: 3 }, 16: { col: 4, row: 3 },
        17: { col: 1, row: 4 }, 18: { col: 2, row: 4 }, 19: { col: 3, row: 4 }, 20: { col: 4, row: 4 }
    };

    let nummern = [...new Set(gaeste.filter(g => g.tisch !== "Braut").map(g => Number(g.tisch)))];
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

function clearHighlights() {
    document.querySelectorAll(".highlight").forEach(t => t.classList.remove("highlight"));
    document.querySelectorAll(".highlight-name").forEach(n => n.classList.remove("highlight-name"));
}

function sucheGast() {
    const searchInput = document.getElementById("search");
    if (!searchInput) return;

    const eingabe = searchInput.value.trim().toLowerCase();
    if (eingabe === "") return;

    // Prüfe, ob nach einer Tischnummer gesucht wird (z. B. "5" oder "tisch 5")
    const tischMatch = eingabe.match(/^(?:tisch\s*)?(\d+)$/i);
    if (tischMatch) {
        const tischNummer = tischMatch[1];
        zeigeTischOnPlan(tischNummer);
        return;
    }

    // Suche nach Gastname
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
        const tischBez = g.tisch === "Braut" ? "Brauttisch" : `Tisch ${g.tisch}`;
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
    if (gast.tisch === "Braut") {
        zielElement = document.getElementById("brauttisch");
    } else {
        zielElement = document.querySelector(`.tisch-box[data-tisch="${gast.tisch}"]`);
    }

    if (zielElement) {
        zielElement.classList.add("highlight");
        
        // Suche und blinke das konkrete Name-Kästchen auf!
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

function anzeigeSprechblase(name) {
    const speech = document.getElementById("speech");
    if (!speech) return;

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
