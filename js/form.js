import {getFingerprint} from './client.js';
import {ckEditorsFormDataAppendAll} from "./ckeditor.js";

const sendform = document.getElementById("send-button");

export const renderForm = () => {

    if(sendform){

        sendform.addEventListener('click', (event) => {

            event.preventDefault();
    
            let formElement = document.getElementById("admin-form");
            let data = new FormData(formElement);
            let url = formElement.action;
    
            data.append('fingerprint', getFingerprint());
    
            if(document.querySelectorAll('.ckeditor')){
                ckEditorsFormDataAppendAll(data);
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
        
                    return response.json();
                })
                .then(json => {
                    document.dispatchEvent(new CustomEvent('newData'));
                    
                    document.dispatchEvent(new CustomEvent('message', {
                        detail: {
                            message: json.message,
                        }
                    }));
                })
                .catch(error => {
                    
                    if(error.status == '400'){
    
                        error.json().then(jsonError => {
    
                            let errors = jsonError.data;
                            let errorsContainer = document.getElementById('errors');
                            let errorsMessages = document.getElementById('errors-messages');
                            let closedButton = document.getElementById('iconx');
                            errorsMessages.innerHTML = "";
                            errorsContainer.classList.add("active");

                            Object.keys(errors).forEach( (key) => {
                                let errorMessage = document.createElement('li');
                                errorMessage.textContent = errors[key];
                                errorsMessages.insertAdjacentElement('beforeend', errorMessage);
                                document.querySelector(`[name=${key}]`).classList.add("error");                                
                            })

                            closedButton.addEventListener('click', () => {
                                errorsContainer.classList.remove("active");
                                Object.keys(errors).forEach( (key) => {
                                    let errorMessage = document.createElement('li');
                                    errorMessage.textContent = errors[key];
                                    document.querySelector(`[name=${key}]`).classList.remove("error");
                                })                                
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

    document.addEventListener("showElement",( event =>{

        fetch(event.detail.url, { 
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        }) 
        .then(response => {
            if (!response.ok) throw response;

            return response.json();
        })
        .then(json => {
            let data = json.data;

            console.log(data);
            //traer los datos de name y email. Con bucles, forEach o Object.
        })
        .catch(error => console.log(error));
    }));
}