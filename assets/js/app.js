const form = document.getElementById('search-form');
const searchField = document.getElementById('search-keyword');
let searchedForText;

form.addEventListener('submit', function(element) {
  element.preventDefault();
  searchedForText = searchField.value;
  getNews();
});

function getNews() {
  const articleRequest = new XMLHttpRequest();
  articleRequest.open('GET', `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=3941529e61a24eee9196cc4f1dc8e159`);
  articleRequest.onload = addNews;
  articleRequest.onerror = handleError;
  articleRequest.send();
};

function handleError() {
  console.log('Se ha presentado un error');
};

function addNews() {
  const data = JSON.parse(this.responseText);
  console.log(data);

  // Ciclo for para mostrar todos los articulos 
  for (i = 0; i < data.response.docs.length; i ++) {
    const article = data.response.docs[i];
    // Titulo del articulo
    const title = article.headline.main;
    // Url donde se aloja el articulo
    const url = article.web_url;
    // Resumen del articulo
    const snippet = article.snippet;
    // Imagen Principal del articulo
    const img = article.multimedia[0].url;

    // Creando Elementos necesarios para mostrar la info
    let card = document.createElement('div');
    card.className = 'card large';
    let cardImage = document.createElement('div');
    cardImage.setAttribute('class', 'card-image');
    let imgCard = document.createElement('img');
    imgCard.setAttribute('src', 'https://static01.nyt.com/' + img);
    let spanTitle = document.createElement('span');
    spanTitle.setAttribute('class', 'card-title');
    let titleArticle = document.createTextNode(title);
    let divContent = document.createElement('div');
    divContent.setAttribute('class', 'card-content');
    let paragraph = document.createElement('p');
    let paragraphText = document.createTextNode(snippet);
    let cardAction = document.createElement('div');
    cardAction.setAttribute('class', 'card-action');
    let aURL = document.createElement('a');
    aURL.setAttribute('href', url);
    let textA = document.createTextNode('Link Al Articulo');

    // Agregando los elementos creados a sus respectivos padres
    const cardArticles = document.getElementsByClassName('card-articles')[0];
    cardArticles.appendChild(card);
    card.appendChild(cardImage);
    cardImage.appendChild(imgCard);
    cardImage.appendChild(spanTitle);
    spanTitle.appendChild(titleArticle);
    card.appendChild(divContent);
    divContent.appendChild(paragraph);
    paragraph.appendChild(paragraphText);
    card.appendChild(cardAction);
    cardAction.appendChild(aURL);
    aURL.appendChild(textA);
  };
};