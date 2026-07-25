const textArea = document.getElementById("textArea");

const wordCount = document.getElementById("word");
const charCount = document.getElementById("char");
const sentenceCount = document.getElementById("sentence");


textArea.addEventListener("input", function () {

    const text = this.value;


    // Character Count
    charCount.innerHTML = text.length;



    // Word Count

    const words = text
        .trim()
        .split(/\s+/)
        .filter(word => word !== "");

    wordCount.innerHTML = 
        text.trim() === "" ? 0 : words.length;



    // Sentence Count
    // Detect sentences ending with . ? !

    const sentences = text
        .split(/[.!?]+/)
        .filter(sentence => sentence.trim() !== "");


    sentenceCount.innerHTML = sentences.length;


});