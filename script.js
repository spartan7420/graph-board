var canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = 1500;
var ctx = canvas.getContext('2d');
var penColor = undefined;
ctx.lineWidth = 5;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
var started = false;
var mode = undefined;
var status = undefined;   //For color-pallete's display

// create an in-memory canvas
var memCanvas = document.createElement('canvas');
memCanvas.width = canvas.width;
memCanvas.height = canvas.height;
var memCtx = memCanvas.getContext('2d');
var points = [];

//Adding event listeners
canvas.addEventListener('mousedown', mouseDown, false);
canvas.addEventListener('mousemove', mouseMove, false);
canvas.addEventListener('mouseup', mouseUp, false);
document.addEventListener('mouseup', mouseUp);
canvas.addEventListener('mouseout', mouseUp);
document.getElementById('colorchoice').addEventListener('click', showPallete);
canvas.addEventListener('mousedown', hidePallete);


document.getElementById('clearCanvas').onclick = () => {     //Clear Canvas
    var check = confirm('Do you want to clear the board?');
    if(check) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        memCtx.clearRect(0, 0, memCanvas.width, memCanvas.height);
    }
}


document.getElementById('eraser').onclick =  () => {        //Eraser
    mode = 'erase';
    drawPoints(ctx, points, e);
};

function showPallete() {    
    document.getElementById('colorpallete').classList.toggle('show');
};

function hidePallete() {    
    document.getElementById('colorpallete').classList.remove('show');
};


// window.onbeforeunload = function() {
//     return "you can not refresh the page";
// }

function setColor(event) {
    penColor = event.target.value;
    mode = 'draw';
}
    
function mouseDown(e) {
    var m = getMouse(e, canvas);
    points.push({
        x: m.x,
        y: m.y
    });
    started = true;
    drawPoints(ctx, points, e);
};


function mouseMove(e) { 
    if (started) {
        ctx.clearRect(0, 0, 1200, 4000);
        // put back the saved content
        ctx.drawImage(memCanvas, 0, 0);
        var m = getMouse(e, canvas);
        points.push({
            x: m.x,
            y: m.y
        });
        drawPoints(ctx, points, e);
    }
};

function mouseUp(e) { 
    if (started) {
        started = false;
        // When the pen is done, save the resulting context
        // to the in-memory canvas
        memCtx.clearRect(0, 0, memCanvas.width, memCanvas.height);
        memCtx.drawImage(canvas, 0, 0);
        points = [];
    }
};

// clear both canvases!
function clear() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    memCtx.clearRect(0, 0, memCanvas.width, memCanvas.height);
};


function drawPoints(ctx, points, e) {
    if(mode === 'draw') {
        ctx.strokeStyle = penColor;
        ctx.moveTo(Math.floor(points[0].x), Math.floor(points[0].y));
        ctx.lineTo(Math.floor(points[0].x), Math.floor(points[0].y));
        // draw a bunch of quadratics, using the average of two points as the control point
        for (i = 1; i < points.length - 2; i++) {
            var c = Math.floor((points[i].x + points[i + 1].x) / 2),
                d = Math.floor((points[i].y + points[i + 1].y) / 2);
            ctx.quadraticCurveTo(Math.floor(points[i].x), Math.floor(points[i].y), c, d);
        }
        ctx.stroke();
        ctx.beginPath();
    }
    else if(mode === 'erase') {
        var p = getMouse(e, canvas);
        ctx.clearRect(p.x - 20, p.y - 20, 60, 60);
        memCtx.clearRect(p.x - 20, p.y - 20, 60, 60);
    }
}


// Creates an object with x and y defined,
// set to the mouse position relative to the state's canvas
// If you wanna be super-correct this can be tricky,
// we have to worry about padding and borders
// takes an event and a reference to the canvas
function getMouse(e, canvas) {
  var element = canvas, offsetX = 0, offsetY = 0, mx, my;

  // Compute the total offset. It's possible to cache this if you want
  if (element.offsetParent !== undefined) {
    do {
      offsetX += element.offsetLeft;
      offsetY += element.offsetTop;
    } while ((element = element.offsetParent));
  }

  mx = e.pageX - offsetX;
  my = e.pageY - offsetY;

  // We return a simple javascript object with x and y defined
  return {x: mx, y: my};
}


document.getElementById('red').onclick = setColor;
document.getElementById('blue').onclick = setColor;
document.getElementById('purple').onclick = setColor;
document.getElementById('yellow').onclick = setColor;
document.getElementById('green').onclick = setColor;
document.getElementById('brown').onclick = setColor;
document.getElementById('black').onclick = setColor;
document.getElementById('aqua').onclick = setColor;
document.getElementById('orange').onclick = setColor;
