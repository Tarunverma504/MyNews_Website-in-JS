let output=document.querySelector(".container");
let source=document.getElementById("sources").value;
let country="in"
let category="health";

$("#burger").on("click",()=>{
    var toggle=$(".responsive li").css("display");
    if(toggle=="none")
    {
        $(".responsive li").fadeIn();
        $(".responsive li").fadeIn("slow");
        $(".menu-bar i").removeClass("fas fa-bars");
        $(".menu-bar i").addClass("fas fa-times");
    }
    else{
        $(".responsive li").fadeOut();
        $(".responsive li").fadeOut("slow");
        $(".menu-bar i").removeClass("fas fa-times");
        $(".menu-bar i").addClass("fas fa-bars");
        
    }
})

$(window).scroll(function(){
    if ($(this).scrollTop() > 500) {
         $(".fixed-btn").fadeIn();
     } else {
         $(".fixed-btn").fadeOut();
     }
});


function fun(){
    fetch('https://saurav.tech/NewsAPI/everything/cnn.json')
  .then(response => response.json())
  .then(data=> { showData(data) }).catch(error=>console.log("Error"));
}

function showData(data)
{
    output.innerHTML="";
   for(var i in data.articles)
    {
        output.innerHTML+= `
            <div class="content">
                <h2>${data.articles[i].title}</h2>
                <div class="image">
                        <img src="${data.articles[i].urlToImage}" alt="Image Not Found"/>
                </div>
                <div class="news">
                        <p>${data.articles[i].description}</p>
                </div>
                <a href="${data.articles[i].url}" class="read_more">Read More&nbsp<i class="fas fa-angle-double-right"></i> </a>
            </div>
        `

    }
}

function change_source(value)
{
    source=value.trim();
    var url="https://saurav.tech/NewsAPI/everything/"+source+".json";
    fetch(url)
        .then((data)=>{ return data.json();})
            .then((data)=>{showData(data)})
                .catch(error => console.log('error', error));
}


function change_country(value)
{
        country=value;
    change_news();
}

function change_categories(value)
{
    if(value!="categories")
    {
        category=value;
        change_news();
    }
    
}

function change_news(){
    if(country=='in')
    {
        document.getElementById("country").value="in";
    }
    if(category=='health'){
        document.getElementById("categories").value="health";
    }
    var url="https://saurav.tech/NewsAPI/top-headlines/category/"+category+"/"+country+".json";
    fetch(url)
        .then((data)=>{ return data.json();})
            .then((data)=>{showData(data)})
                .catch(error => console.log('error', error));

}

