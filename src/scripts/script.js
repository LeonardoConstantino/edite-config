const uls = Array.from(document.querySelectorAll("ul"))
const comecar = document.querySelector('[data-btn="comecar"]')
const salvar = document.querySelector('[data-btn="salvar"]')
const div = document.querySelector('[data-div]')
const texto = document.querySelector('[data-texto]')
let novoArquivo = {}
let fileHandle;

const abreArquivo = async () => {
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

const editar = async () => {
    div.classList.remove("display-none")
    comecar.classList.add("display-none")
    texto.innerHTML = "Siga ate o final para salvar o arquivo"
    const arquivo = await abreArquivo()
    novoArquivo = {
        ...arquivo
    }
    uls.forEach(ul => {
        const input = document.createElement("input")
        const key = ul.children[0].firstChild.textContent

        if (typeof (arquivo[key]) === "number") {
            input.setAttribute("type", "number")
            input.setAttribute("value", arquivo[key])
            ul.appendChild(input)
            input.addEventListener("change", (e) => {
                const novoValor = e.target.value
                novoArquivo[key] = +novoValor
            })
        }

        if (typeof (arquivo[key]) === "string" || typeof (arquivo[key]) === "object") {
            input.setAttribute("type", "text")
            input.setAttribute("value", arquivo[key])
            ul.appendChild(input)
            input.addEventListener("change", (e) => {
                const novoValor = e.target.value
                novoArquivo[key] = novoValor
            })
        }

        if (typeof (arquivo[key]) === "boolean") {
            input.setAttribute("type", "checkbox")
            input.setAttribute("id", key)
            if (arquivo[key]) {
                input.setAttribute("checked", "")
            }
            const label = document.createElement("label")
            label.setAttribute("for", key)
            ul.appendChild(input)
            ul.appendChild(label)
            label.innerText = "false"
            if (arquivo[key] === true) {
                label.innerText = "true"
            }
            input.addEventListener("change", (e) => {
                const novoValor = "false"
                novoArquivo[key] = novoValor
                label.innerText = "false"
                if (e.target.checked) {
                    const novoValor = "true"
                    novoArquivo[key] = novoValor
                    label.innerText = "true"
                }
            })
        }
    })
}

const salvarArquivo = async () => {
    const stream = await fileHandle.createWritable()
    await stream.write(JSON.stringify(novoArquivo))
    await stream.close()
}

const salvaComo = async () => {
    fileHandle = await window.showSaveFilePicker({
        types: [{
            description: 'json',
            accept: {
                'application/json': ['.json']
            }
        }, ],
        excludeAcceptAllOption: true
  })
    salvarArquivo()
}

comecar.addEventListener('click', editar)
salvar.addEventListener('click', salvaComo)

const themeForm = document.getElementById('theme-form')
const updateTheme = () => {
    const link = 'https://cdn.jsdelivr.net/npm/water.css@2/out/'
    const theme = themeForm.querySelector('input[name="theme"]:checked').value + '.css'
    document.querySelector("[data-tema]").href = link + theme
}
themeForm.addEventListener('change', updateTheme)