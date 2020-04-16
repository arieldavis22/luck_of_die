//Find all users in database
function fetchUsers() {
    getUserData()  //fetch
    .then(userData => {
        renderUsers(userData) //leaderboard
        createOrFindUser(userData) //form to find or create user
    })
    
}

//render users names in an ordered list
//leaderboard
function renderUsers(userData) {
    leaderboardUl.innerHTML = ""
    userData.slice(0, 5).forEach(user => { //show first 5 users and show their username: points
        userLi = document.createElement("p")
        userLi.innerText = `
        ${user.username}: ${user.points}
        `

        leaderboardUl.append(userLi)
    })
}

//Use form to see if any username is in the database
//if not create a new user in the database
function createOrFindUser(userData) {

    createFindUserForm.addEventListener("submit", e => {
        playDiceAudio()
        e.preventDefault()
        
        userData.forEach(user => {
            if(e.target.name.value === user.username) { //if what the user inputs is a username in the database return that info
                return renderUserInfo(user)
            }
        })
        renderNewUser(e) //if the username isnt found in the database, create a new user
        e.target.reset()
    })
}

function renderNewUser(e) { //makes a new user and renders that new users default info
    getNewUserData(e) //fetch
    .then(newUser => {
        renderUserInfo(newUser) 
    })
}

//render current user info
function renderUserInfo(user) {
    main.innerHTML = ""
    main.innerHTML = `
    <div id="won" class="hide">You won</div>
    <div id="lost" class="hide">You lost</div>
    <h1>Welcome ${user.username}</h1>
    <h3>You have ${user.points} points</h3>
    `

    let userPlayBtn = document.createElement("button")
    userPlayBtn.innerText = "Click Here To Play"

    userPlayBtn.addEventListener("click", () => {
        playDiceAudio()
        fetchBoards(user) //event to fetch board data and display boards(boardManupulation.js)
    })

    main.append(userPlayBtn)
}

//check to see if player has won/lost 
function updateUserWon(newCup) {
    updateUserWin(newCup) //fetch
    .then(newUserData => {
        renderUserInfo(newUserData)
        playWinAudio()
        userWonMessage()
        destoryCup(newCup)
    })
}
function updateUserLost(newCup) {
    updateUserLose(newCup) //fetch
    .then(newUserData => {
        //if users points are 0 or less destory that user
        if(newUserData.points > 0){
            renderUserInfo(newUserData)
            playLoseAudio()
            userLostMessage()
            destoryCup(newCup)
        } else {
            removeUser(newUserData)
            playLoseAudio()
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

function userWonMessage() {
    let userWon = document.querySelector("#won")
    userWon.classList.remove("hide")
    setTimeout(() => {
        userWon.classList.add("hide")
    }, 3000)
}
function userLostMessage() {
    let userLost = document.querySelector("#lost")
    userLost.classList.remove("hide")
    setTimeout(() => {
        userLost.classList.add("hide")
    }, 3000)
}