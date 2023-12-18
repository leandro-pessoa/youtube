// seleção de elementos HTML
const searchInputContainer = document.querySelector('[data-search-container]')
const icon = document.querySelector('[data-icon]')
const searchInput = document.querySelector('[data-search]')

// adiciona estilos no container ao clicar no input
const adicionarFoco = () => {
    searchInputContainer.classList.add('cabecalho__search-container-focus')
    icon.style.display = 'block'
}

// retira os estilios ao tirar o foco do input
const tirarFoco = () => {
    searchInputContainer.classList.remove('cabecalho__search-container-focus')
    icon.style.display = 'none'
}

// listeners de evento
searchInput.addEventListener('focus', adicionarFoco)
searchInput.addEventListener('blur', tirarFoco)