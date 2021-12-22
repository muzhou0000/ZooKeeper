
///<reference path="./pixi.d.ts"/>
///<reference path="Block.ts"/>


namespace Model {

    export class model extends PIXI.utils.EventEmitter {

        private _block: Block.block;


        constructor() {
            super();
            this._block = new Block.block();
        }

        public checkBlock(board: number[][]): boolean {

            let isRemove: boolean = false
            let pointNum: number[] = [];

            let gn: number = 0;
            let hn: number = 0
            let fn: number = gn + hn;

            let position: { x: number, y: number } = { x: 0, y: 0 };


            board.forEach((row: number[], y: number) => {
                row.forEach((value: number, x: number) => {
                    if (row[x + 1] && row[x + 2]) {

                        if (value == board[y][x + 1] && board[y][x + 1] == board[y][x + 2]) {
                            position = { x: x, y: y };
                            //這個可以撈出最近的相同方塊
                            if (position) {
                                for (let i: number = 0; i < 3; i++) {

                                    board[position.y].splice(position.x + i, 1);
                                    board[position.y].unshift(this._block.ranNum());
                                    pointNum.splice(0, 3, value);

                                }

                            }
                        }
                    }
                    if (board[y + 1] && board[y + 2]) {
                        if (value == board[y + 1][x] && board[y + 1][x] == board[y + 2][x]) {
                            position = { x: x, y: y };

                            if (position) {
                                for (let i: number = 0; i < 3; i++) {
                                    board[position.y + i].splice(position.x, 1);
                                    board[position.y + i].unshift(this._block.ranNum());
                                    pointNum.splice(0, 3, value);

                                }
                            }
                        }
                    }
                })
            })

            //用A*的原理去撈出三個連在一起的
            //只要管有沒有三個連一起跟消掉 只要管有沒有三個連一起跟消掉

            // gn=board[y][x]
            //Gn=起始的到目前的
            // fn=board[]
            //Fn=目前終點的

            // if (fn <= 2) {
            //     board[position.y].splice(position.x,1);
            //     board[position.y].unshift(this._block.ranNum());

            //     //消掉連起來的數字
            // }
            //判斷他有沒有連成三個
            //從00開始到77 

            /*

           //-------------------


            let minCombo: number = 3;
            let comboH: number = 1;
            let comboV: number = 1;
            let saveVAry: number[] = [];

            let positionx: number[] = [];
            let positionY: number[] = [];


            //判斷橫向的 把原本的陣列xy互換

            let transAry: number[][] = [];
            for (let i: number = 0; i < 8; i++) {
                transAry.push([]);
                for (let j: number = 0; j < 8; j++) {
                    transAry[i][j] = board[j][i];
                }
            }

            transAry.forEach((row: number[], y) => {
                row.forEach((value: number, x: number) => {
                    if (value == row[x + 1]) {
                        comboH++;
                        // console.log(positionx);
                        if (comboH >= minCombo) {
                            positionx.push(y);
                            positionY.push(x - 1);
                            pointNum.splice(0, 3, value);
                            isRemove = true;
                        }
                    } else {
                        comboH = 1;
                    }
                })
            })
            //找完之後再轉回去判斷直的
            for (let i: number = 0; i < 8; i++) {
                for (let j: number = 0; j < 8; j++) {
                    board[i][j] = transAry[j][i];
                }
            }

            //刪掉橫向的
            // console.log(positionx, positionY);
            let y: number[] = [];
            let x: number = 0;
            let result: number[] = [];
            for (let i: number = 0; i < positionY.length; i++) {
                for (let j: number = 0; j < positionx.length + 2; j++) {

                    x = positionx[i];
                    y.push(positionY[i] + j);
                    result = [...(new Set(y))];
                    x = x > 7 ? 7 : x;

                }
                if (result.length == positionx.length + 2) {

                    result.forEach((num: number) => {
                        num = num > 7 ? 7 : num;
                        this.emit('sentPosition', { x: x, y: num });
                        board[num].splice(x, 1);
                        board[num].unshift(this._block.ranNum());
                    })

                }
            }

            board.forEach((row: number[], y) => {
                row.forEach((value, x) => {
                    if (value == row[x + 1]) {
                        comboV++;
                        saveVAry.push(x);

                    } else {
                        if (comboV >= minCombo) {
                            saveVAry.push(x)
                            let result: number[] = [...(new Set(saveVAry))];
                            result.forEach((x: number) => {
                                x = x > 7 ? 7 : x;

                                row.splice(x, 1);

                                this.emit('sentPosition', { x, y });

                                pointNum.splice(0, 3, value);
                                isRemove = true;
                                row.unshift(this._block.ranNum());

                            });
                        }

                        comboV = 1;
                        saveVAry = [];
                    }

                });
            });

            
           //-------------------
           */

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


        public a_checkBlock(board: number[][]): boolean {
            let isRemove: boolean = false;
            let endPoint: number = 0;

            let going: number[] = [];
            let goingPath: { x: number, y: number }[] = [];


            board.forEach((row: number[], y: number) => {
                row.forEach((value: number, x: number) => {

                    //第一步搜尋九宮格
                    if (board[y] && board[y][x + 1] == value) {
                        going.push(board[y][x + 1]);
                        goingPath.push({ x: x + 1, y: y });
                    }

                    if (board[y] && board[y][x - 1] == value) {
                        going.push(board[y][x - 1]);
                        goingPath.push({ x: x - 1, y: y });

                    }
                    if (board[y + 1] && board[y + 1][x] == value) {
                        going.push(board[y + 1][x]);
                        goingPath.push({ x: x, y: y + 1 });

                    }
                    if (board[y + 1] && board[y + 1][x + 1] == value) {
                        going.push(board[y + 1][x + 1]);
                        goingPath.push({ x: x + 1, y: y + 1 });

                    }
                    if (board[y + 1] && board[y + 1][x - 1] == value) {
                        going.push(board[y + 1][x - 1]);
                        goingPath.push({ x: x - 1, y: y + 1 });

                    }
                    if (board[y - 1] && board[y - 1][x] == value) {
                        going.push(board[y - 1][x]);
                        goingPath.push({ x: x, y: y - 1 });

                    }
                    if (board[y - 1] && board[y - 1][x + 1] == value) {
                        going.push(board[y - 1][x + 1]);
                        goingPath.push({ x: x - 1, y: y + 1 });

                    }
                    if (board[y - 1] && board[y - 1][x - 1] == value) {
                        going.push(board[y - 1][x] - 1);
                        goingPath.push({ x: x - 1, y: y - 1 });

                    }
                    //第二步找出連續有兩個以上的位置
                    if (going[going.length - 1] && going[going.length - 2] == going[going.length - 1]) {

                        // console.log(board[y][x], 'y:' + y, 'x:' + x);
                        // goingPath = [];

                    }

                    //第三步找出來的位置用看上下左右移動能不能達成目標？

                    //目前盤面是已經換完的了


                    //Fn=Gn(開始到目前)+Hn(目前到終點）
                    //如果Fn的距離<=2 則可以移動
                    //起點是每一個位置
                    //終點是距離最近的相同顏色？
                    //應該說我只要做第一步 如果觸發條件（三個）就觸發消除？
                    //如果我
                    console.log(row);
                    console.log(going);

                })
                going = [];
                goingPath = [];
                console.log('----------');
            })

            return isRemove;
        }
    }
}
