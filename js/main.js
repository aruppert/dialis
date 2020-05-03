let results = [];
let lastSearchResults = [];
let playlistData = [];
let playlistPreview = "";
let recipient = "pleaseChange@thisAdress.now";
let counter = 0;
let mediaCategoryMusic = "media=music";
let mediaCategoryPodcast = null;
let mediaCategoryAudiobook = null;
let mediaArray = ["music"];
let mediaTypes = "";
const defaultResults = [
  {
    wrapperType: "track",
    kind: "song",
    artistId: 288340229,
    collectionId: 534798874,
    trackId: 534798882,
    artistName: "Passion Pit",
    collectionName: "Gossamer",
    trackName: "Take a Walk",
    collectionCensoredName: "Gossamer",
    trackCensoredName: "Take a Walk",
    artistViewUrl:
      "https://music.apple.com/us/artist/passion-pit/288340229?uo=4",
    collectionViewUrl:
      "https://music.apple.com/us/album/take-a-walk/534798874?i=534798882&uo=4",
    trackViewUrl:
      "https://music.apple.com/us/album/take-a-walk/534798874?i=534798882&uo=4",
    previewUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/Music/f1/66/b3/mzi.mzfhgzfb.aac.p.m4a",
    artworkUrl30:
      "https://is2-ssl.mzstatic.com/image/thumb/Music/v4/b4/e7/d0/b4e7d040-758b-bf4a-7f55-d8bb63c79853/source/30x30bb.jpg",
    artworkUrl60:
      "https://is2-ssl.mzstatic.com/image/thumb/Music/v4/b4/e7/d0/b4e7d040-758b-bf4a-7f55-d8bb63c79853/source/60x60bb.jpg",
    artworkUrl100:
      "https://is2-ssl.mzstatic.com/image/thumb/Music/v4/b4/e7/d0/b4e7d040-758b-bf4a-7f55-d8bb63c79853/source/100x100bb.jpg",
    collectionPrice: 10.99,
    trackPrice: 1.29,
    releaseDate: "2012-05-08T07:00:00Z",
    collectionExplicitness: "notExplicit",
    trackExplicitness: "notExplicit",
    discCount: 1,
    discNumber: 1,
    trackCount: 12,
    trackNumber: 1,
    trackTimeMillis: 264493,
    country: "USA",
    currency: "USD",
    primaryGenreName: "Alternative",
    isStreamable: true,
  },
  {
    artistId: 79798,
    collectionId: 1445667726,
    trackId: 1445668114,
    artistName: "Nina Simone",
    trackName: "Feeling Good",
    collectionName: "I Put a Spell On You",
    primaryGenreName: "Jazz",
    artworkUrl100:
      "https://is3-ssl.mzstatic.com/image/thumb/Music118/v4/46/3e/64/463e6416-c82c-f691-c3af-1eb84ceb9662/source/100x100bb.jpg",
    previewUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview118/v4/a7/c0/7a/a7c07a5e-8b02-4c4c-4d87-6080ab3a7e9a/mzaf_3626143601489775741.plus.aac.p.m4a",
    releaseDate: "1965-01-01T12:00:00Z",
  },
  {
    artistId: 136975,
    collectionId: 1441164426,
    trackId: 1441164589,
    artistName: "The Beatles",
    trackName: "Here Comes the Sun",
    collectionName: "Abbey Road (Remastered)",
    primaryGenreName: "Rock",
    artworkUrl100:
      "https://is4-ssl.mzstatic.com/image/thumb/Music128/v4/0a/91/ba/0a91bafc-8a02-202e-e604-9d920f0d7e1b/source/100x100bb.jpg",
    previewUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview128/v4/76/53/da/7653da29-e123-52a7-2081-f711003ec58e/mzaf_4976948036106815081.plus.aac.p.m4a",
    releaseDate: "1969-09-26T12:00:00Z",
  },
  {
    artistId: 1152030,
    collectionId: 1440918582,
    trackId: 1440918584,
    artistName: "Bobby Hebb",
    trackName: "Sunny",
    collectionName: "Sunny",
    primaryGenreName: "Pop",
    artworkUrl100:
      "https://is4-ssl.mzstatic.com/image/thumb/Music118/v4/0f/03/b9/0f03b95b-b98b-f0f5-efd0-eda82fe13b2e/source/100x100bb.jpg",
    previewUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview118/v4/a4/26/9c/a4269c5b-4664-8914-0f1b-0810c05c28e6/mzaf_8427185903266173616.plus.aac.p.m4a",
    releaseDate: "1966-01-01T12:00:00Z",
  },
  {
    artistId: 555106,
    collectionId: 301649365,
    trackId: 301649414,
    artistName: "Chic",
    trackName: "Good Times",
    collectionName: "Dance, Dance, Dance: The Best of Chic",
    primaryGenreName: "R&B/Soul",
    artworkUrl100:
      "https://is5-ssl.mzstatic.com/image/thumb/Music2/v4/2f/57/b8/2f57b83d-6c2b-9d36-26ec-a52d65b9e29f/source/100x100bb.jpg",
    previewUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview113/v4/86/67/28/866728c5-3d9d-bf21-5428-9c0de7e2b542/mzaf_1115821813003733154.plus.aac.p.m4a",
    releaseDate: "1979-06-30T12:00:00Z",
  },
];

