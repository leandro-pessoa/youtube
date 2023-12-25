// seleção de elementos HTML
const videosContainer = document.querySelector('[data-videos-container]')

// retorna a logo do canal, encontrando o canal pelo id, que será passado como parâmetro
const getChannelThumb = async (channelId) => {
    try {
        const res = await fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&maxResults=6&key=AIzaSyC-MRxD8koOHYgzZ7kkkpKqf-cW1bO75hg`)
        const channel = await res.json()
        return channel.items[0].snippet.thumbnails.default.url
    }
    catch (err) {

    }
}

// retorna o tempo com a formatação correta
const formatarTempo = (tempo) => {
    const duration = moment.duration(tempo)
    
    if(moment.duration(tempo).hours() == '0'){
        if(duration.seconds() < 10) {
            tempo = `${duration.minutes()}:0${duration.seconds()}`
        }
        else {
            tempo = `${duration.minutes()}:${duration.seconds()}`
        }
    }
    else{
        if(duration.minutes() < 10 && duration.seconds() < 10){
            tempo = `${duration.hours()}:0${duration.minutes()}:0${duration.seconds()}`
        }
        else if(duration.minutes() < 10){
            tempo = `${duration.hours()}:0${duration.minutes()}:${duration.seconds()}`
        }
        else if(duration.seconds() < 10){
            tempo = `${duration.hours()}:${duration.minutes()}:0${duration.seconds()}`
        }
        else {
            tempo = `${duration.hours()}:${duration.minutes()}:${duration.seconds()}`
        }
    }

    return tempo
}

// retorna as views do vídeo com a formatação correta
const formatarViews = (views) => {
    if(views < 1000){
        return `${views} visualizações`
    }
    if(views >= 1000 && views < 1000000){
        return `${(views / 1000).toFixed(0)} mil visualizações`
    }
    if(views >= 1000000 && views < 1000000000){
        return `${(views / 1000000).toFixed(1)} mi visualizações`
    }
    if(views >= 1000000000){
        return `${views / 1000000000} bi visualizações`
    }
}

// retorna a data do vídeo com a formatação correta
const formatarData = (data) => {

    // constantes utilizadas nas condicionais
    const dataAtual = new Date()
    const dataFormatada = new Date(data)

    const segundoAtual = dataAtual.getSeconds()
    const segundoVideo = dataFormatada.getSeconds()

    const minutoAtual = dataAtual.getMinutes()
    const minutoVideo = dataFormatada.getMinutes()

    const horaAtual = dataAtual.getHours()
    const horaVideo = dataFormatada.getHours()

    const diaAtual = dataAtual.getDate()
    const diaVideo = dataFormatada.getDate()

    const mesAtual = dataAtual.getMonth()
    const mesVideo = dataFormatada.getMonth()

    const anoAtual = dataAtual.getFullYear()
    const anoVideo = dataFormatada.getFullYear()

    // condicionais
    if(segundoAtual - segundoVideo < 60 && minutoAtual == minutoVideo && horaAtual == horaVideo && diaAtual == diaVideo && mesAtual == mesVideo && anoAtual == anoVideo){
        const cond = segundoAtual - segundoVideo > 1 ? 'segundos' : 'segundo'
        return `há ${segundoAtual - segundoVideo} ${cond}`
    }

    if(minutoAtual - minutoVideo < 60 && horaAtual == horaVideo && diaAtual == diaVideo && mesAtual == mesVideo && anoAtual == anoVideo){
        const cond = minutoAtual - minutoVideo > 1 ? 'minutos' : 'minuto'
        return `há ${minutoAtual - minutoVideo} ${cond}`
    }

    if(horaAtual - horaVideo < 24 && diaAtual == diaVideo && mesAtual == mesVideo && anoAtual == anoVideo){
        const cond = horaAtual - horaVideo > 1 ? 'horas' : 'hora'
        return `há ${horaAtual - horaVideo} ${cond}`
    }

    if(diaAtual - diaVideo < 28 && mesAtual == mesVideo && anoAtual == anoVideo){
        const cond = diaAtual - diaVideo > 1 ? 'dias' : 'dia'
        return `há ${diaAtual - diaVideo} ${cond}`
    }

    if(mesAtual - mesVideo < 12 && anoAtual == anoVideo){
        const cond = mesAtual - mesVideo > 1 ? 'meses' : 'mês'
        return `há ${mesAtual - mesVideo} ${cond}` 
    }

    if(anoAtual - anoVideo >= 1){
        const cond = anoAtual - anoVideo > 1 ? 'anos' : 'ano'
        return `há ${anoAtual - anoVideo} ${cond}`  
    }
}

// renderiza cada vídeo adiquirido pela função 'getVideos'
// também são executadas as funções 'getChannelThumb', 'formatarTempo' e 'formatarData'
const renderizarVideos = (videos) => {

    // laço de repetição com o array vindo do parâmetro
    videos.forEach((video) => {

        // obtenção do return da função 'getChannelThumb'
        const promise = getChannelThumb(video.snippet.channelId)
        promise.then((data) => {

            // constantes vindas de cada vídeo
            const urlImg = video.snippet.thumbnails.maxres.url
            const titulo = video.snippet.localized.title
            const tempo = video.contentDetails.duration
            const tituloCanal = video.snippet.channelTitle
            const canalId = video.snippet.channelId
            const videoId = video.id
            const views = video.statistics.viewCount
            const publicadoHa = video.snippet.publishedAt

            // template que será renderizado no HTML para cada vídeo
            const template = `
            <div class="video">
                <a href="https://youtube.com/watch?v=${videoId}" class="video__link" target="_blank" rel="external">
                    <div class="video__img-container">
                        <img src="${urlImg}" alt="thumnail do vídeo com o título ${titulo}" class="video__thumb">
                        <div class="tempo-container">${formatarTempo(tempo)}</div>
                    </div>
                </a>
                <div class="video__title-container">
                    <div class="title-container__logo-txt">
                        <a href="https://youtube.com/channel/${canalId}" target="_blank" rel="external">
                            <img src="${data}" alt="Logo do canal ${tituloCanal}" class="channel-logo">
                        </a>
                        <a href="https://youtube.com/watch?v=${videoId}" class="video__link" target="_blank" rel="external">
                            <div>
                                <h2 class="video__title">${titulo}</h2>
                                <div class="video__small-container">
                                    <small class="small-container__item">${tituloCanal}</small>
                                    <small class="small-container__item">${formatarViews(views)}</small>
                                    <small class="small-container__item">${formatarData(publicadoHa)}</small>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="video__options-container">
                        <button class="options-button">
                            <span class="material-symbols-outlined">more_vert</span>
                        </button>
                    </div>
                </div>
            </div>
        `

        // inserção do template no container
        videosContainer.innerHTML += template
        })
    })
}

// faz a requisição da API do youtube e executa a função 'renderizarVideos' com o resultado
const getVideos = async () => {
    try {
        const res = await fetch('https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails&part=snippet&part=statistics&chart=mostPopular&maxResults=6&key=AIzaSyC-MRxD8koOHYgzZ7kkkpKqf-cW1bO75hg')
        const videos = await res.json()

        renderizarVideos(videos.items)
    }
    catch(err) {

    }
}

// executa a função 'getVideos'
// getVideos()