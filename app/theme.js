// seleção de elementos HTML
const themeBtns = document.querySelectorAll('[data-theme-button]')
const themeIcons = document.querySelectorAll('[data-theme-icon]')
const logo = document.querySelector('.cabecalho__logo')

// referências globais
let theme = true
const prefers = window.matchMedia('(prefers-color-scheme: dark)')

// encurtador feito para mudar as variáveis css
const chng = (variavel, cor) => {
    return document.documentElement.style.setProperty(variavel, cor)
}

// faz a alternância entre os temas
const mudarTema = () => {

    if(!theme){
        theme = !theme
        chng('--white', '#0f0f0f')
        chng('--black', '#fff')
        chng('--full-black', '#fff')
        chng('--regular-gray', '#aaa7a0')
        chng('--light-gray', '#303030')
        chng('--extra-light-gray', '#222222')
        chng('--xx-light-gray', '#222222')
        chng('--tx-light-gray', '#272727')

        logo.setAttribute('src', './assets/youtube-logo-light.png')
        themeIcons.forEach((span) => span.textContent = 'dark_mode')
    }
    else {
        theme = !theme
        chng('--white', '#ffffff')
        chng('--black', '#0f0f0f')
        chng('--full-black', '#000')
        chng('--regular-gray', '#606060')
        chng('--light-gray', '#ccc')
        chng('--extra-light-gray', '#e6e6e6')
        chng('--xx-light-gray', '#f2f2f2')
        chng('--tx-light-gray', '#f1f1f1')

        logo.setAttribute('src', './assets/youtube-logo-9.png')
        themeIcons.forEach((span) => span.textContent = 'light_mode')
    }
}

// determina o tema de acordo com o que está configurado no dispositivo
const temaDoDispositivo = () => {
    if(prefers.matches) {
        logo.setAttribute('src', './assets/youtube-logo-light.png')
        themeIcons.forEach((span) => span.textContent = 'dark_mode')
    }
    else {
        logo.setAttribute('src', './assets/youtube-logo-9.png')
        themeIcons.forEach((span) => span.textContent = 'light_mode')
    }
}

// executa a função 'temaDoDispositivo'
temaDoDispositivo()

// listener de evento
themeBtns.forEach((btn) => {
    btn.addEventListener('click', mudarTema)
})
