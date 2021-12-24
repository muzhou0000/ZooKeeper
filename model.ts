
// ///<reference path="./pixi.d.ts"/>
// ///<reference path="Block.ts"/>


// namespace Model {

//     export class model extends PIXI.utils.EventEmitter {

//         private _block: Block.block;


//         constructor() {
//             super();
//             this._block = new Block.block();
//         }
//         public checkBlock(board: number[][], blockA: { x: number, y: number }, blockB: { x: number, y: number }): boolean {
//             //把可能性都列出來的
//             //上下左右各二

//             let isRemove: boolean = false
//             let pointNum: number[] = [];

//             let position: { x: number, y: number } = { x: 0, y: 0 };

//             if (blockA && blockB) {

//                 if (board[blockA.y][blockA.x + 2]) {
//                     if (board[blockA.y][blockA.x] == board[blockA.y][blockA.x + 1] && board[blockA.y][blockA.x] == board[blockA.y][blockA.x + 2]) {

//                         position = { x: blockA.x, y: blockA.y };
//                         if (position) {
//                             for (let i: number = 0; i < 3; i++) {
//                                 let X: number = position.x + i;
//                                 board[position.y].splice(X, 1);
//                                 this.emit('sentPosition', { x: X, y: position.y });
//                                 board[position.y].unshift(this._block.ranNum());
//                                 pointNum.splice(0, 3, board[blockA.y][blockA.x]);
//                                 isRemove = true;

//                             }
//                         }
//                     }
//                 }
//                 if (board[blockA.y][blockA.x - 2]) {

//                     if (board[blockA.y][blockA.x] == board[blockA.y][blockA.x - 1] && board[blockA.y][blockA.x] == board[blockA.y][blockA.x - 2]) {

//                         position = { x: blockA.x, y: blockA.y };
//                         if (position) {
//                             for (let i: number = 0; i < 3; i++) {
//                                 let X: number = position.x - i;
//                                 board[position.y].splice(X, 1);
//                                 this.emit('sentPosition', { x: X, y: position.y });
//                                 board[position.y].unshift(this._block.ranNum());
//                                 pointNum.splice(0, 3, board[blockA.y][blockA.x]);
//                                 isRemove = true;

//                             }
//                         }
//                     }
//                 }
//                 if (board[blockA.y + 2]) {

//                     if (board[blockA.y][blockA.x] == board[blockA.y + 1][blockA.x] && board[blockA.y][blockA.x] == board[blockA.y + 2][blockA.x]) {
//                         position = { x: blockA.x, y: blockA.y };
//                         if (position) {
//                             for (let i: number = 0; i < 3; i++) {
//                                 let Y: number = position.y + i;
//                                 board[Y].splice(position.x, 1);
//                                 this.emit('sentPosition', { x: position.x, y: Y });
//                                 board[Y].unshift(this._block.ranNum());
//                                 pointNum.splice(0, 3, board[blockA.y][blockA.x]);
//                                 isRemove = true;

//                             }
//                         }
//                     }
//                 }
//                 if (board[blockA.y - 2]) {
//                     if (board[blockA.y][blockA.x] == board[blockA.y - 1][blockA.x] && board[blockA.y][blockA.x] == board[blockA.y - 2][blockA.x]) {

//                         position = { x: blockA.x, y: blockA.y };
//                         if (position) {
//                             for (let i: number = 0; i < 3; i++) {
//                                 let Y: number = position.y - i;
//                                 board[Y].splice(position.x, 1);
//                                 this.emit('sentPosition', { x: position.x, y: Y });
//                                 board[Y].unshift(this._block.ranNum());
//                                 pointNum.splice(0, 3, board[blockA.y][blockA.x]);
//                                 isRemove = true;

//                             }

//                         }
//                     }
//                 }
//                 if (board[blockB.y][blockB.x + 2]) {

//                     if (board[blockB.y][blockB.x] == board[blockB.y][blockB.x + 1] && board[blockB.y][blockB.x] == board[blockB.y][blockB.x + 2]) {
//                         if (position) {
//                             for (let i: number = 0; i < 3; i++) {
//                                 let X: number = position.x + i;
//                                 board[position.y].splice(X, 1);
//                                 this.emit('sentPosition', { x: X, y: position.y });
//                                 board[position.y].unshift(this._block.ranNum());
//                                 pointNum.splice(0, 3, board[blockB.y][blockB.x]);
//                                 isRemove = true;

//                             }

//                         }

//                     }
//                 }
//                 if (board[blockB.y][blockB.x - 2]) {

