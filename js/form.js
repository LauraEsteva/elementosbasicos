
const sendform = document.getElementById("send-button");

export let send = () => {
    sendform.addEventLister('click', () => {
        let formElement = document.getElementById("form-store");
        let formData = new FormData(formElement);
        for (var pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }
        
    })   
    
}
