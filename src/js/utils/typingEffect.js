// Efeito de digitação do título do hero.
// Parte 1 é digitada uma vez e permanece; a parte 2 fica ciclando entre
// várias frases (digita -> pausa -> apaga -> próxima), com um cursor piscando.
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

function start() {
    const part1El = document.getElementById("main-title-1")
    const part2El = document.getElementById("main-title-2")
    if (!part1El || !part2El) return

    const myRun = ++runId
    const alive = () => myRun === runId

    const line1 = t("hero.line1")
    const phrases = t("hero.phrases")
    if (!Array.isArray(phrases) || !phrases.length) return

    // começa do zero (o HTML já traz o texto como fallback sem JS)
    part1El.textContent = ""
    part2El.textContent = ""
    part2El.classList.remove("typing-caret")
    part1El.classList.add("typing-caret")

    // 1) digita a parte 1 uma vez, depois começa a ciclar a parte 2
    let i = 0
    ;(function typeLine1() {
        if (!alive()) return
        part1El.textContent = line1.slice(0, i)
        if (i < line1.length) {
            i++
            setTimeout(typeLine1, typeSpeed)
        } else {
            part1El.classList.remove("typing-caret")
            part2El.classList.add("typing-caret")
            cyclePhrases()
        }
    })()

    // 2) cicla a parte 2 infinitamente
    function cyclePhrases() {
        let p = 0        // índice da frase atual
        let len = 0      // qtd de caracteres mostrados
        let erasing = false

        ;(function tick() {
            if (!alive()) return
            const phrase = phrases[p]

            if (!erasing) {
                len++
                part2El.textContent = phrase.slice(0, len)
                if (len === phrase.length) {
                    erasing = true
                    return setTimeout(tick, holdFull)
                }
                return setTimeout(tick, typeSpeed)
            }

            len--
            part2El.textContent = phrase.slice(0, len)
            if (len === 0) {
                erasing = false
                p = (p + 1) % phrases.length
                return setTimeout(tick, holdEmpty)
            }
            return setTimeout(tick, eraseSpeed)
        })()
    }
}
