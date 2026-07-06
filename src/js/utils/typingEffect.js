// Efeito de digitação do título do hero.
// Parte 1 ("Once upon a Time a Dream Called") é estática, aparece pronta,
// com duas linhas centralizadas — sem nenhuma animação. Só a parte 2 (as
// frases que ciclam: "Latin America", "Bike Trip", ...) digita e apaga.
// Os textos vêm do i18n (t) e o efeito reinicia quando o idioma muda.
import { t } from "../i18n/i18n.js"

const typeSpeed = 110  // ms por caractere ao digitar
const eraseSpeed = 65  // ms por caractere ao apagar
const holdFull = 2000  // pausa com a frase completa
const holdEmpty = 500  // pausa antes de digitar a próxima frase

let runId = 0 // token de cancelamento: ao reiniciar, as cadeias antigas param

export function typingEffect() {
    document.addEventListener("localechange", start)
    start()
}

// Renderiza `full` em `el` mostrando só os primeiros `len` caracteres. O
// restante fica no DOM reservando o mesmo espaço (invisível), para a linha não
// mudar de largura. `showCaret` liga o cursor piscando no ponto atual.
function render(el, full, len, showCaret) {
    el.textContent = ""

    const visible = document.createElement("span")
    visible.textContent = full.slice(0, len)
    el.appendChild(visible)

    if (showCaret) {
        const caret = document.createElement("span")
        caret.className = "type-caret"
        el.appendChild(caret)
    }

    const rest = full.slice(len)
    if (rest) {
        const hidden = document.createElement("span")
        hidden.className = "type-hidden"
        hidden.textContent = rest
        el.appendChild(hidden)
    }
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

    // parte 1 é fixa: aparece pronta, sem animação
    part1El.textContent = line1

    // só a parte 2 cicla, digitando e apagando cada frase
    let p = 0        // índice da frase atual
    let len = 0      // qtd de caracteres mostrados
    let erasing = false

    ;(function tick() {
        if (!alive()) return
        const phrase = phrases[p]

        if (!erasing) {
            len++
            render(part2El, phrase, len, true)
            if (len === phrase.length) {
                erasing = true
                return setTimeout(tick, holdFull)
            }
            return setTimeout(tick, typeSpeed)
        }

        len--
        render(part2El, phrase, len, true)
        if (len === 0) {
            erasing = false
            p = (p + 1) % phrases.length
            return setTimeout(tick, holdEmpty)
        }
        return setTimeout(tick, eraseSpeed)
    })()
}
