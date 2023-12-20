// seleção de elementos HTML
const topicsListContainer = document.querySelector('[data-topics]')
const topicsListItem = document.querySelectorAll('.topics__list-item')
const containerLeft = document.querySelector('.topics__button-container--left')
const containerRight = document.querySelector('.topics__button-container--right')
const leftBtn = document.querySelector('[data-button-left]')
const rightBtn = document.querySelector('[data-button-right]')

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

const scrollLeft = () => {
    
    pos -= 100
    console.log(pos)
    topicsListContainer.scroll({
        left: pos,
        right: pos,
        behavior: 'smooth'
    })

}
const scrollRight = () => {
    
    pos += 100
    console.log(pos)
    topicsListContainer.scroll({
        right: pos,
        left: pos,
        behavior: 'smooth'
    })
}

const getScrollPosition = () => {
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

// listeners de evento
topicsListItem.forEach((item) => {
    item.addEventListener('click', activeItem)
})
topicsListContainer.addEventListener('scroll', getScrollPosition)
leftBtn.addEventListener('click', scrollLeft)
rightBtn.addEventListener('click', scrollRight)