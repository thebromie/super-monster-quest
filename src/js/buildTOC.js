import { tableData } from "./tableData";

function addChapterRow(id, item) {
  
  let tocWrapper = document.getElementById("TOC-Wrapper");

  let newChapter = document.createElement("div");
  newChapter.setAttribute("id", item.chID);
  newChapter.setAttribute("class", "chapter-wrapper");
  
  let chHeader = document.createElement("div");
  chHeader.setAttribute("class", "chapter-header");
  
  let linksWrapper = document.createElement("div");
  linksWrapper.setAttribute("class", "links-wrapper");


  let chIndex = document.createElement("span");
  chIndex.setAttribute("class", "chapter-index");
  chIndex.innerHTML = "Chapter" + item.chIndex + ":";

  let chTitle = document.createElement("span");
  chTitle.setAttribute("class", "chapter-title");
  chTitle.innerHTML = item.chTitle;

  for (let i = 1; i <= item.pageTotal; i++) {
    let newLink = document.createElement("a"); 
    let paddedIndex = i.toString().padStart(3, '0')
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
  for (const key in tableData) {
    addChapterRow(key, tableData[key]);
    // console.log(key + ": " + Object.keys(tableData).indexOf(key))
  }
}

setupTableOfContents();