var file = {
    "grid": {
        "width": 0,
        "height": 0
    },
    "operations": {},
    "rows": []
}

function give_svg(color) {
    "use strict";
    return 'cursor: url(\'data:image/svg+xml;utf8,'
    + '<svg xmlns=\"http://www.w3.org/2000/svg" width="48" viewBox="0 0 48 48" height="48" fill="%23FF0000">'
        + '<g>'
            + '<path d="M12.969 37.238s1.472.068 1.97.412c.496.343.952 1.02.952 1.02L30.877 15.43l6.915-12.766C37.365.623 36.04.415 34.423.89L25.9 13.497z" '
            + 'fill="' + color + '" stroke-width=".03103"/>'
            + '<path d="M15.427 41.06c-1.135 3.718-3.05 4.639-6.212 5.514 0 0 1.167-1.171 1.371-2.302.204-1.131-1.248-2.017-.724-3.972.525-1.956 '
            + '1.844-2.438 2.898-2.352 1.953.16 2.993.846 2.667 3.112z" fill="' + color + '" stroke-width=".0313403"/>'
        + '</g>'
    + '</svg>\') 30 30, auto;';
}

function closeDialog(element) {
    "use strict";
    element.closest('.dialog').classList.add('hidden');
    document.getElementsByTagName('body')[0].classList.remove('mask');
}

function chooseGrid() {
    "use strict";
    document.getElementsByTagName('body')[0].classList.add('mask');
    var dialog = document.getElementById('create-grid-dialog');
    dialog.classList.remove('hidden');
    if (!document.getElementById('grid'))
        return;
    document.getElementById('create-warning').classList.remove('hidden');
}

function createGrid() {
    "use strict";
    document.getElementsByTagName('body')[0].classList.remove('mask');
    var dialog = document.getElementById('create-grid-dialog');
    dialog.classList.add('hidden');
    dialog.classList.remove('create');
    var x = parseInt(document.getElementById('nb-lines').value);
    var y = parseInt(document.getElementById('nb-columns').value);
    newGrid(x, y);
}

function isTooDark(hslString) {
    "use strict";
    if (!hslString)
        return false;
    var luminosity = parseInt(hslString.substring(
        hslString.lastIndexOf(',') + 1,
        hslString.lastIndexOf('%')
    ));
    if (luminosity < 50)
        return true;
    return false;
}

