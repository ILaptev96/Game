class MyGame {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.enemies = []
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
        if (this.currenty == 0) return;
        this.currentY -= 1
    }

    moveRight() {
        if (this.currentY == oGame.y - 1) return;
        this.currentY += 1
    }
}

class Point {
    constructor() {
      
    }

    static create(oData) {
        this.x = Math.floor(Math.random() * (oData.x - 0)) + 0;
        this.y = Math.floor(Math.random() * (oData.y - 0)) + 0;
        oData.enemies.push({x: this.x, y: this.y})
        document.querySelector(`#row${this.x}cell${this.y}`).classList.add("point")
    }

    static remove() {
        document.querySelector(`#row${this.x}cell${this.y}`).classList.remove("point")
    }
}

let oGame = new MyGame(10, 10)

oGame.render()

let oPlayer = new Player(oGame)
oGame.player = oPlayer
oPlayer.highlightCell()
Point.create(oGame)
/* let Point = new Point(oGame)
Point.highlightCell()
 */
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
    if(oPlayer.currentX == Point.x && oPlayer.currentY == Point.y) {
      //  Point.unhighlightCell()
       
  //    oGame.enemies.findIndex( function( currentValue, index, arr ) ); 
      Point.remove()
      Point.create(oGame)
      console.log(oGame.enemies)
      //  document.querySelector('#points').innerHTML = oPlayer.points++
    }
})

