let svg = document.getElementById("chapters");

function createRect(x, y, width, height, fill) {
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", x);
    rect.setAttribute("y", y);
    rect.setAttribute("width", width);
    rect.setAttribute("height", height);
    rect.setAttribute("fill", fill);
    return rect;
}
function createText(x, y, textContent) {
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", x);
    text.setAttribute("y", y);
    text.setAttribute("font-size", "14");
    text.setAttribute("fill", "#222");
    text.textContent = textContent;
    return text;
}

let maxWidth = 1000;
let padding = 50;
let marginLeft = 200;
let totalHeight = 0;
let yPart = 0;

let group = document.createElementNS("http://www.w3.org/2000/svg", "g");

import chapterData from './chapters.js';

chapterData.forEach(part => {
    console.log(part.title);

    let x = marginLeft;
    let partRect = createRect(x, yPart, maxWidth, 100, "rgba(207, 194, 134, 0.2)");
    let partText = createText(x + padding / 2, yPart - padding / 2, part.title);
    partRect.id = "part-" + part.title.replace(/\s+/g, '-').toLowerCase();
    group.appendChild(partRect);
    group.appendChild(partText);

    let partHeight = 0;

    let yChapter = yPart - padding;
    part.chapters.forEach(chapter => {
        console.log("  " + chapter.title);

        let x = marginLeft + padding / 2;

        let width = maxWidth - padding;
        let chapterRect = createRect(x, yChapter, width, 100, "rgba(207, 194, 134, 0.2)");
        chapterRect.id = "chapter-" + chapter.title.replace(/\s+/g, '-').toLowerCase();
        let chapterText = createText(x + padding / 2, yChapter - padding / 2, chapter.title);
        group.appendChild(chapterRect);
        group.appendChild(chapterText);

        let yChild = yChapter - padding;
        let sectionsHeight = 0;
        chapter.sections.forEach(section => {
            console.log("    " + section.title);

            let x = marginLeft + padding;
            let width = maxWidth - (padding * 2);
            let sectionRect = createRect(x, yChild - section.height, width, section.height, "rgba(207, 194, 134, 0.2)");
            sectionRect.id = "section-" + section.title.replace(/\s+/g, '-').toLowerCase();
            let sectionText = createText(x + padding / 2, yChild - padding / 2, section.title);
            yChild = yChild - section.height - padding / 2;
            sectionsHeight += section.height + padding / 2;
            group.appendChild(sectionRect);
            group.appendChild(sectionText);

        });

        let chapterHeight = sectionsHeight + padding;
        chapterRect.setAttribute("height", chapterHeight);
        chapterRect.setAttribute("y", yChapter - chapterHeight);
        yChapter = yChapter - chapterHeight - padding;

        partHeight += chapterHeight + padding;
    });

    partHeight += padding / 2;
    partRect.setAttribute("height", partHeight);
    partRect.setAttribute("y", yPart - partHeight);
    yPart = yPart - partHeight - padding;

    totalHeight += partHeight + padding;
});
totalHeight += padding * 2;
group.setAttribute("transform", "translate(0, " + totalHeight + ")");
svg.appendChild(group);