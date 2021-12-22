///<reference path="./pixi.d.ts"/>


namespace Controller {
    export class controller {
        
        private _model: Model.model;


        constructor(model: Model.model) {
            this._model = model;
            
        }

        public checkBoard(board:number[][]):boolean{
            return this._model.checkBlock(board);

        }
        // public checkNomalBlock(last:PIXI.Graphics,block:PIXI.Graphics,board:number[][]):number[][]{
        //     return this._model.nomalBlock(last,block,board);

        // }
        public checkNomalBlock(board:number[][]):number[][]{
            return this._model.nomalBlock(board);

        }
        public checkSpecialBlock(block:PIXI.Graphics,board:number[][]):number[][]{
            return this._model.specialBlock(block, board);


        }


    }
}