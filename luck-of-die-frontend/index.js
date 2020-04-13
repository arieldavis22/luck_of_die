document.addEventListener("DOMContentLoaded", () => {
    renderMainMenu()
    console.log("DOM Content Loaded")
    // main = document.querySelector("#main")
    // allUserList = document.querySelector("#all_users")
    // createFindUserForm = document.querySelector("#create_or_find_user_form")
    fetchUsers();
})

function fetchUsers() {
    
    fetch("http://localhost:3000/users")
    .then(req => req.json())
    .then(userData => {
        renderUsers(userData)
        createOrFindUser(userData)
    })
    
}

function renderUsers(userData) {
    userData.forEach(user => {
        userLi = document.createElement("li")
        userLi.innerText = user.username

        allUserList.append(userLi)
    })
}

function createOrFindUser(userData) {
    createFindUserForm.addEventListener("submit", e => {
        e.preventDefault()
        
        userData.forEach(user => {
            if(e.target.name.value === user.username) {
                return renderUserInfo(user)
            }
        })
        renderNewUser(e)
        e.target.reset()
    })
}

function renderNewUser(e) {
    fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: e.target.name.value
        })
    })
    .then(req => req.json())
    .then(newUser => {
        renderUserInfo(newUser)
    })
}

function renderUserInfo(user) {
    main.innerHTML = ""
    let userH1 = document.createElement("h1")
    userH1.innerHTML = `Welcome ${user.username}`

    let userH3 = document.createElement("h3")
    userH3.innerHTML = `You have ${user.points} points`

    let userPlayBtn = document.createElement("button")
    userPlayBtn.innerText = "Click Here To Play"

    userPlayBtn.addEventListener("click", () => {
        fetchBoards(user)
    })

    main.append(userH1, userH3, userPlayBtn)
}

function fetchBoards(user) {
    fetch("http://localhost:3000/boards")
    .then(req => req.json())
    .then(boardData => {
        renderBoards(user, boardData)
        // renderCup(user, boardData)
    })
}

function renderBoards(user, boardData) {
    main.innerHTML = ""

    boardData.forEach(board => {
        let boardBtn = document.createElement("button")
        boardBtn.innerHTML = `
        ${board.difficulty} <br>
        `

        boardBtn.addEventListener("click", () => {
            if(board.difficulty === "easy") {
                console.log("easy working", board)
                assignCup(user, board)
            } else if(board.difficulty === "medium") {
                console.log("medium working", board)
                assignCup(user, board)
            } else if(board.difficulty === "hard") {
                console.log("hard working", board)
                assignCup(user, board)
            }
        })
        main.append(boardBtn)
    })
}

// function renderCup(user, board) {
//     fetch("http://localhost:3000/cups")
//     .then(req => req.json())
//     .then(cupData => {
//         assignCup(user, board, cupData)
//     })
    
// }

function randomDiceRoll() {
    return Math.floor(Math.random() * 6) + 1
}
function isOdd(num) { 
    return (num % 2 == 1)
}

function assignCup(user, board) {
    console.log(user.id, board.id)
    let roll = randomDiceRoll()
    fetch(`http://localhost:3000/cups`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            dice: roll,
            user_id: user.id,
            board_id: board.id,
            has_won: isOdd(roll)
        })
    })
    .then(req => req.json())
    .then(newCup => {
        console.log(newCup)
        renderAskTrueFalse(newCup)
    })
}

function renderAskTrueFalse(newCup) {

    main.innerHTML = ""

    let askCupForm = document.createElement("form")
    askCupForm.innerHTML = `
    <input type="radio" name="choice" value="even"> Even
    <input type="radio" name="choice" value="odd"> Odd
    <input type="submit" name="submit" value="Pick">
    `

    askCupForm.addEventListener("submit", (e) => {
        renderCorrectorNot(e, newCup)
    })

    main.append(askCupForm)
}

function renderCorrectorNot(e, newCup) {
    e.preventDefault()
    let oddOrEven;
    if(newCup.has_won === true) {
        oddOrEven = "odd"
    } else {
        oddOrEven = "even"
    }
    console.log(e.target.choice.value, newCup.has_won)
    if(e.target.choice.value === oddOrEven) {
        console.log("Won")
        updateUserWon(newCup)
    } else {
        console.log("Lost")
        updateUserLost(newCup)
    }
}

function updateUserWon(newCup) {
    fetch(`http://localhost:3000/users/${newCup.user_id}/won`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(req => req.json())
    .then(newUserData => {
        renderUserInfo(newUserData)
        destoryCup(newCup)
    })
}
function updateUserLost(newCup) {
    fetch(`http://localhost:3000/users/${newCup.user_id}/lost`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(req => req.json())
    .then(newUserData => {
        if(newUserData.points > 0){
            renderUserInfo(newUserData)
            destoryCup(newCup)
        } else {
            removeUser(newUserData)
            destoryCup(newCup)
        }
    })
}

function destoryCup(newCup) {
    fetch(`http://localhost:3000/cups/${newCup.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(req => req.json())
    .then(console.log)
}

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
    // let menuH1 = document.createElement("h1")
    // menuH1.innerHTML = "Welcome to Luck of Die"

    // let menuH2 = document.createElement("h2")
    // menuH2.innerHTML = "CurrentUsers:<br>"

    // let menuUl = document.createElement("ul")
    // menuUl.id = "all_users"

    // let menuForm = document.createElement("form")
    // menuForm.id = "create_or_find_user_form"
    // menuForm.innerHTML = `
    //     <input type="text" name="name" placeholder="Enter Username">
    //     <input type="submit" name="submit" value="Enter">
    // `
    // // let menuBtn = document.createElement("button")
    // // menuBtn.innerText = "Return to Menu"

    // // menuBtn.addEventListener("click", () => {
    // //     fetchUsers()
    // // })

    // main.append(menuH1, menuH2, menuUl, menuForm)
}

function removeUser(newUserData) {
    fetch(`http://localhost:3000/users/${newUserData.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(req => req.json())
    .then(() => {
        renderMainMenu()
        fetchUsers()
    })
}