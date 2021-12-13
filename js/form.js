import {getFingerprint} from './client.js';

const sendform = document.getElementById("send-button");

export const send = () => {

    sendform.addEventListener('click', (event) => {

        event.preventDefault();

        let formElement = document.getElementById("form-store");
        let formData = new FormData(formElement);

        formData.append('fingerprint', getFingerprint());

        // Código para revisar los datos que estamos enviando
        // for (var pair of formData.entries()) {
        //     console.log(pair[0]+ ', ' + pair[1]); 
        // } 
    })   
}
