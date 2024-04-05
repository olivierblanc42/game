const keypress = require("keypress")

keypress(process.stdin)

class Cell {
    constructor(position_x, position_y) {
        this.position_x = position_x
        this.position_y = position_y
    }

    print() {
        process.stdout.write("#")
    }

    printAsOccupied() {
        process.stdout.write("*")
    }
}

class Field {
    constructor(length, width) {
        this.length = length
        this.width = width
        this.grid = []
        this.star_location_x = Math.floor(Math.random() * (this.width - 1))
        this.star_location_y = Math.floor(Math.random() * (this.length - 1))

        for (let row_index = 0; row_index < this.length; row_index++) {
            let row = []
            for (let colum_index = 0; colum_index < this.width; colum_index++) {
                row.push(new Cell(colum_index, row_index))
            }

            this.grid.push(row)
        }
    }

    print() {
        process.stdout.write("\u001b[2J\u001b[0;0H");
        this.grid.forEach(line => {
            line.forEach(cell => {
                if (this._cell_match_start_position(cell)) cell.printAsOccupied()
                else { cell.print() }
            })
            console.log()
        })
    }

    _cell_match_start_position(cell) {
        return cell.position_x == this.star_location_x && cell.position_y == this.star_location_y
    }
}


const field = new Field(3, 5)
field.print()

process.stdin.on("keypress", function (ch, key) {
    if (key && key.ctrl && key.name == 'c') {
        process.stdin.pause()
    }
    else {
        if (key.name == "up" && field.star_location_y > 0  ) field.star_location_y--;
        if (key.name == "down" && field.star_location_y < field.length-1) field.star_location_y++;
        if (key.name == "left" && field.star_location_x >0 ) field.star_location_x--;
        if (key.name == "right" && field.star_location_x < field.width - 1) field.star_location_x++;
        field.print()
    }
})

process.stdin.setRawMode(true);
process.stdin.resume();

