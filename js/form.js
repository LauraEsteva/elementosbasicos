
const sendform = document.getElementById("send-button");

export const send = () => {

    sendform.addEventListener('click', () => {

        sendform.preventDefault();

        let formElement = document.getElementById("form-store");
        let formData = new FormData(formElement);

        formData.append('fingerprint', 'value1');

        for (var pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        } 
    })   
}
