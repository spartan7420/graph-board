var canvas = new fabric.Canvas('canvas');
var cWidth = window.innerWidth;
var cHeight = 3000;
var penColor;
var started = false;
var mode = undefined;
var obj = [];
var lastStep = undefined;
var visible = false;



//Canvas Settings
canvas.setDimensions({width:cWidth, height:cHeight});
canvas.isDrawingMode = true;
canvas.freeDrawingBrush.width = 5;
canvas.freeDrawingBrush.color = 'black';
canvas.allowTouchScrolling = 'true';
mode = 'draw';


//Sets color of pen
function setColor(event) {
    mode = 'draw';
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.color = event.target.value;
}

// canvas.on('object:added', (e) => {
//     if(obj.length >= 50) {
//         obj = obj.slice(20, obj.length);
//         obj.push(e.target);
//         return;
//     }
//     else {
//         obj.push(e.target);
//     }
//     console.log("Added => ", obj);
// });

// canvas.on('object:removed', (e) => {
//     if(obj.length >= 50) {
//         obj = obj.slice(20, obj.length);
//         obj.push(e.target);
//         return;
//     }
//     else {
//         obj.push(e.target);
//     }
//     console.log("Removed => ", e.target);
//     console.log("Undostack => ", obj);
// });


//Clear Handler
function clearCanvas() {
    obj = canvas.getObjects();
    var check = confirm('Do you want to clear the board?');
    if(check) {
        var objClear = canvas.getObjects();
        objClear.forEach((obj) => {
            canvas.remove(obj);
        })
        obj.push('clear');
        console.log(obj);
    }
}

//Shows color pallete
document.getElementById('draw').addEventListener('click', togglePallete);

//Clears canvas when "Clear" button is clicked
document.getElementById('clear').addEventListener('click', clearCanvas);

var redo= [];

//Undo Handler
document.getElementById('undo').addEventListener('click', () => { 
    mode = 'undo';
    if(obj[obj.length - 1] === 'clear') {
        obj.pop();
        obj.forEach((obj) => {
            canvas.add(obj);
        })
        obj = [];
        redo.push('clear');
        console.log('afterClear-undo', obj);
        return;
    }
    obj = canvas.getObjects();

    if(obj.length !== 0) {
        redo.push(obj[obj.length - 1]);
        canvas.remove(obj[obj.length - 1]);
        obj.pop();
    }
});


//Redo Handler
document.getElementById('redo').addEventListener('click', () => {    
    mode = 'redo';
    console.log('Redo Stack = ', obj);
    try {
        if(redo.length !== 0) {
            if(redo.length >= 50) {
                redo.slice(10, redo.length);
            }
            if(redo[redo.length - 1] === 'clear') {
                clearCanvas();
                redo.pop();
                return;
            }
            else {
                canvas.add(redo[redo.length - 1]);
                redo.pop();
            }
        }
        else {
            return;
        }
    }
    catch {
        return;
    }
}); 

document.getElementById('erase').addEventListener('click', () => {    
    mode = 'erase';
    canvas.isDrawingMode = false;
    console.log('erase-clicked');
}); 

document.getElementById('select').addEventListener('click', () => {    
    mode = 'select';
    canvas.isDrawingMode = false;
}); 

canvas.on('mouse:up', function(e) {
    if(mode === 'erase') {
        redo.push(e.target);
        canvas.remove(e.target);
        console.log('Undo Stack = ', obj);
    }
});

canvas.on('mouse:down', () => {
    if(visible) {
        document.getElementById('colorpallete').classList.remove('show');
        visible = false;
    }
});

//Color Pallete Toggle
function togglePallete() {
    mode = 'draw';
    canvas.isDrawingMode = true;
    visible = true;
    document.getElementById('colorpallete').classList.toggle('show');
};


// window.onbeforeunload = function() {
//     return "you can not refresh the page";
// }



//Brush Color Event-Listeners
document.getElementById('red').onclick = setColor;
document.getElementById('blue').onclick = setColor;
document.getElementById('purple').onclick = setColor;
document.getElementById('yellow').onclick = setColor;
document.getElementById('green').onclick = setColor;
document.getElementById('brown').onclick = setColor;
document.getElementById('black').onclick = setColor;
document.getElementById('aqua').onclick = setColor;
document.getElementById('orange').onclick = setColor;


