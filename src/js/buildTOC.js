import {chapterData} from "./chapterData.js";

function addChapterRow(chapter) {
    const tocWrapper = document.getElementById("TOC-Wrapper");

    const newChapter = document.createElement("div");
    newChapter.setAttribute("id", `CH-${chapter.chIndex}`);
    newChapter.setAttribute("class", "chapter-wrapper");

    const chHeader = document.createElement("div");
    chHeader.setAttribute("class", "chapter-header");

    const linksWrapper = document.createElement("div");
    linksWrapper.setAttribute("class", "links-wrapper");


    const chIndex = document.createElement("span");
    chIndex.setAttribute("class", "chapter-index");
    chIndex.innerHTML = "Chapter" + chapter.chIndex + ":";

    const chTitle = document.createElement("span");
    chTitle.setAttribute("class", "chapter-title");
    chTitle.innerHTML = chapter.chTitle;

    for (let i = 1; i <= chapter.pageTotal; i++) {
        const newLink = document.createElement("a");
        const paddedIndex = i.toString().padStart(3, '0')
        newLink.setAttribute("href", `pageview.html?ch=CH${chapter.chIndex}&pg=${paddedIndex}`);
        newLink.innerHTML = paddedIndex
        linksWrapper.appendChild(newLink);
    }

    chHeader.appendChild(chIndex);
    chHeader.appendChild(chTitle);
    newChapter.appendChild(chHeader);
    newChapter.appendChild(linksWrapper);

    tocWrapper.appendChild(newChapter);
}

function setupTableOfContents() {
    const chapters = chapterData.sort((chA, chB) => chA.chIndex - chB.chIndex);
    chapters.forEach((chapter) => {
        addChapterRow(chapter);
    });
}

setupTableOfContents();