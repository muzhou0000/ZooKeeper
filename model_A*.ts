
///<reference path="./pixi.d.ts"/>
///<reference path="Block.ts"/>


namespace Model {

    export class model extends PIXI.utils.EventEmitter {

        private _block: Block.block;


        constructor() {
            super();
            this._block = new Block.block();
        }
        public a_checkBlock(board: number[][]): boolean {
            //目標
            //board[y][x],board[y][x+1],board[y][x+2];
            //board[y][x],board[y+1][x],board[y+2][x];
            //都消掉
            let isRemove: boolean = false;
            let pointNum: number[] = [];



            let fn: number = 0;
            let gn: number = 0;
            //這個是d開頭的演算法 會跑全部地圖
            let hn: number = 0
            //這個是貪婪演算法 直奔終點 不撞南牆不回頭
            let openAry;
            let closeAry;



            board.forEach((row: number[], y: number) => {
                row.forEach((value: number, x: number) => {

                    for (let i: number = 0; i < 3; i++) {

                        if (row[x + i]) {

                            if (row[x + i] == value) {
                                fn += 1;
                            }

                        } else {
                            if (fn >= 2) {
                                pointNum.splice(0, 3, value);
                                let X=x-i;
                                this.emit('sentPosition', { x: X, y: y });
                                board[y].splice(X, 1);
                                board[y].unshift(this._block.ranNum());

                                isRemove=true;

                            }
                            fn = 0;

                        }
                    }
                    for (let i: number = 0; i < 3; i++) {

                        if (board[y+i]) {

                            if (board[y+i][x] == value) {
                                fn += 1;
                            }

                        } else {
                            if (fn >= 2) {
                                let Y=y-i;
                                this.emit('sentPosition', { x: x, y: Y });
                                board[Y].splice(x, 1);
                                board[Y].unshift(this._block.ranNum());
                                pointNum.splice(0, 3, value);

                                isRemove=true;

                            }
                            fn = 0;
                        }
                    }
                })
            })
            this.emit('checkBoard', board);
            this.cul(pointNum);
            return isRemove;


        }

        public checkBlock(board: number[][]): boolean {
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
                                    isRemove=true;

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
                                    isRemove=true;


                                }
                            }
                        }
                    }
                })
            })

            //用A*的原理去撈出三個連在一起的
            //只要管有沒有三個連一起跟消掉 只要管有沒有三個連一起跟消掉

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

                        if (!this.checkBlock(board)) {

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

                        if (!this.checkBlock(board)) {

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

                        if (!this.checkBlock(board)) {

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

                        if (!this.checkBlock(board)) {

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
