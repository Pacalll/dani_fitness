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
            const articleElement = document.createElement("details");

            const summarysimg = document.createElement("img");
            summarysimg.src = blogarticle.artikel_pic;
            summarysimg.loading = "lazy";
            summarysimg.classList.add("article-header-img");

            const summaryZusammenfassung = document.createElement("p");
            summaryZusammenfassung.textContent = blogarticle.artikel_summary;

            const summaryElement = document.createElement("summary");
            summaryElement.classList.add("article-summary");
/*             summaryElement.classList.add("article-headline");
            summaryElement.textContent = blogarticle.artikel_headline; */

            const dateElement = document.createElement("p");
            dateElement.classList.add("article-date");
            dateElement.textContent = blogarticle.artikel_date;

            summaryElement.appendChild(summarysimg);
            summaryElement.appendChild(summaryZusammenfassung);
            articleElement.appendChild(summaryElement);
            articleElement.appendChild(dateElement);

            let currentParagraph = null;
            let currentList = null;
            let currentListItem = null;

            

            blogarticle.artikel_content.forEach((contentItem) => {
                if (contentItem.type === "text") {
                    const contentText = document.createElement("p");
                    const contentbreak = document.createElement("br");
                    contentText.classList.add("article-text");
                    contentText.textContent = contentItem.content;
                    articleElement.appendChild(contentText);
                    articleElement.appendChild(contentbreak);
                    currentParagraph = contentText;
                } else if (contentItem.type === "img") {
                    const imgElement = document.createElement("img");
                    imgElement.src = contentItem.content;
                    imgElement.classList.add("article-img");
                    articleElement.appendChild(imgElement);
                } else if (contentItem.type === "fat_inline") {
                    const fatElement = document.createElement("strong");
                    fatElement.textContent = contentItem.content;
                    currentParagraph.appendChild(fatElement);
                } else if (contentItem.type === "text_for_prev_paragraph"){
                    currentParagraph.appendChild(document.createTextNode(contentItem.content));
                } else if (contentItem.type === "subheadline") {
                    const subheadlineElement = document.createElement("h3");
                    const subheadlinebreakElement = document.createElement("br");
                    subheadlineElement.textContent = contentItem.content;
                    articleElement.appendChild(subheadlineElement);
                    articleElement.appendChild(subheadlinebreakElement);    
                } else if (contentItem.type === "text_new_line_after") {
                    const contentText = document.createElement("p");
                    contentText.textContent = contentItem.content;
                    contentText.classList.add("article-text");
                    articleElement.appendChild(contentText);
                } else if (contentItem.type === "ul_start") {
                    currentList = document.createElement("ul");
                    currentList.classList.add("article-list");
                    articleElement.appendChild(currentList);
                } else if (contentItem.type === "li_start") {
                    currentListItem = document.createElement("li");
                    currentListItem.classList.add("article-list-item");
                    currentList.appendChild(currentListItem);
                } else if (contentItem.type === "li_text") {
                    if (currentListItem) {
                        currentListItem.appendChild(document.createTextNode(contentItem.content));
                    }
                } else if (contentItem.type === "li_fat_inline") {
                    const fatInline = document.createElement("strong");
                    fatInline.textContent = contentItem.content;
                    if (currentListItem) {
                        currentListItem.appendChild(fatInline);
                    }
                } else if (contentItem.type === "li_end") {
                    currentListItem = null;
                } else if (contentItem.type === "ul_end") {
                    currentList = null;
                } else if (contentItem.type === "inline_link") {
                    const linkElement = document.createElement("a");
                    linkElement.classList.add("article-link");
                    linkElement.href = contentItem.href;
                    linkElement.textContent = contentItem.href;
                    linkElement.target = "_blank";
                    linkElement.rel = "noopener noreferrer";
                    currentParagraph.appendChild(linkElement);
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
    const menuButton = document.querySelector('.menu-button');
    const header = document.querySelector('header');
    
    menuButton.addEventListener('click', () => {
        header.classList.toggle('open');
    })

    document.addEventListener("click", (event) => {
        if (header.classList.contains("open") && !header.contains(event.target)) {
            header.classList.remove("open");
        }
    });

    header.addEventListener("mouseenter", () => {
        if (!header.classList.contains("open")) {
            header.classList.add("open");
        }
    });
});