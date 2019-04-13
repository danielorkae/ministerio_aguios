const apiKey = "AIzaSyA8DUwgMqapEvPZ406JW2GzkgDfT68-JDY";
const channelId = "UC48j0zZ3RJf6wiicR_DXIQQ";
const feedURL = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=3`;

var responseItems = null;

(function getRssFeed() {
  fetch(feedURL)
    .then(response => response.json()
      .then(json => { responseItems = json.items; pushVideosToScreen(); }))
    .catch(error => {
      console.error(error);
    })
})();

function pushVideosToScreen() {
  let cards = responseItems.map(item => {
    return createVideoCard(item.id.videoId, item.snippet.title, item.snippet.thumbnails.high.url);
  });

  let videoContainer = $("#videos .container .row")[0];
  videoContainer.innerHTML = "";
  cards.forEach(card => {
    videoContainer.innerHTML += card;
  });
}

function createVideoCard(id, title, thumbnail) {
  return `
    <div class="col-md-4 mb-3">
      <a href="https://youtu.be/${id}" target="_blank" rel="noopener">
        <div class="card">
          <img src="${thumbnail}" class="card-img-top">
          <div class="card-body">
            <h6 class="card-title text-dark" style="font-family: Roboto">${title}</h6>
          </div>
        </div>
      </a>
    </div>
  `;
}
