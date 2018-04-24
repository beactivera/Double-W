let urlParams = new URLSearchParams(window.location.search);

let id =urlParams.get('id');
console.log('I want to get to article '+ id);

fetch('http://wilmakorpinen.com/wp00/wp-json/wp/v2/music/'+id).then(e =>e.json).then(showSinglePost);

function showSinglePost(aPost){
    console.log(aPost);
    document.querySelector('#singleMusic h1').textContent = aPost.title.rendered;
    
    // show carsection
    document.querySelector('#singleMusic').classList.add('slideInMusic')
}
