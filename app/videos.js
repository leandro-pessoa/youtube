// seleção de elementos HTML
const videosContainer = document.querySelector('[data-videos-container]')

// retorna a logo do canal, encontrando o canal pelo id, que será passado como parâmetro
const getChannelThumb = async (channelId) => {
    try {
        const res = await fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&maxResults=20&key=AIzaSyC-MRxD8koOHYgzZ7kkkpKqf-cW1bO75hg`)
        const channel = await res.json()
        return channel.items[0].snippet.thumbnails.default.url
    }
    catch (err) {

    }
}

const formatarTempo = (tempo) => {
    const duration = moment.duration(tempo)
    if(moment.duration(tempo).hours() == '0'){
        if(duration.seconds().length == 1) {
            tempo = `${duration.minutes()}:${duration.seconds()}`
        }
        tempo = `${duration.minutes()}:${duration.seconds()}`
    }
    else{

    }

    return tempo
}

// renderiza cada vídeo adiquirido pela função 'getVideos'
// tembém é executada a função 'getChannelThumb' 
const renderizarVideos = (videos) => {
    videos.forEach((video) => {
        const promise = getChannelThumb(video.snippet.channelId)
        promise.then((data) => {

            let tempo = video.contentDetails.duration
            console.log(formatarTempo(tempo))

            const template = `
            <div class="video">
                <div class="video__img-container">
                    <img src="${video.snippet.thumbnails.maxres.url}" alt="thumnail do vídeo com o título ${video.snippet.localized.title}" class="video__thumb">
                    <div class="tempo-container">5:00</div>
                </div>
                <div class="video__title-container">
                    <div class="title-container__logo-txt">
                       <img src="${data}" alt="Logo do canal ${video.snippet.channelTitle}" class="channel-logo">
                       <div>
                            <h2 class="video__title">${video.snippet.localized.title}</h2>
                            <div class="video__small-container">
                                <small class="small-container__item">${video.snippet.channelTitle}</small>
                                <small class="small-container__item">1,8 mi visualizações</small>
                                <small class="small-container__item">há 5 horas</small>
                            </div>
                       </div>
                    </div>
                    <div class="video__options-container">
                        <button class="options-button">
                            <span class="material-symbols-outlined">more_vert</span>
                        </button>
                    </div>
                </div>  
            </div>
        `
        videosContainer.innerHTML += template
        })
    })
}

// faz a requisição da API do youtube e executa a função 'renderizarVideos' com o resultado
const getVideos = async () => {
    try {
        const res = await fetch('https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails&part=snippet&part=statistics&chart=mostPopular&maxResults=20&key=AIzaSyC-MRxD8koOHYgzZ7kkkpKqf-cW1bO75hg')
        const videos = await res.json()

        renderizarVideos(videos.items)
        console.log(videos.items)
    }
    catch(err) {

    }
}

// executa a função 'getVideos'
getVideos()