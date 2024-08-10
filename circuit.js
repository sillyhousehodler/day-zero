document.getElementById('circuit-container').addEventListener('click', function(event){
    if (event.target.classList.contains('port-button')){
        PortButtonOnClick(event);
    }else{
        HideChoiceBox();
    }
});

const choiceBox = document.getElementById('choice-box');

function PortButtonOnClick(event){
    //TODO: Implement this function
    const raiseDistance = choiceBox.offsetHeight / 2 + 10;
    choiceBox.style.left = `${event.clientX}px`;
    choiceBox.style.top = `${event.clientY - raiseDistance}px`;
    choiceBox.style.opacity = '1';
}

function HideChoiceBox(){
    choiceBox.style.opacity = '0';
}