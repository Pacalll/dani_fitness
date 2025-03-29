const BlogJson = "blog.json";
let blogArticles = [];
let index = 0;
let intervalID = null;

async function loadBlog(){
    try{
        const response = await fetch(BlogJson);
        const data = await response.json();
        blogArticles = data; 
               
        slide(index);
        const container = document.getElementById("blog-container");

        data.forEach(blogarticle => {
            const articleElement = document.createElement("article");
            const headlineElement = document.createElement("h2");
            const dateElement = document.createElement("p");
            articleElement.classList.add("article");
            dateElement.classList.add("article-date");
            headlineElement.classList.add("article-headline")
            headlineElement.textContent = blogarticle.artikel_headline;
            dateElement.textContent = blogarticle.artikel_date;
            articleElement.appendChild(headlineElement);
            articleElement.appendChild(dateElement);

            

            blogarticle.artikel_content.forEach((contentItem) => {
                if (contentItem.type === "text") {
                    const contentText = document.createElement("p");
                    contentText.classList.add("article-text");
                    contentText.textContent = contentItem.content;
                    articleElement.appendChild(contentText);
                } else if (contentItem.type === "img") {
                    const imgElement = document.createElement("img");
                    imgElement.src = contentItem.content;
                    imgElement.classList.add("article-img");
                    articleElement.appendChild(imgElement);
                }
            });        
        container.appendChild(articleElement);
        });
    }
    catch(error){
        console.error(error);
    }
}


function slide(index){
    const sliderContainer = document.getElementById("blog-container-slides");
    sliderContainer.textContent = ""; 

    const headlineElement = document.createElement("h2");
    const dateElement = document.createElement("p"); 
    dateElement.classList.add("article-date");
    headlineElement.classList.add("article-headline")
    headlineElement.textContent = blogArticles[index].artikel_headline;
    dateElement.textContent = blogArticles[index].artikel_date;
    sliderContainer.appendChild(headlineElement);
    sliderContainer.appendChild(dateElement);


    const ArtikelContent = blogArticles[index].artikel_content;

    ArtikelContent.forEach((ArtikelContent) => {
        if (ArtikelContent.type === "img") {
            const imgElement = document.createElement("img");
            imgElement.src = ArtikelContent.content;
            imgElement.classList.add("article-img");
            sliderContainer.appendChild(imgElement);
        }
        else if (ArtikelContent.type === "text") {
            const textElement = document.createElement("p");
            textElement.classList.add("article-text");
            textElement.textContent = ArtikelContent.content;
            sliderContainer.appendChild(textElement);
        }
    });
}

function prevSlide() {
    index--;
    if(index < 0){
        index = blogArticles.length -1;
    }
    slide(index);
}

function nextSlide() {
    index++;
    if(index >= blogArticles.length){
        index = 0;
    }
    slide(index);
}



document.addEventListener("DOMContentLoaded", () => {
    loadBlog();
});