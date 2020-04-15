function fetchBoards(user) {
    getBoardData() //fetch
    .then(boardData => {
        renderBoards(user, boardData)
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
            switch(board.difficulty) {
                case "easy":
                    assignCup(user, board)
                    break;
                case "medium":
                    assignCup(user, board)
                    break;
                case "hard":
                    assignCup(user, board)
                    break;
            }
        })
        main.append(boardBtn)
    })
}