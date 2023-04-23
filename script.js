
const createItemHTML = (item) => {
    const div = document.createElement("div");
    div.className = "item item-added";

    const xDiv = document.createElement("div");
    xDiv.className = "x-button";
    xDiv.textContent = "X";
    div.append(xDiv);
    xDiv.onclick = () => {
        removeFromLocalStorage(item);
    }

    const faviconIMG = document.createElement("img");
    faviconIMG.className = "favicon";
    if (item.url.endsWith("/")) {
        faviconIMG.src = `${item.url}favicon.ico`; 
    } else {
        faviconIMG.src = `${item.url}/favicon.ico`;
    }

    div.appendChild(faviconIMG);

    const titleA = document.createElement("a");
    titleA.textContent = item.title;
    titleA.className = "title";
    titleA.href = item.url;
    div.appendChild(titleA);

    return div;
}

const saveToLocalStorage = (item) => {
    let items = localStorage.getItem("items");
    
    if (items === null) {
        items = [];
    } else { 
        items = JSON.parse(items)
    };
    
    if (!item.url.startsWith("https://") || !item.url.startsWith("http://")) {
        item.url = `https://${item.url}`;
    }

    items.push(item);
    localStorage.setItem("items", JSON.stringify(items));

    refreshPage();
}

const refreshPage = () => {
    Array.from(document.getElementsByClassName("item-added")).forEach(item => {
        item.remove();
    });

    addItems();
}


const getItemsFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("items"));
}

const removeFromLocalStorage = (item) => {
    localStorage.setItem("items", JSON.stringify(getItemsFromLocalStorage().filter(tempItem => tempItem.url !== item.url)));

    refreshPage();
}

const init = () => {
    addItems();

    document.getElementById("plus-sign").addEventListener("click", (event) => {
        const title = document.getElementById("title").value;
        const url = document.getElementById("url").value;
        saveToLocalStorage({title, url});

        document.getElementById("title").value = "";
        document.getElementById("url").value = "";

    });
    
}

addItems = () => {
    const items = getItemsFromLocalStorage();
    if (items === null) {
        return;
    }

    items.reverse().forEach(item => {
        document.getElementsByClassName("list")[0].prepend(createItemHTML(item));
    });
}

init();

