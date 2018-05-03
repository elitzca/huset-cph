let template = document.querySelector("#evttemplate").content;
let evtlist = document.querySelector("#evtlist");
let page = 1;
let lookingForData = false;

function fetchEvents (){
    lookingForData = true;

    let urlParameters = new URLSearchParams(window.location.search);

    let catid = urlParameters.get("category");
    if(catid){
        fetch("http://elitzca.eu/kea/wordpress/wp-json/wp/v2/event?_embed&per_page=10&page=" + page + "&categories=" + catid )
    .then( e => e.json())
    .then(showEvents)
    } else {
        fetch("http://elitzca.eu/kea/wordpress/wp-json/wp/v2/event?_embed&per_page=10&page="+page)
    .then( e => e.json())
    .then(showEvents)
    }

}



function showEvents (data){
    console.log(data)
    lookingForData = false;
    data.forEach(showOneEvent)
}

function showOneEvent(anEvent){
    console.log(anEvent)

    let clone = template.cloneNode(true);

    clone.querySelector("h1").textContent = anEvent.title.rendered;
    clone.querySelector(".price span ").textContent = anEvent.acf.price;
    clone.querySelector(".time").textContent = anEvent.acf.time;
    clone.querySelector(".venue").textContent = anEvent.acf.venue;
    clone.querySelector(".description").innerHTML = anEvent.content.rendered;

    clone.querySelector("img").setAttribute("src", anEvent._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url);

    clone.querySelector(".readmore").href="subpage.html?id=" + anEvent.id;

    let year = anEvent.acf.date.substring(0,4);
    let month = anEvent.acf.date.substring(4,6);
    let day = anEvent.acf.date.substring(6,8);

    clone.querySelector(".date").innerHTML = day + "." + month + "." + year;

     if(anEvent.acf.price == 0){
        clone.querySelector(".price").textContent = "FREE"    }else {
        clone.querySelector(".price span ").textContent = anEvent.acf.price;
    }

    evtlist.appendChild(clone);


}

fetchEvents();

//window.onscroll = function() {
    //console.log(document.documentElement.clientHeight);
//};

setInterval(function(){
    console.log(bottomVisible());
   if (bottomVisible()  && lookingForData === false){
       page++;
       fetchEvents();
   }
}, 100)

function bottomVisible() {
    const scrollY = window.scrollY
    const visible = document.documentElement.clientHeight
    const pageHeight = document.documentElement.scrollHeight
    const bottomOfPage = visible + Math.round(scrollY) >= pageHeight
    return bottomOfPage || pageHeight < visible
}



