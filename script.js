const BlogJson = "blog.json";
let blogArticles = [];
let index = 0;
let intervalID = null;

async function loadBlog(){
    try{
        const response = await fetch(BlogJson);
        const data = await response.json();
        blogArticles = data; 
               
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

document.addEventListener("DOMContentLoaded", () => {
    loadBlog();
});