let myTabs = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");

const tabsFromLocalStorage = JSON.parse(localStorage.getItem("myTabs"));

if (tabsFromLocalStorage) {
    myTabs = tabsFromLocalStorage;
    render(myTabs);
}

tabBtn.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myTabs.push({ url: tabs[0].url, title: tabs[0].title });
        localStorage.setItem("myTabs", JSON.stringify(myTabs));
        render(myTabs);
    });
});

function render(guitarTabs) {
    ulEl.innerHTML = "";
    guitarTabs.forEach((tab, index) => {
        const listItem = document.createElement("li");
        const link = document.createElement("a");
        link.target = "_blank";
        link.href = tab.url;
        link.textContent = tab.title || tab.url;

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit-button"); // Add a CSS class for styling

        editBtn.addEventListener("click", () => {
            editLinkTitle(index);
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-button"); // Add a CSS class for styling

        deleteBtn.addEventListener("dblclick", () => {
            deleteTab(index);
        });

        listItem.appendChild(link);
        listItem.appendChild(editBtn);
        listItem.appendChild(deleteBtn);
        ulEl.appendChild(listItem);
    });
}

function deleteTab(index) {
    myTabs.splice(index, 1);
    localStorage.setItem("myTabs", JSON.stringify(myTabs));
    render(myTabs);
}


function editLinkTitle(index) {
    const newTitle = prompt("Enter a new title:");
    if (newTitle !== null) {
        myTabs[index].title = newTitle;
        localStorage.setItem("myTabs", JSON.stringify(myTabs));
        render(myTabs);
    }
}

deleteBtn.addEventListener("dblclick", () => {
    localStorage.clear();
    myTabs = [];
    render(myTabs);
});

inputBtn.addEventListener("click", function () {
    myTabs.push({ url: inputEl.value });
    inputEl.value = "";
    localStorage.setItem("myTabs", JSON.stringify(myTabs));
    render(myTabs);
});
