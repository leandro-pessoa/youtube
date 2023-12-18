// seleção de elementos HTML
const dataContainer = document.querySelector('[data-date]')
const menuBtn = document.querySelector('[data-menu-button]')
const menuLateral = document.querySelector('[data-menu-lateral]')
const menuLateralMenor = document.querySelector('[data-menu-lateral-menor]')
const topicsContainer = document.querySelector('[data-topics]')

// atribução do ano atual no copyright
const data = new Date()
const dataAtual = data.getFullYear()
dataContainer.textContent = dataAtual

const resizeMenu = () => {
    if(document.body.clientWidth < 1281){
        menuLateral.style.display = 'none'
        menuLateralMenor.style.display = 'block'
        topicsContainer.style.left = '75px'
    }
    else{
        menuLateral.style.display = 'block'
        menuLateralMenor.style.display = 'none'
        topicsContainer.style.left = '240px'
    }

    if(document.body.clientWidth < 541){
        menuLateral.style.display = 'none'
        menuLateralMenor.style.display = 'none'
        topicsContainer.style.left = '0px'
    }
}

const toggleMenu = () => {
    if(document.body.clientWidth >= 1281 && menuLateral.style.display == 'none' && menuLateralMenor.style.display == 'block'){
        menuLateral.style.display = 'block'
        menuLateralMenor.style.display = 'none'
        topicsContainer.style.left = '240px'
    }
    else{
        menuLateral.style.display = 'none'
        menuLateralMenor.style.display = 'block'
        topicsContainer.style.left = '75px'
    }
}

// listeners de evento
menuBtn.addEventListener('click', toggleMenu)
window.addEventListener('resize', resizeMenu)