//                     if (board[blockB.y][blockB.x] == board[blockB.y][blockB.x - 1] && board[blockB.y][blockB.x] == board[blockB.y][blockB.x - 2]) {

//                         position = { x: blockB.x, y: blockB.y };
//                         if (position) {
//                             for (let i: number = 0; i < 3; i++) {
//                                 let X: number = position.x - i;
//                                 board[position.y].splice(X, 1);
//                                 this.emit('sentPosition', { x: X, y: position.y });
//                                 board[position.y].unshift(this._block.ranNum());
//                                 pointNum.splice(0, 3, board[blockB.y][blockB.x]);
//                                 isRemove = true;

//                             }

//                         }
//                     }
//                 }

//                 if (board[blockB.y + 2]) {

//                     if (board[blockB.y][blockB.x] == board[blockB.y + 1][blockB.x] && board[blockB.y][blockB.x] == board[blockB.y + 2][blockB.x]) {
//                         position = { x: blockB.x, y: blockB.y };
//                         if (position) {
//                             for (let i: number = 0; i < 3; i++) {
//                                 let Y: number = position.y + i;
//                                 board[Y].splice(position.x, 1);
//                                 this.emit('sentPosition', { x: position.x, y: Y });
//                                 board[Y].unshift(this._block.ranNum());
//                                 pointNum.splice(0, 3, board[blockB.y][blockB.x]);
//                                 isRemove = true;

//                             }

//                         }

//                     }
//                 }
//                 if (board[blockB.y - 2]) {
//                     if (board[blockB.y][blockB.x] == board[blockB.y - 1][blockB.x] && board[blockB.y][blockB.x] == board[blockB.y - 2][blockB.x]) {
//                         position = { x: blockB.x, y: blockB.y };
//                         if (position) {
//                             for (let i: number = 0; i < 3; i++) {
//                                 let Y: number = position.y - i;
//                                 board[Y].splice(position.x, 1);
//                                 this.emit('sentPosition', { x: position.x, y: Y });
//                                 board[Y].unshift(this._block.ranNum());
//                                 pointNum.splice(0, 3, board[blockB.y][blockB.x]);
//                                 isRemove = true;

//                             }

//                         }
//                     }
//                 }

//                 if (board[blockA.y][blockA.x + 1] && board[blockA.y][blockA.x - 1]) {

//                     if (board[blockA.y][blockA.x] == board[blockA.y][blockA.x + 1] && board[blockA.y][blockA.x] == board[blockA.y][blockA.x - 1]) {
//                         position = { x: blockA.x, y: blockA.y };
//                         if (position) {
//                             for (let i: number = 0; i < 3; i++) {
//                                 let X: number = position.x - 1 + i;
//                                 board[position.y].splice(X, 1);
//                                 this.emit('sentPosition', { x: X, y: position.y });
//                                 board[position.y].unshift(this._block.ranNum());
//                                 pointNum.splice(0, 3, board[blockA.y][blockA.x]);
//                                 isRemove = true;

//                             }
//                         }
//                     }
//                 }
//                 if (board[blockA.y + 1] && board[blockA.y - 1]) {

//                     if (board[blockA.y][blockA.x] == board[blockA.y + 1][blockA.x] && board[blockA.y][blockA.x] == board[blockA.y - 1][blockA.x]) {
//                         position = { x: blockA.x, y: blockA.y };
//                         if (position) {
//                             for (let i: number = 0; i < 3; i++) {
//                                 let Y: number = position.y - 1 + i;
//                                 board[Y].splice(position.x, 1);
//                                 this.emit('sentPosition', { x: position.x, y: Y });
//                                 board[Y].unshift(this._block.ranNum());
//                                 pointNum.splice(0, 3, board[blockA.y][blockA.x]);
//                                 isRemove = true;

//                             }

//                         }
//                     }
//                 }
//                 if (board[blockB.y][blockB.x + 1] && board[blockB.y][blockB.x - 1]) {

//                     if (board[blockB.y][blockB.x] == board[blockB.y][blockB.x + 1] && board[blockB.y][blockB.x] == board[blockB.y][blockB.x - 1]) {
//                         position = { x: blockB.x, y: blockB.y };
//                         if (position) {
//                             for (let i: number = 0; i < 3; i++) {
//                                 let X: number = position.x - 1 + i;
//                                 board[position.y].splice(X, 1);
//                                 this.emit('sentPosition', { x: X, y: position.y });
//                                 board[position.y].unshift(this._block.ranNum());
//                                 pointNum.splice(0, 3, board[blockB.y][blockB.x]);
//                                 isRemove = true;

