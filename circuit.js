document.getElementById('circuit-container').addEventListener('click', function(event){
    if (event.target.classList.contains('port-button')){
        PortButtonOnClick(event);
    }else{
        HideChoiceBox();
    }
});

document.getElementById('choice-box').addEventListener('click', function(event){
    if (event.target.classList.contains('player-choice')){
        PlayerChoiceOnClick(event);
    }
});

const portCorrectSettings = {
    'lightbulb-port-1': 'neutral',
    'lightbulb-port-2': 'live',
    'switch-a-port-1': 'com',
    'switch-a-port-2': 'live',
    'switch-a-port-3': 'neutral',
    'switch-b-port-1': 'com',
    'switch-b-port-2': 'live',
    'switch-b-port-3': 'neutral',
};

var portPlayerChoices = {
    'lightbulb-port-1': '',
    'lightbulb-port-2': '',
    'switch-a-port-1': '',
    'switch-a-port-2': '',
    'switch-a-port-3': '',
    'switch-b-port-1': '',
    'switch-b-port-2': '',
    'switch-b-port-3': '',
};

const choiceBox = document.getElementById('choice-box');
var activeSelectedPort;

function PortButtonOnClick(event){
    //TODO: Implement this function
    activeSelectedPort = event.target;
    const raiseDistance = choiceBox.offsetHeight / 2 + 10;
    choiceBox.style.left = `${event.clientX}px`;
    choiceBox.style.top = `${event.clientY - raiseDistance}px`;
    choiceBox.style.opacity = '1';
}

function PlayerChoiceOnClick(event){
    portPlayerChoices[activeSelectedPort.id] = event.target.id;
    console.log(portPlayerChoices);
}

function HideChoiceBox(){
    choiceBox.style.left = 0;
    choiceBox.style.top = 0;
    choiceBox.style.opacity = '0';
    activeSelectedPort = null;
}