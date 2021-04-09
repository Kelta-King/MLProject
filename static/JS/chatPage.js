
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
        if(this.index < this.values.length-1){
            this.index++;
            return true;
        }
        return false;
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
            document.querySelector("#chats").innerHTML = '';
            printQuestions();

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
        align = 'w3-left w3-light-gray';
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
        div.setAttribute("class", "w3-bar-item w3-border w3-round w3-margin-top w3-margin-left w3-left w3-light-gray");
        chatArea.appendChild(divP);
        document.getElementById("chats").scrollTop = document.getElementById("chats").scrollHeight;
        printQuestions();
        endWriting();
        return false;
    }
    else{
        div.innerHTML = message;
        chatArea.appendChild(divP);
        document.getElementById("chats").scrollTop = document.getElementById("chats").scrollHeight;
        endWriting();
        return true;
    }

}

let compareString = (value, val) => {

    value = value.trim().toUpperCase();
    val = val.trim().toUpperCase();
    if(value == val){
        return true;
    }
    return false;

}

let checkWithExpected = (value) => {

    let expected = messages.values[messages.index][1];
    if(expected == "{}"){
        return true;
    }

    for(let i=0; i< expected.length; i++){
        if(compareString(value, expected[i])){
            return true;
        }
    }

    return false;

}

let send = (msg = '') => {

    let typer = "User";

    if(msg == ''){
        msg = document.querySelector("#sender").value;
    }

    // Check with the expected values
    if(!checkWithExpected(msg)){
        addChatMessage("Please write response with given options.", "consultant");
        printQuestions();
        return false;
    }

    // If all good then good to go
    document.querySelector("#sender").value = '';
    if(addChatMessage(msg, typer)){
        // Here because before increment we have to check with values
        if(messages.incrementIndex()){
            printQuestions();
        }
        else{
            //Here prediction function will be called
        }
    }
    

}

let printQuestions = () => {

    writing("consultant is writing...");
    setTimeout(function(){
        
        let index = messages.index;
        // second 0 will be for message and 1 will be for options
        let message = messages.values[index][0];
        let expected = messages.values[index][1];
        
        message = buildMessage(message, expected);

        addChatMessage(message, 'consultant')

        // Adding suggestions to the suggetion area
        let sugessionArea = document.querySelector("#suggestions");
        sugessionArea.innerHTML = '';
        if(expected != "{}"){
            expected.forEach(val => {
                let btn = document.createElement("BUTTON");
                btn.innerText = val;
                btn.className = "w3-button w3-border w3-margin-right w3-xlarge w3-right w3-light-gray w3-hover-gray kel-hover w3-round";
                btn.setAttribute('onclick', 'send(this.innerText)');
                sugessionArea.appendChild(btn);
            });
        }

        endWriting();

    }, 500);

}

let buildMessage = (txt, expected) => {

    let msg = txt;
    if(expected != "{}"){
        expected.forEach(element => {
            msg += '<br>'+element;
        });
    }
    return msg;
    
}