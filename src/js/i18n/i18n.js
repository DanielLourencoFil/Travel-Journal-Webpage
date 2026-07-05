// i18n leve, sem biblioteca. Dicionários são módulos JS (síncronos), então
// não há fetch/async — se um idioma faltar uma chave, cai no padrão (pt).
//
// Uso no HTML:
//   <h1 data-i18n="gallery.title">GALLERY</h1>        -> troca o textContent
//   <input data-i18n-placeholder="form.name">          -> troca o placeholder
// Uso no JS:
//   import { t, getLocale } from ".../i18n.js"
//   t("hero.line1")
// Ao trocar de idioma dispara o evento `localechange` em document, para os
// renderizadores dinâmicos (galeria/diário) se re-renderizarem no futuro.
import pt from "./pt.js"
import en from "./en.js"
import de from "./de.js"

const DICTS = { pt, en, de }
const SUPPORTED = ["pt", "en", "de"]
const DEFAULT = "pt"
const STORAGE_KEY = "locale"
const HTML_LANG = { pt: "pt-BR", en: "en", de: "de" }

let current = DEFAULT

export function getLocale() {
    return current
}

export function t(key) {
    const dict = DICTS[current] || DICTS[DEFAULT]
    return dict[key] ?? DICTS[DEFAULT][key] ?? key
}

function detectLocale() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored && SUPPORTED.includes(stored)) return stored
    } catch {}
    const nav = (navigator.language || "").slice(0, 2).toLowerCase()
    return SUPPORTED.includes(nav) ? nav : DEFAULT
}

function applyStatic(root = document) {
    root.querySelectorAll("[data-i18n]").forEach((el) => {
        el.textContent = t(el.getAttribute("data-i18n"))
    })
    root.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
        el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder")))
    })
}

function updateSwitcher() {
    document.querySelectorAll(".lang-switcher [data-lang]").forEach((btn) => {
        const isActive = btn.getAttribute("data-lang") === current
        btn.classList.toggle("active", isActive)
        btn.setAttribute("aria-pressed", String(isActive))
    })
}

export function setLocale(locale) {
    if (!SUPPORTED.includes(locale)) return
    current = locale
    try {
        localStorage.setItem(STORAGE_KEY, locale)
    } catch {}
    document.documentElement.lang = HTML_LANG[locale] || locale
    applyStatic()
    updateSwitcher()
    document.dispatchEvent(new CustomEvent("localechange", { detail: { locale } }))
}

export function initI18n() {
    const switcher = document.querySelector(".lang-switcher")
    if (switcher) {
        switcher.addEventListener("click", (e) => {
            const btn = e.target.closest("[data-lang]")
            if (btn) setLocale(btn.getAttribute("data-lang"))
        })
    }
    setLocale(detectLocale())
}
