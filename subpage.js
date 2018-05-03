 let urlParameters = new URLSearchParams(window.location.search);

let id = urlParameters.get("id");

fetch("http://elitzca.eu/kea/wordpress/wp-json/wp/v2/event/"+id + "?_embed")
  .then(e=>e.json())
  .then(showSinglePost)


function showSinglePost(aPost){
  console.log(aPost);
  document.querySelector("#showSingleEvent h1").textContent=aPost.title.rendered;

    document.querySelector(".price span ").textContent = aPost.acf.price;
    document.querySelector(".time").textContent = aPost.acf.time;
    document.querySelector(".date").textContent = aPost.acf.date;
    document.querySelector(".venue").textContent = aPost.acf.venue;
    document.querySelector(".description").innerHTML = aPost.content.rendered;

    document.querySelector("img").setAttribute("src", aPost._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url);

}







let page = 1;
let lookingForData = false;

function fetchEvents (){
    lookingForData = true;

    let urlParameters = new URLSearchParams(window.location.search);

    let catid = urlParameters.get("category");
    if(catid){
        fetch("http://elitzca.eu/kea/wordpress/wp-json/wp/v2/event?_embed&per_page=10&page=" + page + "&categories=" + catid)
    .then( e => e.json())
    .then(showEvents)
    } else {
        fetch("http://elitzca.eu/kea/wordpress/wp-json/wp/v2/event?_embed&per_page=10&page="+page)
    .then( e => e.json())
    .then(showEvents)
    }

}





