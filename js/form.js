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
    
            let sendPostRequest = async () => {
        
                let request = await fetch(url, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    },
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
        }) 
    }
    
    }
}