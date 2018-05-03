function toggleSidebar() {
 document.getElementById("sidebar").classList.toggle('active');
}

fetch("http://elitzca.eu/kea/wordpress/wp-json/wp/v2/categories?per_page=100&orderby=id&desc")
    .then(e=>e.json())
    .then(buildMenu)

function buildMenu (data){
    //console.log(data);
    let parentElement = document.querySelector("#menu-events");

    data.forEach (item =>{
        //console.log(item);
        if(item.count>0){
            let li = document.createElement("li");
            let a = document.createElement("a");
            let ul;


            a.textContent = item.name;
            a.href="index.html?category=" + item.id;

            li.appendChild(a);

            if(item.parent==0 && item.count > 1){
                //console.log(item);
                ul = document.createElement("ul")
                ul.classList.add("cat-" + item.id)
                li.appendChild(ul);

            } else if (item.parent>0) {
                parentElement = document.querySelector(".cat-" + item.parent)

                li.classList.add("bullet");
            }



            parentElement.appendChild(li);
        }
    })
}

