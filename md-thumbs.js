// ==UserScript==
// @name         Mangadex HQ Covers
// @version      0.4
// @description  try to take over the world!
// @author       Robo & AviKav. But mainly AviKav :P
// @match        https://mangadex.org/titles/*
// @match        https://mangadex.org/titles
// @grant        none
// ==/UserScript==


'use strict';
//const thumbnailUrlSubstrings = ['.thumb', '.large']; 
const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif'];

let tags = document.getElementsByTagName('img');
// let oldtags = tags;

for (let tag of tags) {
    let originalImageUrl = tag.src;
    // I can't regex
    originalImageUrl.replace('https://mangadex.org/images/manga/', '');
    let seriesID = originalImageUrl.split('.')[0];
    let partialUrl = 'https://mangadex.org/images/manga/' + seriesID;
    for (let extension of imageExtensions) {
        let potentialImageUrl = partialUrl + extension;
        fetch(potentialImageUrl).then((response) => {
            if (response.ok) {
                tag.src = potentialImageUrl;
            }
        })
    }

    //tag.src = tag.src.replace('.thumb', '');
    //tag.src = tag.src.replace('.large', '');
    //tags[i].onerror = error(tags[i], oldtags[i]);
    //if (isImageOk(document.images[i])) {
    //        error(tags[i], oldtags[i]);
    //    }
}
