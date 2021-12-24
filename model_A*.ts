
///<reference path="./pixi.d.ts"/>
///<reference path="Block.ts"/>


namespace Model {

    export class model extends PIXI.utils.EventEmitter {

        private _block: Block.block;


        constructor() {
            super();
            this._block = new Block.block();
        }

        public a_checkBlock(board: number[][], blockA: { x: number, y: number }, blockB: { x: number, y: number }): boolean {
            //把可能性都列出來的
            //上下左右各二

            let isRemove: boolean = false
            let pointNum: number[] = [];

            let position: { x: number, y: number } = { x: 0, y: 0 };

            if (blockA && blockB) {

                if (board[blockA.y][blockA.x + 2] ) {
                    if (board[blockA.y][blockA.x] == board[blockA.y][blockA.x + 1] && board[blockA.y][blockA.x] == board[blockA.y][blockA.x + 2]) {

                        position = { x: blockA.x, y: blockA.y };
                        if (position) {
                            for (let i: number = 0; i < 3; i++) {
                                let X: number = position.x + i;
                                board[position.y].splice(X, 1);
                                this.emit('sentPosition', { x: X, y: position.y });
                                board[position.y].unshift(this._block.ranNum());
                                pointNum.splice(0, 3, board[blockA.y][blockA.x]);
                                isRemove = true;

                            }
                        }
                    }
                }
                if (board[blockA.y][blockA.x - 2]) {

                    if (board[blockA.y][blockA.x] == board[blockA.y][blockA.x - 1] && board[blockA.y][blockA.x] == board[blockA.y][blockA.x - 2]) {

                        position = { x: blockA.x, y: blockA.y };
                        if (position) {
                            for (let i: number = 0; i < 3; i++) {
                                let X: number = position.x - i;
                                board[position.y].splice(X, 1);
                                this.emit('sentPosition', { x: X, y: position.y });
                                board[position.y].unshift(this._block.ranNum());
                                pointNum.splice(0, 3, board[blockA.y][blockA.x]);
                                isRemove = true;

                            }
                        }
                    }
                }
                if (board[blockA.y + 2]) {

                    if (board[blockA.y][blockA.x] == board[blockA.y + 1][blockA.x] && board[blockA.y][blockA.x] == board[blockA.y + 2][blockA.x]) {
                        position = { x: blockA.x, y: blockA.y };
                        if (position) {
                            for (let i: number = 0; i < 3; i++) {
                                let Y: number = position.y + i;
                                board[Y].splice(position.x, 1);
                                this.emit('sentPosition', { x: position.x, y: Y });
                                board[Y].unshift(this._block.ranNum());
                                pointNum.splice(0, 3, board[blockA.y][blockA.x]);
                                isRemove = true;

                            }
                        }
                    }
                }
                if (board[blockA.y - 2]) {
                    if (board[blockA.y][blockA.x] == board[blockA.y - 1][blockA.x] && board[blockA.y][blockA.x] == board[blockA.y - 2][blockA.x]) {

                        position = { x: blockA.x, y: blockA.y };
                        if (position) {
                            for (let i: number = 0; i < 3; i++) {
                                let Y: number = position.y - i;
                                board[Y].splice(position.x, 1);
                                this.emit('sentPosition', { x: position.x, y: Y });
                                board[Y].unshift(this._block.ranNum());
                                pointNum.splice(0, 3, board[blockA.y][blockA.x]);
                                isRemove = true;

                            }

                        }
                    }
                }
                if (board[blockB.y][blockB.x + 2]) {

                    if (board[blockB.y][blockB.x] == board[blockB.y][blockB.x + 1] && board[blockB.y][blockB.x] == board[blockB.y][blockB.x + 2]) {
                        if (position) {
                            for (let i: number = 0; i < 3; i++) {
                                let X: number = position.x + i;
                                board[position.y].splice(X, 1);
                                this.emit('sentPosition', { x: X, y: position.y });
                                board[position.y].unshift(this._block.ranNum());
                                pointNum.splice(0, 3, board[blockB.y][blockB.x]);
                                isRemove = true;

                            }

                        }

                    }
                }
                if (board[blockB.y][blockB.x - 2]) {

                    if (board[blockB.y][blockB.x] == board[blockB.y][blockB.x - 1] && board[blockB.y][blockB.x] == board[blockB.y][blockB.x - 2]) {

                        position = { x: blockB.x, y: blockB.y };
                        if (position) {
                            for (let i: number = 0; i < 3; i++) {
                                let X: number = position.x - i;
                                board[position.y].splice(X, 1);
                                this.emit('sentPosition', { x: X, y: position.y });
                                board[position.y].unshift(this._block.ranNum());
                                pointNum.splice(0, 3, board[blockB.y][blockB.x]);
                                isRemove = true;

                            }

                        }
                    }
                }

                if (board[blockB.y + 2]) {

                    if (board[blockB.y][blockB.x] == board[blockB.y + 1][blockB.x] && board[blockB.y][blockB.x] == board[blockB.y + 2][blockB.x]) {
                        position = { x: blockB.x, y: blockB.y };
                        if (position) {
                            for (let i: number = 0; i < 3; i++) {
                                let Y: number = position.y + i;
                                board[Y].splice(position.x, 1);
                                this.emit('sentPosition', { x: position.x, y: Y });
                                board[Y].unshift(this._block.ranNum());
                                pointNum.splice(0, 3, board[blockB.y][blockB.x]);
                                isRemove = true;

                            }

                        }

                    }
                }
                if (board[blockB.y - 2]) {
                    if (board[blockB.y][blockB.x] == board[blockB.y - 1][blockB.x] && board[blockB.y][blockB.x] == board[blockB.y - 2][blockB.x]) {
                        position = { x: blockB.x, y: blockB.y };
                        if (position) {
                            for (let i: number = 0; i < 3; i++) {
                                let Y: number = position.y - i;
                                board[Y].splice(position.x, 1);
                                this.emit('sentPosition', { x: position.x, y: Y });
                                board[Y].unshift(this._block.ranNum());
                                pointNum.splice(0, 3, board[blockB.y][blockB.x]);
                                isRemove = true;

                            }

                        }
                    }
                }

                if (board[blockA.y][blockA.x + 1] && board[blockA.y][blockA.x - 1]) {

                    if (board[blockA.y][blockA.x] == board[blockA.y][blockA.x + 1] && board[blockA.y][blockA.x] == board[blockA.y][blockA.x - 1]) {
                        position = { x: blockA.x, y: blockA.y };
                        if (position) {
                            for (let i: number = 0; i < 3; i++) {
                                let X: number = position.x - 1 + i;
                                board[position.y].splice(X, 1);
                                this.emit('sentPosition', { x: X, y: position.y });
                                board[position.y].unshift(this._block.ranNum());
                                pointNum.splice(0, 3, board[blockA.y][blockA.x]);
                                isRemove = true;

                            }
                        }
                    }
                }
                if (board[blockA.y + 1] && board[blockA.y - 1]) {

                    if (board[blockA.y][blockA.x] == board[blockA.y + 1][blockA.x] && board[blockA.y][blockA.x] == board[blockA.y - 1][blockA.x]) {
                        position = { x: blockA.x, y: blockA.y };
                        if (position) {
                            for (let i: number = 0; i < 3; i++) {
                                let Y: number = position.y - 1 + i;
                                board[Y].splice(position.x, 1);
                                this.emit('sentPosition', { x: position.x, y: Y });
                                board[Y].unshift(this._block.ranNum());
                                pointNum.splice(0, 3, board[blockA.y][blockA.x]);
                                isRemove = true;

                            }

                        }
                    }
                }
                if (board[blockB.y][blockB.x + 1] && board[blockB.y][blockB.x - 1]) {

                    if (board[blockB.y][blockB.x] == board[blockB.y][blockB.x + 1] && board[blockB.y][blockB.x] == board[blockB.y][blockB.x - 1]) {
                        position = { x: blockB.x, y: blockB.y };
                        if (position) {
                            for (let i: number = 0; i < 3; i++) {
                                let X: number = position.x - 1 + i;
                                board[position.y].splice(X, 1);
                                this.emit('sentPosition', { x: X, y: position.y });
                                board[position.y].unshift(this._block.ranNum());
                                pointNum.splice(0, 3, board[blockB.y][blockB.x]);
                                isRemove = true;

                            }

                        }
                    }
                }
                if (board[blockB.y + 1] && board[blockB.y - 1]) {

                    if (board[blockB.y][blockB.x] == board[blockB.y + 1][blockB.x] && board[blockB.y][blockB.x] == board[blockB.y - 1][blockB.x]) {
                        position = { x: blockB.x, y: blockB.y };
                        if (position) {
                            for (let i: number = 0; i < 3; i++) {
                                let Y: number = position.y - 1 + i;
                                board[Y].splice(position.x, 1);
                                this.emit('sentPosition', { x: position.x, y: Y });
                                board[Y].unshift(this._block.ranNum());
                                pointNum.splice(0, 3, board[blockB.y][blockB.x]);
                                isRemove = true;

                            }

                        }
                    }
                }
            }
            this.emit('checkBoard', board);

            this.cul(pointNum);
            return isRemove;

        }


