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
}