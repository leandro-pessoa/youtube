// seleção de elementos HTML
const dataContainer = document.querySelector('[data-date]')
const menuBtn = document.querySelector('[data-menu-button]')
const menuLateral = document.querySelector('[data-menu-lateral]')
const menuLateralMenor = document.querySelector('[data-menu-lateral-menor]')
const topicsContainer = document.querySelector('[data-topics]')
let canaisContainer = document.querySelector('[data-canais]')
let canaisOcultosContainer = document.querySelector('[data-canais-ocultos]')
let canaisNumero = document.querySelector('[data-canais-numero]')
const maisBtn = document.querySelector('[data-button-mais]')
const menosBtn = document.querySelector('[data-button-menos]')

// atribução do ano atual no copyright
const data = new Date()
const dataAtual = data.getFullYear()
dataContainer.textContent = dataAtual

// alterna entre os menus quando é alterado o tamanho da tela
const resizeMenu = () => {
    if(document.body.clientWidth < 1281){
        menuLateral.style.display = 'none'
        menuLateralMenor.style.display = 'block'
        topicsContainer.style.left = '75px'
        videosContainer.style.left = '75px'
    }
    else{
        menuLateral.style.display = 'block'
        menuLateralMenor.style.display = 'none'
        topicsContainer.style.left = '240px'
        videosContainer.style.left = '260px'
    }

    if(document.body.clientWidth < 541){
        menuLateral.style.display = 'none'
        menuLateralMenor.style.display = 'none'
        topicsContainer.style.left = '0px'
        videosContainer.style.left = '0px'
    }
}

// troca os menus ao clicar no button 'menu' do header
const toggleMenu = () => {
    if(document.body.clientWidth >= 1281 && menuLateral.style.display == 'none' && menuLateralMenor.style.display == 'block'){
        menuLateral.style.display = 'block'
        menuLateralMenor.style.display = 'none'
        topicsContainer.style.left = '240px'
        videosContainer.style.left = '260px'
    }
    else{
        menuLateral.style.display = 'none'
        menuLateralMenor.style.display = 'block'
        topicsContainer.style.left = '75px'
        videosContainer.style.left = '75px'
    }
}

// base de canais falsos
const canais = [
    {'nome': 'Canal 1'}, {'nome': 'Canal 2'}, {'nome': 'Canal 3'}, {'nome': 'Canal 4'}, {'nome': 'Canal 5'}, {'nome': 'Canal 6'}, {'nome': 'Canal 7'}, {'nome': 'Canal 8'}, {'nome': 'Canal 9'}, {'nome': 'Canal 10'}, {'nome': 'Canal 11'}, {'nome': 'Canal 12'}, {'nome': 'Canal 13'}
]

// insere os canais falsos na lista 'canaisContainer' até o limite de 7
// quando passar do limite, irá inserir em 'canaisOcultosContainer'
const inserirCanal = (nome) => {
    const template = `
        <li class="list__item">
            <a href="#" class="list__item-link">
                <span class="material-symbols-outlined">account_circle</span>${nome}
            </a>
        </li>
    `

    if(canaisContainer.childElementCount <= 6){
        canaisContainer.innerHTML += template
    }
    else {
        canaisOcultosContainer.innerHTML += template 
    }

    canaisNumero.textContent = canaisOcultosContainer.childElementCount
    
}

// executa a função 'inserirCanal' repetidas vezes com o nome do canal como parâmetro
canais.forEach((canal) => inserirCanal(canal.nome))

// mostra os canais ocultos
const mostrarMais = () => {
    maisBtn.style.display = 'none'
    canaisOcultosContainer.style.display = 'block'
    menosBtn.style.display = 'flex'
}
// desaparece os canais ocultos
const mostrarMenos = () => {
    menosBtn.style.display = 'none'
    canaisOcultosContainer.style.display = 'none'
    maisBtn.style.display = 'flex'
}

// listeners de evento
menuBtn.addEventListener('click', toggleMenu)
window.addEventListener('resize', resizeMenu)
maisBtn.addEventListener('click', mostrarMais)
menosBtn.addEventListener('click', mostrarMenos)