function newGrid(x, y) {
    "use strict";
    file["grid"]["width"]  = x;
    file["grid"]["height"] = y;
    if (document.getElementById('grid')) {
        var grid = document.getElementById('grid');
        grid.parentNode.removeChild(grid);
    }
    var table = document.createElement('table');
    table.id  = 'grid';
    for (var i = 1; i < y + 1; i++) {
        var tr = document.createElement('tr');
        for (var j = 1; j < x + 1; j++) {
            var td = document.createElement('td');
            td.id = 'row-' + i + '-col-' + j;
            td.setAttribute('data-row', i);
            td.setAttribute('data-col', j);
            td.setAttribute('onclick', 'getFocusOnTd(this)');
            var span = document.createElement('span');
            td.appendChild(span);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    document.getElementById('grid-container').appendChild(table);
    document.getElementById('button-print').removeAttribute('disabled');
    document.getElementById('button-save').removeAttribute('disabled');
}

function setOperation(element) {
    "use strict";
    element.nextSibling.classList.add('hidden');
}

function chooseColor(element) {
    "use strict";
    colorSelection = {
        color:     element.getAttribute("data-color"),
        operation: element.getAttribute("data-operation"),
        result:    element.getAttribute("data-result")
    };
    var body = document.getElementsByTagName('body')[0];
    body.setAttribute(
        'style',
        give_svg(colorSelection.color)
    );
    body.classList.add('colorSelector');
}

function changeColor(element, color) {
    "use strict";
    color = color.hslString;
    element.setAttribute(
        "style", "background-color:" + color
    );
    var result    = element.previousSibling.textContent;
    var operation = element.previousSibling.previousSibling.textContent;
    element.setAttribute('data-color', color);
    var new_color = document.getElementById(
        'color-chooser-' + result
    );
    new_color.setAttribute("style", "background-color:" + color);
    new_color.setAttribute("data-color", color);
    var printedColor = document.getElementById(
        'print-color-' + result
    );
    printedColor.setAttribute("style", "background-color:" + color);
    var cases = document.getElementsByClassName('td-' + result);
    file["operations"][operation] = {
        "name": file.operations[operation].name,
        "result": file.operations[operation].result,
        "color": color
    };
    var _isTooDark = isTooDark(color);
    for (var i = 0; i < cases.length; i++) {
        if (_isTooDark)
            cases[i].classList.add('white');
        else
            cases[i].classList.remove('white');
        cases[i].setAttribute(
            "style",
            "background-color:" + color
        );
    }
    colorSelection = null;
    document.getElementsByTagName('body')[0].setAttribute('style', '');
}

function confirmOperation(value, tdNode, importResult, importColor) {
    "use strict";
    if (colorSelection)
        return;
    document.getElementById('sidebar').classList.remove('hidden');
    var operation = value.replace(' ', '').replace('*', 'x');
    var str = value.replace('/[^-()\d/*+.]/g', '');
    str     = str.replace('x', '*');
    var result = eval(str);
    if (!result)
        return;
    var id     = tdNode.id;
    var row_id = parseInt(tdNode.getAttribute('data-row'));
    var row    = 'row' + row_id;
    var col_id = parseInt(tdNode.getAttribute('data-col'));
    var col    = 'col' + col_id;
    if (!("row" + row_id in file["rows"]))
        file["rows"]["row" + row_id] = [];
    if (!("col" + col_id in file["rows"]["row" + row_id]))
        file["rows"]["row" + row_id]["col" + col_id] = [];
    if (operation in file["operations"]) {
        var op = file["operations"][operation];
        file["rows"]["row" + row_id]["col" + col_id] = op.name;
        tdNode.className = "";
        tdNode.classList.add('td-' + result);
        if (isTooDark(op.color))
            tdNode.classList.add('white');
        tdNode.setAttribute(
            "style",
            "background-color:" + op.color
        );
        var operationNode = tdNode.getElementsByTagName('span')[0];
        operationNode.innerText = operation;
        return;
    }
    tdNode.classList = '';
    tdNode.classList.add('td-' + result);
    var operationNode = tdNode.getElementsByTagName('span')[0];
    operationNode.innerText = operation;
    var color = importColor;
    if (!importColor)
        color = random_colors();

    var op_length = Object.keys(file['operations']).length + 1;
    file["operations"][operation] = {
        "name": "op" + op_length,
        "result": result,
        "color": color
    };
    file["rows"]["row" + row_id]["col" + col_id] = "op" + op_length;
    
    var tableRef = document.getElementById('operation-grid').getElementsByTagName('tbody')[0];
    var newRow   = tableRef.insertRow(tableRef.rows.length);

    var operationCell  = newRow.insertCell(0);
    operationCell.classList.add('select');
    operationCell.setAttribute('onclick', 'setOperation(this)');
    var operationText  = document.createTextNode(operation);
    operationCell.appendChild(operationText);

    var resultCell = newRow.insertCell(1);
    var resultText    = document.createTextNode(result);
    resultCell.appendChild(resultText);

    var colorCell = newRow.insertCell(2);
    colorCell.classList.add('select');
    if (isTooDark(color))
        tdNode.classList.add('white');
    tdNode.setAttribute(
        "style",
        "background-color:" + color
    );
    colorCell.setAttribute("style", "background-color:" + color);
    colorCell.setAttribute('data-color', color);
    
    var popupPicker = new Picker({
        parent: colorCell,
        popup: 'left',
        color: color,
        alpha: false
    });
    popupPicker.onDone = function(color) {
        changeColor(colorCell, color);
    };
    colorCell.onclick = function(e) {
        popupPicker.show();
    };

    var colorChooser = document.getElementById("color-chooser");
    var new_color = document.createElement("span");
    new_color.id  = 'color-chooser-' + result;
    new_color.classList.add('select');
    new_color.setAttribute("style", "background-color:" + color);
    new_color.setAttribute("data-color", color);
    new_color.setAttribute("data-operation", operation);
    new_color.setAttribute("data-result", result);
    new_color.setAttribute("onclick", "chooseColor(this);");
    colorChooser.appendChild(new_color);

    var printColors = document.getElementById("color-operation");
    var colorOperation = document.createElement("div");
    colorOperation.classList.add('color-operation');
    colorOperation.id = 'print-color-' + result;
    if (isTooDark(color))
        colorOperation.classList.add('white');
    colorOperation.setAttribute("style", "background-color:" + color);
    var text = document.createTextNode(result);
    colorOperation.appendChild(text);
    printColors.appendChild(colorOperation);
}

function confirmOperationCloseModal() {
    "use strict";
    var element = document.getElementById('set-operation');
    document.getElementsByTagName('body')[0].classList.add('mask');
    var dialog = document.getElementById('set-operation-dialog');
    var tdNode = document.getElementById(
        document.getElementById('id-row-col').value
    );
    dialog.classList.remove('hidden');
    confirmOperation(element.value, tdNode);
    closeDialog(dialog);
}

function isEnterKey() {
    "use strict";
    if(event.key == 'Enter')
        confirmOperationCloseModal();
}

function setOperation(element) {
    "use strict";
    document.getElementsByTagName('body')[0].classList.add('mask');
    var dialog = document.getElementById('set-operation-dialog');
    document.getElementById('id-row-col').setAttribute(
        'value',
        element.id
    );
    dialog.classList.remove('hidden');
    document.getElementById('set-operation').focus();
}

function getFocusOnTd(element) {
    "use strict";
    if (colorSelection) {
        var row_id = parseInt(element.getAttribute('data-row'));
        var row    = 'row' + row_id;
        var col_id = parseInt(element.getAttribute('data-col'));
        var col    = 'col' + col_id;
        if (!("row" + row_id in file["rows"]))
            file["rows"]["row" + row_id] = [];
        if (!("col" + col_id in file["rows"]["row" + row_id]))
            file["rows"]["row" + row_id]["col" + col_id] = [];
        var op = file["operations"][colorSelection.operation];
        file["rows"]["row" + row_id]["col" + col_id] = op.name;
        if (isTooDark(colorSelection.color))
            element.classList.add('white');
        else
            element.classList.remove('white');
        element.setAttribute(
            "style",
            "background-color:" + colorSelection.color
        );
        element.classList.add('td-' + colorSelection.result);
        var operationNode = element.getElementsByTagName('span')[0];
        operationNode.innerText = colorSelection.operation;
        return;
    }
    setOperation(element);
}

function erase() {
    "use strict";
}

function disableBross() {
    "use strict";
    colorSelection = null;
    document.getElementsByTagName('body')[0].setAttribute('style', '');
}
