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
        // console.log("check event color : " +event.target.style.backgroundColor);
        CheckColorBlock(event);
    }
});

// UpdateActiveColorText();

const fadeText = document.getElementById('fade-text');
const yellowCount = 4;
const redCount = 3;
const blueCount = 3;
const blackCount = 2;

var activeColor = "";
var activeCount = 0;

function CheckColorBlock(event){
    target = event.target;
    // console.log(target.style.backgroundColor);
    if (target.style.backgroundColor == ""){
        ClearColorBlocks(event, "empty!");
        return;
    }
    
    if (activeColor == ""){
        activeColor = target.style.backgroundColor;
        event.target.classList.add('no-events');
        CheckColorCount(activeColor);
    }else{
        if (target.style.backgroundColor == activeColor){
            event.target.classList.add('no-events');
            CheckColorCount(activeColor);
        }else{
            event.target.style.backgroundColor = "";
            ClearColorBlocks(event, "color mismatch!");
        }
    }
}

function CheckColorCount(currentColor){
    const colorName = currentColor;
    const colorCounts = {
        yellow: yellowCount,
        red: redCount,
        blue: blueCount,
        black: blackCount
    };
    
    activeCount++;
    
    if (colorCounts[colorName] == activeCount){
        // const finishedClass = "color-" + colorName;
        // const finishedBlocks = document.getElementsByClassName(finishedClass);
        // console.log(finishedClass);
        // for (let i = 0; i < finishedBlocks.length; i++){
        //     finishedBlocks[i].classList.remove('color-block');
        // }
        const colorCheckBox = document.getElementById('checkbox-' + colorName);
        colorCheckBox.checked = true;
        ResetColorCount();
    }
    // UpdateActiveColorText();
}

function ClearColorBlocks(event, message){
    fadeText.innerHTML = message;
    fadeText.style.left = `${event.clientX}px`;
    fadeText.style.top = `${event.clientY}px`;
    fadeText.style.opacity = '1';

    fadeText.style.animation = 'none';
    fadeText.offsetHeight;
    fadeText.style.animation = null;
    fadeText.style.opacity = '0';

    const colorBlocks = document.getElementsByClassName('no-events');
    //colorBlocks is a HTMLCollection, so we need to convert it to an array to use forEach
    Array.from(colorBlocks).forEach(colorBlock => {
        if (colorBlock.style.backgroundColor == activeColor){
            colorBlock.style.backgroundColor = "";
            colorBlock.classList.remove('no-events');
        }
    });
    ResetColorCount();
}

function ResetColorCount(){
    activeColor = "";
    activeCount = 0;
    // UpdateActiveColorText();
}

function UpdateActiveColorText(){
    const debuggerText = document.getElementById('debugger-text').querySelector('p');
    debuggerText.innerHTML = activeColor + " x " + activeCount;
}
