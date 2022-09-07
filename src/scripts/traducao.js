export const mensagem = (key) => {
    const lingua = document.querySelector('[data-lingua]')
    const linguaSelecionada = lingua.querySelector('input[name="lingua"]:checked').value
    const msg = {
        semSuporte: {
            pt: `<h3><i class='material-symbols-outlined'> warning </i> Seu navegador nao tem suporte ou o arquivo nao pode ser aberto. <i class='material-symbols-outlined'> warning </i></h3>`,
            en: `<h3><i class='material-symbols-outlined'> warning </i> Your browser is not supported or the file cannot be opened. <i class='material-symbols-outlined'> warning </i></h3>`,
            es: `<h3><i class='material-symbols-outlined'> warning </i> Su navegador no es compatible o el archivo no se puede abrir. <i class='material-symbols-outlined'> warning </i></h3>`
        },
        ateOFinal: {
            pt: `<span class="material-symbols-outlined"> info </span> Siga até o final para salvar o arquivo`,
            en: `<span class="material-symbols-outlined"> info </span> Follow to the end to save the file`,
            es: `<span class="material-symbols-outlined"> info </span> Siga hasta el final para guardar el archivo.`
        },
        naoCarregaArquivos: {
            pt: `<h3><i class='material-symbols-outlined'> warning </i> Por algum motivo nao consigo carregar os arquivos, reinicie a pagina e tente novamente. <i class='material-symbols-outlined'> warning </i></h3>`,
            en: `<h3><i class='material-symbols-outlined'> warning </i> For some reason I can't load the files, restart the page and try again. <i class='material-symbols-outlined'> warning </i></h3>`,
            es: `<h3><i class='material-symbols-outlined'> warning </i> Por alguna razón no puedo cargar los archivos, reinicie la página y vuelva a intentarlo. <i class='material-symbols-outlined'> warning </i></h3>`
        },
        naoSalvou: {
            pt: `<i class='material-symbols-outlined'> warning </i> OPS! parece que o arquivo nao foi salvo, tente novamente. <i class='material-symbols-outlined'> warning </i>`,
            en: `<i class='material-symbols-outlined'> warning </i> Oops! it looks like the file was not saved, please try again. <i class='material-symbols-outlined'> warning </i>`,
            es: `<i class='material-symbols-outlined'> warning </i> ¡Ups! Parece que el archivo no se guardó, inténtalo de nuevo. <i class='material-symbols-outlined'> warning </i>`
        },
        navegadorNaoCompativel: {
            pt: `<h3><i class='material-symbols-outlined'> warning </i> Puts!! Parece que seu navegador nao é compatível, nao vai dar para continuarmos por aqui. <i class='material-symbols-outlined'> warning </i></h3>`,
            en: `<h3><i class='material-symbols-outlined'> warning </i> Oops! It seems that your browser is not compatible, we will not be able to continue here.<i class='material-symbols-outlined'> warning </i></h3>`,
            es: `<h3><i class='material-symbols-outlined'> warning </i> Oops! Parece que tu navegador no es compatible, no podremos continuar aquí. <i class='material-symbols-outlined'> warning </i></h3>`
        },
        temaAlterado: {
            pt: `<span class="material-symbols-outlined"> info </span> O tema foi alterado.`,
            en: `<span class="material-symbols-outlined"> info </span> The theme has been changed.`,
            es: `<span class="material-symbols-outlined"> info </span> El tema ha sido cambiado.`
        },
        idiomaAlterado: {
            pt: `<span class="material-symbols-outlined"> info </span> O idioma foi alterado.`,
            en: `<span class="material-symbols-outlined"> info </span> The language has been changed.`,
            es: `<span class="material-symbols-outlined"> info </span> El idioma ha sido cambiado.`
        },
        salvo: {
            pt: `<span class="material-symbols-outlined"> info </span> O arquivo foi salvo com sucesso!`,
            en: `<span class="material-symbols-outlined"> info </span> The file has been saved successfully!`,
            es: `<span class="material-symbols-outlined"> info </span> ¡El archivo se ha guardado correctamente!`
        },
        usandoAPI: {
            pt: `<span class="material-symbols-outlined"> info </span> Usando a API de acesso ao sistema de arquivos.`,
            en: `<span class="material-symbols-outlined"> info </span> Using the File System Access API.`,
            es: `<span class="material-symbols-outlined"> info </span> Uso de la API de acceso al sistema de archivos.`,
        },
        usandoFallback: {
            pt: `<span class="material-symbols-outlined"> info </span> Usando a implementação de fallback.`,
            en: `<span class="material-symbols-outlined"> info </span> Using the fallback implementation.`,
            es: `<span class="material-symbols-outlined"> info </span> Uso de la implementación alternativa.`,
        },
        copiado: {
            pt: `<span class="material-symbols-outlined"> info </span> Conteúdo copiado para area de transferência`,
            en: `<span class="material-symbols-outlined"> info </span> Content copied to clipboard`,
            es: `<span class="material-symbols-outlined"> info </span> Contenido copiado al portapapeles`
        }
    }
    const avisosNaTela = Array.from(document.querySelectorAll('[data-avisoNaTela]'))
    if(avisosNaTela.length !== 0){
        avisosNaTela.forEach(aviso => aviso.classList.remove("mostrar"))
    }

    const aviso = document.createElement("div")
    aviso.setAttribute("data-avisoNaTela", "")
    const conteinerAviso = document.querySelector('[data-aviso]')
    conteinerAviso.appendChild(aviso)
    aviso.innerHTML = msg[key][linguaSelecionada]
    aviso.classList.add("mostrar")

    setTimeout(() => { aviso.remove() }, 5000)
}

