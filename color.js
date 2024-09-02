const popUpText = document.getElementById('popup-text');

// blocks need to be found for each color
const colorAmounts = {
    yellow: 4,
    red: 3,
    blue: 3,
    black: 2
};

var activeColor = "";   // current selected color string
var activeCount = 0;    // consecutive same color selected count
var activeCountTextObject = ""; // for display color count
var finishedColorNumber = 0;  // number of colors finished

document.getElementById('grid-container').addEventListener('click', function(event){
    if (event.target.classList.contains('color-block')){
        switch (event.target.id) {
            case 'cb1':
            case 'cb5':
            case 'cb13':
            case 'cb18':
                event.target.style.backgroundColor = 'yellow';
                break;
            case 'cb2':
            case 'cb14':
            case 'cb17':
                event.target.style.backgroundColor = 'red';
                break;
            case 'cb7':
            case 'cb19':
            case 'cb28':
                event.target.style.backgroundColor = 'blue';
                break;
            case 'cb8':
            case 'cb20':
                event.target.style.backgroundColor = 'black';
                break;
            default:
                break;
        }
        // console.log("check event color : " + event.target.style.backgroundColor);
        CheckSelectedColorBlock(event);
    }
});

function CheckSelectedColorBlock(event){
    target = event.target;
    // console.log(target.style.backgroundColor);
    if (target.style.backgroundColor == ""){
        ClearColorBlocks(event, "no color here...");
        return;
    }
    
    if (activeColor == ""){
        activeColor = target.style.backgroundColor;
        event.target.classList.add('no-events');    //avoid repeat event on the same selected block
        CheckColorCount();
    }else{
        if (target.style.backgroundColor == activeColor){
            event.target.classList.add('no-events');
            CheckColorCount();
        }else{
            event.target.style.backgroundColor = "";
            ClearColorBlocks(event, "color mismatch!");
        }
    }
}

function CheckColorCount(){
    activeCount++;
    if (activeCountTextObject == ""){
        activeCountTextObject = document.getElementById('counter-' + activeColor);
    }
    activeCountTextObject.innerHTML = activeCount + '/' + colorAmounts[activeColor];
    // Check if all blocks of the same color are selected
    if (colorAmounts[activeColor] == activeCount){
        const colorCheckBox = document.getElementById('checkbox-' + activeColor);
        colorCheckBox.checked = true;
        colorCheckBox.style.opacity = 1;
        ResetColorCount();
        finishedColorNumber++;
        console.log(finishedColorNumber);
        console.log(colorCheckBox.opacity);
        if (finishedColorNumber == 4){
            setTimeout(() => {
                alert("Congratulations. All colors are done!");
            }, 500);
        }
    }
    // UpdateActiveColorText(); // For debugging
}

function ClearColorBlocks(event, message){
    popUpText.innerHTML = message;
    popUpText.style.left = `${event.clientX}px`;
    popUpText.style.top = `${event.clientY}px`;
    popUpText.style.opacity = '1';

    popUpText.style.animation = 'none';
    popUpText.offsetHeight;
    popUpText.style.animation = null;
    popUpText.style.opacity = '0';

    const colorBlocks = document.getElementsByClassName('no-events');
    // colorBlocks is a HTMLCollection, so we need to convert it to an array to use forEach
    // reset all selected blocks of the same color becayse of the mismatch
    Array.from(colorBlocks).forEach(colorBlock => {
        if (colorBlock.style.backgroundColor == activeColor){
            colorBlock.style.backgroundColor = "";
            colorBlock.classList.remove('no-events');
        }
    });
    activeCountTextObject.innerHTML = 0 + '/' + colorAmounts[activeColor];
    ResetColorCount();
}

function ResetColorCount(){
    activeColor = "";
    activeCount = 0;
    activeCountTextObject = "";
    // UpdateActiveColorText();
}

function UpdateActiveColorText(){
    const debuggerText = document.getElementById('guiding-block').querySelector('p');
    debuggerText.innerHTML = activeColor + " x " + activeCount;
}
