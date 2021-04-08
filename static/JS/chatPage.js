
let errorCheck = (value) => {

    if(value.includes("Error:")){
        vals = value.split("Error:");
        alert(vals[1]);
        return true;
    }

    return false;

}

let writing = (message) => {

    let status = document.querySelector("#status");
    let text = document.createTextNode(message);
    status.appendChild(text);

}

let endWriting = () => {
    document.querySelector("#status").innerHTML = "";
}

let startLoader = (message = 'loader') => {
    console.log(message + " started");
    document.getElementById('loader-modal').style.display = 'block';
}

let endLoader = (message = 'loader') => {
    console.log(message + " ended");
    document.getElementById('loader-modal').style.display = 'none';
}

class Messages{

    index;
    values;

    constructor(values = '') {
        this.index = 0;
        this.values = values;
    }

    setValues(values){
        this.values = values;
    }

    incrementIndex(){
        this.index++;
    }

    getMessage(id){
        if(id >= this.values.length){
            return false;
        }
        else{
            return this.values[id][0];
        }
    }

    getExpected(id){
        if(id >= this.values.length){
            return false;
        }
        else{
            return this.values[id][1];
        }
    }

}

let messages = new Messages();

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
            let vals = JSON.parse(this.responseText);
            console.log(vals);
            messages.setValues(vals);
            
            writing('Consultant is writing...');
            setTimeout(function(){
                startChat();
            }, 500);

        }

    }
    xhttp.open("GET", "setDisease?name="+obj, false);
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

    if((message == '' || typer == '') && typer != 'consultant'){
        div.innerHTML = "Please type something";
        chatArea.appendChild(divP);
        endWriting();
        return false;
    }
    else{
        div.innerHTML = message;
        chatArea.appendChild(divP);
        endWriting();
        return true;
    }

}

let send = (msg = '') => {

    if(msg != ''){
        let typer = "User";

        document.querySelector("#sender").value = '';
        if(addChatMessage(msg, typer)){
            let messageText = messages.values[messages.index][0];
            let messageExpected = messages.values[messages.index][1]

            let msg = buildMessage(messageText, messageExpected);
            addChatMessage(msg, 'consultant');
        }
        
    }
    else{
        let message = document.querySelector("#sender").value;
        let typer = "User";

        document.querySelector("#sender").value = '';
        if(addChatMessage(message, typer)){
            let messageText = messages.values[messages.index][0];
            let messageExpected = messages.values[messages.index][1]

            let msg = buildMessage(messageText, messageExpected);
            addChatMessage(msg, 'consultant');
        }
        
    }

}

let startChat = () => {

    // second 0 will be for message and 1 will be for options
    let message = messages.values[0][0];
    
    addChatMessage(message, 'consultant')
    messages.incrementIndex();

}

let buildMessage = (txt, expected) => {

    let msg = txt;
    console.log(expected);
    expected = JSON.parse(expected);
    console.log(expected);
    /*
    if(expected != {}){
        expected['outputs'].forEach(element => {
            msg = '<br>'+element;
        });
    }
    return msg;
    */
   return 'yo';
}