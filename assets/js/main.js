
// Deklarasikan status note form pertama kali
let noteHiddenStatus = true;

const showNoteForm = () => {

    // tangkap id elemen
    const note_form = document.getElementById('note_form')

    // apabila status hidden adalah TRUE
    if (noteHiddenStatus) {
        note_form.style.transform = 'translateX(0)'
        noteHiddenStatus = false // ubah status hidden
    } 
    
    // apabila status adalah FALSE atau lainnya
    else {
        note_form.style.transform = 'translateX(-250px)'
        noteHiddenStatus = true
    }

}

const getDataFromApi = () => {

    let ca = document.getElementById('card_area')

    // Ambil Data dari API
    fetch('http://localhost:3000/notes_data', {

        // metode pengambilan data
        method : "GET",

        // Perizinan / CORS Origin
        mode : "cors",

        // Headers data yang akan dikirimkan ke server
        headers : {
            "Content-Type" : "application/json"
        }

    })
    .then(res => res.json()) // data yang sudah difetch,dijadikan data json
    .then(data => { 
        console.log(data)
        data.map((e)=>{
            ca.innerHTML += `
            
            <div class="card_item id="${e.id}>

                <div class="action">
                    <i class="material-icons" id="delete" onclick="deleteData(${e.id})">delete</i>
                    <i class="material-icons" id="edit" onclick="showEditModal(${e.id})">edit</i>
                </div>

                <h3 class="card_title"> ${e.title} </h3>
                <p class="card_body"> ${e.body} </p>

            </div>
            
            `
        })
    })
    .catch(err => console.log(err)) // untuk menampilkan error
}

getDataFromApi(); // panggil function



// FUNCTION DELETE
const deleteData = (id) => {

    fetch(`http://localhost:3000/notes_data/${id}` , {

        method : "DELETE",
        mode : "cors",
        headers : {
            "Content-Type" : "application/json"
        }

    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
    })
    .catch(err => console.log(err))

}


//FUNCTION CREATE
const createData = (event) => {

    // event.preventDefault() // MENCEGAH AGAR PAGE TIDAK RELOAD, JADI FORM TIDAK AKAN SUBMIT KEMANA MANA

    // TANGKAP INPUT DARI USER CARA 1

        // UNTUK MENDAPATKAN VALUE DARI FIELD TITLE :
        // let title = document.getElementById('title').value 

        // UNTUK MENDAPATKAN VALUE DARI FIELD BODY :
        // let body = document.getElementById('body').value 

    // TANGKAP INPUT DARI USER CARA 2
    let title = event.target.title.value
    let body = event.target.body.value

    // console.log(`
    //     title : ${title},
    //     body : ${body}
    // `)

    fetch(`http://localhost:3000/notes_data`, {
        method : "POST",
        mode :"cors",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            title : title,
            body : body
        })
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
}


// FUNCTION EDIT
const updateData = (event) => {

    // TANGKAP EDIT DATA METODE 1
    // let id = document.getElementById('edit_id').value
    // let title = document.getElementById('edit_title').value
    // let body = document.getElementById('edit_body').value

    // TANGKAP EDIT DATA METODE 2
    let id = event.target.edit_id.value
    let title = event.target.edit_title.value
    let body = event.target.edit_body.value

    fetch(`http://localhost:3000/notes_data/${id}`, {
        method : "PUT",
        mode : "cors",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            id : id,
            title : title,
            body : body
        })
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
}

const showEditModal = (id) => {

    // element selector
    let editModal = document.getElementById('edit_modal')
    let editTitle = document.getElementById('edit_title')
    let editBody = document.getElementById('edit_body')
    let editID = document.getElementById('edit_id')
    
    // show Modal form
    editModal.style.display = 'flex'


    fetch(`http://localhost:3000/notes_data/${id}`, {
        method : 'GET',
        mode : 'cors',
        headers : {
            "Content-Type" : "application/json"
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        editID.setAttribute('value', data.id)
        editTitle.setAttribute('value', data.title) // untuk mengambil data dari input text
        editBody.innerHTML = data.body // untuk mengambil data dari textarea
    })
    .catch(err => console.log(err))

}

const hideEditModal = () => {
    let editModal = document.getElementById('edit_modal')
    
    editModal.style.display = 'none'
}