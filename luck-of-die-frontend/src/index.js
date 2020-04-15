
//############### DOM Content Loaded ###############

document.addEventListener("DOMContentLoaded", () => {
    renderMainMenu()
    fetchUsers();
})

function renderMainMenu() {
    main.innerHTML = `
    <h1>Welcome to Luck of Die</h1>
    <h2>CurrentUsers:</h2>
    <ul id="all_users">
    </ul>
    <br>
    <form id="create_or_find_user_form">
        <input type="text" name="name" placeholder="Enter Username">
        <input type="submit" name="submit" value="Enter">
    </form>
    `
    main = document.querySelector("#main")
    allUserList = document.querySelector("#all_users")
    createFindUserForm = document.querySelector("#create_or_find_user_form")
}
