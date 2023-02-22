
// references to the dom elements
const notemaker = document.querySelector(".notemaker");
const addBtn = document.querySelector(".add-btn");
const modalContainer = document.querySelector(".modal-container");
const title = document.querySelector("#title");
const noteBox = document.querySelector("#note-box");
const ul = document.querySelector(".wrapper");
const date = new Date();
const monthsArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let changeItem;
let isUpdating = false;
let notes = JSON.parse(localStorage.getItem("notes") || "[]");

// opens up the modal to create a new note
notemaker.addEventListener("click", (event) => {
    modalContainer.classList.remove("hidden");
    isUpdating = false;
});

// closes the modal when clicked on the cross icon or outside area of the modal
modalContainer.addEventListener("click", (event) => {
    if (event.target.id === "cross-icon" || event.target.classList.contains("modal-container")) {
        modalContainer.classList.add("hidden");
    }
});

// listens to the click event and calls the clickFeatures function to do things based on certain conditions
document.addEventListener("click", (event) => {
    event.preventDefault();
    clickFeatures(event);
    if (event.target.classList.contains("add-btn")) {
        addBtnFunctionality();
    }
});

// call the addBtnFunctionality function to add or update a note when the Enter button is clicked
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addBtnFunctionality();
    }
});

// does things based on what the user has clicked on 
function clickFeatures(event) {
    // opens up or closes the modal for delete or edit
    if (event.target.classList.contains("dots")) {
        event.target.nextElementSibling.classList.toggle("hidden");
    }
    // deletes the note
    if (event.target.classList.contains("delete")) {
        event.target.closest(".list-items").remove();
    }
    // opens up the modal to edit an existing note
    if (event.target.classList.contains("edit")) {
        let oldTitle = event.target.closest(".bottom-content").previousElementSibling.children[0].innerText;
        let oldParagraph = event.target.closest(".bottom-content").previousElementSibling.children[1].innerText;
        modalContainer.classList.remove("hidden");
        title.value = oldTitle;
        noteBox.value = oldParagraph;
        addBtn.innerText = "Edit Note";
        isUpdating = true;
        changeItem = event.target.closest(".list-items");
    }
}

function addBtnFunctionality() {
    // if this condition is true then call createNote function
    if (title.value && noteBox.value && !isUpdating) {
        createNote();
    }
    // else if this condition is true then call the updateNote function
    else if (title.value && noteBox.value && isUpdating) {
        updateNote();
    }
}

// function to create a new note
function createNote() {
    const day = date.getDate();
    const year = date.getFullYear();
    const month = monthsArray[date.getMonth()];
    const noteObj = {
        title: title.value,
        description: noteBox.value,
        date: `${day} ${month} ${year}`
    };
    notes.push(noteObj);
    showNotes();
    modalContainer.classList.add("hidden");
    localStorage.setItem("notes", JSON.stringify(notes));
    title.value = "";
    noteBox.value = "";
    addBtn.innerText = "Add Note";
}

// function to update an existing note
function updateNote() {
    changeItem.children[0].children[0].innerText = title.value;
    changeItem.children[0].children[1].children[0].innerText = noteBox.value;
    modalContainer.classList.add("hidden");
    changeItem.children[1].children[1].children[1].classList.toggle("hidden");
    title.value = "";
    noteBox.value = "";
    addBtn.innerText = "Add Note";
}

// shows the notes 
function showNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
    document.querySelectorAll(".list-items").forEach((note) => note.remove());
    notes.forEach((note, index) => {
        let liTag = document.createElement("li");
        liTag.classList.add("list-items");
        liTag.innerHTML = `
                <div class="top-content">
                    <p class="title">${note.title}</p>
                    <div class="note">
                        <div class="note-text">${note.description}</div>
                    </div>
                </div>
                <div class="bottom-content">
                    <span class="date">${note.date}</span>
                    <div class="buttons">
                        <i class="fa-solid fa-ellipsis dots"></i>
                        <div class="small-modal hidden">
                            <a href="" class="edit">Edit</a>
                            <a href="" class="delete" onClick="deleteNote(${index})">Delete</a>
                        </div>
                    </div>
                </div>
        `;
        ul.append(liTag);
    });
}

// shows the notes on page load
showNotes();

// function to delete a note from the localStorage 
function deleteNote(noteId) {
    console.log(noteId);
    notes.splice(noteId, 1);
    showNotes();
}