        public checkBlock(board: number[][],blockA: { x: number, y: number }, blockB: { x: number, y: number }): boolean {
            //消除的演算法
            let isRemove: boolean = false
            let pointNum: number[] = [];

            let position: { x: number, y: number } = { x: 0, y: 0 };

            board.forEach((row: number[], y: number) => {
                row.forEach((value: number, x: number) => {
                    if (row[x + 1] && row[x + 2]) {

                        if (value == board[y][x + 1] && board[y][x + 1] == board[y][x + 2]) {
                            position = { x: x, y: y };
                            if (position) {
                                for (let i: number = 0; i < 3; i++) {
                                    let X: number = position.x + i;
                                    board[position.y].splice(X, 1);
                                    this.emit('sentPosition', { x: X, y: position.y });
                                    board[position.y].unshift(this._block.ranNum());
                                    pointNum.splice(0, 3, value);
                                    isRemove = true;

                                }

                            }
                        }
                    }
                    if (board[y + 1] && board[y + 2]) {
                        if (value == board[y + 1][x] && board[y + 1][x] == board[y + 2][x]) {
                            position = { x: x, y: y };

                            if (position) {
                                for (let i: number = 0; i < 3; i++) {
                                    let Y: number = position.y + i;
                                    board[Y].splice(position.x, 1);
                                    this.emit('sentPosition', { x: position.x, y: Y });
                                    board[position.y + i].unshift(this._block.ranNum());
                                    pointNum.splice(0, 3, value);
                                    isRemove = true;


                                }
                            }
                        }
                    }
                })
            })


            this.emit('checkBoard', board);

            this.cul(pointNum);
            return isRemove;
        }

