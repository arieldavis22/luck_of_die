//#################################################################################

function getUserData() {
    return fetch("http://localhost:3000/users")
    .then(req => req.json())
}

function getNewUserData(e) {
    return fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: e.target.name.value
        })
    })
    .then(req => req.json())
}

function removeUserData(newUserData) {
    return fetch(`http://localhost:3000/users/${newUserData.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(req => req.json())
}

function updateUserWin(newCup){
    return fetch(`http://localhost:3000/users/${newCup.user_id}/won`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(req => req.json())
}

function updateUserLose(newCup) {
    return fetch(`http://localhost:3000/users/${newCup.user_id}/lost`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(req => req.json())
}
//#################################################################################

function getBoardData() {
    return fetch("http://localhost:3000/boards")
    .then(req => req.json())
}
//#################################################################################

function getNewCupData(user, board, roll) {
    return fetch(`http://localhost:3000/cups`, {
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
}

function removeCupData(newCup) {
    return fetch(`http://localhost:3000/cups/${newCup.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(req => req.json())
}
//#################################################################################