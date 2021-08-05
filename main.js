class MyGame {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.counter = 0
        this.points = []
    }

    render() {
        let sTemplate = ""
        for (let i = 0; i < this.y; i++) {
            sTemplate += `
            <div id="row${i}" class="row">
            `
            for (let j = 0; j < this.x; j++) {
                sTemplate += `
                <div id="row${i}cell${j}" class="cell"></div>
                `
            }
            sTemplate += `</div>`
        }

        document.querySelector('#app').innerHTML = sTemplate
    }
}

class Player {
    constructor(oData) {
        this.currentX = Math.floor(Math.random() * (oData.x - 0)) + 0;
        this.currentY = Math.floor(Math.random() * (oData.y - 0)) + 0;
        this.points = 0;

    }

    highlightCell() {
        document.querySelector(`#row${this.currentX}cell${this.currentY}`).classList.add("player")
    }

    unhighlightCell() {
        document.querySelector(`#row${this.currentX}cell${this.currentY}`).classList.remove("player")
    }

    moveUp() {
        if (this.currentX == 0) return;
        this.currentX -= 1
    }

    moveDown() {
        if (this.currentX == oGame.x - 1) return;
        this.currentX += 1
    }

    moveLeft() {
        if (this.currentY == 0) return;
        this.currentY -= 1
    }

    moveRight() {
        if (this.currentY == oGame.y - 1) return;
        this.currentY += 1
    }
}


class Dot {
    constructor(oData, type) {
        this.type = type
        this.oData = oData
    }

    create() {
        this.x = Math.floor(Math.random() * (this.oData.x - 0)) + 0;
        this.y = Math.floor(Math.random() * (this.oData.y - 0)) + 0;
        this.oData.points.push({ x: this.x, y: this.y, type: this.type })
        document.querySelector(`#row${this.x}cell${this.y}`).classList.add(this.type)
    }

    remove() {
        document.querySelector(`#row${this.x}cell${this.y}`).classList.remove(this.type)
        let pointIndex = oGame.points.findIndex(arr => arr.x === this.x && arr.y === this.y && arr.type === this.type);
        oGame.points.splice(pointIndex, 1)
    }
}

class Point extends Dot {
    counter() {
        this.oData.counter++
        document.querySelector('#points').innerHTML = this.oData.counter
    }
}

class Enemy extends Dot {
    lose() {
        alert("You Lose")
    }
}


let oGame = new MyGame(10, 10)
let oPlayer = new Player(oGame)
let oPoint = new Point(oGame, 'point')
let oEnemy = new Enemy(oGame, 'enemy')

oGame.render()
oPlayer.highlightCell()
oPoint.create()
oEnemy.create()

window.addEventListener("keyup", function (event) {
    oPlayer.unhighlightCell()
    switch (event.key) {
        case "ArrowUp":
            oPlayer.moveUp()
            break
        case "ArrowDown":
            oPlayer.moveDown()
            break
        case "ArrowLeft":
            oPlayer.moveLeft()
            break
        case "ArrowRight":
            oPlayer.moveRight()
            break
    }
    oPlayer.highlightCell()

    if (oPlayer.currentX == oPoint.x && oPlayer.currentY == oPoint.y) {
        oPoint.counter()
        oPoint.remove()
        oPoint.create()
        //   console.log(oGame.points)
    }
    if (oPlayer.currentX == oEnemy.x && oPlayer.currentY == oEnemy.y) {
        oEnemy.lose()
    }
})

