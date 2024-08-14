const switchObjectA = document.querySelector('#switch-a img');          //bottom left lighting switch
const switchObjectB = document.querySelector('#switch-b img');          //bottom right lighting switch
const instructionImage = document.querySelector('#instruction img');
var isSwitchAOn = false;     //record the on/off state of the switch
var isSwitchBOn = false;    //record the on/off state of the switch
var showInstruction = true;

const circuitAssets = Array.from(document.getElementsByClassName('circuit-region'));    //All wires and connector buttons (those with question mark)
const allConnectorButtons = Array.from(document.getElementsByClassName('connector-button'));      //All connector buttons, for resetting purpose

const lightBulbConnectorOptions = document.getElementById('choice-lightbulb');
const otherConnectorOptions = document.getElementById('choice-others');
var currentSelectedConnector;
var isLightbulbInitialOn = false;   //Whether the lightbulb should be on when the circuit is completed
var onEditMode = true;

const lightbulbImage = document.querySelector('#lightbulb img');
var activeChoiceBox = null;

//holder of player's answers
var playerPortSettings = {
    'lightbulb-connector-1': '',
    'lightbulb-connector-2': '',
    'switch-a-connector-1': '',
    // 'switch-a-connector-2': 'live',
    'switch-a-connector-3': '',
    'switch-b-connector-1': '',
    'switch-b-connector-2': '',
    'switch-b-connector-3': '',
};

document.getElementById('circuit-body').addEventListener('click', function(event){
    if (event.target.classList.contains('connector-button')){
        ConnectorButtonOnClick(event);
    }else{
        HideChoiceBoxes();
    }
});

