var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var penColor = undefined;
var mode = undefined;
var radius = 2;
var canvasX = canvas.width;
var canvasY = canvas.height;
var points = [];
var point;

canvas.height = 4000;
canvas.width = 1200;

function drawLine(e) {
    var rect = canvas.getBoundingClientRect();
    var mouse = {
        x: e.clientX - rect.left, 
        y: e.clientY - rect.top
    };

    if(mode === 'draw') {
        ctx.lineWidth = radius * 2;
        ctx.lineCap = 'round';
        ctx.strokeStyle = penColor;
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = penColor;
        ctx.fill();
        ctx.beginPath()
        ctx.moveTo(mouse.x, mouse.y);
    }
    else if(mode === 'erase') {
        ctx.clearRect(mouse.x - 20, mouse.y - 20, 60, 60);
    }
}


function engage(e) {
    if(mode == 'earserSelect') {
        mode = 'erase';
    }    
    else {
        mode = 'draw';
    }
    drawLine(e);
}

function disengage() {
    if(mode === 'erase') {
        mode = 'earserSelect';
    }
    else {
        mode = 'stop';
    }
    ctx.beginPath();
}

function newPath() {
    ctx.beginPath();
}


canvas.addEventListener('mousedown', engage);
canvas.addEventListener('mousemove', drawLine);
document.addEventListener('mouseup', disengage);
canvas.addEventListener('mouseout', newPath);


document.getElementById('clearCanvas').onclick = function () {
    var check = confirm('Do you want to clear the board?');
    if(check) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

document.getElementById('eraser').onclick =  function () {
    mode = 'earserSelect';
};



function setColor(event) {
    penColor = event.target.value;
    mode = undefined;
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
