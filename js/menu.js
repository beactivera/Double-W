window.addEventListener('load',()=>{
  let menuOpen = false;
  let menuIcon = document.querySelector("svg.menuIcon")
  let menu = document.querySelector(".menu");
  let bars = menuIcon.querySelectorAll("rect");
  menuIcon.addEventListener('click', toggleMenu);

  function toggleMenu(){
    menuOpen = !menuOpen;
    bars[0].classList.toggle("rotateDown");
    bars[1].classList.toggle("fadeOut");
    bars[2].classList.toggle("rotateUp");
    menu.classList.toggle("hidden");
  }
    
//  let imageHeader = document.querySelector('.image-header').onclick = function(){
//      location.href = "http://beactivera.com/kea/music-web-app/";
//  }
//  let imageSubHeader = document.querySelector('.image-subpage-header').onclick = moveToHome();
//    function moveToHome(){
//      location.href = "http://beactivera.com/kea/music-web-app/";
//  }
    
  fetch('http://wilmakorpinen.com/wp00/wp-json/wp/v2/categories?per_page=50').then(e => e.json()).then(buildMenu)
    
    function buildMenu(data){
        let parentElement = document.querySelector('.menu ul')
        data.forEach(item =>{
            console.log(item);
            let li = document.createElement('li');
            let a = document.createElement('a');
            if(item.parent == 5){
            a.textContent = item.name;
            a.href = 'categories.html?categories='+ item.id;
            document.querySelector('.container-fluid').style.marginTop = '40px';
            li.appendChild(a);
            parentElement.appendChild(li);
            }
        })
    } 
});
    
    