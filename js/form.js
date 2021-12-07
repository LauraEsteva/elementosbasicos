
const sendform = document.getElementById("send-button");
import {fingerprint} from './client.js';
export const send = () => {

    sendform.addEventListener('click', (event) => {

        event.preventDefault();

        let formElement = document.getElementById("form-store");
        let formData = new FormData(formElement);

        formData.append('fingerprint', fingerprint ());

        // Código para revisar los datos que estamos enviando
        // for (var pair of formData.entries()) {
        //     console.log(pair[0]+ ', ' + pair[1]); 
        // } 
    })   
}
