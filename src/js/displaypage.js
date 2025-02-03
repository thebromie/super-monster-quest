const paramsString = window.location.search;
const searchParams = new URLSearchParams(paramsString);
const currentChapterID = searchParams.get("ch");
const currentPagePadded = searchParams.get("pg");
const currentPageNumber = parseInt(currentPagePadded);

const firstChapterID = Object.keys(tableData)[0];
const latestChapterID = Object.keys(tableData)[Object.keys(tableData).length-1];

const currentPageTotal = tableData[currentChapterID].pageTotal;

function setupNav(){    

    setupPrevLink()
    setupNextLink()

}

function setupPrevLink(){
    
    let prevPagePadded = (currentPageNumber-1).toString().padStart(3, '0')
    let prevLink = document.getElementById("prev-page-link");

    if (currentPageNumber == 1 && currentChapterID == firstChapterID) {
        // console.log("note: you've reached the first all pages!!!")
    }else if (currentPageNumber == 1) {
        
        let prevChapterID = getPrevChapterID()
        let prevChapterLastPagePadded = (tableData[prevChapterID].pageTotal).toString().padStart(3, '0');
        
        console.log("You've reached the start of the chapter")
        console.log("Prev Chapter ID: " + prevChapterID + " " + prevChapterLastPagePadded)

        prevLink.setAttribute("href", "pageview.html?ch=" + prevChapterID + "&pg=" + prevChapterLastPagePadded);

    }else{        
        prevLink.setAttribute("href", "pageview.html?ch=" + currentChapterID + "&pg=" + prevPagePadded);
    }
}

function setupNextLink(){

    let nextPagePadded = (currentPageNumber+1).toString().padStart(3, '0')
    let nextLink = document.getElementById("next-page-link");
    
    if (currentPageNumber == currentPageTotal && currentChapterID == latestChapterID) {
        // note: last page of the latest chapter
    }else if (currentPageNumber == currentPageTotal) {
        // note: end of a chapter
        nextLink.setAttribute("href", "pageview.html?ch=" + getNextChapterID() + "&pg=" + "001");
    }else{        
        // note: set link to next page
        nextLink.setAttribute("href", "pageview.html?ch=" + currentChapterID + "&pg=" + nextPagePadded);
    }
}

function getPrevChapterID(){
    if (currentChapterID != firstChapterID){
        let chIndex = Object.keys(tableData).indexOf(currentChapterID)
        return Object.keys(tableData)[chIndex-1]
    }

    // what to return if current chapter is first chapter?
}

function getNextChapterID(){
    if (currentChapterID != latestChapterID){
        let chIndex = Object.keys(tableData).indexOf(currentChapterID)
        return Object.keys(tableData)[chIndex+1]
    }
    
    // what to return if current chapter is latest chapter?
}

function dispalyComicPage(){
    let pageWrapper = document.getElementById("comic-page-wrapper");
    let newPage = document.createElement("img");
    newPage.setAttribute("src", "https://www.supermonsterquest.com/pages/" + currentChapterID + "_" + currentPagePadded + ".jpg");
    // newPage.setAttribute("src", "https://www.supermonsterquest.com/pages/" + "CH5" + "_" + "009" + ".jpg");
    pageWrapper.appendChild(newPage);


}

setupNav();
dispalyComicPage();