
const $= document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
 
    const playlist = $('.playlist')
    const nameSong = $('.name-song h2')
    const nameAuthor = $('.name-song h4')
    const nextSong = $('.header-box h3')
    const cdThumb = $('.cd-thumb')
    const audio = $('#audio')
    const playBtn = $('.btn-toggle-play')
    const musicBox = $('.music-box')
    const prevBtn = $('.btn-prev')
    const nextBtn = $('.btn-next')
    const repeatBtn =$('.btn-repeat')
    const randomBtn = $('.btn-random')
    const navOpen =$('.nav-open')
    
  const app = {
    currentIndex: 0,
    isPlaying: false,
    isRepeat: false,
    isRandom: false,
     songs: [
      {   
          place: 01,
          name: "Bật chế độ bay lên",
          singer: "Bình Gold",
          path: "./music/batchedobaylen.mp3",
          image: "./img/bar19002.jpg"
      },
      {   
          place: 02,
          name: "Dusk Still Dawn",
          singer: " Zayn Malik",
          path: "./music/duskstilldawn.mp3",
          image: "./img/bar19904.jpg"
      },
      {   
          place: 03,
          name: "Giờ thì em ơi",
          singer: "Tuâns Hưng",
          path: "./music/giothiemoi.mp3",
          image: "./img/bar19905.png"
      },
      {   
          place: 04,
          name: "Mười năm nhân gian",
          singer: "Zin Media",
          path: "./music/muoinamnhangian.mp3",
          image: "./img/bar19906.jpg"
      },
      {   
          place: 05,
          name: "Vài lần đón đưa",
          singer: "Soobin",
          path: "./music/vailandondua.mp3",
          image: "./img/bar19007.jpg"
      },  
      {   
          place: 06,
          name: "Sao anh chưa về",
          singer: "Amee",
          path: "./music/saoanhchuave.mp3",
          image: "./img/saoanhchuave.jpeg"
      },
      {   
          place: 07,
          name: "Dạ vũ",
          singer: "Tăng Duy Tân",
          path: "./music/davux.mp3",
          image: "./img/davu.jpeg"
      }
  ],
  //print song
   render: function() {

       const htmls = this.songs.map((song, index) =>{
         return `
         <div class="song ${index === this.currentIndex? 'active' : '' }" data-index='${index}'>
                           <span class="number-item">${song.place}</span>
                          <div class="thumb" style="background-image: url('${song.image}')"></div>
                          <i class="current-music fa-solid fa-caret-right"></i>
                          <div class="body-song">
                             <h3 class="title-song">${song.name}</h3>
                             <p class="author">${song.singer}</p>
                             <h3 class="length-song">4:31</h3>
                          </div>
                          <div class="option-song">
                              <i class="fa-solid fa-ellipsis"></i> 
                          </div>
                       </div>
         `
     })
     playlist.innerHTML = htmls.join('\n')
   },
   defineProperties: function() {
       Object.defineProperty(this, 'currentSong', {
           get: function() {
               //song next
               return this.songs[this.currentIndex]
           }
       })
   },


//behavior user
   handleEventns: function() {
   const _this =this;
   const cdThumbAnimate = cdThumb.animate([
       {transform: 'rotate(360deg)'}
   ], {
       duration: 20000,
       iterations: Infinity,
   })
    cdThumbAnimate.pause()
    
   audio.ontimeupdate = function() {
       if(audio.duration){
           const progressPercent = Math.floor(audio.currentTime / audio.duration *100)

           progress.value = progressPercent;
       }
   }
   progress.onchange = function(e) {
       const seekTime = audio.duration / 100 * e.target.value
       audio.currentTime = seekTime;
   }

   playBtn.onclick = function() {
       if(_this.isPlaying){
           audio.pause()
       }else{
           audio.play()
       }
       
    }
    audio.onplay = function() {
        _this.isPlaying = true;
        musicBox.classList.add('playing')
        cdThumbAnimate.play()
    }
    audio.onpause = function() {
        _this.isPlaying = false;
        musicBox.classList.remove('playing')
        cdThumbAnimate.pause()
    }
    nextBtn.onclick = function() {
        if(_this.isRandom){
            _this.randomSong()
        }else{
            _this.nextSong()
        }
        _this.render()
        audio.play()
    }
    prevBtn.onclick = function() {
        if(_this.isRandom){
            _this.randomSong()
        }else{
            _this.prevSong()
        }
        _this.render()
        audio.play()
    }
    repeatBtn.onclick = function() {
        _this.isRepeat = !_this.isRepeat
        repeatBtn.classList.toggle('active',_this.isRepeat)
    }
    randomBtn.onclick = function() {
        _this.isRandom = !_this.isRandom
        randomBtn.classList.toggle('active' ,_this.isRandom)
        
    }
    audio.onended = function() {
        if(_this.isRepeat){
            audio.play()
        }else{
            nextBtn.click()
        }
    }
    playlist.onclick = function(e) {
        const songNode = e.target.closest('.song:not(.active)')
       if(songNode && !e.target.closest('.option-song')){     
           if(songNode){
                _this.currentIndex = Number(songNode.dataset.index)
                _this.render()
               _this.loadCurrentSong()
                audio.play()
           }
       }
    }
   },
   loadCurrentSong: function() {
//    nextSong.textContent = this.nextSong.name
   nameSong.textContent = this.currentSong.name
   nameAuthor.textContent = this.currentSong.singer
   cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
   audio.src = this.currentSong.path
   },

   nextSong: function() {
       this.currentIndex++
       if(this.currentIndex >= this.songs.length){
           this.currentIndex=0;
       }
       this.loadCurrentSong()
   },
   prevSong: function() {
       this.currentIndex--
       if(this.currentIndex < 0){
           this.currentIndex = this.songs.length - 1;
       }
       this.loadCurrentSong()
   },
   randomSong: function() {
     let newIndex;
     do{
      newIndex = Math.floor(Math.random() * this.songs.length)
     }while(newIndex === this.currentIndex)
     this.currentIndex = newIndex
     this.loadCurrentSong()
   },
   // call all function 
   start: function() {
       this.render()
       
       this.defineProperties() 
       
       
       this.loadCurrentSong()
       
       this.handleEventns()
    }
}
app.start()

const navBar = document.getElementById('navbar')

function showNavBar() {
    if(navBar.style.display=='none'){
        navBar.style.display='block'
    }else{
        navBar.style.display= 'none'
    }
  
 }

  navOpen.addEventListener('click', showNavBar)


