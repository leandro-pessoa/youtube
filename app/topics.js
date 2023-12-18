const topicsListItem = document.querySelectorAll('.topics__list-item')


const activeItem = (e) => {
    topicsListItem.forEach((item) => {
        if(item.classList.contains('ativo')){
            item.classList.remove('ativo')
        }
    })
    e.target.classList.toggle('ativo')
}

topicsListItem.forEach((item) => {
    item.addEventListener('click', activeItem)
})