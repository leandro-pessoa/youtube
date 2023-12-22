// seleção de elementos HTML
const videosContainer = document.querySelector('[data-videos-container]')

const renderizarVideos = (videos) => {

    videos.forEach((video) => {
        const template = `
            <div class="video">
                <div class="video__img-container">
                    <img src="${video.snippet.thumbnails.high.url}">
                </div>
                <div class="video__title-container">

                </div>
            </div>
        `

        videosContainer.innerHTML += template
    })
}

const getVideos = async () => {

    try {
        const res = await fetch('https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails&part=snippet&part=statistics&chart=mostPopular&maxResults=20&key=AIzaSyC-MRxD8koOHYgzZ7kkkpKqf-cW1bO75hg')
        const videos = await res.json()

        console.log(videos.items)
        
    }
    catch(err) {

    }
}

getVideos()