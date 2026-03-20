// Initialize canvas like Canva's editor with improved cursors and offsets
var canvas = new fabric.Canvas('canvas', {
    selection: true,
    defaultCursor: 'crosshair', // Better selection cursor
    hoverCursor: 'pointer', // Better hover cursor
    cursorOffset: { x: 0, y: 0 } // Adjust cursor offset for better text editing
});

// Function to add text (now multi-line by default for better alignment)
function addText() {
    var text = new fabric.IText('Edit this text\n(Press Enter for new line)', { 
        left: 100, 
        top: 100, 
        fontSize: 20, 
        fontFamily: 'Arial',
        width: 200 // Set width for multi-line wrapping
    });
    canvas.add(text);
}

// Function to add rectangle shape (no fill, black outline)
function addRectangle() {
    var rect = new fabric.Rect({ 
        left: 100, 
        top: 100, 
        width: 100, 
        height: 100, 
        fill: 'transparent', 
        stroke: 'black', 
        strokeWidth: 2 
    });
    canvas.add(rect);
}

// Function to add circle shape (no fill, black outline)
function addCircle() {
    var circle = new fabric.Circle({ 
        left: 100, 
        top: 100, 
        radius: 50, 
        fill: 'transparent', 
        stroke: 'black', 
        strokeWidth: 2 
    });
    canvas.add(circle);
}

// Function to add triangle shape (no fill, black outline)
function addTriangle() {
    var triangle = new fabric.Triangle({ 
        left: 100, 
        top: 100, 
        width: 100, 
        height: 100, 
        fill: 'transparent', 
        stroke: 'black', 
        strokeWidth: 2 
    });
    canvas.add(triangle);
}

// Function to change font (for selected text)
function changeFont() {
    var activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'i-text') {
        activeObject.set('fontFamily', document.getElementById('fontSelect').value);
        canvas.renderAll();
    } else {
        alert('Select a text object first!');
    }
}

// Function to change font size (for selected text)
function changeFontSize() {
    var activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'i-text') {
        activeObject.set('fontSize', document.getElementById('fontSizeSlider').value);
        canvas.renderAll();
    } else {
        alert('Select a text object first!');
    }
}

// Function to toggle bold (for selected text)
function toggleBold() {
    var activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'i-text') {
        activeObject.set('fontWeight', activeObject.fontWeight === 'bold' ? 'normal' : 'bold');
        canvas.renderAll();
    } else {
        alert('Select a text object first!');
    }
}

// Function to toggle italic (for selected text)
function toggleItalic() {
    var activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'i-text') {
        activeObject.set('fontStyle', activeObject.fontStyle === 'italic' ? 'normal' : 'italic');
        canvas.renderAll();
    } else {
        alert('Select a text object first!');
    }
}

// Function to toggle underline (for selected text)
function toggleUnderline() {
    var activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'i-text') {
        activeObject.set('underline', !activeObject.underline);
        canvas.renderAll();
    } else {
        alert('Select a text object first!');
    }
}

// Function to align text (for selected text - works best with multi-line)
function alignText(alignment) {
    var activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'i-text') {
        activeObject.set('textAlign', alignment);
        canvas.renderAll();
        alert('Alignment set to ' + alignment + '. For best results, use multi-line text.');
    } else {
        alert('Select a text object first!');
    }
}

// Function to change text color (for selected text)
function changeTextColor() {
    var activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'i-text') {
        activeObject.set('fill', document.getElementById('textColorPicker').value);
        canvas.renderAll();
    } else {
        alert('Select a text object first!');
    }
}

// Function to change shape outline color (for selected shape)
function changeShapeColor() {
    var activeObject = canvas.getActiveObject();
    if (activeObject && (activeObject.type === 'rect' || activeObject.type === 'circle' || activeObject.type === 'triangle')) {
        activeObject.set('stroke', document.getElementById('shapeColorPicker').value);
        canvas.renderAll();
    } else {
        alert('Select a shape first!');
    }
}

// Function to change shape fill color (for selected shape)
function changeShapeFillColor() {
    var activeObject = canvas.getActiveObject();
    if (activeObject && (activeObject.type === 'rect' || activeObject.type === 'circle' || activeObject.type === 'triangle')) {
        activeObject.set('fill', document.getElementById('shapeFillColorPicker').value);
        canvas.renderAll();
    } else {
        alert('Select a shape first!');
    }
}

// Function to set canvas size
function setCanvasSize(width, height) {
    canvas.setWidth(width);
    canvas.setHeight(height);
    canvas.renderAll();
}

// Function to set custom canvas size
function setCustomCanvasSize() {
    var width = parseInt(document.getElementById('customWidth').value);
    var height = parseInt(document.getElementById('customHeight').value);
    if (width && height) {
        setCanvasSize(width, height);
    } else {
        alert('Enter valid width and height!');
    }
}

// Function to add image (upload from file)
function addImage() {
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = function(e) {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onload = function(f) {
            var img = new Image();
            img.onload = function() {
                var fabricImg = new fabric.Image(img);
                canvas.add(fabricImg);
            };
            img.src = f.target.result;
        };
        reader.readAsDataURL(file);
    };
    input.click();
}

// Function to delete selected object
function deleteSelected() {
    var activeObject = canvas.getActiveObject();
    if (activeObject) {
        canvas.remove(activeObject);
        canvas.renderAll();
    } else {
        alert('Select an object (text, shape, or image) to delete!');
    }
}

// Function to save as PNG
function saveAsPNG() {
    var link = document.createElement('a');
    link.download = 'design.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}

// Function to save as JPG
function saveAsJPG() {
    var link = document.createElement('a');
    link.download = 'design.jpg';
    link.href = canvas.toDataURL('image/jpeg', 0.9); // 0.9 quality for JPG
    link.click();
}

// Function to save design (using localStorage - no server needed)
function saveDesign() {
    var designData = JSON.stringify(canvas.toJSON());
    localStorage.setItem('designMateDesign', designData);
    alert('Design saved locally! (Use Load Saved Design to retrieve it.)');
}

// Function to load saved design (from localStorage)
function loadDesign() {
    var savedData = localStorage.getItem('designMateDesign');
    if (savedData) {
        canvas.loadFromJSON(savedData, canvas.renderAll.bind(canvas));
        alert('Design loaded!');
    } else {
        alert('No saved design found.');
    }
}