//                             }

//                         }
//                     }
//                 }
//                 if (board[blockB.y + 1] && board[blockB.y - 1]) {

//                     if (board[blockB.y][blockB.x] == board[blockB.y + 1][blockB.x] && board[blockB.y][blockB.x] == board[blockB.y - 1][blockB.x]) {
//                         position = { x: blockB.x, y: blockB.y };
//                         if (position) {
//                             for (let i: number = 0; i < 3; i++) {
//                                 let Y: number = position.y - 1 + i;
//                                 board[Y].splice(position.x, 1);
//                                 this.emit('sentPosition', { x: position.x, y: Y });
//                                 board[Y].unshift(this._block.ranNum());
//                                 pointNum.splice(0, 3, board[blockB.y][blockB.x]);
//                                 isRemove = true;

//                             }

//                         }
//                     }
//                 }
//             }
//             this.emit('checkBoard', board);

//             this.cul(pointNum);
//             return isRemove;

//         }


//         public b_checkBlock(board: number[][], blockA: { x: number, y: number }, blockB: { x: number, y: number }): boolean {
//             let isRemove: boolean = false

//             let minCombo: number = 3;
//             let comboH: number = 1;
//             let comboV: number = 1;
//             let saveVAry: number[] = [];
//             let pointNum: number[] = [];

//             let positionx: number[] = [];
//             let positionY: number[] = [];

//             //判斷橫向的 把原本的陣列xy互換

//             let transAry: number[][] = [];
//             for (let i: number = 0; i < 8; i++) {
//                 transAry.push([]);
//                 for (let j: number = 0; j < 8; j++) {
//                     transAry[i][j] = board[j][i];
//                 }
//             }


//             transAry.forEach((row: number[], y) => {
//                 row.forEach((value: number, x: number) => {
//                     if (value == row[x + 1]) {
//                         comboH++;
//                         // console.log(positionx);
//                         if (comboH >= minCombo) {
//                             positionx.push(y);
//                             positionY.push(x - 1);
//                             pointNum.splice(0, 3, value);
//                             isRemove = true;
//                         }
//                     } else {
//                         comboH = 1;
//                     }
//                 })
//             })
//             //找完之後再轉回去判斷直的
//             for (let i: number = 0; i < 8; i++) {
//                 for (let j: number = 0; j < 8; j++) {
//                     board[i][j] = transAry[j][i];
//                 }
//             }

//             //刪掉橫向的
//             // console.log(positionx, positionY);
//             let y: number[] = [];
//             let x: number = 0;
//             let result: number[] = [];
//             for (let i: number = 0; i < positionY.length; i++) {
//                 for (let j: number = 0; j < positionx.length + 2; j++) {

//                     x = positionx[i];
//                     y.push(positionY[i] + j);
//                     result = [...(new Set(y))];
//                     x = x > 7 ? 7 : x;

//                 }
//                 if (result.length == positionx.length + 2) {

//                     result.forEach((num: number) => {
//                         num = num > 7 ? 7 : num;
//                         this.emit('sentPosition', { x: x, y: num });
//                         board[num].splice(x, 1);
//                         board[num].unshift(this._block.ranNum());
//                     })

//                 }
//             }

//             board.forEach((row: number[], y) => {
//                 row.forEach((value, x) => {
//                     if (value == row[x + 1]) {
//                         comboV++;
//                         saveVAry.push(x);

//                     } else {
//                         if (comboV >= minCombo) {
//                             saveVAry.push(x)
//                             let result: number[] = [...(new Set(saveVAry))];
//                             result.forEach((x: number) => {
//                                 x = x > 7 ? 7 : x;

//                                 row.splice(x, 1);

//                                 this.emit('sentPosition', { x, y });

//                                 pointNum.splice(0, 3, value);
//                                 isRemove = true;
//                                 row.unshift(this._block.ranNum());

//                             });
//                         }

//                         comboV = 1;
//                         saveVAry = [];
//                     }

//                 });
//             });

//             // console.log(positionx, positionY);


//             this.emit('checkBoard', board);

//             console.table(transAry);
//             this.cul(pointNum);
//             return isRemove;
//         }

//         public specialBlock(block: PIXI.Graphics, board: number[][]): number[][] {

//             let position = block.getBounds();
//             let x: number = 0;

