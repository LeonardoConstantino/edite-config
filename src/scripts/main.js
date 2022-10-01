import {
    fileOpen,
    supported,
    /*directoryOpen,
    fileSave,*/
} from 'https://unpkg.com/browser-fs-access'

import {
    mensagem,
    mudarLingua
} from './traducao.js'

import {
    buscarDados,
} from './MDParaHTML.js'

const main = document.querySelector("main")
// const uls = Array.from(document.querySelectorAll("ul"))
const sectionConfig = document.querySelector('[data-section="config.json"]')
const sectionAPIS = document.querySelector('[data-section="apis.json"]')
const comecar = document.querySelector('[data-btn="comecar"]')
const modal = document.querySelector('[data-dialog="opcoes"]')
const opcoes = document.querySelector('[data-btn="opcoes"]')
const fecharOpcoes = document.querySelector('[data-btn="fecharOpcoes"]')
const novo = document.querySelector('[data-btn="novo"]')
const salvar = document.querySelector('[data-btn="salvar"]')
const copiar = document.querySelector('[data-btn="copiar"]')
const avancar = document.querySelector('[data-btn="avancar"]')
const editarOutro = document.querySelector('[data-btn="editarOutro"]')
// const div = document.querySelector('[data-div]')
const footer = document.querySelector('[data-footer]')
const themeForm = document.getElementById('theme-form')
const inputPesquisa = document.querySelector('[data-pesquisa]')
const lingua = document.querySelector('[data-lingua]')
const escolhaDeArquivo = document.querySelector('[data-arquivo]')
let novoArquivo = {}
let fileHandle
let abreArquivo
let salvaComo
let editandoArquivoNovo = false

const editarConfig = async () => {
    let arquivo

    window.scrollTo({
        top: sectionConfig.offsetTop,
        behavior: 'smooth'
    })

    try {
        if (!editandoArquivoNovo) {
            arquivo = await abreArquivo()
        }

        if (editandoArquivoNovo) {
            const arquivojson = await buscarDados("https://raw.githubusercontent.com/KillovSky/iris/main/lib/config/Settings/config.json")
            arquivo = await JSON.parse(arquivojson)
        }
    } catch (e) {
        mensagem("semSuporte")
        return
    }

    try {
        const div = document.querySelector('[data-div]')
        // console.log(div);
        div.classList.remove("display-none")
        footer.classList.remove("display-none")
        inputPesquisa.parentElement.classList.remove("display-none")
        comecar.classList.add("display-none")
        novo.classList.add("display-none")
        main.classList.add("scroll")

        mensagem("ateOFinal")

        novoArquivo = {
            ...arquivo
        }

        const uls = Array.from(document.querySelectorAll("ul"))

        const criaInputParaCadaKey = ul => {
            const input = document.createElement("input")
            const key = ul.children[0].firstChild.textContent
            const type = typeof (arquivo[key])

            const setInput = (tipo) => {
                const valor = tipo === "object" ?
                    arquivo[key].toString().replace(/,/g, ", ") :
                    arquivo[key]

                const type = tipo === "object" || tipo === "string" ? "text" : tipo

                input.setAttribute("type", type)
                input.setAttribute("value", valor)
                ul.insertAdjacentElement("afterend", input)

                const atualizaValorNoArquivo = (e) => {
                    const novoValor = e.target.value
                    const valueConvert = tipo === "number" ? +novoValor : novoValor
                    novoArquivo[key] = valueConvert
                }

                input.addEventListener("change", atualizaValorNoArquivo)

                if (tipo === "boolean") {
                    input.setAttribute("type", "checkbox")
                    input.setAttribute("id", key)

                    if (arquivo[key]) {
                        input.setAttribute("checked", "")
                    }

                    const label = document.createElement("label")
                    label.setAttribute("for", key)
                    ul.insertAdjacentElement("afterend", label)
                    ul.insertAdjacentElement("afterend", input)

                    label.innerText = "false"
                    if (arquivo[key]) {
                        label.innerText = "true"
                    }

                    const atualizaValorBooleanNoArquivo = (e) => {
                        const novoValor = "false"
                        novoArquivo[key] = novoValor
                        label.innerText = "false"

                        if (e.target.checked) {
                            const novoValor = "true"
                            novoArquivo[key] = novoValor
                            label.innerText = "true"
                        }
                    }

                    input.addEventListener("change", atualizaValorBooleanNoArquivo)
                }
            }

            if (type === "number") setInput("number")
            if (type === "string") setInput("string")
            if (type === "object") setInput("object")
            if (type === "boolean") setInput("boolean")
        }
        // console.log(criaInputParaCadaKey);


        uls.forEach(criaInputParaCadaKey)

    } catch (e) {
        // mensagem("naoCarregaArquivos")
        // console.log(e);
    }
}

