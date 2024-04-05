const keypress = require("keypress")

keypress(process.stdin)

class Cell {
    constructor(position_y, position_x) {
        this.position_x = position_x
        this.position_y = position_y
    }

    print() {
        process.stdout.write("#")
    }

    printAsOccupied() {
        process.stdout.write("*")
    }

    printHat() {
        process.stdout.write('^')
    }
    printHole() {
        process.stdout.write('O')
    }

}

class Field {
    constructor(length, width) {
        this.length = length;
        this.width = width;
        this.grid = [];
        this.arrayHole = [];
        for (let i = 0; i < ((this.width * this.length) * 10 / 100); i++) {
            this.arrayHole.push([Math.floor(Math.random() * (this.width - 1)), Math.floor(Math.random() * (this.length - 1))]);

        }



        console.log(this.arrayHole);
        
        this.star_location_x = 0;
        this.star_location_y = 0;
        this.previous_star_location_x;
        this.hat_location_x = Math.floor(Math.random() * (this.width - 1));
        this.hat_location_y = Math.floor(Math.random() * (this.length - 1));


        for (let row_index = 0; row_index < this.length; row_index++) {
            let row = []
            for (let colum_index = 0; colum_index < this.width; colum_index++) {
                row.push(new Cell(colum_index, row_index))
            }

            this.grid.push(row)
        }
        console.log(this.grid);

    }

    print() {
        process.stdout.write("\u001b[2J\u001b[0;0H");

        this.grid.forEach(line => {
            line.forEach(cell => {
                if (this._cell_match_start_position(cell)) cell.printAsOccupied()
                else if (this._cell_hat_position(cell)) cell.printHat()
                else if (this._cell_hole_position(cell)) cell.printHole()
                else { cell.print() }

            })
            console.log()

        })


        // if (field.star_location_y === this.row.length && field.star_location_x < 0 && field.star_location_y >  ){

        // }
        if (field.star_location_x < 0 || field.star_location_x > this.length  ){
            console.log('perdu')
            process.exit();
        }
        if (field.star_location_y < 0 || field.star_location_y > this.width) {
            console.log('perdu')
            process.exit();
        }

        if (field.star_location_x === field.hat_location_x && field.star_location_y === field.hat_location_y) {
            console.log('you win')
            process.exit();
        }


    }

    _cell_match_start_position(cell) {
        return cell.position_x == this.star_location_x && cell.position_y == this.star_location_y
    }
    _cell_hat_position(cell) {
        return cell.position_x == this.hat_location_x && cell.position_y == this.hat_location_y
    }

    _cell_hole_position(cell) {
        return this.arrayHole.some(item => item[0] == cell.position_x && item[1] == cell.position_y)

    }

}


const field = new Field(5, 5)
field.print()

process.stdin.on("keypress", function (ch, key) {

    if (key && key.ctrl && key.name == 'c') {
        process.stdin.pause()
    }
    else {
        if (key.name == "up") {
            field.star_location_x--

        }
        ;

        if (key.name == "down") field.star_location_x++;
        if (key.name == "left") field.star_location_y--;
        if (key.name == "right") field.star_location_y++;


        field.print()
    }
    console.log(field.star_location_x, field.star_location_y)

})
process.stdin.setRawMode(true);
process.stdin.resume();

