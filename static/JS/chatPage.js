
let addChatMessage = (message = '', typer = '') => {

    let chatArea = document.querySelector('#chats');

    let align = 'w3-right w3-blue';
    if(typer == 'consultant'){
        align = 'w3-left w3-white';
    }

    let divP = document.createElement('DIV');
    divP.setAttribute("class", "w3-bar");

    let div = document.createElement('DIV');
    div.setAttribute("class", "w3-bar-item w3-border w3-round w3-margin-top w3-margin-left " + align);
    div.setAttribute("style", "max-width:80%");

    let divC = document.createElement('DIV');
    divC.setAttribute("class", "w3-small");
    divC.innerText = typer;

    div.appendChild(divC);
    divP.appendChild(div);

    if(message == '' || typer == ''){
        div.innerHTML = "Please type something";
        chatArea.appendChild(divP);
        return false;
    }
    else{
        div.innerHTML = message;
        chatArea.appendChild(divP);
        return true;
    }

}

let send = () => {

    let message = document.querySelector("#sender").value;
    let typer = "User";

    addChatMessage(message, typer);

}