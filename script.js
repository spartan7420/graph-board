window.addEventListener('load', ()=> {
    document.getElementById('overlay-spinner').classList.remove('overlay-spinner');
    const canvas = new fabric.Canvas(document.querySelector('canvas'), {
        isDrawingMode: true
    });
    var cWidth = window.innerWidth;
    var cHeight = 3000;
    var penColor;
    var started = false;
    var mode = undefined;
    var lastStep = undefined;
    var visible = false;


    //Canvas Settings
    canvas.setDimensions({width:cWidth, height:cHeight});
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.width = 4;
    canvas.freeDrawingBrush.color = 'black';
    canvas.allowTouchScrolling = 'true';
    mode = 'draw';


    //Sets color of pen
    function setColor(event) {
        mode = 'draw';
        canvas.isDrawingMode = true;
        canvas.freeDrawingBrush.color = event.target.value;
        togglePallete();
    }

    //Clear Handler
    function clearCanvas() {
        obj = canvas.getObjects();
        var check = confirm('Do you want to clear the board?');
        if(check) {
            var objClear = canvas.getObjects();
            objClear.forEach((obj) => {
                canvas.remove(obj);
            })
        }
    }

    document.getElementById('title').addEventListener('click', () => {
        var check = confirm('Do you want to clear the board?');
        if(!check) {
            return;
        }
    });

    // window.onbeforeunload = function() {
    //     return "you can not refresh the page";
    // }

    //Shows color pallete
    document.getElementById('draw').addEventListener('click', togglePallete);

    //Clears canvas when "Clear" button is clicked
    document.getElementById('clear').addEventListener('click', clearCanvas);


    //Undo Handler
    document.getElementById('undo').addEventListener('click', () => { 
        canvas.undo();
    });


    //Redo Handler
    document.getElementById('redo').addEventListener('click', () => {    
        canvas.redo();
    }); 

    document.addEventListener('keyup', ({ keyCode, ctrlKey } = event) => {
        // Check Ctrl key is pressed.
        if (!ctrlKey) {
            return;
        }

        // Check pressed button is Z - Ctrl+Z.
        if (keyCode === 90) {
            canvas.undo();
        }

        // Check pressed button is Y - Ctrl+Y.
        if (keyCode === 89) {
            canvas.redo();
        }
    });

    document.getElementById('erase').addEventListener('click', () => {    
        mode = 'erase';
        canvas.hoverCursor = 'pointer';
        canvas.isDrawingMode = false;
    }); 

    document.getElementById('select').addEventListener('click', () => {    
        mode = 'select';
        canvas.isDrawingMode = false;
    }); 

    canvas.on('mouse:up', function(e) {
        if(mode === 'erase') {
            canvas.remove(e.target);
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

    // var sizes = document.getElementsByClassName("size");

    // var setSize = (e) => {
    //     canvas.freeDrawingBrush.width = e.target.getAttribute('data-value');   
    // };

    // for (var i = 0; i < sizes.length; i++) {
    //     sizes[i].addEventListener('click', setSize);
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
});


