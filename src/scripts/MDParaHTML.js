const url = `https://raw.githubusercontent.com/KillovSky/iris/main/.readme/pt/config.md`

export const buscarDados = async (url) => {
    const dados = await fetch(url)
    const parseDados = await dados.text()
    const str = parseDados.toString()
    return str
}

export const MDparaHTMLConvertido = async (url) => {
    const dado = await buscarDados(url)
    const md = new Remarkable('full', {
        html: true
    })

    const html = await md.render(dado)
    const novohtml = await html.replace(/<a/g, "<code").replace(/<\/a/g, "</code")
    return novohtml
}

const criaHTML = async () => {
    let dFrag = document.createDocumentFragment()
    const html = await MDparaHTMLConvertido(url)
    const div = document.createElement("div")
    div.innerHTML = html
    dFrag.appendChild(div)
    const details = Array.from(dFrag.querySelectorAll("details"))
    dFrag = null

    details.forEach(dtl => {
        const contemConfig = dtl.children[1].firstChild.textContent.toLocaleLowerCase().includes("config.json")
        if (contemConfig) {
            const div = document.createElement("div")
            const blockquotes = Array.from(dtl.querySelectorAll("blockquote"))
            const main = document.querySelector('[data-main]')
            div.setAttribute("data-div", "")
            div.setAttribute("class", "display-none")
            main.appendChild(div)
            blockquotes.forEach(bkt => {
                div.appendChild(bkt)
            })
        }
    })
}
criaHTML()