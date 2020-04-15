//Find all users in database
function fetchUsers() {
    getUserData()  //fetch
    .then(userData => {
        renderUsers(userData)
        createOrFindUser(userData)
    })
    
}

//render users names in an unordered list
function renderUsers(userData) {
    userData.forEach(user => {
        userLi = document.createElement("li")
        userLi.innerText = user.username

        allUserList.append(userLi)
    })
}

//Use form to see if any username is in the database
//if not create a new user in the database
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
    getNewUserData(e) //fetch
    .then(newUser => {
        renderUserInfo(newUser)
    })
}

//render current user info
function renderUserInfo(user) {
    main.innerHTML = ""
    main.innerHTML = `
    <h1>Welcome ${user.username}</h1>
    <h3>You have ${user.points} points</h3>
    `

    let userPlayBtn = document.createElement("button")
    userPlayBtn.innerText = "Click Here To Play"

    userPlayBtn.addEventListener("click", () => {
        fetchBoards(user)
    })

    main.append(userPlayBtn)
}

//check to see if player has won/lost 
function updateUserWon(newCup) {
    updateUserWin(newCup) //fetch
    .then(newUserData => {
        renderUserInfo(newUserData)
        destoryCup(newCup)
    })
}
function updateUserLost(newCup) {
    updateUserLose(newCup) //fetch
    .then(newUserData => {
        //if users points are 0 or less destory that user
        if(newUserData.points > 0){
            renderUserInfo(newUserData)
            destoryCup(newCup)
        } else {
            removeUser(newUserData)
            destoryCup(newCup)
        }
    })
}

//remove user from database
function removeUser(newUserData) {
    removeUserData(newUserData) //fetch
    .then(() => {
        renderMainMenu()
        fetchUsers()
    })
}