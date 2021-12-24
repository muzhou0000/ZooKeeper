
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
        private clearHblock: PIXI.Graphics[] = [];



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



            //傳進來變白色
            /*
            this._model.on('sentPosition', (e: { x: number, y: number }) => {
                let moveBlock: PIXI.Graphics;

                if (this._board[e.x][e.y] == undefined) {
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



            this._model.on('checkBoard', (board: number[][]) => {
                this._board = board;
            })

            this.board();
            console.table(this._board);

            this._state = this.upDate;
            // this._app.ticker.add(() => this.gameLoop());
            setInterval(() => this.gameLoop(), 1000);

        }

        //------------LoOoOoOoOoP------------//

        private gameLoop(): void {
            this._state();

        }
        private upDate(): void {

            this._board = this._controller.checkNomalBlock(this._board);
            this.clearBard();

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
                        this.clickBlock();
                        this._aim.alpha = 1;
                        this._aim.x = block.target.x - 0.5;
                        this._aim.y = block.target.y;
                    })
                }
            }
            // if (this._controller.checkBoard(this._board)) {
            this.clearBard();
            // }

        }

        private reDrawBoard(): void {
            this._blockAry = [];

            this._board.forEach((row: number[], i: number) => {

                row.forEach((value: number, j: number) => {
                    let A: PIXI.Graphics = this._block.createBlock(0, 0, this._block._color[value], value.toString());
                    A.x = i * 100 + 102;
                    A.y = j * 100 + 207;
                    this._blockAry.push(A);
                });
            });

            this._blockAry.forEach((block: PIXI.Graphics) => {
                this._gameScreen.addChild(block);

                block.on('click', (block: any) => {
                    this.clickBlock();
                    this._aim.alpha = 1;
                    this._aim.x = block.target.x - 0.5;
                    this._aim.y = block.target.y;

                });
            })

        }


        public clickBlock(): void {

            if (!this._lastBlock) {
                this.cancelTimer();
                this._timer_num = setInterval(this.timer, 16);
            }

            this._board = this._controller.checkNomalBlock(this._board);
            this.clearBard();

            this._lastBlock = undefined;
            this._aim.alpha = 0;
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
        private cancelHB(): void {
            clearInterval(this._timerHB_num);
        }

        //------------ANI------------//

        private aim_ani(aim: PIXI.Sprite): void {
            aim.rotation += 0.01;

        }
        //變白的
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



    }
}
