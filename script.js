const postContainerEl = document.getElementById("posts-container");
const filterEl = document.getElementById("filter");
const loaderEl = document.getElementById("loader");

let limit = 10;
let page = 1;
let loaderIndicator = false;
let dataFromBack = [];

const renderItem = (post) => {
    const {id, title, body} = post;
    return `
    <div class="post">
    <div class="number">${id}</div>
    <div class="post_info">
    <h2>${title}</h2>
    <p class="post_body">${body}</p>
    </div>
    </div>
    `;
};

const getData = async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
     data = await response.json();
    page += 1;
    dataFromBack = [...dataFromBack, ...data]
    return data;
};

const renderPosts = async () => {
    loaderEl.classList.add("show");
    const data = await getData();
    // Let text = "";
    
    // for (Let key in data) {
    //     text += renderItem(data[key]);
    // }

    // postContainerEl.innerHTML += text;

    const postTemplate = data.reduce((text, element) => (text += renderItem(element)),"");
    postContainerEl.innerHTML += postTemplate;

    loaderEl.classList.remove("show");
    loaderIndicator = false;
};

const setScrollPagination = () => {
    if (loaderIndicator === true) return;



    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight + 1 >= scrollHeight) {
        renderPosts();
    }
};


const searchPosts = (event) => {
   
    const term = event.target.value.toLowerCase();

    const filteredPosts = dataFromBack.filter((el) => el.title.toLowerCase().indexOf(term) > -1);
    postContainerEl.innerHTML = filteredPosts.reduce((text, element) => (text += renderItem(element)),"");
    console.log("work");
};


const searchPostsBody = (event) => {
   console.log(dataFromBack);
       const term = event.target.value.toLowerCase();

    const filteredPosts = dataFromBack.filter((el) => el.body.toLowerCase().indexOf(term) > -1);
    postContainerEl.innerHTML = filteredPosts.reduce((text, element) => (text += renderItem(element)),"");
    console.log("work");
};




renderPosts();

window.addEventListener("scroll", setScrollPagination);
filterEl.addEventListener("input", searchPosts);

filterEl.addEventListener("input", searchPostsBody);
