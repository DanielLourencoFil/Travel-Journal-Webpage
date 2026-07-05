// Efeito de digitação do título do hero.
// Parte 1 é digitada uma vez e permanece; a parte 2 fica ciclando entre
// várias frases (digita -> pausa -> apaga -> próxima frase), com um cursor
// piscando. Edite `line1` e `phrases` para mudar os textos.
export function typingEffect() {
    const part1El = document.getElementById("main-title-1")
    const part2El = document.getElementById("main-title-2")
    if (!part1El || !part2El) return

    const line1 = "Once upon a Time a Dream Called"
    const phrases = ["Latin America", "Bike Trip", "World Traveling"]

    const typeSpeed = 70   // ms por caractere ao digitar
    const eraseSpeed = 40  // ms por caractere ao apagar
    const holdFull = 1600  // pausa com a frase completa
    const holdEmpty = 400  // pausa antes de digitar a próxima frase

    // começa do zero (o HTML já traz o texto como fallback sem JS)
    part1El.textContent = ""
    part2El.textContent = ""
    part2El.classList.add("typing-caret")

    // 1) digita a parte 1 uma vez, depois começa a ciclar a parte 2
    let i = 0
    ;(function typeLine1() {
        part1El.textContent = line1.slice(0, i)
        if (i < line1.length) {
            i++
            setTimeout(typeLine1, typeSpeed)
        } else {
            cyclePhrases()
        }
    })()

    // 2) cicla a parte 2 infinitamente
    function cyclePhrases() {
        let p = 0        // índice da frase atual
        let len = 0      // qtd de caracteres mostrados
        let erasing = false

        ;(function tick() {
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
