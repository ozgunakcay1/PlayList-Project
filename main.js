/* elementlere ulasip obje olarak kullanma, yakalama*/
const prevButton = document.getElementById('prev')
const nextButton = document.getElementById('next')
const repeatButton = document.getElementById('repeat')
const shuffleButton = document.getElementById('shuffle')
const audio = document.getElementById('audio')
const songImage = document.getElementById('song-image')
const songName = document.getElementById('song-name')
const songArtist = document.getElementById('song-artist')
const pauseButton = document.getElementById('pause')
const playButton = document.getElementById('play')
const playListButton = document.getElementById('playlist')


const maxDuration = document.getElementById('max-duration')
const currentTimeRef = document.getElementById('current-time')

const progressBar = document.getElementById('progress-bar')
const playListContainer = document.getElementById('playlist-container')
const closeButton= document.getElementById('close-button')
const playListSongs = document.getElementById('playlist-songs')

const currentProgress = document.getElementById('current-progress')


// sira

let index 

//dongu 

let loop = true


// liste 

const songsList=[
    {
        name: 'Back to Black',
        artist: 'Amy Winehouse',
        image: 'media/BackToBlack.jpg',
        link: 'media/Back to Black.mp3',
    },
    {
        name: 'Rehab',
        artist: 'Amy Winehouse',
        image: 'media/Rehab.jpg',
        link: 'media/Rehab.mp3',
    },

    {
        name: 'You Know Im No Good',
        artist: 'Amy Winehouse',
        image: 'media/imNoGood.jpg',
        link: "media/You Know I'm No Good.mp3",
    },

    {
        name: 'Love Is A Losing Game',
        artist: 'Amy Winehouse',
        image: 'media/LoveIsALoosingGame.jpeg',
        link: 'media/Love Is A Losing Game.mp3',
    },

    {
        name: 'Me and Mr Jones',
        artist: 'Amy Winehouse',
        image: 'media/meJones.png',
        link: 'media/Me And Mr Jones.mp3',
    },
   
]


//sarki atama 
const setSong = (arrayIndex) => { 
    console.log(arrayIndex);
    let { name, artist, image, link} = songsList[arrayIndex];

    audio.src = link
    songName.innerHTML = name
    songArtist.innerHTML = artist
    songImage.src = image 
  
    audio.onloadeddata = () => {
        maxDuration.innerHTML = timeFormatter(audio.duration)

}

playListContainer.classList.add('hide')
playAudio()}



//zamani istenilen formatta duzenle 
const timeFormatter = (timeInput) =>{
    let minute = Math.floor(timeInput/60)
    minute = minute < 10 ? "0" + minute : minute
    let second = Math.floor(timeInput % 60)
    second = second <10 ? "0" + second : second
    return `${minute}:${second}`
}



//sarkiyi cal 

const playAudio =() => {
    audio.play()
    pauseButton.classList.remove('hide')
    playButton.classList.add('hide')
}

//sarkiyi durdur

const pauseAudio = () => {
    audio.pause()
    pauseButton.classList.add('hide')
    playButton.classList.remove('hide')
}

// sonraki sarkiya git 

const nextSong = () => {
    if (loop){
        if(index == songsList.length - 1){
            index = 0
        }
        else{
            index += 1 // index = index + 1
        }

        }

    //Rastgele sira olustur
    else{
        let randIndex = Mart.floor(Math.random() * songsList.lenght)
        index = randIndex
    }

    setSong(index)
    playAudio()
    }

// onceki sarkiya git 
const previousSong = () =>{
    pauseAudio()
    if(index>0){
        index -= 1 //index = index-1 
    }
    else{
        index = songsList.length - 1
    }
    setSong(index)
    playAudio()
}

//progress bar a tiklandiginda (gri alan)
progressBar.addEventListener("click", (event) =>{


//baslangic 
let coordStart = progressBar.getBoundingClientRect().left

console.log("coordStart: " + coordStart)


//bitis 
let coordEnd = (event.clientX)

console.log ("coordEnd: " + coordEnd)

let progress = (coordEnd - coordStart) / progressBar.offsetWidth

console.log ("progressBar.offsetWidth: " + progressBar.offsetWidth )

currentProgress.style.width = progress *100 + "%"

//zamani guncelle
audio.currentTime = progress * audio.duration 

})


//liste acma butonuna tiklaninca 

playListButton.addEventListener("click",()=>
{playListContainer.classList.remove('hide')

})

//oynatma listesi kapatma butonu
closeButton.addEventListener("click",()=>{
    playListContainer.classList.add('hide')
})


//ekran yuklenince

setInterval(() => {
    currentTimeRef.innerHTML = timeFormatter(audio.currentTime)
    currentProgress.style.width = (audio.currentTime / audio.duration) * 100 + "%"
}, 1000);

// sarki bittiginde otomatik olarak sonraki sarkiya gec

audio.onended =() => {
    nextSong()
}



playButton.addEventListener("click" , playAudio)
pauseButton.addEventListener("click", pauseAudio )
nextButton.addEventListener("click", nextSong)
prevButton.addEventListener("click" , previousSong)

shuffleButton.addEventListener("click" , () => {
    if(shuffleButton.classList.contains("active")) {
        shuffleButton.classList.remove("active")
        loop = true
    } else {
        shuffleButton.classList.add("active")
        loop = false
    }
})


repeatButton.addEventListener("click" , () => {
    if(repeatButton.classList.contains("active")) {
        repeatButton.classList.remove("active")
        loop = false
    } else {
        repeatButton.classList.add("active")
        loop = true
    }
})


//oynatma listesini olustur 

const initializePlaylist = () =>{
    for (let i in songsList) {
        playListSongs.innerHTML += `<li class="playlistSong"
        onclick="setSong(${i})">
            <div class="playlist-image-container">
                <img src="${songsList[i].image}" />
            </div>
            <div class="playlist-song-details">
                <span id="playlist-song-name">
                    ${songsList[i].name}
                </span>
                <span id="playlist-song-artist-album">
                    ${songsList[i].artist}
                </span>
            </div>
        </li>
        `
    }
}

// ekran yuklendiginde
window.onload =() => {
    index = 0
    setSong(index)
    pauseAudio()
    initializePlaylist()
}