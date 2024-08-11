document.getElementById('circuit-container').addEventListener('click', function(event){
    if (event.target.classList.contains('port-button')){
        PortButtonOnClick(event);
    }else{
        HideChoiceBoxes();
    }
});

document.getElementById('choice-lightbulb').addEventListener('click', function(event){
    if (event.target.classList.contains('player-choice')){
        PlayerChoiceOnClick(event);
    }
});

document.getElementById('choice-others').addEventListener('click', function(event){
    if (event.target.classList.contains('player-choice')){
        PlayerChoiceOnClick(event);
    }
});

document.getElementById('reset-button').addEventListener('click', function(){
    ResetButtonOnClick();
});

const applyButton = document.getElementById('apply-button');
applyButton.addEventListener('click', function(){
    ApplyButtonOnClick();
});

const switchObjectA = document.querySelector('#switch-a img');
const switchObjectB = document.querySelector('#switch-b img');
const instructionImage = document.querySelector('#instruction img');
var switchAOn = false;
var switchBOn = false;
var showInstruction = true;

switchObjectA.addEventListener('click', function(){
    if (!onEditMode){
        if (switchAOn){
            switchObjectA.src = './images/switch-off.jpg';
            switchAOn = false;
        }else{
            switchObjectA.src = './images/switch-on.jpg';
            switchAOn = true;
        }
        ToggleSwitch();
    }
});

switchObjectB.addEventListener('click', function(){
    if (!onEditMode){
        if (switchBOn){
            switchObjectB.src = './images/switch-off.jpg';
            switchBOn = false;
        }else{
            switchObjectB.src = './images/switch-on.jpg';
            switchBOn = true;
        }
        ToggleSwitch();
    }
});


const circuitAssets = Array.from(document.getElementsByClassName('circuit-region'));
const allPortButtons = Array.from(document.getElementsByClassName('port-button'));

var playerPortSettings = {
    'lightbulb-port-1': '',
    'lightbulb-port-2': '',
    'switch-a-port-1': '',
    // 'switch-a-port-2': 'live',
    'switch-a-port-3': '',
    'switch-b-port-1': '',
    'switch-b-port-2': '',
    'switch-b-port-3': '',
};

const lightbulbChoiceBox = document.getElementById('choice-lightbulb');
const othersChoiceBox = document.getElementById('choice-others');
var activeSelectedPort;
var isLightbulbInitialOn = false;
var onEditMode = true;

const lightbulbImage = document.querySelector('#lightbulb img');

HideChoiceBoxes();
var activeChoiceBox = null;

function PortButtonOnClick(event){
    //TODO: Implement this function
    // const comChoice = document.getElementById('com');
    activeSelectedPort = event.target;

    if (event.target.id == "lightbulb-port-1" || event.target.id == "lightbulb-port-2"){
        // comChoice.style.opacity = 0;
        if (activeChoiceBox != null && activeChoiceBox != lightbulbChoiceBox) HideSelectedChoiceBox(activeChoiceBox);
        activeChoiceBox = lightbulbChoiceBox;
    }else{
        // comChoice.style.opacity = 1;
        if (activeChoiceBox != null && activeChoiceBox != othersChoiceBox) HideSelectedChoiceBox(activeChoiceBox);
        activeChoiceBox = othersChoiceBox;
    };

    activeChoiceBox.style.opacity = 1;
    activeChoiceBox.style.pointerEvents = 'auto';

    const raiseDistance = activeChoiceBox.offsetHeight / 2 + 10;
    activeChoiceBox.style.left = `${event.clientX}px`;
    activeChoiceBox.style.top = `${event.clientY - raiseDistance}px`;
    activeChoiceBox.style.opacity = '1';
}

function PlayerChoiceOnClick(event){
    playerPortSettings[activeSelectedPort.id] = event.target.id;
    switch (event.target.id) {
        case "com":
            activeSelectedPort.src = './images/selected-com.png';
            break;
        case "live":
            activeSelectedPort.src = './images/selected-live.png';
            break;
        case "neutral":
            activeSelectedPort.src = './images/selected-neutral.png';
            break;
        case "l1":
            activeSelectedPort.src = './images/selected-l1.png';
            break;
        case "l2":
            activeSelectedPort.src = './images/selected-l2.png';
            break;
        default: break;
    }
    HideChoiceBoxes();
    CheckAllSelected();
    console.log(playerPortSettings);
}

function CheckAllSelected(){
    const hasEmptyValue = Object.values(playerPortSettings).some(value => value === '');
    if (!hasEmptyValue){
        applyButton.style.opacity = 1;
        applyButton.style.pointerEvents = 'auto';
    }
}

function HideChoiceBoxes(){
    lightbulbChoiceBox.style.left = 0;
    lightbulbChoiceBox.style.top = 0;
    lightbulbChoiceBox.style.opacity = '0';
    lightbulbChoiceBox.style.pointerEvents = 'none';
    othersChoiceBox.style.left = 0;
    othersChoiceBox.style.top = 0;
    othersChoiceBox.style.opacity = '0';
    othersChoiceBox.style.pointerEvents = 'none';
    activeSelectedPort = null;
}

