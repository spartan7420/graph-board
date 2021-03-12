window.addEventListener('load', ()=> {
    window.jsPDF = window.jspdf.jsPDF;


    //Initialize canvas
    document.getElementById('overlay-spinner').remove();
    const canvas = new fabric.Canvas(document.querySelector('canvas'), {
        isDrawingMode: true,
        enableRetinaScaling: true
    });
    const cWidth = window.innerWidth;
    const cHeight = 3000;
    var mode = undefined;
    var visible = false;
    var grid = true;

    //Canvas Settings
    canvas.setDimensions({ width: cWidth, height: cHeight });
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.width = 4;
    canvas.freeDrawingBrush.color = 'black';
    canvas.allowTouchScrolling = 'true';
    mode = 'draw';
    canvas.setBackgroundColor({
        source: 'grid.jpg'
    }, canvas.renderAll.bind(canvas));


    window.addEventListener('resize', resize);
    function resize() {
        canvas.setDimensions({ width: window.innerWidth, height: cHeight });
    }


    //Toggle canvas grid pattern
    const gridBtn = document.getElementById('grid');

    gridBtn.addEventListener('change', (e) => {
        if (e.target.checked) {
            canvas.setBackgroundColor({
                source: 'grid.jpg'
            }, canvas.renderAll.bind(canvas));  
        }
        else {
            canvas.setBackgroundColor('rgb(255, 255, 255)' , canvas.renderAll.bind(canvas));   
        }
    });



    //Save canvas as image
    function dataURLtoBlob(dataurl) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type:mime});
    }

    const saveMenu = document.getElementById('save');
    const saveOptions = document.getElementById('options');
    const saveAsImg = document.getElementById('save-img');
    const saveAsPdf = document.getElementById('save-pdf');

    saveMenu.addEventListener('click', () => {
        saveOptions.classList.toggle('active-options');
    }); 

    saveAsImg.addEventListener('click', () => {
        downloadAsImage();
    });

    saveAsPdf.addEventListener('click', () => {
        downloadAsPdf();
    });

    const downloadAsImage =  () => {
        var link = document.createElement("a");
        var imgData = canvas.toDataURL({ 
            format: 'jpeg',
            multiplier: 4
        });
        var strDataURI = imgData.substr(22, imgData.length);
        var blob = dataURLtoBlob(imgData);
        var objurl = URL.createObjectURL(blob);
        link.download = "mywork.jpg";
        link.href = objurl;
        link.click();
    } 

    const downloadAsPdf = () => {
        var imgData = canvas.toDataURL("image/jpeg", 1.0);
        var pdf = new jsPDF();
        var width = pdf.internal.pageSize.getWidth();
        var height = pdf.internal.pageSize.getHeight();
        pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
        pdf.save("mywork.pdf");
    }



    //Sets color of pen
    function setColor(event) {
        mode = 'draw';
        canvas.isDrawingMode = true;
        canvas.freeDrawingBrush.color = event.target.value;
        togglePallete();
    }
    const penColors = document.querySelectorAll('.color');
    penColors.forEach(color => {
        color.addEventListener('click', (e) => {
            setColor(e);
        });
    });

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

    //Prevent unwanted reload
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



});


