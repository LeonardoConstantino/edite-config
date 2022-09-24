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

export const criaHTML = async () => {
    let dFrag = document.createDocumentFragment()
    const html = await MDparaHTMLConvertido(url)
    const divConteiner = document.createElement("div")
    divConteiner.innerHTML = html
    dFrag.appendChild(divConteiner)
    const details = Array.from(dFrag.querySelectorAll("details"))
    dFrag = null

    // console.log(details[1]);
    const escolhaDeArquivo = document.querySelector('[data-arquivo]')
    const arquivoSelecionado =
        escolhaDeArquivo.querySelector('input[name="arquivo"]:checked').value

    details.forEach(dtl => {
        const detailsSelecionado =
            dtl.children[1].firstChild.textContent.toLocaleLowerCase()
        if (detailsSelecionado.includes(arquivoSelecionado)) {
            const div = document.createElement("div")
            const blockquotes = Array.from(dtl.querySelectorAll("blockquote"))
            const main = document.querySelector('[data-main="config"]')
            div.setAttribute("data-div", "")
            div.setAttribute("class", "display-none")
            main.appendChild(div)
            blockquotes.forEach(bkt => {
                div.appendChild(bkt)
            })
        }

        if (arquivoSelecionado === "APIS.json") {
            return
        }
    })
}
// criaHTML()

document.querySelector('[data-btn="avancar"]').addEventListener('click', criaHTML)