function constructURL() {
  if (mediaArray == []) {
    return;
  }
  let searchString = "";
  mediaArray.forEach(function (e) {
    searchString += `media=${e}&`;
  });
  mediaTypes = searchString;
}

(function initialize() {
  results = [...defaultResults];

  displaySearchResults(results);

  document
    .querySelector(".search-input")
    .addEventListener("change", searchForMedia);

  document
    .querySelector(".results")
    .addEventListener("click", (e) => handleClickOnResults(e));

  document
    .querySelector(".footer__playlist-button")
    .addEventListener("click", handleClickOnPlaylist);

  //   document
  //     .querySelector(".footer__search-button")
  //     .addEventListener("click", handleClickOnSearchGlass);

  document
    .querySelector(".footer__paste-button")
    .addEventListener("click", handleClickOnPaste);

  document
    .querySelector(".footer__mail-button")
    .addEventListener("click", handleClickOnSend);

  document
    .querySelector(".header__paste")
    .addEventListener("click", handleClickOnPaste);

  document
    .querySelector(".playlist__preview__mailto")
    .addEventListener("click", hidePreviewAndSendNow);
})();

function getResultCardHtml({
  artistName,
  artworkUrl100,
  trackName,
  trackId,
  collectionName,
  previewUrl,
  primaryGenreName,
  releaseDate,
  kind,
}) {
  const dateFromAPI = releaseDate;
  const newDateFormat = new Date(releaseDate);
  let newReleaseDate = JSON.stringify(newDateFormat);
  newReleaseDate = newReleaseDate.slice(1, 11);
  // TODO / BUG: prevent autoplay of iFrames after a Search
  const html = `<div class="result__card">
  <div class="result__card__content">
    <div class="result__card__image">
      <img
        class="result__card__image__tag"
        src="${artworkUrl100}"
        alt="Artwork thumb nail"
      />
    </div>
    <div class="result__card__info">
      <div class="result__card__info__row1">
        <div class="result__card__artist">
          <span>🧑‍🎨: </span>${artistName}
        </div>
        <div class="result__card__track">
          <span>🎼: </span>${trackName}
        </div>
      </div>
      <div class="result__card__info__row2">
        <div class="result__card__collection">
          <span>💽: </span>${collectionName}
        </div>
        <div class="result__card__genre">
          <span>🎭: </span>${primaryGenreName}
        </div>
      </div>
      <div class="result__card__info__row3">
        <div class="result__card__iframe-container">
          <iframe autoplay="0" src="" frameborder="0"></iframe>
        </div>
        <div class="result__card__release">
          <span>📅: </span>${newReleaseDate}
        </div>
        <div class="result__card__kind">
          <span>🔊: </span>${kind}
        </div>
      </div>
    </div>
    <div class="result__card__buttons">
      <button class="result__card__up hidden">
        <img src="/svg/up.svg" alt="up icon" />
      </button>
      <button class="result__card__down hidden">
        <img src="/svg/down.svg" alt="down icon" />
      </button>
      <button class="result__card__add" data-id="${trackId}">
        <img src="/svg/add.svg" alt="add icon" />
      </button>
      <button class="result__card__delete hidden" data-id="${trackId}">
        <img src="/svg/delete.svg" alt="Delete icon" />
      </button>
    </div>
  </div>
</div>`;
  return html;
}

function displaySearchResults(results) {
  let resultsHtml = ``;
  for (let result of results) {
    resultsHtml += getResultCardHtml(result);
  }
  document.querySelector(".results").innerHTML = resultsHtml;
}

function handleCheckboxClick(e) {
  const value = e.id;
  if (e.checked) {
    if (mediaArray.indexOf(value) >= 0) {
      return;
    }
    mediaArray.push(value);
    return mediaArray;
  }
  {
    const index = mediaArray.indexOf(value);
    mediaArray.splice(index, 1);
    return mediaArray;
  }
}

