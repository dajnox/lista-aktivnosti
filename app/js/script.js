
function getItems(){
    db.collection("hajroakt-items").onSnapshot((snapshot) => {
        let items = [];
        snapshot.docs.forEach((doc) => {
            items.push({
                id: doc.id, 
                ...doc.data()
            })
        })
        generateItems(items);
    })
}

function generateItems(items){
    let hajroaktItems = []
    items.forEach((item) => {
        let hajroaktItem = document.createElement("div");
        hajroaktItem.classList.add("hajroakt-item");
        let checkContainer = document.createElement("div");
        checkContainer.classList.add("check");
        let checkMark = document.createElement("div");
        checkMark.classList.add("check-mark");
        checkMark.innerHTML = '<img src="app/img/icon-check.svg">';
        checkMark.addEventListener("click", function(){
            markCompleted(item.id);
        })
        checkContainer.appendChild(checkMark);

        let hajroaktText = document.createElement("div");
        hajroaktText.classList.add("hajroakt-text");
        hajroaktText.innerText = item.text;

        if(item.status == "completed"){
            checkMark.classList.add("checked");
            hajroaktText.classList.add("checked");
        }
        hajroaktItem.appendChild(checkContainer);
        hajroaktItem.appendChild(hajroaktText);
        hajroaktItems.push(hajroaktItem)
    })
    document.querySelector(".hajroakt-items").replaceChildren(...hajroaktItems);
}



function addItem(event){
    event.preventDefault();
    let text = document.getElementById("hajroakt-input");
    let newItem = db.collection("hajroakt-items").add({
        text: text.value,
        status: "active"
    })
    text.value = "";
}


function markCompleted(id){
    let item = db.collection("hajroakt-items").doc(id);
    item.get().then(function(doc) {
        if (doc.exists) {
            if(doc.data().status == "active"){
                item.update({
                    status: "completed"
                })
            } else {
                item.update({
                    status: "active"
                })
            }
        }
    })
}

getItems();