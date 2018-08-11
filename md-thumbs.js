// ==UserScript==
// @name         Mangadex HQ Covers
// @version      0.5
// @description  Replaces thumbnails on MangaDex with full version. may cause lag
// @author       AviKav
// @match        https://mangadex.org/titles/*
// @match        https://mangadex.org/titles
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    const thumbnailUrlSubstrings = ['.thumb', '.large'];
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif'];

    let tags = document.getElementsByTagName('img');
    // let oldtags = tags;

    for (let tag of tags) {
        let originalImageUrl = tag.src;

        if (!(originalImageUrl.includes(thumbnailUrlSubstrings[0]) || // Yeah, I'm too lazy to iterate through the array, `break` the inner loop, and `continue1 the outer loop.
            originalImageUrl.includes(thumbnailUrlSubstrings[1]))) {
            continue;
        }
        console.log(tag)

        // I can't regex
        let cutUrl = originalImageUrl.replace('https://mangadex.org/images/manga/', '');
        let seriesID = cutUrl.split('.')[0];
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
})();