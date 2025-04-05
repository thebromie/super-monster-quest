import { chapterData } from "./chapterData.js";

const paramsString = window.location.search;
const searchParams = new URLSearchParams(paramsString);
const currentChapterID = searchParams.get("ch");
const currentPagePadded = searchParams.get("pg");
const currentPageNumber = parseInt(currentPagePadded);

if (!chapterData[currentChapterID]) {
    console.error(`Invalid chapter ID: ${currentChapterID}`);
    // Optionally redirect to a default page or show an error message
    // window.location.href = "error.html"; // Example redirect
}

// Ensure currentPageNumber is within valid range
if (currentPageNumber < 1 || currentPageNumber > chapterData[currentChapterID].pageTotal) {
    console.error(`Invalid page number: ${currentPageNumber}`);
    // Optionally redirect to a default page or show an error message
    // window.location.href = "error.html"; // Example redirect
}

const firstChapterID = Object.keys(chapterData)[0];
const latestChapterID = Object.keys(chapterData)[Object.keys(chapterData).length - 1];

const currentPageTotal = chapterData[currentChapterID].pageTotal;

function setupNav() {

    setupPrevLink()
    setupNextLink()

}

function setupPrevLink() {

    let prevPagePadded = (currentPageNumber - 1).toString().padStart(3, '0')
    let prevLink = document.getElementById("prev-page-link");

    if (currentPageNumber == 1 && currentChapterID == firstChapterID) {
        // console.log("note: you've reached the first all pages!!!")
    } else if (currentPageNumber == 1) {

        let prevChapterID = getPrevChapterID()
        let prevChapterLastPagePadded = (chapterData[prevChapterID].pageTotal).toString().padStart(3, '0');

        console.log("You've reached the start of the chapter")
        console.log("Prev Chapter ID: " + prevChapterID + " " + prevChapterLastPagePadded)

        prevLink.setAttribute("href", "pageview.html?ch=" + prevChapterID + "&pg=" + prevChapterLastPagePadded);

    } else {
        prevLink.setAttribute("href", "pageview.html?ch=" + currentChapterID + "&pg=" + prevPagePadded);
    }
}

function setupNextLink() {

    let nextPagePadded = (currentPageNumber + 1).toString().padStart(3, '0')
    let nextLink = document.getElementById("next-page-link");

    if (currentPageNumber == currentPageTotal && currentChapterID == latestChapterID) {
        // note: last page of the latest chapter
    } else if (currentPageNumber == currentPageTotal) {
        // note: end of a chapter
        nextLink.setAttribute("href", "pageview.html?ch=" + getNextChapterID() + "&pg=" + "001");
    } else {
        // note: set link to next page
        nextLink.setAttribute("href", "pageview.html?ch=" + currentChapterID + "&pg=" + nextPagePadded);
    }
}

function getPrevChapterID() {
    if (currentChapterID != firstChapterID) {
        let chIndex = Object.keys(chapterData).indexOf(currentChapterID)
        return Object.keys(chapterData)[chIndex - 1]
    }

    // what to return if current chapter is first chapter?
}

function getNextChapterID() {
    if (currentChapterID != latestChapterID) {
        let chIndex = Object.keys(chapterData).indexOf(currentChapterID)
        return Object.keys(chapterData)[chIndex + 1]
    }

    // what to return if current chapter is latest chapter?
}

function dispalyComicPage() {
    let pageWrapper = document.getElementById("comic-page-wrapper");
    let newPage = document.createElement("img");
    newPage.setAttribute("src", "https://www.supermonsterquest.com/pages/" + currentChapterID + "_" + currentPagePadded + ".jpg");
    // newPage.setAttribute("src", "https://www.supermonsterquest.com/pages/" + "CH5" + "_" + "009" + ".jpg");
    pageWrapper.appendChild(newPage);
}

setupNav();
dispalyComicPage();