(async () => {
    if (supported) {
        mensagem("usandoAPI")

        abreArquivo = async () => {
            [fileHandle] = await window.showOpenFilePicker({
                types: [{
                    description: 'json',
                    accept: {
                        'application/json': ['.json']
                    }
                }, ],
                suggestedName: 'config',
                excludeAcceptAllOption: true,
                multiple: false
            })

            const data = await fileHandle.getFile()
            const texto = await data.text()
            const textoParseado = await JSON.parse(texto)
            return textoParseado
        }

        const salvarArquivo = async (novoArquivo) => {
            const stream = await fileHandle.createWritable()
            await stream.write(JSON.stringify(novoArquivo))
            await stream.close()
        }

        salvaComo = async (novoArquivo) => {
            try {
                fileHandle = await window.showSaveFilePicker({
                    types: [{
                        description: 'json',
                        accept: {
                            'application/json': ['.json']
                        }
                    }, ],
                    suggestedName: 'config.json',
                    excludeAcceptAllOption: true
                })

                salvarArquivo(novoArquivo)
                mensagem("salvo")

            } catch (e) {
                mensagem("naoSalvou")
            }
        }

    } else {
        mensagem("usandoFallback")

        salvar.classList.add("display-none")
        copiar.classList.remove("display-none")

        abreArquivo = async () => {
            const blob = await fileOpen({
                description: 'json',
                mimeTypes: ['application/*'],
                extensions: ['.json'],
            })

            const texto = await blob.text()
            const textoParseado = await JSON.parse(texto)
            return textoParseado
        }
    }
})()

const updateTheme = () => {
    const link = 'https://cdn.jsdelivr.net/npm/water.css@2/out/'
    const theme = themeForm.querySelector('input[name="theme"]:checked').value + '.css'

    document.querySelector('[data-tema="link"]').href = link + theme

    mensagem("temaAlterado")
}



const copiarEMostrarConteudoCopiado = (novoArquivo) => {
    const div = document.querySelector('[data-div]')
    const jsonConteiner = document.querySelector('[data-json]')
    const divJson = document.querySelector('[data-divJson]')
    const novoArquivoJson = JSON.stringify(novoArquivo, null, "\t")

    inputPesquisa.parentElement.classList.add("display-none")
    div.classList.add("display-none")
    divJson.classList.remove("display-none")

    navigator.clipboard.writeText(novoArquivoJson)

    jsonConteiner.innerHTML = novoArquivoJson

    mensagem("copiado")
}

const editarNovoArquivo = () => {
    editandoArquivoNovo = true

    editarConfig()

    window.scrollTo({
        top: sectionConfig.offsetTop,
        behavior: 'smooth'
    })
}

const mostraBktQueContemTermoPesquisado = (e) => {
    const uls = Array.from(document.querySelectorAll("ul"))
    const mostrarSomenteTermosPesquisados = (item) => {
        const blockquote = item.parentElement
        const key = item.children[0].firstChild.textContent.toLowerCase()
        const termoPesquisado = e.target.value.toLowerCase()

        blockquote.classList.add("display-none")

        if (key.includes(termoPesquisado)) {
            blockquote.classList.remove("display-none")
        }
    }

    uls.forEach(mostrarSomenteTermosPesquisados)
}

const fecharModal = ele => {
    const modal = document.querySelector('[data-dialog="arquivo"]')
    ele.parentElement.classList.add("display-none")
    ele.parentElement.nextElementSibling.classList.remove("display-none")
    setTimeout(()=>{
        modal.close()
        modal.classList.add("display-none")
    },1500)
}

inputPesquisa.addEventListener('input', mostraBktQueContemTermoPesquisado)

avancar.addEventListener('click', ()=>{
    fecharModal(avancar)
    const arquivoSelecionado =
        escolhaDeArquivo.querySelector('input[name="arquivo"]:checked').value
    // const sections = Array.from(document.querySelectorAll(`[data-section]`))
    // const sectionSelecionada = 
    //     document.querySelector(`[data-section="${arquivoSelecionado}"]`)
    // sections.forEach(section => section.classList.add("display-none"))
    // sectionSelecionada.remove("display-none")
    if(arquivoSelecionado === "apis.json"){
        sectionConfig.classList.add("display-none")
        sectionAPIS.classList.remove("display-none")
        
    }
    // criaHTML()
})

editarOutro.addEventListener('click', ()=>{
    document.location.reload()
})

comecar.addEventListener('click', editarConfig)

novo.addEventListener('click', editarNovoArquivo)

salvar.addEventListener('click', () => {
    salvaComo(novoArquivo)
})

copiar.addEventListener('click', () => {
    copiarEMostrarConteudoCopiado(novoArquivo)
})

themeForm.addEventListener('change', updateTheme)

lingua.addEventListener('change', mudarLingua)

opcoes.addEventListener('click', ()=>{
    modal.showModal()
    modal.classList.remove("display-none")
})

fecharOpcoes.addEventListener('click', ()=>{
    modal.close()
    modal.classList.add("display-none")
})

// avancar.click()