import { searchYoutubeVideos } from "./api.js";

let containerVideos = document.querySelector("[exercises-related-youtube-videos-slider__wrapper]");

let bodyPart = window.localStorage.getItem("bodyPart");
let firstWord;
let secondWord;

function createCard(parentCard, { items }) {

items.forEach(video => { 
    let {
    type,
    title,
    author : { bestAvatar : { url : urlAvatar  } },
    bestThumbnail : { url : urlName },
  } = video;


  if (title.includes("-")) {
    let symbol = title.indexOf("-");
    title = title.slice(0,symbol);
  } else if (title.includes("|")) {
    let symbol = title.indexOf("|");
    title = title.slice(0,symbol);
  }

  let parent = parentCard.closest("div[parent]");
  let linkCard = document.createElement("a");
  let card = document.createElement("div");

  linkCard.setAttribute("href", "https://www.youtube.com/watch?v=7P4-W0D21fg");
  linkCard.setAttribute("target", "_blank");
  linkCard.setAttribute("link-card", "link-card")

  card.classList.add(`${parent.classList[0]}__card`);
  card.classList.add("flex");
  card.classList.add("flex-column");
  card.classList.add("flex-center");


  card.innerHTML = `
      <img src="${urlName}"  class="yt-image">
      <div class="channel-description flex flex-align-center flex-between">
      <p class="title-youtube" title-youtube title="${title}">${title}</p>
          <img src="${urlAvatar}">
      </div>
  `;

  linkCard.appendChild(card);
  parentCard.appendChild(linkCard);
})


};

if (bodyPart.indexOf(" ") != -1) {
    let index = bodyPart.indexOf(" ");
    firstWord = bodyPart.slice(0,index) + "%20";
    secondWord = bodyPart.slice(index).trim("");
    bodyPart = firstWord + secondWord;
}

fetch(`https://youtube-search-results.p.rapidapi.com/youtube-search/?q=${bodyPart}`,searchYoutubeVideos)
.then( response => response.json() )
.then( data => createCard(containerVideos,data))