document.getElementById('choice-lightbulb').addEventListener('click', function(event){
    // connectors of lightbulb have an unique set of option menu. So they are separated from the rest of the connectors in this parent element.
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

HideChoiceBoxes();

switchObjectA.addEventListener('click', function(){
    if (!onEditMode){
        if (isSwitchAOn){
            switchObjectA.src = './images/switch-off.jpg';
            isSwitchAOn = false;
        }else{
            switchObjectA.src = './images/switch-on.jpg';
            isSwitchAOn = true;
        }
        ToggleSwitch();
    }
});

switchObjectB.addEventListener('click', function(){
    if (!onEditMode){
        if (isSwitchBOn){
            switchObjectB.src = './images/switch-off.jpg';
            isSwitchBOn = false;
        }else{
            switchObjectB.src = './images/switch-on.jpg';
            isSwitchBOn = true;
        }
        ToggleSwitch();
    }
});

function ToggleSwitch(){
    const isAllConnectorsCorrect = CheckConnectorsSettings();
    if (isAllConnectorsCorrect){
        if (isLightbulbInitialOn){
            if (isSwitchAOn == isSwitchBOn){
                lightbulbImage.src = './images/lightbulb-on.png';
            }else{
                lightbulbImage.src = './images/lightbulb-off.png';
            }
        }else{
            if (isSwitchAOn == isSwitchBOn){
                lightbulbImage.src = './images/lightbulb-off.png';
            }else{
                lightbulbImage.src = './images/lightbulb-on.png';
            }
        }
    }
}

function ConnectorButtonOnClick(event){
    currentSelectedConnector = event.target;

    if (event.target.id == "lightbulb-connector-1" || event.target.id == "lightbulb-connector-2"){
        // comChoice.style.opacity = 0;
        if (activeChoiceBox != null && activeChoiceBox != lightBulbConnectorOptions) HideSelectedChoiceBox(activeChoiceBox);
        activeChoiceBox = lightBulbConnectorOptions;    //option menu for lightbulb connectors
    }else{
        // comChoice.style.opacity = 1;
        if (activeChoiceBox != null && activeChoiceBox != otherConnectorOptions) HideSelectedChoiceBox(activeChoiceBox);
        activeChoiceBox = otherConnectorOptions;        //option menu for non-lightbulb connectors
    };

    activeChoiceBox.style.opacity = 1;
    activeChoiceBox.style.pointerEvents = 'auto';

    const raiseDistance = activeChoiceBox.offsetHeight / 2 + 10;
    activeChoiceBox.style.left = `${event.clientX}px`;
    activeChoiceBox.style.top = `${event.clientY - raiseDistance}px`;
    activeChoiceBox.style.opacity = '1';
}

function PlayerChoiceOnClick(event){
    playerPortSettings[currentSelectedConnector.id] = event.target.id;
    switch (event.target.id) {
        case "com":
            currentSelectedConnector.src = './images/selected-com.png';
            break;
        case "live":
            currentSelectedConnector.src = './images/selected-live.png';
            break;
        case "neutral":
            currentSelectedConnector.src = './images/selected-neutral.png';
            break;
        case "l1":
            currentSelectedConnector.src = './images/selected-l1.png';
            break;
        case "l2":
            currentSelectedConnector.src = './images/selected-l2.png';
            break;
        default: break;
    }
    HideChoiceBoxes();
    CheckAllSelected();
    // console.log(playerPortSettings);
}

function CheckAllSelected(){
    const hasEmptyValue = Object.values(playerPortSettings).some(value => value === '');
    // Enable apply button only when all connectors are set
    if (!hasEmptyValue){
        applyButton.style.opacity = 1;
        applyButton.style.pointerEvents = 'auto';
    }
}

function HideChoiceBoxes(){
    lightBulbConnectorOptions.style.left = 0;
    lightBulbConnectorOptions.style.top = 0;
    lightBulbConnectorOptions.style.opacity = '0';
    lightBulbConnectorOptions.style.pointerEvents = 'none';
    otherConnectorOptions.style.left = 0;
    otherConnectorOptions.style.top = 0;
    otherConnectorOptions.style.opacity = '0';
    otherConnectorOptions.style.pointerEvents = 'none';
    currentSelectedConnector = null;
}

function HideSelectedChoiceBox(choiceBox){
    choiceBox.style.left = 0;
    choiceBox.style.top = 0;
    choiceBox.style.opacity = '0';
    choiceBox.style.pointerEvents = 'none';
}

function ResetButtonOnClick(){
    playerPortSettings = {
        'lightbulb-connector-1': '',
        'lightbulb-connector-2': '',
        'switch-a-connector-1': '',
        'switch-a-connector-2': 'l1',
        'switch-a-connector-3': '',
        'switch-b-connector-1': '',
        'switch-b-connector-2': '',
        'switch-b-connector-3': '',
    };
    applyButton.style.opacity = 0.5;
    applyButton.style.pointerEvents = 'none';

    lightbulbImage.src = './images/lightbulb-off.png';
    switchObjectA.src = './images/switch-off.jpg';
    switchObjectB.src = './images/switch-off.jpg';
    isSwitchAOn = false;
    isSwitchBOn = false;
    onEditMode = true;
    isLightbulbInitialOn = false;   //Not really necessarily, but just to be clear

    if (showInstruction){
        instructionImage.src = './images/instruction-1.png';
    }else{
        // To avoid repeatly showing the instruction image, with the assumption that player have seen it already.
        instructionImage.src = '';
    }

    allConnectorButtons.forEach(portButton => {
        portButton.src = './images/port-unselected.png';
        portButton.style.pointerEvents = 'auto';
    });

    circuitAssets.forEach(circuitAsset => {
        circuitAsset.style.opacity = 1;
    });

    applyButton.innerHTML = 'APPLY';
    HideChoiceBoxes();
}

function ApplyButtonOnClick(){
    if(onEditMode){
        // Hide all connectors and wire. Let player focus on switching the switches and observe the lightbulb
        onEditMode = false;
        circuitAssets.forEach(circuitAsset => {
            circuitAsset.style.opacity = 0;
        });

        allConnectorButtons.forEach(portButton => {
            portButton.style.pointerEvents = 'none';
        });

        const isAllPortCorrect = CheckConnectorsSettings();
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
        // Resume edit mode for players to adjust the settings
        onEditMode = true;
        circuitAssets.forEach(circuitAsset => {
            circuitAsset.style.opacity = 1;
        });

        allConnectorButtons.forEach(portButton => {
            portButton.style.pointerEvents = 'auto';
        });

        lightbulbImage.src = './images/lightbulb-off.png';
        applyButton.innerHTML = 'APPLY';
        SwitchesEnabled(false);
        instructionImage.src = '';
        isSwitchAOn = false;
        isSwitchBOn = false;
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

function CheckConnectorsSettings(){
    if (playerPortSettings['lightbulb-connector-1'] != 'neutral') {
        console.log('Lightbulb connector 1 is incorrect');
        return false;
    }

    if (playerPortSettings['lightbulb-connector-2'] != 'live') {
        console.log('Lightbulb connector 2 is incorrect');
        return false;
    }

    if (playerPortSettings['switch-a-connector-1'] != 'com') {
        console.log('Switch A connector 1 is incorrect');
        return false;
    }

    if (playerPortSettings['switch-a-connector-3'] != 'l2') {
        console.log('Switch A connector 3 is incorrect');
        return false;
    }

    if (playerPortSettings['switch-b-connector-1'] != 'com') {
        console.log('Switch B connector 1 is incorrect');
        return false;
    }

    // There are two possible correct settings for switch B connectors 2 and 3. The alternative connection affects only the initial state of the lightbulb.
    if (playerPortSettings['switch-b-connector-2'] == 'l1' && playerPortSettings['switch-b-connector-3'] == 'l2'){
        isLightbulbInitialOn = true;
    }else if (playerPortSettings['switch-b-connector-2'] == 'l2' && playerPortSettings['switch-b-connector-3'] == 'l1') {
        isLightbulbInitialOn = false;
    }else{
        console.log('Switch B connector 2 is incorrect');
        return false;
    }

    return true;
}