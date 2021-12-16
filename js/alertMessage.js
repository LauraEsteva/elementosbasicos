export const renderAlertMessage = () => {

    let alertMessage = document.getElementById('alert-message');

    document.addEventListener("newData",( event =>{
       
        alertMessage.classList.add("active");
        setTimeout( () => {
            alertMessage.classList.remove("active");  
        }, 5000); 
    }));        
}
