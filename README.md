# dialis

Playlist app with iTunes API in Vanilla JS

## Description

With dialis you can create a media playlist based on the iTunes API and share it with friends.

## Motivation

Small project for the module “Web development HTML5/CSS3/JavaScript Advanced“ at [cimdata](https://www.cimdata.de/) where no JS framework was allowed and comments on the code were mandatory. 

## Tech/framework highlights

<b>Built mainly with </b>

- Pure Vanilla Javascript
- SASS for CSS
- iTunes API

## Features

General:
- Search the iTunes API for Music, Audiobooks or Podcasts
- Listen to previews of search results
- Add any search result to your media playlist
- Adjust number of shown search results
- Toggle instructions
- Change the order of titles in the playlist
- Delete title from playlist
- Generate an e-mail with a content of current playlist as code snippet to share your playlist
- Paste a received code snippet to see all songs of the received list


## Code Example

```
 
function handleClickOnResults(e) {
  const clickedElement = e.target;
  const clickedCardAddButton = clickedElement.closest(".result__card__add");
  const clickedCardDeleteButton = clickedElement.closest(
    ".result__card__delete"
  );
  const clickedUpButton = clickedElement.closest(".result__card__up");
  const clickedDownButton = clickedElement.closest(".result__card__down");

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
    updateDesktopPlaylistPreview();
  }
...}
```
