
//############### DOM Content Loaded ###############

document.addEventListener("DOMContentLoaded", () => {
    leaderboardUl = document.querySelector("#leader_id")
    diceAud = document.querySelector("#diceAudio")
    winAud = document.querySelector("#winAudio")
    loseAud = document.querySelector("#loseAudio")

    renderMainMenu()
    fetchUsers();
})

function renderMainMenu() {
    main.innerHTML = `
    <h1>Please Enter a Username</h1>
    <br>
    <form id="create_or_find_user_form">
        <input type="text" name="name" placeholder="Enter Username"><br>
        <br>
        <input type="submit" name="submit" value="Enter">
    </form>
    `
    main = document.querySelector("#main")
    createFindUserForm = document.querySelector("#create_or_find_user_form")
}

function playDiceAudio() {
    diceAud.volume = 0.2;
    diceAud.play()
}
function playWinAudio() {
    winAud.volume = 0.2;
    winAud.play()
}
function playLoseAudio() {
    loseAud.volume = 0.1;
    loseAud.play()
}
