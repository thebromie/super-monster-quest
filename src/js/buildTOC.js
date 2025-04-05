import { chapterData } from "./chapterData.js";

function addChapterRow(id, item) {
  
  const tocWrapper = document.getElementById("TOC-Wrapper");

  const newChapter = document.createElement("div");
  newChapter.setAttribute("id", item.chID);
  newChapter.setAttribute("class", "chapter-wrapper");
  
  const chHeader = document.createElement("div");
  chHeader.setAttribute("class", "chapter-header");
  
  const linksWrapper = document.createElement("div");
  linksWrapper.setAttribute("class", "links-wrapper");


  const chIndex = document.createElement("span");
  chIndex.setAttribute("class", "chapter-index");
  chIndex.innerHTML = "Chapter" + item.chIndex + ":";

  const chTitle = document.createElement("span");
  chTitle.setAttribute("class", "chapter-title");
  chTitle.innerHTML = item.chTitle;

  for (let i = 1; i <= item.pageTotal; i++) {
    const newLink = document.createElement("a");
    const paddedIndex = i.toString().padStart(3, '0')
    newLink.setAttribute("href", "pageview.html?ch=" + id + "&pg=" + paddedIndex);
    newLink.innerHTML = paddedIndex
    linksWrapper.appendChild(newLink);
  }

  chHeader.appendChild(chIndex);
  chHeader.appendChild(chTitle);
  newChapter.appendChild(chHeader);
  newChapter.appendChild(linksWrapper);

  tocWrapper.appendChild(newChapter);
}

function setupTableOfContents(){
  for (const key in chapterData) {
    addChapterRow(key, chapterData[key]);
    // console.log(key + ": " + Object.keys(tableData).indexOf(key))
  }
}

setupTableOfContents();