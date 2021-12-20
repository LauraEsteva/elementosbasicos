class AlertMessage extends HTMLElement {
    constructor() {
        super();
        
        this.shadow = this.attachShadow({ mode: 'open' });
        this.message = '';
        //esto hace que se active el 'shadow DOM'
        
        document.addEventListener("message",( event =>{
            this.setAttribute('message', event.detail.message);
        }));
    }

    static get observedAttributes() { return ['message']; }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue){

        this.getAttribute('message');
        let alertMessage = this.shadow.querySelector('#alert-message');

        alertMessage.classList.add("active");

        setTimeout( () => {
            alertMessage.classList.remove("active");  
        }, 5000); 
    }

    render() {
        this.shadow.innerHTML = 
        
        `<style>
            #alert-message{
                display: none;
                background-color: ;
                color: rgb(179, 179, 179);
                font-family: "Ubuntu", sans-serif;
                width: 15%;
                text-align: center;
                margin-top:2vh;
                padding: 1vh;
                border-radius: 1vh;
                border: 1px solid rgb(0, 0, 0);
                position: fixed;
                right:2vh;
                bottom: 5%;
            }

            #alert-message.active{
                display: block;
            }
        </style>
        <div id="alert-message">
            <span>Datos guardados correctamente.</span>
        </div>
        `;
    }
}
customElements.define('alert-message', AlertMessage);