
//############### DOM Content Loaded ###############

document.addEventListener("DOMContentLoaded", () => {
    leaderboardUl = document.querySelector("#leader_id")

    renderMainMenu()
    fetchUsers();
})

function renderMainMenu() {
    main.innerHTML = `
    <h1>Please Enter a Username</h1>
    <br>
    <form id="create_or_find_user_form">
        <input type="text" name="name" placeholder="Enter Username">
        <input type="submit" name="submit" value="Enter">
    </form>
    `
    main = document.querySelector("#main")
    createFindUserForm = document.querySelector("#create_or_find_user_form")
}
