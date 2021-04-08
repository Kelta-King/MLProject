
let errorCheck = (value) => {

    if(value.includes("Error:")){
        vals = value.split("Error:");
        alert(vals[1]);
        return true;
    }

    return false;

}

let startLoader = (message = 'loader') => {
    console.log(message + " started");
    document.getElementById('loader-modal').style.display = 'block';
}

let endLoader = (message = 'loader') => {
    console.log(message + " ended");
    document.getElementById('loader-modal').style.display = 'none';
}

let selectDisease = () => {

    let disease = document.querySelector("#disease");
    let error = document.querySelector("#errorDisease");
    startLoader();

    if(disease.value == ''){
        error.innerText = "Please select a disease";
        disease.focus();
        endLoader();
        return false;
    }

    let obj = {
        disease:disease.value,
    };

    obj = JSON.stringify(obj);

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){

        if(this.readyState == 4 && this.status == 200){

            if(errorCheck(this.responseText)){
                endLoader();
                return false;
            }
            
            endLoader();
            console.log(this.responseText);
        }

    }
    xhttp.open("GET", "check/setDisease?name="+obj, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    
    endLoader();

}

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