document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM Content Loaded")
    main = document.querySelector("#main")
    allUserList = document.querySelector("#all_users")
    createFindUserForm = document.querySelector("#create_or_find_user_form")
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
                renderUserInfo(user)
            }
        })

        e.target.reset()
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
                // renderCup(user, board)
            } else if(board.difficulty === "medium") {
                console.log("medium working", board)
            } else if(board.difficulty === "hard") {
                console.log("hard working", board)
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

// function assignCup(user, board, cupData) {
//     fetch(`http://localhost:3000/cups/${cupData[0].id}`, {
//         method: "PATCH",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             user_id: user.id,
//             board_id: board.id
//         })
//     })
//     .then(req => req.json())
//     .then(console.log)
// }

