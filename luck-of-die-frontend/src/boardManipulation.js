function fetchBoards(user) { //get all boards and render them to display
    getBoardData() //fetch
    .then(boardData => {
        renderBoards(user, boardData)
    })
}

function renderBoards(user, boardData) {
    main.innerHTML = ""

    boardData.forEach(board => { //displays all 3 board difficulties
        let boardBtn = document.createElement("button")
        boardBtn.innerHTML = `
        ${board.difficulty} <br>
        `
        
        boardBtn.addEventListener("click", () => {
            switch(board.difficulty) {
                case "easy":
                    assignCup(user, board) //(cupManupulation.js) for easy mode
                    break;
                case "medium":
                    assignCupM(user)//(cupManupulation.js) for medium mode
                    break;
                case "hard":
                    assignCupH(user)//(cupManupulation.js) for hard mode
                    break;
            }
        })
        main.append(boardBtn)
    })
    let modeDesc = document.createElement("p")
    modeDesc.id = "modes"
    modeDesc.innerHTML= `
    Easy: Guess if the single dice rolled is even or odd.<br>
    Medium: Guess the numbers of the 2 die rolled. (order doesnt matter)<br>
    Hard: Guess the numbers of the 3 die rolled and the order they were rolled in.
    `
    main.append(modeDesc)
}