        public specialBlock(block: PIXI.Graphics, board: number[][]): number[][] {

            let position = block.getBounds();
            let x: number = 0;

            if (Math.floor((position.x + 2.5) / 87.5) > 3) {
                x = Math.floor((position.x + 2.5) / 87.5) - 1;
            } else {
                x = Math.floor((position.x + 2.5) / 87.5);
            }
            for (let i: number = 0; i < 8; i++) {


                board[x].splice(i, 1);
                board[x].unshift(this._block.ranNum());
                this.emit('sentPosition', { x: i, y: x });

            }
            return board;
        }


        public nomalBlock(board: number[][]): number[][] {

            board.forEach((row: number[], y) => {
                row.forEach((value, x) => {
                    if (board[y][x + 1]) {
                        let typeA = value;
                        let typeB = board[y][x + 1];

                        board[y][x] = typeB;
                        board[y][x + 1] = typeA;

                        if (!this.checkBlock(board, { x, y }, { x: x + 1, y: y })) {
                            // if (!this.checkBlock(board)) {
                            board[y][x] = typeA;
                            board[y][x + 1] = typeB;

                        }

                    }
                })
            })
            board.forEach((row: number[], y) => {
                row.forEach((value, x) => {
                    if (board[y][x - 1]) {
                        let typeA = value;
                        let typeB = board[y][x - 1];

                        board[y][x] = typeB;
                        board[y][x - 1] = typeA;
                        if (!this.checkBlock(board, { x, y }, { x: x - 1, y: y })) {
                            // if (!this.checkBlock(board)) {

                            board[y][x] = typeA;
                            board[y][x - 1] = typeB;

                        }
                    }

                })
            })
            board.forEach((row: number[], y) => {
                row.forEach((value, x) => {
                    if (board[y + 1]) {
                        let typeA = value;
                        let typeB = board[y + 1][x];

                        board[y][x] = typeB;
                        board[y + 1][x] = typeA;

                        if (!this.checkBlock(board, { x, y }, { x: x, y: y + 1 })) {
                            // if (!this.checkBlock(board)) {

                            board[y][x] = typeA;
                            board[y + 1][x] = typeB;

                        }
                    }
                })
            })
            board.forEach((row: number[], y) => {
                row.forEach((value, x) => {
                    if (board[y - 1]) {
                        let typeA = value;
                        let typeB = board[y - 1][x];

                        board[y][x] = typeB;
                        board[y - 1][x] = typeA;

                        if (!this.checkBlock(board, { x, y }, { x: x, y: y - 1 })) {
                            // if (!this.checkBlock(board)) {

                            board[y][x] = typeA;
                            board[y - 1][x] = typeB;

                        }
                    }
                })
            })

            return board;
        }

        public cul(point: number[]): void {

            if (point.length > 0) {
                let result = [...point].reduce((a: number, b: number) => {
                    return (a + b);
                })
                this.emit("sentPoint", result);
            }
        }
    }
}
