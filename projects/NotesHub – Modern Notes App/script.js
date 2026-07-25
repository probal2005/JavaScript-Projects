// =============================
// Modern Notes App
// Developed by Probal Dhali
// =============================

const addBtn = document.getElementById("addBtn");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");
const closeModal = document.getElementById("closeModal");

const modal = document.getElementById("noteModal");

const titleInput = document.getElementById("noteTitle");
const contentInput = document.getElementById("noteContent");

const pinInput = document.getElementById("pinNote");

const notesContainer = document.getElementById("notesContainer");

const searchInput = document.getElementById("searchInput");

const totalNotes = document.getElementById("totalNotes");
const pinnedNotes = document.getElementById("pinnedNotes");

const clearAllBtn = document.getElementById("clearAllBtn");
const exportBtn = document.getElementById("exportBtn");

const emptyState = document.getElementById("emptyState");

const colorButtons = document.querySelectorAll(".color");

let selectedColor = "#6366F1";

let editId = null;

let notes = JSON.parse(localStorage.getItem("notesHub")) || [];

/* =============================
        Modal
============================= */

function openModal() {

    modal.classList.remove("hidden");

}

function closeEditor() {

    modal.classList.add("hidden");

    titleInput.value = "";

    contentInput.value = "";

    pinInput.checked = false;

    selectedColor = "#6366F1";

    editId = null;

    colorButtons.forEach(btn=>btn.classList.remove("active"));

    colorButtons[0].classList.add("active");

}

/* =============================
        Save LocalStorage
============================= */

function saveStorage(){

    localStorage.setItem(

        "notesHub",

        JSON.stringify(notes)

    );

}

/* =============================
        Render Notes
============================= */

function renderNotes(list = notes){

    notesContainer.innerHTML = "";

    totalNotes.textContent = notes.length;

    pinnedNotes.textContent = notes.filter(

        note=>note.pinned

    ).length;

    if(list.length===0){

        emptyState.style.display="block";

    }else{

        emptyState.style.display="none";

    }

    list

    .sort((a,b)=>b.pinned-a.pinned)

    .forEach(note=>{

        const card=document.createElement("div");

        card.className="note";

        card.style.borderLeftColor=note.color;

        card.innerHTML=`

<div class="note-header">

<div>

<h3 class="note-title">${note.title}</h3>

</div>

<div class="note-actions">

<button class="pin-btn" data-id="${note.id}">

<i class="fas fa-thumbtack"></i>

</button>

<button class="copy-btn" data-id="${note.id}">

<i class="fas fa-copy"></i>

</button>

<button class="edit-btn" data-id="${note.id}">

<i class="fas fa-pen"></i>

</button>

<button class="delete-btn" data-id="${note.id}">

<i class="fas fa-trash"></i>

</button>

</div>

</div>

<div class="note-content">

${note.content.replace(/\n/g,"<br>")}

</div>

<div class="note-footer">

<span>${note.date}</span>

${note.pinned ? "<span>📌 Pinned</span>" : ""}

</div>

`;

        notesContainer.appendChild(card);

    });

}

/* =============================
        Save Note
============================= */

function saveNote(){

    const title=titleInput.value.trim();

    const content=contentInput.value.trim();

    if(title==="" || content===""){

        alert("Please complete the title and note.");

        return;

    }

    if(editId){

        const note=notes.find(n=>n.id===editId);

        note.title=title;

        note.content=content;

        note.color=selectedColor;

        note.pinned=pinInput.checked;

    }

    else{

        notes.unshift({

            id:Date.now(),

            title,

            content,

            color:selectedColor,

            pinned:pinInput.checked,

            date:new Date().toLocaleString()

        });

    }

    saveStorage();

    renderNotes();

    closeEditor();

}

/* =============================
        Delete / Edit
============================= */

notesContainer.addEventListener(

"click",

e=>{

const id=e.target.closest("button")?.dataset.id;

if(!id) return;

const note=notes.find(

n=>n.id==id

);

if(

e.target.closest(".delete-btn")

){

if(confirm("Delete this note?")){

notes=notes.filter(

n=>n.id!=id

);

saveStorage();

renderNotes();

}

}

if(

e.target.closest(".edit-btn")

){

editId=note.id;

titleInput.value=note.title;

contentInput.value=note.content;

pinInput.checked=note.pinned;

selectedColor=note.color;

colorButtons.forEach(btn=>{

btn.classList.toggle(

"active",

btn.dataset.color===selectedColor

);

});

openModal();

}

if(

e.target.closest(".pin-btn")

){

note.pinned=!note.pinned;

saveStorage();

renderNotes();

}

if(

e.target.closest(".copy-btn")

){

navigator.clipboard.writeText(

`${note.title}\n\n${note.content}`

);

alert("Note copied!");

}

});

/* =============================
        Search
============================= */

searchInput.addEventListener(

"input",

()=>{

const keyword=searchInput.value.toLowerCase();

const filtered=notes.filter(note=>

note.title.toLowerCase().includes(keyword)

||

note.content.toLowerCase().includes(keyword)

);

renderNotes(filtered);

});

/* =============================
        Color Picker
============================= */

colorButtons.forEach(btn=>{

btn.addEventListener(

"click",

()=>{

colorButtons.forEach(

b=>b.classList.remove("active")

);

btn.classList.add("active");

selectedColor=btn.dataset.color;

});

});

/* =============================
        Clear All
============================= */

clearAllBtn.addEventListener(

"click",

()=>{

if(

confirm("Delete all notes?")

){

notes=[];

saveStorage();

renderNotes();

}

});

/* =============================
        Export Notes
============================= */

exportBtn.addEventListener(

"click",

()=>{

if(notes.length===0){

alert("No notes available.");

return;

}

let text="NOTESHUB EXPORT\n\n";

notes.forEach(note=>{

text+=`Title : ${note.title}\n`;

text+=`Date : ${note.date}\n`;

text+=`${note.content}\n`;

text+="-------------------------\n";

});

const blob=new Blob(

[text],

{type:"text/plain"}

);

const a=document.createElement("a");

a.href=URL.createObjectURL(blob);

a.download="NotesHub.txt";

a.click();

});

/* =============================
        Keyboard Shortcut
============================= */

document.addEventListener(

"keydown",

e=>{

if(

e.ctrlKey && e.key==="Enter"

){

saveNote();

}

if(

e.key==="Escape"

){

closeEditor();

}

});

/* =============================
        Events
============================= */

addBtn.addEventListener(

"click",

openModal

);

saveBtn.addEventListener(

"click",

saveNote

);

cancelBtn.addEventListener(

"click",

closeEditor

);

closeModal.addEventListener(

"click",

closeEditor

);

/* =============================
        Initialize
============================= */

renderNotes();