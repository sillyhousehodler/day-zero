document.getElementById('grid-container').addEventListener('click', function(event){
    if (event.target.classList.contains('color-block')){
        switch (event.target.id) {
            case 'cb1':
            case 'cb5':
            case 'cb13':
            case 'cb18':
                event.target.style.backgroundColor = 'yellow';
                CheckColorBlock(event.target);
                break;
            case 'cb2':
            case 'cb14':
            case 'cb17':
                event.target.style.backgroundColor = 'red';
                CheckColorBlock(event.target);
                break;
            case 'cb7':
            case 'cb19':
            case 'cb28':
                event.target.style.backgroundColor = 'blue';
                CheckColorBlock(event.target);
                break;
            case 'cb8':
            case 'cb20':
                event.target.style.backgroundColor = 'black';
                CheckColorBlock(event.target);
                break;
            default:
                // event.target.style.backgroundColor = 'magenta';
                CheckColorBlock(event.target);
                break;
        }
    }
});

const yellowCount = 4;
const redCount = 3;
const blueCount = 3;
const blackCount = 2;

var activeColor = null;
var activeCount = 0;

function CheckColorBlock(eventTarget){
    if (activeColor == null){
        activeColor = eventTarget.style.backgroundColor;
        activeCount++;
        CheckColorCount(activeColor);
        // alert("first " + activeColor + " chosen");
    }else{
        if (eventTarget.style.backgroundColor == activeColor){
            activeCount++;
            CheckColorCount(activeColor);
            // alert(activeColor + " color");
        }else{
            ClearColorBlocks();
            ResetColorCount();
            // alert("different color");
        }
    }
}

function CheckColorCount(currentColor){
    const colorName = currentColor;
    // alert("checking color " + colorName);
    const colorCounts = {
        yellow: yellowCount,
        red: redCount,
        blue: blueCount,
        black: blackCount
    };

    if (colorCounts[colorName] == activeCount){
        // alert(colorName + " color finished");
        const finishedClass = "color-" + colorName;
        const finishedBlocks = document.getElementsByClassName(finishedClass);
        console.log(finishedClass);
        for (let i = 0; i < finishedBlocks.length; i++){
            finishedBlocks[i].classList.remove('color-block');
        }
        ResetColorCount();
    }
}

function ResetColorCount(){
    activeColor = null;
    activeCount = 0;
}

function ClearColorBlocks(){
    const colorBlocks = document.getElementsByClassName('color-block');
    for (let i = 0; i < colorBlocks.length; i++){
        colorBlocks[i].style.backgroundColor = 'white';
    }
}
