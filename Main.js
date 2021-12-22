"use strict";
var Block;
(function (Block) {
    class block extends PIXI.utils.EventEmitter {
        constructor() {
            super();
            this._color = [
                0xffffff,
                0xF5DEB3,
                0xDEB887,
                0xCD853F,
                0xBC8F8F,
                0xF4A460,
                0xBDB76B,
                0xDAA520,
            ];
            // public _color: any = [
            //     0xffffff,
            //     0xFFEFD5,
            //     0xFFE4B5,
            //     0xFFDAB9,
            //     0xEEE8AA,
            //     0xF0E68C,
            //     0xBDB76B,
            //     0xFFD700,
            // ];
            this.randomNum = 0;
        }
        ranNum() {
            // this.randomNum=Math.floor(Math.random() * 100)>1?this.randomNum = Math.floor(Math.random() * 7) + 1:0;
            this.randomNum = Math.floor(Math.random() * 7) + 1;
            return this.randomNum;
        }
        createBlock(x, y, color, id) {
            let block = new PIXI.Graphics;
            block.lineStyle(5, 0xffffff);
            block.beginFill(color);
            block.drawRoundedRect(x, y, 100, 100, 5);
            block.endFill();
            block.name = id;
            block.buttonMode = true;
            block.interactive = true;
            block.pivot.set(block.width / 2, block.height / 2);
            return block;
        }
    }
    Block.block = block;
})(Block || (Block = {}));
/*
///<reference path="Block.ts"/>

namespace View {
    export class view {
        private _app: PIXI.Application;
        private _controller: Controller.controller;
        private _model: Model.model;
        private _block: Block.block;

        private _gameScreen: PIXI.Container;
        private _gameOverScreen: PIXI.Container;

        private _state: any;

        private _board: number[][] = [];

        private _lastBlock?: PIXI.Graphics;
        private _timeLine!: PIXI.Graphics;
        private _blockAry: PIXI.Graphics[] = [];

        private _timer_num: number = 0;
        private _point_num: number = 0;
        private _timerHB_num: number = 0;

        private _pointText!: PIXI.Text;
        private _aim!: PIXI.Sprite;


        //-----------TEST-----------//
        private timer_scale: number = 0;
        private clearHblock: PIXI.Graphics[] = [];
        private changBlock: PIXI.Graphics[] = [];



        constructor(controller: Controller.controller, model: Model.model) {

            this._app = new PIXI.Application(905, 1065, { backgroundColor: 0xD1E292 });
            document.body.appendChild(this._app.view);

            this._model = model;
            this._controller = controller;
            this._block = new Block.block();

            this._gameScreen = new PIXI.Container();
            this._app.stage.addChild(this._gameScreen);
            this._gameOverScreen = new PIXI.Container();
            this._app.stage.addChild(this._gameOverScreen);
            this._gameOverScreen.visible = false;

            this.init();
        }


        private init(): void {


            for (let i: number = 0; i < 64; i++) {
                let gameBoard: PIXI.Graphics = new PIXI.Graphics();
                gameBoard.lineStyle(5, 0xC6B575);
                gameBoard.beginFill(0xF9E9AF);
                gameBoard.drawRect(0, 0, 100, 100);
                gameBoard.endFill();
                gameBoard.x = (i % 8) * 100 + 50;
                gameBoard.y = Math.floor(i / 8) * 100 + 155;
                this._gameScreen.addChild(gameBoard);
            }

            let gameOverBG: PIXI.Graphics = new PIXI.Graphics();
            gameOverBG.beginFill(0xBC8F8F, 0.8);
            gameOverBG.drawRect(0, 0, 905, 1065);
            gameOverBG.endFill();
            this._gameOverScreen.addChild(gameOverBG);

            let restartBtn: PIXI.Graphics = new PIXI.Graphics();
            restartBtn.beginFill(0xffffff);
            restartBtn.drawRoundedRect(0, 0, 300, 100, 5);
            restartBtn.endFill();

            restartBtn.buttonMode = true;
            restartBtn.interactive = true;
            this._gameOverScreen.addChild(restartBtn);
            restartBtn.x = this._app.view.width / 3;
            restartBtn.y = this._app.view.height / 2;

            let restartText: PIXI.Text = new PIXI.Text('New', { fontSize: 80, fill: 0xBC8F8F });
            restartBtn.addChild(restartText);

            restartBtn.on('click', () => {
                this.restart();
            });

            let point: PIXI.Graphics = new PIXI.Graphics();
            point.lineStyle(5, 0xC6B575);
            point.beginFill(0xFBEFC1);
            point.drawRoundedRect(0, 0, 800, 100, 5);
            point.endFill();
            point.x = 50;
            point.y = 25;
            this._gameScreen.addChild(point);

            this._pointText = new PIXI.Text(" 得分： ", { fontSize: 50, fill: 0xC6B575 });
            point.addChild(this._pointText);
            this._pointText.y = 20;
            this._model.on("sentPoint", (point: number) => {
                this._point_num += point * 10;
                this._pointText.text = ' 得分： ' + this._point_num;
                this._timeLine.width += 0.2;

            });

            let time: PIXI.Graphics = new PIXI.Graphics();
            time.lineStyle(5, 0xC6B575);
            time.beginFill(0xFBEFC1);
            time.drawRoundedRect(0, 0, 800, 50, 5);
            time.endFill();
            time.x = 50;
            time.y = 985;
            this._gameScreen.addChild(time);

            this._timeLine = new PIXI.Graphics();
            this._timeLine.lineStyle(5, 0xC6B575);
            this._timeLine.beginFill(0xC6B575);
            this._timeLine.drawRect(0, 0, 800, 50);
            this._timeLine.endFill();
            time.addChild(this._timeLine);

            this._aim = PIXI.Sprite.fromImage('./Image/aim.png');
            this._app.stage.addChild(this._aim);
            this._aim.anchor.set(0.5, 0.5);
            this._aim.scale.set(0.15, 0.15);
            this._aim.alpha = 0;

            this._model.on('sentPosition', (e: { x: number, y: number }) => {
                let moveBlock: PIXI.Graphics;
                // console.log(e,'e');
                // console.log('??',this._board[e.x][e.y])
                // console.log(this._board[7][7],'77');

                if(this._board[e.x][e.y]==undefined){
                    this.restart();
                }
                moveBlock = (this._block.createBlock(0, 0, 0xffffff, this._board[e.x][e.y].toString()));
                moveBlock.x = e.y * 100 + 102.5;
                moveBlock.y = e.x * 100 + 207.5;
                moveBlock.buttonMode = false;
                moveBlock.interactive = false;
                this.clearHblock.push(moveBlock);
                this.clearHblock.forEach((e: PIXI.Graphics) => {
                    this._app.stage.addChild(e);

                });


            })

            this._model.on('checkBoard',(board:number[][])=>{
                // console.log('checkboard      ========')
                this._board=board;
            })

            this.board();
            console.table(this._board);

            this._state = this.upDate;
            this._app.ticker.add(() => this.gameLoop(), 16);

        }

        //------------LoOoOoOoOoP------------//

        private gameLoop(): void {
            this._state();

        }
        private upDate(): void {
            // if (this._controller.checkBoard(this._board)) {
                // this.clearBard();
            // }
            this.aim_ani(this._aim);
            this.clearHB();

        }

        //------------BOARD------------//
        private board(): void {
            for (let j: number = 0; j < 8; j++) {
                this._board[j] = [];
                for (let i: number = 0; i < 8; i++) {
                    let num: number = this._block.ranNum();

                    let newBlock: PIXI.Graphics = this._block.createBlock(0, 0, this._block._color[num], num.toString());
                    newBlock.x = j * 100 + 102;
                    newBlock.y = i * 100 + 207;
                    this._board[j][i] = Number(newBlock.name);

                    this._gameScreen.addChild(newBlock);

                    newBlock.on('click', (block: any) => {
                        this.clickBlock(block.target);
                        this._aim.alpha = 1;
                        this._aim.x = block.target.x - 0.5;
                        this._aim.y = block.target.y;
                    })
                }
            }
            if (this._controller.checkBoard(this._board)) {
                this.clearBard();
            }

        }

        private reDrawBoard(): void {
            this._blockAry = [];

            this._board.forEach((row: number[], i: number) => {

                row.forEach((value, j) => {

                    let A: PIXI.Graphics = this._block.createBlock(0, 0, this._block._color[value], value.toString());
                    A.x = i * 100 + 102;
                    A.y = j * 100 + 207;
                    this._blockAry.push(A);
                });
            });

            this._blockAry.forEach((block: PIXI.Graphics) => {
                this._gameScreen.addChild(block);

                block.on('click', (block: any) => {
                    this.clickBlock(block.target);
                    this._aim.alpha = 1;
                    this._aim.x = block.target.x - 0.5;
                    this._aim.y = block.target.y;

                });
            })

        }


        public clickBlock(block: PIXI.Graphics): void {

            if (block.name == '0') {
                //消掉一整排
                this._board=this._controller.checkSpecialBlock(block, this._board);
                if (this._controller.checkBoard(this._board)) {
                    this.clearBard();
                }
            }

            if (!this._lastBlock) {
                this._aim.alpha = 0;
                this.cancelTimer();
                this._lastBlock = block;
                this._timer_num = setInterval(this.timer, 16);

            } else {

                let positionAX = this._lastBlock.x;
                let positionAY = this._lastBlock.y;
                let positionBX = block.x;
                let positionBY = block.y;
                let typeA = this._lastBlock.name;
                let typeB = block.name;

                if (Math.abs(positionAX - positionBX) == 100 && Math.abs(positionAY - positionBY) == 0 || Math.abs(positionAX - positionBX) == 0 && Math.abs(positionAY - positionBY) == 100) {

                    this.changBlock[0] = this._block.createBlock(0, 0, this._block._color[typeB!], typeB!);
                    this.changBlock[1] = this._block.createBlock(0, 0, this._block._color[typeA!], typeA!);

                    this.changBlock[0].position.set(positionAX, positionAY);
                    this.changBlock[1].position.set(positionBX, positionBY);

                    this.changBlock.forEach((block: PIXI.Graphics) => {
                        block.buttonMode = false;
                        block.interactive = false;
                        this._app.stage.addChild(block);
                    })

                    this.cancelTimer2();

                    if(this.changBlock.length>1){

                        this.timer_scale = setInterval(() => {
                            this.move(this.changBlock[0], this.changBlock[1], positionAX, positionBX, positionAY, positionBY);
                        });
                    }

                }

                this._board = this._controller.checkNomalBlock(this._lastBlock!, block, this._board);
                this._lastBlock = undefined;
                this._aim.alpha = 0;
                this.clearBard();
            }
        }

        //------------工具人------------//

        private restart(): void {
            this.board();
            this._aim.alpha = 0;
            this._point_num = 0;
            this._timeLine.width = 800;
            this._pointText.text = ' 得分： ';
            this._gameOverScreen.visible = false;
        }
        private clearBard(): void {
            this._blockAry.forEach((e: PIXI.Graphics) => {
                this._gameScreen.removeChild(e);
            })
            this.reDrawBoard();

        }

        //------------TIMER------------//

        private timer = (): void => {

            // if (this._timeLine.width < 0) {
            //     this._timeLine.width = 0;
            //     this._aim.alpha = 0;
            //     this._gameOverScreen.visible = true;
            //     this.cancelTimer();
            // }
            this._timeLine.width -= 0.2;

        }

        private cancelTimer(): void {
            clearInterval(this._timer_num);
        }
        private cancelTimer2(): void {
            clearInterval(this.timer_scale);
        }
        private cancelHB(): void {
            clearInterval(this._timerHB_num);
        }

        //------------ANI------------//

        private aim_ani(aim: PIXI.Sprite): void {
            aim.rotation += 0.01;

        }
        private clearHB = (): void => {
            this.clearHblock.forEach((e: PIXI.Graphics) => {

                e.alpha -= 0.015;
                if (e.alpha <= 0) {
                    this.cancelHB();
                    this.clearHblock.forEach((e: PIXI.Graphics) => {
                        this._app.stage.removeChild(e);
                    })
                    this.clearHblock = [];

                }
            })
        }
        private move = (A: PIXI.Graphics, B: PIXI.Graphics, Ax: number, Bx: number, Ay: number, By: number): void => {

            let bol: boolean = false;

            if(A&&B){
                if (Ax < Bx && Ay == By) {
                    bol = true;
                    if (B.x == Ax) {
                        bol = false;
                        this.changBlock.forEach((e: PIXI.Graphics) => {
                            this._app.stage.removeChild(e);
                        });
                        this.changBlock = [];
                    }
                    if (bol) {
                        B.x -= 1;
                        A.x += 1;
                    }
    
                } else if (Bx < Ax && Ay == By) {
                    bol = true;
                    if (B.x == Ax) {
                        bol = false;
                        this.changBlock.forEach((e: PIXI.Graphics) => {
                            this._app.stage.removeChild(e);
                        });
                        this.changBlock = [];
    
                    }
                    if (bol) {
                        B.x += 1;
                        A.x -= 1;
                    }
    
                } else if (Ay < By && Ax == Bx) {
                    bol = true;
                    if (B.y == Ay) {
                        bol = false;
                        this.changBlock.forEach((e: PIXI.Graphics) => {
                            this._app.stage.removeChild(e);
                        });
                        this.changBlock = [];
    
                    }
                    if (bol) {
                        B.y -= 1;
                        A.y += 1;
                    }
    
                } else if (By < Ay && Ax == Bx) {
                    bol = true;
                    if (B.y == Ay) {
                        bol = false;
                        this.changBlock.forEach((e: PIXI.Graphics) => {
                            this._app.stage.removeChild(e);
                        });
                        this.changBlock = [];
    
                    }
                    if (bol) {
                        B.y += 1;
                        A.y -= 1;
                    }
                }
    

            }
        }
    }
}
*/ 
///<reference path="./pixi.d.ts"/>
var Controller;
///<reference path="./pixi.d.ts"/>
(function (Controller) {
    class controller {
        constructor(model) {
            this._model = model;
        }
        checkBoard(board) {
            return this._model.checkBlock(board);
        }
        checkNomalBlock(board) {
            return this._model.nomalBlock(board);
        }
        checkSpecialBlock(block, board) {
            return this._model.specialBlock(block, board);
        }
    }
    Controller.controller = controller;
})(Controller || (Controller = {}));
/*
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

            // console.log(positionx, positionY);

            this.emit('checkBoard', board);

            // console.table(transAry);
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
*/
///<reference path="./pixi.d.ts"/>
///<reference path="./view.ts"/>
///<reference path="./controller.ts"/>
///<reference path="./model.ts"/>
document.addEventListener("DOMContentLoaded", () => {
    new Main();
});
class Main {
    constructor() {
        this._model = new Model.model();
        this._controller = new Controller.controller(this._model);
        this._view = new View.view(this._controller, this._model);
    }
}
///<reference path="./pixi.d.ts"/>
///<reference path="Block.ts"/>
var Model;
///<reference path="./pixi.d.ts"/>
///<reference path="Block.ts"/>
(function (Model) {
    class model extends PIXI.utils.EventEmitter {
        constructor() {
            super();
            this._block = new Block.block();
        }
        checkBlock(board) {
            let isRemove = false;
            let minCombo = 3;
            let comboH = 1;
            let comboV = 1;
            let saveVAry = [];
            let pointNum = [];
            let positionx = [];
            let positionY = [];
            //判斷橫向的 把原本的陣列xy互換
            let transAry = [];
            for (let i = 0; i < 8; i++) {
                transAry.push([]);
                for (let j = 0; j < 8; j++) {
                    transAry[i][j] = board[j][i];
                }
            }
            transAry.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value == row[x + 1]) {
                        comboH++;
                        // console.log(positionx);
                        if (comboH >= minCombo) {
                            positionx.push(y);
                            positionY.push(x - 1);
                            pointNum.splice(0, 3, value);
                            isRemove = true;
                        }
                    }
                    else {
                        comboH = 1;
                    }
                });
            });
            //找完之後再轉回去判斷直的
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    board[i][j] = transAry[j][i];
                }
            }
            //刪掉橫向的
            // console.log(positionx, positionY);
            let y = [];
            let x = 0;
            let result = [];
            for (let i = 0; i < positionY.length; i++) {
                for (let j = 0; j < positionx.length + 2; j++) {
                    x = positionx[i];
                    y.push(positionY[i] + j);
                    result = [...(new Set(y))];
                    x = x > 7 ? 7 : x;
                }
                if (result.length == positionx.length + 2) {
                    result.forEach((num) => {
                        num = num > 7 ? 7 : num;
                        this.emit('sentPosition', { x: x, y: num });
                        board[num].splice(x, 1);
                        board[num].unshift(this._block.ranNum());
                    });
                }
            }
            board.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value == row[x + 1]) {
                        comboV++;
                        saveVAry.push(x);
                    }
                    else {
                        if (comboV >= minCombo) {
                            saveVAry.push(x);
                            let result = [...(new Set(saveVAry))];
                            result.forEach((x) => {
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
            this.emit('checkBoard', board);
            this.cul(pointNum);
            return isRemove;
        }
        specialBlock(block, board) {
            let position = block.getBounds();
            let x = 0;
            if (Math.floor((position.x + 2.5) / 87.5) > 3) {
                x = Math.floor((position.x + 2.5) / 87.5) - 1;
            }
            else {
                x = Math.floor((position.x + 2.5) / 87.5);
            }
            for (let i = 0; i < 8; i++) {
                board[x].splice(i, 1);
                board[x].unshift(this._block.ranNum());
                this.emit('sentPosition', { x: i, y: x });
            }
            return board;
        }
        nomalBlock(board) {
            board.forEach((row, y) => {
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
                });
            });
            board.forEach((row, y) => {
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
                });
            });
            board.forEach((row, y) => {
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
                });
            });
            board.forEach((row, y) => {
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
                });
            });
            return board;
        }
        cul(point) {
            if (point.length > 0) {
                let result = [...point].reduce((a, b) => {
                    return (a + b);
                });
                this.emit("sentPoint", result);
            }
        }
        a_checkBlock(board) {
            let isRemove = false;
            let endPoint = 0;
            let going = [];
            let goingPath = [];
            board.forEach((row, y) => {
                row.forEach((value, x) => {
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
                });
                going = [];
                goingPath = [];
                console.log('----------');
            });
            return isRemove;
        }
    }
    Model.model = model;
})(Model || (Model = {}));
///<reference path="Block.ts"/>
var View;
///<reference path="Block.ts"/>
(function (View) {
    class view {
        constructor(controller, model) {
            this._board = [];
            this._blockAry = [];
            this._timer_num = 0;
            this._point_num = 0;
            this._timerHB_num = 0;
            //-----------TEST-----------//
            this.timer_scale = 0;
            this.clearHblock = [];
            this.changBlock = [];
            //------------TIMER------------//
            this.timer = () => {
                // if (this._timeLine.width < 0) {
                //     this._timeLine.width = 0;
                //     this._aim.alpha = 0;
                //     this._gameOverScreen.visible = true;
                //     this.cancelTimer();
                // }
                this._timeLine.width -= 0.2;
            };
            this.clearHB = () => {
                this.clearHblock.forEach((e) => {
                    e.alpha -= 0.015;
                    if (e.alpha <= 0) {
                        this.cancelHB();
                        this.clearHblock.forEach((e) => {
                            this._app.stage.removeChild(e);
                        });
                        this.clearHblock = [];
                    }
                });
            };
            this.move = (A, B, Ax, Bx, Ay, By) => {
                let bol = false;
                if (A && B) {
                    if (Ax < Bx && Ay == By) {
                        bol = true;
                        if (B.x == Ax) {
                            bol = false;
                            this.changBlock.forEach((e) => {
                                this._app.stage.removeChild(e);
                            });
                            this.changBlock = [];
                        }
                        if (bol) {
                            B.x -= 1;
                            A.x += 1;
                        }
                    }
                    else if (Bx < Ax && Ay == By) {
                        bol = true;
                        if (B.x == Ax) {
                            bol = false;
                            this.changBlock.forEach((e) => {
                                this._app.stage.removeChild(e);
                            });
                            this.changBlock = [];
                        }
                        if (bol) {
                            B.x += 1;
                            A.x -= 1;
                        }
                    }
                    else if (Ay < By && Ax == Bx) {
                        bol = true;
                        if (B.y == Ay) {
                            bol = false;
                            this.changBlock.forEach((e) => {
                                this._app.stage.removeChild(e);
                            });
                            this.changBlock = [];
                        }
                        if (bol) {
                            B.y -= 1;
                            A.y += 1;
                        }
                    }
                    else if (By < Ay && Ax == Bx) {
                        bol = true;
                        if (B.y == Ay) {
                            bol = false;
                            this.changBlock.forEach((e) => {
                                this._app.stage.removeChild(e);
                            });
                            this.changBlock = [];
                        }
                        if (bol) {
                            B.y += 1;
                            A.y -= 1;
                        }
                    }
                }
            };
            this._app = new PIXI.Application(905, 1065, { backgroundColor: 0xD1E292 });
            document.body.appendChild(this._app.view);
            this._model = model;
            this._controller = controller;
            this._block = new Block.block();
            this._gameScreen = new PIXI.Container();
            this._app.stage.addChild(this._gameScreen);
            this._gameOverScreen = new PIXI.Container();
            this._app.stage.addChild(this._gameOverScreen);
            this._gameOverScreen.visible = false;
            this.init();
        }
        init() {
            for (let i = 0; i < 64; i++) {
                let gameBoard = new PIXI.Graphics();
                gameBoard.lineStyle(5, 0xC6B575);
                gameBoard.beginFill(0xF9E9AF);
                gameBoard.drawRect(0, 0, 100, 100);
                gameBoard.endFill();
                gameBoard.x = (i % 8) * 100 + 50;
                gameBoard.y = Math.floor(i / 8) * 100 + 155;
                this._gameScreen.addChild(gameBoard);
            }
            let gameOverBG = new PIXI.Graphics();
            gameOverBG.beginFill(0xBC8F8F, 0.8);
            gameOverBG.drawRect(0, 0, 905, 1065);
            gameOverBG.endFill();
            this._gameOverScreen.addChild(gameOverBG);
            let restartBtn = new PIXI.Graphics();
            restartBtn.beginFill(0xffffff);
            restartBtn.drawRoundedRect(0, 0, 300, 100, 5);
            restartBtn.endFill();
            restartBtn.buttonMode = true;
            restartBtn.interactive = true;
            this._gameOverScreen.addChild(restartBtn);
            restartBtn.x = this._app.view.width / 3;
            restartBtn.y = this._app.view.height / 2;
            let restartText = new PIXI.Text('New', { fontSize: 80, fill: 0xBC8F8F });
            restartBtn.addChild(restartText);
            restartBtn.on('click', () => {
                this.restart();
            });
            let point = new PIXI.Graphics();
            point.lineStyle(5, 0xC6B575);
            point.beginFill(0xFBEFC1);
            point.drawRoundedRect(0, 0, 800, 100, 5);
            point.endFill();
            point.x = 50;
            point.y = 25;
            this._gameScreen.addChild(point);
            this._pointText = new PIXI.Text(" 得分： ", { fontSize: 50, fill: 0xC6B575 });
            point.addChild(this._pointText);
            this._pointText.y = 20;
            this._model.on("sentPoint", (point) => {
                this._point_num += point * 10;
                this._pointText.text = ' 得分： ' + this._point_num;
                this._timeLine.width += 0.2;
            });
            let time = new PIXI.Graphics();
            time.lineStyle(5, 0xC6B575);
            time.beginFill(0xFBEFC1);
            time.drawRoundedRect(0, 0, 800, 50, 5);
            time.endFill();
            time.x = 50;
            time.y = 985;
            this._gameScreen.addChild(time);
            this._timeLine = new PIXI.Graphics();
            this._timeLine.lineStyle(5, 0xC6B575);
            this._timeLine.beginFill(0xC6B575);
            this._timeLine.drawRect(0, 0, 800, 50);
            this._timeLine.endFill();
            time.addChild(this._timeLine);
            this._aim = PIXI.Sprite.fromImage('./Image/aim.png');
            this._app.stage.addChild(this._aim);
            this._aim.anchor.set(0.5, 0.5);
            this._aim.scale.set(0.15, 0.15);
            this._aim.alpha = 0;
            /*
            this._model.on('sentPosition', (e: { x: number, y: number }) => {
                let moveBlock: PIXI.Graphics;
                // console.log(e,'e');
                // console.log('??',this._board[e.x][e.y])
                // console.log(this._board[7][7],'77');

                if(this._board[e.x][e.y]==undefined){
                    this.restart();
                }
                moveBlock = (this._block.createBlock(0, 0, 0xffffff, this._board[e.x][e.y].toString()));
                moveBlock.x = e.y * 100 + 102.5;
                moveBlock.y = e.x * 100 + 207.5;
                moveBlock.buttonMode = false;
                moveBlock.interactive = false;
                this.clearHblock.push(moveBlock);
                this.clearHblock.forEach((e: PIXI.Graphics) => {
                    this._app.stage.addChild(e);

                });
                
            })
            
            */
            this._model.on('checkBoard', (board) => {
                // console.log('checkboard      ========')
                this._board = board;
            });
            this.board();
            console.table(this._board);
            this._state = this.upDate;
            // this._app.ticker.add(() => this.gameLoop());
            setInterval(() => this.gameLoop(), 1000);
        }
        //------------LoOoOoOoOoP------------//
        gameLoop() {
            this._state();
        }
        upDate() {
            console.log('???');
            this._board = this._controller.checkNomalBlock(this._board);
            this.clearBard();
            if (this._controller.checkBoard(this._board)) {
            }
            this.aim_ani(this._aim);
            this.clearHB();
        }
        //------------BOARD------------//
        board() {
            for (let j = 0; j < 8; j++) {
                this._board[j] = [];
                for (let i = 0; i < 8; i++) {
                    let num = this._block.ranNum();
                    let newBlock = this._block.createBlock(0, 0, this._block._color[num], num.toString());
                    newBlock.x = j * 100 + 102;
                    newBlock.y = i * 100 + 207;
                    this._board[j][i] = Number(newBlock.name);
                    this._gameScreen.addChild(newBlock);
                    newBlock.on('click', (block) => {
                        this.clickBlock(block.target);
                        this._aim.alpha = 1;
                        this._aim.x = block.target.x - 0.5;
                        this._aim.y = block.target.y;
                    });
                }
            }
            if (this._controller.checkBoard(this._board)) {
                this.clearBard();
            }
        }
        reDrawBoard() {
            this._blockAry = [];
            this._board.forEach((row, i) => {
                row.forEach((value, j) => {
                    let A = this._block.createBlock(0, 0, this._block._color[value], value.toString());
                    A.x = i * 100 + 102;
                    A.y = j * 100 + 207;
                    this._blockAry.push(A);
                });
            });
            this._blockAry.forEach((block) => {
                this._gameScreen.addChild(block);
                block.on('click', (block) => {
                    this.clickBlock(block.target);
                    this._aim.alpha = 1;
                    this._aim.x = block.target.x - 0.5;
                    this._aim.y = block.target.y;
                });
            });
        }
        clickBlock(block) {
            // console.log(block);
            if (block.name == '0') {
                //消掉一整排
                this._board = this._controller.checkSpecialBlock(block, this._board);
                if (this._controller.checkBoard(this._board)) {
                    this.clearBard();
                }
            }
            //從00到77 如果有就跑一次上下左右換
            if (!this._lastBlock) {
                this._aim.alpha = 0;
                this.cancelTimer();
                this._lastBlock = block;
                this._timer_num = setInterval(this.timer, 16);
            }
            else {
                /*

                let positionAX = this._lastBlock.x;
                let positionAY = this._lastBlock.y;
                let positionBX = block.x;
                let positionBY = block.y;
                let typeA = this._lastBlock.name;
                let typeB = block.name;

                if (Math.abs(positionAX - positionBX) == 100 && Math.abs(positionAY - positionBY) == 0 || Math.abs(positionAX - positionBX) == 0 && Math.abs(positionAY - positionBY) == 100) {

                    this.changBlock[0] = this._block.createBlock(0, 0, this._block._color[typeB!], typeB!);
                    this.changBlock[1] = this._block.createBlock(0, 0, this._block._color[typeA!], typeA!);

                    this.changBlock[0].position.set(positionAX, positionAY);
                    this.changBlock[1].position.set(positionBX, positionBY);

                    this.changBlock.forEach((block: PIXI.Graphics) => {
                        block.buttonMode = false;
                        block.interactive = false;
                        this._app.stage.addChild(block);
                    })

                    this.cancelTimer2();

                    if(this.changBlock.length>1){

                        this.timer_scale = setInterval(() => {
                            this.move(this.changBlock[0], this.changBlock[1], positionAX, positionBX, positionAY, positionBY);
                        });
                    }

                }
                */
            }
            this._lastBlock = undefined;
            this._aim.alpha = 0;
            this.clearBard();
        }
        //------------工具人------------//
        restart() {
            this.board();
            this._aim.alpha = 0;
            this._point_num = 0;
            this._timeLine.width = 800;
            this._pointText.text = ' 得分： ';
            this._gameOverScreen.visible = false;
        }
        clearBard() {
            this._blockAry.forEach((e) => {
                this._gameScreen.removeChild(e);
            });
            this.reDrawBoard();
        }
        cancelTimer() {
            clearInterval(this._timer_num);
        }
        cancelTimer2() {
            clearInterval(this.timer_scale);
        }
        cancelHB() {
            clearInterval(this._timerHB_num);
        }
        //------------ANI------------//
        aim_ani(aim) {
            aim.rotation += 0.01;
        }
    }
    View.view = view;
})(View || (View = {}));
//# sourceMappingURL=Main.js.map