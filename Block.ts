
namespace Block {
    export class block extends PIXI.utils.EventEmitter {

        public _color: any = [
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

        private randomNum: number = 0;

        constructor() {super(); }

        public ranNum(): number {

            this.randomNum=Math.floor(Math.random() * 64)>1?this.randomNum = Math.floor(Math.random() * 7) + 1:0;

            // this.randomNum = Math.floor(Math.random() * 7) + 1;
            return this.randomNum;

        }

        // public createBlock(x: number, y: number, color: any): PIXI.Graphics {
        public createBlock(x: number, y: number, color: any, id: string): PIXI.Graphics {

            let block: PIXI.Graphics = new PIXI.Graphics;
            block.lineStyle(5, 0xffffff);
            block.beginFill(color);
            block.drawRoundedRect(x, y, 100, 100, 5);
            block.endFill();
            block.name = id;

            block.buttonMode=true;
            block.interactive=true;
            block.pivot.set(block.width/2,block.height/2);

            
            return block;
        }


    }
}