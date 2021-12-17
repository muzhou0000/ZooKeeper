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
            
            let minCombo: number = 3;
            let comboH: number = 1;
            let comboV: number = 1;
            // let saveHAry: number[] = [];
            let saveVAry: number[] = [];
            let pointNum: number[] = [];
            
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
                        if (comboH >= minCombo) {
                            positionx.push(y);
                            positionY.push(x);
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

            //判斷直線的
            board.forEach((row: number[], y) => {
                row.forEach((value, x) => {
                    if (value == row[x + 1]) {
                        comboV++;
                        // saveVAry.push(x);
                        saveVAry.push(x + 1);

                        if (comboV >= minCombo) {
                            saveVAry.forEach((x: number) => {
                                row.splice(x, 1);

                                this.emit('sentPosition', { x, y });

                                pointNum.splice(0, 3, value);
                                isRemove = true;
                                row.unshift(this._block.ranNum());

                            });
                        }
                        console.log(saveVAry.length);

                    } else {
                        comboV = 1;
                        saveVAry = [];
                    }
                });
            });

            //刪掉橫向的
            for (let i: number = 0; i < positionY.length; i++) {
                for (let j: number = 0; j < 3; j++) {

                    let y = positionY[i] - 1 + j;
                    let x = positionx[i];

                    this.emit('sentPosition', { x, y });

                    board[y].splice(x, 1);
                    board[y].unshift(this._block.ranNum());
                }
            }
            this.emit('checkBoard',board);

            console.table(transAry);
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

                board[x].splice(i, 1, this._block.ranNum());
            }
            return board;
        }


        public nomalBlock(last: PIXI.Graphics, block: PIXI.Graphics, board: number[][]): number[][] {

            let positionA = last.getBounds();
            let positionB = block.getBounds();

            //把每個方塊的位置都換算到棋盤上面
            if (Math.abs(positionA.x - positionB.x) == 100 && Math.abs(positionA.y - positionB.y) == 0 || Math.abs(positionA.x - positionB.x) == 0 && Math.abs(positionA.y - positionB.y) == 100) {

                let typeA = last.name;
                let typeB = block.name;

                Math.floor((positionA.x + 2.5) / 87) > 3 ? board[Math.floor((positionA.x + 2.5) / 87) - 1][Math.floor((positionA.y - 100) / 100)] = Number(typeB) : board[Math.floor((positionA.x + 2.5) / 87)][Math.floor((positionA.y - 100) / 100)] = Number(typeB);
                Math.floor((positionB.x + 2.5) / 87) > 3 ? board[Math.floor((positionB.x + 2.5) / 87) - 1][Math.floor((positionB.y - 100) / 100)] = Number(typeA) : board[Math.floor((positionB.x + 2.5) / 87)][Math.floor((positionB.y - 100) / 100)] = Number(typeA);

                //如果沒有可以消掉的就把名字換回來
                if (!this.checkBlock(board)) {

                    Math.floor((positionA.x + 2.5) / 87) > 3 ? board[Math.floor((positionA.x + 2.5) / 87) - 1][Math.floor((positionA.y - 100) / 100)] = Number(typeA) : board[Math.floor((positionA.x + 2.5) / 87)][Math.floor((positionA.y - 100) / 100)] = Number(typeA);
                    Math.floor((positionB.x + 2.5) / 87) > 3 ? board[Math.floor((positionB.x + 2.5) / 87) - 1][Math.floor((positionB.y - 100) / 100)] = Number(typeB) : board[Math.floor((positionB.x + 2.5) / 87)][Math.floor((positionB.y - 100) / 100)] = Number(typeB);
                }

            }

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