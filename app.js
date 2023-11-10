let container = document.getElementById('container')

if (localStorage.getItem('notes') == null) {

    notes = [];

} else {
    notes = JSON.parse(localStorage.getItem('notes'))

}

// displays the notes from localStorage 
shownotes();


function shownotes() {
    if (notes == []) {
        container.innerHTML = `Nothing to show because nothing is saved`

    }
    else {
        // notes = JSON.parse(notes)
        container.innerHTML = ``;
        notes.forEach((element, index) => {

            if (element.isImportant) {
                container.innerHTML += `<div class="card important">
            <h5>${element.Title}</h5>
            <p>${element.Text}</p>
            <button id="${index}" class="btn-del" onclick="del(${index})">delete Note</button>
            </div>`

            } else {
                container.innerHTML += `<div class="card">
            <h5>${element.Title}</h5>
            <p>${element.Text}</p>
            <button id="${index}" class="btn-del" onclick="del(${index})">delete Note</button>
            </div>`

            }



        });
        // console.log(notes)
    }
}




// adds a notes with an input present in textarea
let addBtn = document.getElementById("addBtn")
addBtn.addEventListener('click', function () {
    let addTxt = document.getElementById('input').value;
    let addTitle = document.getElementById('inputTitle').value;
    let Important = document.getElementById('isImportant').checked;
    console.log(addTitle)
    console.log(addTxt)
    console.log(Important)

    let obj = {
        Title: addTitle,
        Text: addTxt,
        isImportant: Important
    }
    notes.push(obj)

    localStorage.setItem('notes', JSON.stringify(notes))
    document.getElementById('input').value = ``;
    document.getElementById('inputTitle').value = ``;
    document.getElementById('isImportant').checked = false;


    shownotes();
})

// delete all the note whose button is clicked
function del(index) {
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes))
    shownotes();

}


// deletes all notes 
let del_all = document.getElementById('del')
del_all.addEventListener('click', function () {
    localStorage.clear();
    location.reload();
})





// filtering the notes 

let input = document.getElementById('search');

input.addEventListener('input', function () {
    let inputVal = input.value.toLowerCase();



    let card = document.getElementsByClassName('card');
    Array.from(card).forEach(element => {
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        let cardTitle = element.getElementsByTagName('h5')[0].innerText;
        // console.log(cardTxt)
        if (cardTxt.includes(inputVal) || cardTitle.includes(inputVal)) {
            element.style.display = 'block'

        } else {
            element.style.display = 'none'

        }

    });
})



