const tanya = () => {

    // kita lakukan seleksi ke component app
    const app = document.getElementById('app')

    let name = prompt('Masukkan nama kamu:')
    let age = prompt('Masukkan usia kamu:')

    // kita inner HTML dengan bantuan BACKTICK
    app.innerHTML = `
        <center>
            <h1 style="margin-top : 25vh;">
                Hello from JavaScript, selamat datang ${name}
            </h1>
            <p>Kamu lahir pada tahun ${2021 - age}</p>
        </center>
    `

}