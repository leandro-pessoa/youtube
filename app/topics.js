// seleção de elementos HTML
const topicsListContainer = document.querySelector('[data-topics]')
const topicsListItem = document.querySelectorAll('.topics__list-item')
const containerLeft = document.querySelector('.topics__button-container--left')
const containerRight = document.querySelector('.topics__button-container--right')
const leftBtn = document.querySelector('[data-button-left]')
const rightBtn = document.querySelector('[data-button-right]')

// referências globais
let pos = 0

// ao clicar em um tópico, ele ficará com um estilo diferente e irá retirar esse estilo do anterior
const activeItem = (e) => {
    topicsListItem.forEach((item) => {
        if(item.classList.contains('ativo')){
            item.classList.remove('ativo')
        }
    })
    e.target.classList.toggle('ativo')
}

// faz o scroll para a esquerda ao clicar no button 'leftBtn'
const scrollLeft = () => {
    pos -= 150
    topicsListContainer.scroll({
        left: pos,
        right: pos,
        behavior: 'smooth'
    })
}
// faz o scroll para a direita ao clicar no button 'rightBtn'
const scrollRight = () => {
    pos += 150
    topicsListContainer.scroll({
        right: pos,
        left: pos,
        behavior: 'smooth'
    })
}

// verifica se o dispositivo do usuário é um smartphone ou tablet
// ou se é um notebook ou desktop
// se for smartphone ou tablet, os buttons de scroll irão desaparecer
const checkDevice = () => {
    if(
        navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
    ){
        containerLeft.style.display = 'none'
        containerRight.style.display = 'none'
        return true
    }
    else {
        return false
    }
}

// quando o scroll está no início, o button da esquerda desaparece
// quando está no final, o button da direita desaparece
const scrollPosition = () => {
    if(!checkDevice()) {
        if(topicsListContainer.scrollLeft == 0) {
            containerLeft.style.display = 'none'
        }
        else {
            containerLeft.style.display = 'flex'
        }

        if(pos > topicsListContainer.scrollLeft) {
            containerRight.style.display = 'none'
        }
        else {
            containerRight.style.display = 'flex'
        }
    }
}

// coloca o scroll na posição zero ao mudar o tamanho da tela
// e também faz aparecer o button da direita
// tudo isso acontece caso o dispositivo for um notebook ou desktop
const resize = () => {
    if(!checkDevice()){
        topicsListContainer.scrollLeft = 0
        containerRight.style.display = 'flex'
    }
}

// listeners de evento
topicsListItem.forEach((item) => {
    item.addEventListener('click', activeItem)
})
topicsListContainer.addEventListener('scroll', scrollPosition)
leftBtn.addEventListener('click', scrollLeft)
rightBtn.addEventListener('click', scrollRight)
window.addEventListener('resize', resize)
window.addEventListener('load', checkDevice)