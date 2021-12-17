///<reference path="./pixi.d.ts"/>
///<reference path="./view.ts"/>
///<reference path="./controller.ts"/>
///<reference path="./model.ts"/>


document.addEventListener("DOMContentLoaded",()=>{
    new Main();
})
class Main{
    private _view:View.view;
    private _model:Model.model;
    private _controller:Controller.controller;
    
    constructor(){
        
        this._model=new Model.model();
        this._controller=new Controller.controller(this._model);
        this._view=new View.view(this._controller,this._model);

    }
}