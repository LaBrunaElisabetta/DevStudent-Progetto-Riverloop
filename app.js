// ANNO CORRENTE
const yearEl = document.getElementById("year");

if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

// TOGGLE MENU ICON/HAMBURGHER
const menuBtn = document.getElementById("menu-button");
const primaryNav = document.getElementById("primary-nav");

if (menuBtn && primaryNav) {
  // CLICK SUL MENU
  menuBtn.addEventListener("click", () => {
    // ARIA-EXPANDED TRUE O FALSE
    const isOpen = menuBtn.getAttribute("aria-expanded") === "true";
    const next = !isOpen; // INVERSIONE DELLO STATO

    // AGGIORNAMENTO DI ARIA-EXPANDED A TRUE O FALSE
    menuBtn.setAttribute("aria-expanded", String(next));
    primaryNav.setAttribute("data-open", String(next));
  });

  // POSSIBILITà DI CHIUDERE IL MENù CON IL TASTO ESC
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      menuBtn.setAttribute("aria-expanded", "false");
      primaryNav.setAttribute("data-open", "false");
    }
  });
}

// EVIDENZIO IL LINK ATTIVO DURANTE LO SCROLL NELLA PAGINA
const nav = document.getElementById("primary-nav");
const navLinks = nav ? nav.querySelectorAll('a[href^="#"]') : []; // tutti i link interni

// MAPPATURA DEI LINK A
const sectionsMap = new Map();

navLinks.forEach((link) => {
  const id = link.getAttribute("href");
  const section = id ? document.querySelector(id) : null;
  if (section) sectionsMap.set(section, link);
});

// RIMOZIONE ARIA-CURRENT DAI LINK E AGGIUNTA DELL'ATTRIBUTO ATTIVO
function setActiveLink(activeSection) {
  navLinks.forEach((a) => a.removeAttribute("aria-current"));
  const link = sectionsMap.get(activeSection);
  if (link) link.setAttribute("aria-current", "page");
}

// AVENDO SEZIONI MAPPATE SI OSSERVA
if ("IntersectionObserver" in window && sectionsMap.size) {
  const observer = new IntersectionObserver(
    (entries) => {
      let best = null;
      for (const entry of entries) {
        if (entry.isIntersecting) {
          if (!best || entry.intersectionRatio > best.intersectionRatio) {
            best = entry;
          }
        }
      }
      if (best) setActiveLink(best.target);
    },
    {
      root: null,
      rootMargin: "-20% 0px -30% 0px",
      threshold: [0.5, 0.75, 1],
    }
  );

  // SEZIONI SOTTO OSSERVAZIONE
  sectionsMap.forEach((_link, section) => observer.observe(section));
} // <-- chiude l'if (IntersectionObserver)

// CAMBIA LINK QUANDO CAMBIA L'HASH
window.addEventListener("hashchange", () => {
  const current = document.querySelector(location.hash);
  if (current && sectionsMap.has(current)) setActiveLink(current);
});

// EVIDENZIA HASH NELL'URL
document.addEventListener("DOMContentLoaded", () => {
  const current = document.querySelector(location.hash);
  if (current && sectionsMap.has(current)) setActiveLink(current);
});

// CHUDI MENU HAMBURGHER SE VIENE CLICCATO UN ALTRO ELEMENTO
if (menuBtn && nav) {
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (menuBtn.getAttribute("aria-expanded") === "true") {
        menuBtn.setAttribute("aria-expanded", "false");
        primaryNav.setAttribute("data-open", "false");
      }
    });
  });
}

/* FORM */
const form = document.querySelector(".form");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // PER RECUPERARE NOME ED EMAIL
    const nome = document.getElementById("nome")?.value.trim();
    const email = document.getElementById("email")?.value.trim();

    //MESSAGIO ERRORE CAMPI NOME ED EMAIL VUOTI
    if (!nome || !email) {
      alert("Per proseguire i campi Nome ed Email devono essere compilati.");
      return;
    }
    alert("Grazie, la rua richiesta di lavoro è stata inviata con successo!");

    //RESET CAMPI FORM
    form.reset();
  });
}
