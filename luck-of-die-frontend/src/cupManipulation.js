function randomDiceRoll() {
    return Math.floor(Math.random() * 6) + 1
}
function isOdd(num) { 
    return (num % 2 == 1)
}
//##################################################################
function assignCup(user, board) {
    let roll = randomDiceRoll()

    getNewCupData(user, board, roll) //fetch
    .then(newCup => {
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
//##################################################################


//##################################################################
function destoryCup(newCup) {

    removeCupData(newCup) //fetch
    .then(console.log)
}