function HideSelectedChoiceBox(choiceBox){
    choiceBox.style.left = 0;
    choiceBox.style.top = 0;
    choiceBox.style.opacity = '0';
    choiceBox.style.pointerEvents = 'none';
}

function ResetButtonOnClick(){
    playerPortSettings = {
        'lightbulb-port-1': '',
        'lightbulb-port-2': '',
        'switch-a-port-1': '',
        'switch-a-port-2': 'l1',
        'switch-a-port-3': '',
        'switch-b-port-1': '',
        'switch-b-port-2': '',
        'switch-b-port-3': '',
    };
    applyButton.style.opacity = 0.5;
    applyButton.style.pointerEvents = 'none';

    lightbulbImage.src = './images/lightbulb-off.png';
    switchObjectA.src = './images/switch-off.jpg';
    switchObjectB.src = './images/switch-off.jpg';
    switchAOn = false;
    switchBOn = false;
    onEditMode = true;
    isLightbulbInitialOn = false;   //Not really need it but just to be clear

    if (showInstruction){
        instructionImage.src = './images/instruction-1.png';
    }else{
        instructionImage.src = '';
    }

    allPortButtons.forEach(portButton => {
        portButton.src = './images/port-unselected.png';
        portButton.style.pointerEvents = 'auto';
    });

    circuitAssets.forEach(circuitAsset => {
        circuitAsset.style.opacity = 1;
    });

    applyButton.innerHTML = 'TEST';
    HideChoiceBoxes();
}

function ApplyButtonOnClick(){
    if(onEditMode){
        onEditMode = false;
        //Hide all circuit assets
        circuitAssets.forEach(circuitAsset => {
            circuitAsset.style.opacity = 0;
        });

        allPortButtons.forEach(portButton => {
            portButton.style.pointerEvents = 'none';
        });

        const isAllPortCorrect = CheckPortConnection();
        if (isAllPortCorrect){
            if (isLightbulbInitialOn){
                lightbulbImage.src = './images/lightbulb-on.png';
            }else{
                lightbulbImage.src = './images/lightbulb-off.png';
            }
        }
        applyButton.innerHTML = 'EDIT';
        SwitchesEnabled(true);
        if (showInstruction){
            instructionImage.src = './images/instruction-2.png';
            showInstruction = false;
        }
        
    }else{
        onEditMode = true;
        circuitAssets.forEach(circuitAsset => {
            circuitAsset.style.opacity = 1;
        });

        allPortButtons.forEach(portButton => {
            portButton.style.pointerEvents = 'auto';
        });

        lightbulbImage.src = './images/lightbulb-off.png';
        applyButton.innerHTML = 'TEST';
        SwitchesEnabled(false);
        instructionImage.src = '';
        switchAOn = false;
        switchBOn = false;
    }
}

function SwitchesEnabled(toggleOn){
    if (toggleOn){
        switchObjectA.style.pointerEvents = 'auto';
        switchObjectB.style.pointerEvents = 'auto';
        switchObjectA.style.cursor = 'pointer';
        switchObjectB.style.cursor = 'pointer';
    }else{
        switchObjectA.style.pointerEvents = 'none';
        switchObjectB.style.pointerEvents = 'none';
        switchObjectA.style.cursor = 'default';
        switchObjectB.style.cursor = 'default';
        switchObjectA.src = './images/switch-off.jpg';
        switchObjectB.src = './images/switch-off.jpg';
    }
}

function ToggleSwitch(){
    const isAllPortCorrect = CheckPortConnection();
    if (isAllPortCorrect){
        if (isLightbulbInitialOn){
            if (switchAOn == switchBOn){
                lightbulbImage.src = './images/lightbulb-on.png';
            }else{
                lightbulbImage.src = './images/lightbulb-off.png';
            }
        }else{
            if (switchAOn == switchBOn){
                lightbulbImage.src = './images/lightbulb-off.png';
            }else{
                lightbulbImage.src = './images/lightbulb-on.png';
            }
        }
    }
}

function CheckPortConnection(){
    if (playerPortSettings['lightbulb-port-1'] != 'neutral') {
        console.log('Lightbulb port 1 is incorrect');
        return false;
    }

    if (playerPortSettings['lightbulb-port-2'] != 'live') {
        console.log('Lightbulb port 2 is incorrect');
        return false;
    }

    if (playerPortSettings['switch-a-port-1'] != 'com') {
        console.log('Switch A port 1 is incorrect');
        return false;
    }

    if (playerPortSettings['switch-a-port-3'] != 'l2') {
        console.log('Switch A port 3 is incorrect');
        return false;
    }

    if (playerPortSettings['switch-b-port-1'] != 'com') {
        console.log('Switch B port 1 is incorrect');
        return false;
    }

    if (playerPortSettings['switch-b-port-2'] == 'l1' && playerPortSettings['switch-b-port-3'] == 'l2'){
        isLightbulbInitialOn = true;
    }else if (playerPortSettings['switch-b-port-2'] == 'l2' && playerPortSettings['switch-b-port-3'] == 'l1') {
        isLightbulbInitialOn = false;
    }else{
        console.log('Switch B port 2 is incorrect');
        return false;
    }

    return true;
}