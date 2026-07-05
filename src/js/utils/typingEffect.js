// Efeito de digitação do título do hero.
// Parte 1 é digitada uma vez e permanece; a parte 2 fica ciclando entre
// várias frases (digita -> pausa -> apaga -> próxima), com um cursor piscando.
// Os textos vêm do i18n (t) e o efeito reinicia quando o idioma muda.
//
// Como funciona (e por que é "smooth"):
// o texto completo é escrito UMA vez no DOM e nunca muda — o layout fica
// congelado (sem re-shaping da fonte, sem re-centralizar, sem quebrar palavra
// em spans). A "digitação" é só um clip-path que revela mais do texto a cada
// tique, e o cursor é posicionado no ponto exato do caractere atual.
import { t } from "../i18n/i18n.js"

const typeSpeed = 110  // ms por caractere ao digitar
const eraseSpeed = 65  // ms por caractere ao apagar
const holdFull = 2000  // pausa com a frase completa
const holdEmpty = 500  // pausa antes de digitar a próxima frase

let runId = 0 // token de cancelamento: ao reiniciar, as cadeias antigas param

export function typingEffect() {
    document.addEventListener("localechange", boot)
    boot()
}

// Só começa depois das webfonts carregarem. Sem isso, o navegador desenha com
// a fonte fallback e troca para a "Freehand" no meio da animação, fazendo o
// texto mudar de tamanho e "saltar".
function boot() {
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(start)
    } else {
        start()
    }
}

// Garante a estrutura interna do elemento (uma vez): um span com o texto
// (recortado via clip-path) e um cursor posicionado de forma absoluta.
function ensureParts(el) {
    let textEl = el.querySelector(".type-text")
    let caretEl = el.querySelector(".type-caret")
    if (!textEl) {
        el.textContent = ""
        textEl = document.createElement("span")
        textEl.className = "type-text"
        caretEl = document.createElement("span")
        caretEl.className = "type-caret"
        el.appendChild(textEl)
        el.appendChild(caretEl)
    }
    return { textEl, caretEl }
}

// Revela os primeiros `n` caracteres de `full` em `el`. O texto fica sempre
// presente por inteiro; o clip-path esconde o que ainda não "foi digitado".
function reveal(el, full, n, showCaret) {
    const { textEl, caretEl } = ensureParts(el)
    if (textEl.textContent !== full) textEl.textContent = full

    const node = textEl.firstChild
    if (!node) return

    const base = el.getBoundingClientRect()
    const range = document.createRange()
    range.setStart(node, 0)

    let caretX, top, bottom, revealX
    if (n <= 0) {
        // cursor no início (à esquerda do 1º caractere); não revela nada
        range.setEnd(node, Math.min(1, full.length))
        const r = range.getClientRects()[0]
        if (!r) return
        caretX = r.left - base.left
        top = r.top - base.top
        bottom = r.bottom - base.top
        revealX = caretX
    } else {
        range.setEnd(node, n)
        const rects = range.getClientRects()
        const last = rects[rects.length - 1]
        if (!last) return
        caretX = last.right - base.left      // fim do último caractere revelado
        top = last.top - base.top
        bottom = last.bottom - base.top
        revealX = caretX
    }

    // Revela todas as linhas acima da atual por inteiro e a linha atual até o
    // cursor. Como o texto está centralizado, revelar a largura toda acima só
    // mostra o texto já centralizado — as margens são transparentes.
    const W = base.width
    textEl.style.clipPath =
        `polygon(0 0, ${W}px 0, ${W}px ${top}px, ${revealX}px ${top}px, ` +
        `${revealX}px ${bottom}px, 0 ${bottom}px)`

    // Cursor curto (~0.7em) centralizado verticalmente na linha atual.
    const fs = parseFloat(getComputedStyle(el).fontSize) || bottom - top
    const caretH = fs * 0.7
    caretEl.style.display = showCaret ? "block" : "none"
    caretEl.style.left = `${caretX}px`
    caretEl.style.top = `${top + (bottom - top - caretH) / 2}px`
    caretEl.style.height = `${caretH}px`
}

// Mostra o texto inteiro e esconde o cursor (linha já concluída).
function showFull(el) {
    const { textEl, caretEl } = ensureParts(el)
    textEl.style.clipPath = "none"
    caretEl.style.display = "none"
}

function start() {
    const part1El = document.getElementById("main-title-1")
    const part2El = document.getElementById("main-title-2")
    if (!part1El || !part2El) return

    const myRun = ++runId
    const alive = () => myRun === runId

    const line1 = t("hero.line1")
    const phrases = t("hero.phrases")
    if (!Array.isArray(phrases) || !phrases.length) return

    // esconde a parte 2 no começo (texto pronto, mas nada revelado)
    reveal(part2El, phrases[0], 0, false)

    // 1) digita a parte 1 uma vez, depois começa a ciclar a parte 2
    let i = 0
    ;(function typeLine1() {
        if (!alive()) return
        reveal(part1El, line1, i, true)
        if (i < line1.length) {
            i++
            setTimeout(typeLine1, typeSpeed)
        } else {
            showFull(part1El)
            cyclePhrases()
        }
    })()

    // 2) cicla a parte 2 infinitamente
    function cyclePhrases() {
        let p = 0        // índice da frase atual
        let len = 0      // qtd de caracteres revelados
        let erasing = false

        ;(function tick() {
            if (!alive()) return
            const phrase = phrases[p]

            if (!erasing) {
                len++
                reveal(part2El, phrase, len, true)
                if (len === phrase.length) {
                    erasing = true
                    return setTimeout(tick, holdFull)
                }
                return setTimeout(tick, typeSpeed)
            }

            len--
            reveal(part2El, phrase, len, true)
            if (len === 0) {
                erasing = false
                p = (p + 1) % phrases.length
                return setTimeout(tick, holdEmpty)
            }
            return setTimeout(tick, eraseSpeed)
        })()
    }
}
