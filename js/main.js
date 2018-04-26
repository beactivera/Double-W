let template = document.querySelector("#musictemp").content;
let musiclist = document.querySelector("#musiclist");
let page = 1;
let lookingForData = false;

function fetchMusic(){
  lookingForData=true;
    
    let urlParams = new URLSearchParams(window.location.search);

    let catid =urlParams.get('categories');
    let endpoint = 'http://wilmakorpinen.com/wp00/wp-json/wp/v2/music?_embed&per_page=2&page='+page;
    if(catid){ // DRY
     endpoint = "http://wilmakorpinen.com/wp00/wp-json/wp/v2/music?_embed&per_page=2&page="+page+'&categories='+ catid;
    }
    fetch(endpoint)
    .then(e => e.json())
    .then(showMusic);
}

function showMusic(data){
  console.log(data)
  lookingForData=false;
  data.forEach(showSingleMusic);
}

function showSingleMusic(aMusic){
  let clone = template.cloneNode(true);
  clone.querySelector("h1").textContent = aMusic.title.rendered;
  clone.querySelector(".price span").textContent=aMusic.acf.price;

  if(aMusic._embedded["wp:featuredmedia"]){//img is there
     clone.querySelector("img").setAttribute("src", aMusic._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url)
  } else { // no img
      clone.querySelector("img").remove()
  }

  clone.querySelector('.readmore').href = 'subpages.html?id=' + aMusic.id;

  musiclist.appendChild(clone);
}
fetchMusic();


//found this stuff online
setInterval(function(){

  if(bottomVisible() && lookingForData===false){
    console.log("We've reached rock bottom, fetching articles")
    page++;
    fetchMusic();
  }
}, 1000)

function bottomVisible() {
  const scrollY = window.scrollY
  const visible = document.documentElement.clientHeight
  const pageHeight = document.documentElement.scrollHeight
  const bottomOfPage = visible + scrollY >= pageHeight
  return bottomOfPage || pageHeight < visible
}