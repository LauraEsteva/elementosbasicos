import {getFingerprint} from './client.js';
import {ckEditorsFormDataAppendAll} from "./ckeditor.js";

const sendform = document.getElementById("send-button");

export const send = () => {

    if(sendform){
        sendform.addEventListener('click', (event) => {

            event.preventDefault();
    
            let formElement = document.getElementById("form-store");
            let formData = new FormData(formElement);
    
            formData.append('fingerprint', getFingerprint());
    
            if(document.querySelectorAll('.ckeditor')){
                ckEditorsFormDataAppendAll(formData);
            }
    
            //Código para revisar los datos que estamos enviando
            for (var pair of formData.entries()) {
                console.log(pair[0]+ ', ' + pair[1]); 
            } 
        }) 
    }
    if(loginButton){

        loginButton.addEventListener("click", (event) => {

            event.preventDefault();
    
            let url = loginForm.action;
            let data = new FormData(loginForm);
            data.append("fingerprint", getFingerprint());
    
            let sendPostRequest = async () => {
        
                let request = await fetch(url, {
                    method: 'POST', 
                    body: data
                })
                .then(response => {
                    if (!response.ok) throw response;
    
                    console.log(response.data);
    
                    return response.json();
                })
                .then(json => {
                    localStorage.setItem('token', json.data);
                    console.log(json.data);
                })
                .catch(error => {
                    
                    if(error.status == '400'){
    
                        error.json().then(jsonError => {
    
                            let errors = jsonError.data;    
    
                            Object.keys(errors).forEach( (key) => {
                                let errorMessage = document.createElement('li');
                                errorMessage.textContent = errors[key];
                                console.log(errorMessage)
                            })
                        })   
                    }
    
                    if(error.status == '500'){
                        console.log(error);
                    }
                });
    
                // En caso de usar Axios
                
                // let request = await axios.post(url, json)
                // .then(response => {
                //     console.log(response);
                // })
                // .catch(error => {
                    
                //     if(error.response.status == '400'){
    
                //         let errors = error.response.data.data;      
                //         let errorMessage = '';
    
                //         Object.keys(errors).forEach( (key) => {
                //             let errorMessage = document.createElement('li');
                //             errorMessage.textContent = errors[key];
                //             console.log(errorMessage)
                //         })
    
                //         console.log(errorMessage);
                //     }
    
                //     if(error.response.status == '500'){
                //         console.log(error);
                //     }
                // });
            };
    
            sendPostRequest();
            
        });
    }
}