function randomDiceRoll() {
    return Math.floor(Math.random() * 6) + 1
}
function isOdd(num) { 
    return (num % 2 == 1)
}
//##################################################################
//easy mode
function assignCup(user, board) { //assign a cup with a random dice roll to a user
    let roll = randomDiceRoll()

    getNewCupData(user, board, roll) //fetch
    .then(newCup => {
        renderAskEvenOdd(newCup) //render form that ask user if dice is even or odd
    })
}

function renderAskEvenOdd(newCup) {//render form that ask user if dice is even or odd

    main.innerHTML = ""

    let askCupForm = document.createElement("form")
    askCupForm.innerHTML = `
    <input type="radio" name="choice" value="even"> Even
    <input type="radio" name="choice" value="odd"> Odd
    <input type="submit" name="submit" value="Pick">
    `

    askCupForm.addEventListener("submit", (e) => {
        renderCorrectorNot(e, newCup) //form submit event
    })

    main.append(askCupForm)
}

function renderCorrectorNot(e, newCup) {
    e.preventDefault()
    let oddOrEven;
    if(newCup.has_won === true) { //if the newCup.has_won(should be is_odd) is true then 
        oddOrEven = "odd"
    } else {
        oddOrEven = "even"
    }
    //console.log(e.target.choice.value, newCup.has_won)
    if(e.target.choice.value === oddOrEven) { //if the user choice is the same as the random even or odd
        console.log("Won")
        updateUserWon(newCup)
    } else {
        console.log("Lost")
        updateUserLost(newCup)
    }
}
//##################################################################
//medium mode
function assignCupM(user) {
    // let roll = randomDiceRoll()
    // let roll2 = randomDiceRoll()

    // getNewCupData(user, board, roll)
    // .then(console.log)
    // getNewCupData(user, board, roll2)
    // .then(console.log)
    renderTotalM(user)
}

function getTotalDice() {
    // let total = []
    // user.cups.forEach(cup => {
    //     total.push(cup.dice)
    //     removeCupData(cup)
    // })
    // console.log(total)
    return [randomDiceRoll(), randomDiceRoll()]
}

function renderTotalM(user) {
    let allDie = getTotalDice(user) //array of 2 random dice rolls
    //console.log(allDie)
    let total = 0 
    allDie.map(dice => { //get total number for 2 die
        total += dice
    })
    main.innerHTML = ""
    let diceTotal = document.createElement("h1")
    diceTotal.innerText = total
    let diceForm = document.createElement("form")
    diceForm.id = "dice_formM"
    diceForm.innerHTML = `
    <input type="text" name="num1" placeholder="Guess a Number">
    <input type="text" name="num2" placeholder="Guess a Number">
    <input type="submit" name="submit" value="Enter">
    `
    diceForm.addEventListener("submit", e => {
        guessEvent(e, user, allDie) //submit guess event
    })

    main.append(diceTotal, diceForm)
}


function arrMatch(arr1, arr2) { //check to see if one array is equal to another
	if (arr1.length !== arr2.length) return false;

	for (var i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) return false;
	}

	return true;
}

function guessEvent(e, user, allDie) {
    e.preventDefault()
    let answerArr = [parseInt(e.target.num1.value), parseInt(e.target.num2.value)] //make the inputs integers
    answerArr.sort() //sort both arrays so that the order of input doesnt matter
    allDie.sort()

    if(arrMatch(answerArr, allDie)) { //check to see if the user input is the same as the 2 dice rolls
        console.log("Won")
        updateUserWinM(user)
        .then(newUserInfo => {
            renderUserInfo(newUserInfo) //render updated user info
            userWonMessage() //render user won message (from userManipulation.js)
        })
    } else {
        console.log("lost")
        console.log(answerArr, allDie)
        updateUserLoseM(user)
        .then(newUserInfo => {
        if(newUserInfo.points > 0){
            renderUserInfo(newUserInfo) //fetch
            userLostMessage()//render user lost message (from userManipulation.js)
        } else {
            removeUser(newUserInfo) //fetch
        }
        })
    }
}

//##################################################################
//hard mode
function assignCupH(user) {
    // let roll = randomDiceRoll()
    // let roll2 = randomDiceRoll()
    // let roll3 = randomDiceRoll()

    // getNewCupData(user, board, roll)
    // getNewCupData(user, board, roll2)
    // getNewCupData(user, board, roll3)
    renderTotalH(user)
}

function getTotalDiceH() {
    return [randomDiceRoll(), randomDiceRoll(), randomDiceRoll()]
}

function renderTotalH(user) {
    let allDie = getTotalDiceH(user)
    console.log(allDie)
    let total = 0 
    allDie.map(dice => {
        total += dice
    })
    main.innerHTML = ""
    let diceTotal = document.createElement("h1")
    diceTotal.innerText = total
    let diceForm = document.createElement("form")
    diceForm.id = "dice_formH"
    diceForm.innerHTML = `
    <input type="text" name="num1" placeholder="Guess a Number">
    <input type="text" name="num2" placeholder="Guess a Number">
    <input type="text" name="num3" placeholder="Guess a Number">
    <input type="submit" name="submit" value="Enter">
    `
    diceForm.addEventListener("submit", e => {
        guessEventH(e, user, allDie)
    })

    main.append(diceTotal, diceForm)
}

function guessEventH(e, user, allDie) {
    e.preventDefault()
    let answerArr = [
        parseInt(e.target.num1.value), 
        parseInt(e.target.num2.value),
        parseInt(e.target.num3.value)
    ]

    if(arrMatch(answerArr, allDie)) {
        console.log("Won")
        updateUserWinH(user)
        .then(newUserInfo => {
            renderUserInfo(newUserInfo) //fetch
            userWonMessage()
        })
    } else {
        console.log("lost")
        console.log(answerArr, allDie)
        updateUserLoseH(user)
        .then(newUserInfo => {
        if(newUserInfo.points > 0){
            renderUserInfo(newUserInfo) //fetch
            userLostMessage()
        } else {
            removeUser(newUserInfo) //fetch
        }
        })
    }
}

//##################################################################
//destory cup on easy mode when done
function destoryCup(newCup) {

    removeCupData(newCup) //fetch
    .then(console.log)
}