//             if (Math.floor((position.x + 2.5) / 87.5) > 3) {
//                 x = Math.floor((position.x + 2.5) / 87.5) - 1;
//             } else {
//                 x = Math.floor((position.x + 2.5) / 87.5);
//             }
//             for (let i: number = 0; i < 8; i++) {


//                 board[x].splice(i, 1);
//                 board[x].unshift(this._block.ranNum());
//                 this.emit('sentPosition', { x: i, y: x });

//             }
//             return board;
//         }


//         public nomalBlock(last: PIXI.Graphics, block: PIXI.Graphics, board: number[][]): number[][] {

//             let positionA = last.getBounds();
//             let positionB = block.getBounds();

//             //把每個方塊的位置都換算到棋盤上面
//             if (Math.abs(positionA.x - positionB.x) == 100 && Math.abs(positionA.y - positionB.y) == 0 || Math.abs(positionA.x - positionB.x) == 0 && Math.abs(positionA.y - positionB.y) == 100) {

//                 let typeA = last.name;
//                 let typeB = block.name;

//                 Math.floor((positionA.x + 2.5) / 87) > 3 ? board[Math.floor((positionA.x + 2.5) / 87) - 1][Math.floor((positionA.y - 100) / 100)] = Number(typeB) : board[Math.floor((positionA.x + 2.5) / 87)][Math.floor((positionA.y - 100) / 100)] = Number(typeB);
//                 Math.floor((positionB.x + 2.5) / 87) > 3 ? board[Math.floor((positionB.x + 2.5) / 87) - 1][Math.floor((positionB.y - 100) / 100)] = Number(typeA) : board[Math.floor((positionB.x + 2.5) / 87)][Math.floor((positionB.y - 100) / 100)] = Number(typeA);


//                 let blockA: { x: number, y: number } = { x: 0, y: 0 };
//                 let blockB: { x: number, y: number } = { x: 0, y: 0 };

//                 if (Math.floor((positionA.x + 2.5) / 87) > 3) {
//                     blockA.y = Math.floor((positionA.x + 2.5) / 87) - 1;
//                     blockA.x = Math.floor((positionA.y - 100) / 100);
//                 } else {
//                     blockA.y = Math.floor((positionA.x + 2.5) / 87);
//                     blockA.x = Math.floor((positionA.y - 100) / 100);
//                 }

//                 if (Math.floor((positionB.x + 2.5) / 87) > 3) {
//                     blockB.y = Math.floor((positionB.x + 2.5) / 87) - 1;
//                     blockB.x = Math.floor((positionA.y - 100) / 100);

//                 } else {
//                     blockB.y = Math.floor((positionB.x + 2.5) / 87);
//                     blockB.x = Math.floor((positionA.y - 100) / 100);


//                 }


//                 Math.floor((positionA.x + 2.5) / 87) > 3 ? board[Math.floor((positionA.x + 2.5) / 87) - 1][Math.floor((positionA.y - 100) / 100)] = Number(typeB) : board[Math.floor((positionA.x + 2.5) / 87)][Math.floor((positionA.y - 100) / 100)] = Number(typeB);
//                 Math.floor((positionB.x + 2.5) / 87) > 3 ? board[Math.floor((positionB.x + 2.5) / 87) - 1][Math.floor((positionB.y - 100) / 100)] = Number(typeA) : board[Math.floor((positionB.x + 2.5) / 87)][Math.floor((positionB.y - 100) / 100)] = Number(typeA);

//                 //如果沒有可以消掉的就把名字換回來
//                 if (!this.checkBlock(board, blockA, blockB)) {

//                     Math.floor((positionA.x + 2.5) / 87) > 3 ? board[Math.floor((positionA.x + 2.5) / 87) - 1][Math.floor((positionA.y - 100) / 100)] = Number(typeA) : board[Math.floor((positionA.x + 2.5) / 87)][Math.floor((positionA.y - 100) / 100)] = Number(typeA);
//                     Math.floor((positionB.x + 2.5) / 87) > 3 ? board[Math.floor((positionB.x + 2.5) / 87) - 1][Math.floor((positionB.y - 100) / 100)] = Number(typeB) : board[Math.floor((positionB.x + 2.5) / 87)][Math.floor((positionB.y - 100) / 100)] = Number(typeB);
//                 }

//             }

//             return board;
//         }

//         public cul(point: number[]): void {

//             if (point.length > 0) {
//                 let result = [...point].reduce((a: number, b: number) => {
//                     return (a + b);
//                 })
//                 this.emit("sentPoint", result);
//             }
//         }
//     }
// }
