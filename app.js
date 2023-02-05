const notemaker = document.querySelector(".notemaker");
const addBtn = document.querySelector(".add-btn");
const modalContainer = document.querySelector(".modal-container");
const title = document.querySelector("#title");
const noteBox = document.querySelector("#note-box");
const ul = document.querySelector(".wrapper");
const date = new Date();
const monthsArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
notemaker.addEventListener("click", (event) => {
    modalContainer.classList.remove("hidden");
});
modalContainer.addEventListener("click", (event) => {
    if (event.target.id === "cross-icon" || event.target.classList.contains("modal-container")) {
        modalContainer.classList.add("hidden");
    }
});
addBtn.addEventListener("click", () => {
    if (title.value && noteBox.value) {
        const day = date.getDate();
        const year = date.getFullYear();
        const monthNumber = date.getMonth();
        let newEl = document.createElement("li");
        newEl.classList.add("list-items");
        newEl.innerHTML =
            `
            <div class="top-content">
            <p class="title">${title.value}</p>
            <div class="note">
                <div class="note-text">${noteBox.value}</div>
            </div>
            </div>
            <div class="bottom-content">
                <span class="date">${day}th ${monthsArray[monthNumber]} ${year}</span>
                <div class="butons">
                    <i class="fa-solid fa-ellipsis"></i>
                </div>
            </div>
            `;
        ul.append(newEl);
        modalContainer.classList.add("hidden");
        title.value = "";
        noteBox.value = "";
    }
});

