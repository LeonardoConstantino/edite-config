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

    // console.log(details[2]);
    const escolhaDeArquivo = document.querySelector('[data-arquivo]')
    const arquivoSelecionado =
        escolhaDeArquivo.querySelector('input[name="arquivo"]:checked')
            .value
            .toLocaleLowerCase()

    details.forEach(dtl => {
        const detailsSelecionado =
            dtl.children[1].firstChild.textContent.toLocaleLowerCase()
        // console.log(detailsSelecionado,"-->",arquivoSelecionado);
        if (detailsSelecionado.includes(arquivoSelecionado)) {
            const blockquotes = Array.from(dtl.querySelectorAll("blockquote"))
            let main /*= document.querySelector(`[data-main="${arquivoSelecionado}"]`)*/
            if(arquivoSelecionado === "config.json"){
                main = document.querySelector(`[data-main="config.json"]`)
                // console.log("config.json");
            }
            if(arquivoSelecionado === "apis.json"){
                main = document.querySelector(`[data-main="apis.json"]`)
                blockquotes[0].children[1].classList.add("display-none")
                // console.log("apis.json");
                // console.log(main);
            }
            const div = document.createElement("div")
            div.setAttribute("data-div", "")
            div.setAttribute("class", "display-none")
            blockquotes.forEach(bkt => {
                div.appendChild(bkt)
            })
            main.appendChild(div)
            // console.log("confg");
        }
    })
}
// criaHTML()

document.querySelector('[data-btn="avancar"]').addEventListener('click', criaHTML)