export 

const traduzir = (lingua) => {
    const textos = Array.from(document.querySelectorAll("[data-trad]"))

    const traducaos = {
        temaEscuro: {
            pt: "Tema escuro",
            en: "Dark theme",
            es: "tema oscuro"
        },
        temaClaro: {
            pt: "Tema claro",
            en: "Light theme",
            es: "Tema ligero"
        },
        titulo: {
            pt: `CONFIGURAÇÕES DE USUÁRIO - <a href="https://github.com/KillovSky/iris/blob/main/lib/config/Settings/config.json" target="_blank">CONFIG.JSON</a>`,
            en: `USER SETTINGS - <a href="https://github.com/KillovSky/iris/blob/main/lib/config/Settings/config.json" target="_blank">CONFIG.JSON</a>`,
            es: `AJUSTES DE USUARIO - <a href="https://github.com/KillovSky/iris/blob/main/lib/config/Settings/config.json" target="_blank">CONFIG.JSON</a>`
        },
        comecar: {
            pt: `Editar arquivo existente <i class="material-symbols-outlined"> edit </i>`,
            en: `Edit existing file <i class="material-symbols-outlined"> edit </i>`,
            es: `Editar archivo existente <i class="material-symbols-outlined"> edit </i>`
        },
        novo: {
            pt: `Criar um novo arquivo <i class="material-symbols-outlined"> add </i>`,
            en: `Create a new file <i class="material-symbols-outlined"> add </i>`,
            es: `Crear un nuevo archivo <i class="material-symbols-outlined"> add </i>`
        },
        texto: {
            pt: `Selecione o arquivo <code>config.json</code>`,
            en: `Select the file <code>config.json</code>`,
            es: `Seleccione el archivo <code>config.json</code>`
        },
        salvar: {
            pt: `Salvar <i class="material-symbols-outlined"> save </i>`,
            en: `Save <i class="material-symbols-outlined"> save </i>`,
            es: `Ahorrar <i class="material-symbols-outlined"> save </i>`
        },
        textoFinal: {
            pt: `<i class="material-symbols-outlined"> info </i> Nao se esqueça de fazer um backup do arquivo original.`,
            en: `<i class="material-symbols-outlined"> info </i>
            Don't forget to make a backup of the original file.`,
            es: `<i class="material-symbols-outlined"> info </i>
            No olvides hacer una copia de seguridad del archivo original.`
        },
        copiar: {
            pt: `Copiar para area de transferência <i class="material-symbols-outlined"> file_copy </i>`,
            en: `Copy to clipboard <i class="material-symbols-outlined"> file_copy </i>`,
            es: `Copiar al portapapeles <i class="material-symbols-outlined"> file_copy </i>`
        },
    }
    const body = document.querySelector('body')
    textos.forEach(texto => {
        const textoASerTraduzido = texto.dataset.trad
        texto.innerHTML = traducaos[textoASerTraduzido][lingua]
    })
    body.setAttribute("lang", lingua === "pt" ? "pt-br" : lingua)

}