async function searchForMedia(e) {
  constructURL();
  const searchTerm = e.currentTarget.value;

  if (!searchTerm) {
    results = [...defaultResults];

    displaySearchResults(results);
    return;
  }
  try {
    const appleAPIUrl = `https://itunes.apple.com/search?${mediaTypes}term=${searchTerm}&limit=25`;

    const response = await fetch(appleAPIUrl);

    const searchResultData = await response.json();

    if (searchResultData.results) {
      displaySearchResults(searchResultData.results);
      lastSearchResults = searchResultData.results;
    } else {
      displaySearchResults([]);
    }
  } catch (error) {
    console.log(error);
  }
}

function handleClickOnResults(e) {
  const clickedElement = e.target;
  const clickedCardAddButton = clickedElement.closest(".result__card__add");
  const clickedCardDeleteButton = clickedElement.closest(
    ".result__card__delete"
  );

  if (clickedCardAddButton) {
    const trackId = clickedCardAddButton.dataset.id;
    let index = lastSearchResults.findIndex((p) => p.trackId == trackId);
    if (index >= 0) {
      playlistData.push(lastSearchResults[index]);
      updatePlaylistItemCounter(playlistData);
      return;
    }
    index = defaultResults.findIndex((p) => p.trackId == trackId);

    playlistData.push(defaultResults[index]);
    updatePlaylistItemCounter(playlistData);
  }
  if (clickedCardDeleteButton) {
    const trackId = clickedCardDeleteButton.dataset.id;
    //TODO: Delete function
    handleClickOnPlaylist();
    // }
  }
  return;
}

function updatePlaylistItemCounter(playlist) {
  if (playlist === []) {
    return;
  }

  counter = playlistData.length;
  document.querySelector(".footer__playlist__counter").innerHTML = counter;
}

function handleClickOnPlaylist() {
  displaySearchResults(playlistData);
  const allAddButtons = document.querySelectorAll(".result__card__add");
  const allDeleteButtons = document.querySelectorAll(".result__card__delete");
  const allUpButtons = document.querySelectorAll(".result__card__up");
  const allDownButtons = document.querySelectorAll(".result__card__down");

  allAddButtons.forEach((add) => add.classList.add("hidden"));
  allDeleteButtons.forEach((del) => del.classList.remove("hidden"));
  allUpButtons.forEach((up) => up.classList.remove("hidden"));
  allDownButtons.forEach((down) => down.classList.remove("hidden"));
}

function handleClickOnSearchGlass() {
  //Doesn't work?
  scroll(0, 0);
  //   const resultsHtml = ` Screen cleared - Enter term in search bar for a new search - to clear playlist you (still) have to reload this page - Thx`;
  //   document.querySelector(".results").innerHTML = resultsHtml;
}

function createPreviewPlaylistForMail(playlist) {
  for (let i = 0; i < playlist.length; i++) {
    let position = i + 1;
    playlistPreview += `${position}.%20${playlist[i].trackName}%20-%20${playlist[i].artistName}%20(${playlist[i].collectionName})%0d`;
  }
  return playlistPreview;
}

async function handleClickOnPaste() {
  const clipboardContent = await navigator.clipboard.readText();
  const arrayFromClipboard = await JSON.parse(clipboardContent);

  playlistData = arrayFromClipboard;

  updatePlaylistItemCounter(playlistData);
  handleClickOnPlaylist();
}

function handleClickOnSend() {
  createPreviewPlaylistForMail(playlistData);
  showPreviewPlaylist();
  const playlistStringified = JSON.stringify(playlistData);
  const subject =
    "❤️%20A%20playlist%20for%20you%20from%20someone%20who%20cares!%20powered%20by%20dialis.code%20-%20your%20playlist%20app";
  const mailBody = createMailBody(playlistStringified);

  document.querySelector(
    ".playlist__preview__mailto"
  ).href = `mailto:${recipient}?subject=${subject}&body=${mailBody}`;
  cl();
  document.querySelector(".playlist__preview").classList.remove("hidden");
}

function createMailBody(playlistStringified) {
  const instructions = `▲%20Above%20this%20text%20you%20can%20see%20the%20plain%20content%20of%20your%20list.%20If%20you%20copy%20the%20whole%20chunk%20of%20code%20below%20▼%20this%20text%20to%20the%20clipboard%20(including%20the%20"[]"%20),%20you%20can%20go%20to%20www.dialis.code%20and%20click%20the%20"Paste"-Button%20to%20listen%20to%20and%20edit%20it.%20-%20Enjoy!`;

  const mailBody = `${playlistPreview}%0d%0d${instructions}%0d%0d${playlistStringified}`;
  return mailBody;
}

function showPreviewPlaylist() {
  const confirmation = `📨... Your playlist has ${counter} songs. Email generated:`;
  document.querySelector(".playlist__preview__text").innerText = confirmation;
}

function hidePreviewAndSendNow() {
  document.querySelector(".playlist__preview").classList.add("hidden");
}

function cl(text) {
  console.log("Test", "next", text);
}
