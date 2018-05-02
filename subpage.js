 let urlParameters = new URLSearchParams(window.location.search);

let id = urlParameters.get("id");

fetch("http://elitzca.eu/kea/wordpress/wp-json/wp/v2/event/" + id)
    .then(e => e.json())
    .then(showSinglePost)

function showSinglePost(aPost){
    console.log(aPost);
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
