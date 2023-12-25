// seleção de elementos HTML
const themeBtns = document.querySelectorAll('[data-theme-button]')
const logo = document.querySelector('.cabecalho__logo')

const chng = (variavel, cor) => {
    return document.documentElement.style.setProperty(variavel, cor)
}

const mudarTema = () => {
    chng('--white', '#0f0f0f')
    chng('--full-black', '#fff')
    chng('--light-gray', '#303030')
    chng('--xx-light-gray', '#222222')
    chng('--tx-light-gray', '')
    chng('--extra-light-gray', '#222222')
    logo.setAttribute('src', './assets/youtube-logo-light.png')
}

themeBtns.forEach((btn) => {
    btn.addEventListener('click', mudarTema)
})