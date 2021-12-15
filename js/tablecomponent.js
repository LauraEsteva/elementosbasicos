class Table extends HTMLElement {
    //extends es que un objeto coge las cualidades de otro objeto y las amplia
    //Table coge las cualidades de HTMLElement y le añade otras cualidades
    //ejemplo: moneda. El objeto moneda tiene unas cualidades "sirve para cambiar cosas" y con el "euro" se le añade que "tiene decimales".
    //con el "yuan" la cualidad de la moneda es que "no tiene decimales"
    //los objetos pueden 'heredar' de un 'padre', algo que está más arriba
    //le pones un class que empieza en mayúscula, y solo puede haber un class, es único, solo habrá un Table
    //siempre extends HTMLElement porque 'hereda' lo del 'padre' 
    constructor() {
        super();
        //dentro del constructor tenemos que escribir el 'super' porque es lo que hace que 'heredes'
        this.shadow = this.attachShadow({ mode: 'open' });
        //esto hace que se active el 'shadow DOM'
        this.api = 'http://141.94.27.118:8080/api';
        //this.shadow y this.api son las propiedades que tiene el objeto.
        //con this.api te dejas arriba la información que vas a querer utilizar más tarde
        //de esta forma puedes usarlo en cualquier parte de tu código

        document.addEventListener("newData",( event =>{
            this.loadData();
        }));
        //esto te permite crear eventos personalizados. Y escuchar estos nuevos eventos
        //document.dispatchEvent(new CustomEvent('newData));
        //si hay un "newData" a la funcion la llamaré "loadData"

        document.addEventListener("newUrl",( event =>{
            this.setAttribute('url', this.api + event.detail.url);
        }));
        //setAtrtibute te está cambiando los atributos¿?
    }
    //lo primero que arrancará será el constructor

    static get observedAttributes() { return ['url']; }
    //este es el método(o función) estático que te observa los atributos.
    //va en conjunto con el attributeChangedCallback
    connectedCallback() {
        this.loadData();
    }
    //lo segundo que arrancará será el connectedCallback. webcomponents3 classroom, funciones

    attributeChangedCallback(){
        this.loadData();
    }

    loadData() {

        let url = this.getAttribute('url');

        if(url){

            fetch(url, { 
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                }
            }) 
            .then(response => {
                if (!response.ok) throw response;

                return response.json();
            })
            .then(json => {
                this.data = json.data;
                this.render();
            })
            //solo cuando los datos ya han sido cargados en el json.data es cuando se pinta la tabla
            .catch(error => console.log(error));
        }
    }

    render() {

        this.shadow.innerHTML = 
        //aquí estoy cambiando el shadowDOM
        //el shadowDOM te está dejando traer el css y el html
        //no puedes usar sass 
        `
        <style>
            table {
                border-collapse: collapse;
                width: 100%;
            }
            td, th {
                border: 1px solid hsl(0, 0%, 87%);
                color: hsl(0, 0%, 100%);
                font-family: 'Ubuntu';
                padding: 8px;
                text-align: left;
            }

            svg {
                cursor: pointer;
                height: 1.5em;
                width: 1.5em;
            }

            svg path {
                fill: hsl(0, 0%, 100%);
            }

            svg:hover path {
                fill: hsl(19, 100%, 50%);
            }
        </style>
        
        <table>
            <thead>
                ${this.getTableHeader()}
            </thead>
            <tbody>
                ${this.getTableData()}
            </tbody>
        </table>`;    
        //^traes el html, que está llamando a otras funciones, que estan más abajo  
        
        let editButtons = this.shadow.querySelectorAll(".edit-button");

        editButtons.forEach(editButton => {

            editButton.addEventListener("click", (event) => {

                document.dispatchEvent(new CustomEvent('showElement', {
                    detail: {
                        url: this.getAttribute('url') + '/' + editButton.dataset.id,
                    }
                }));
            });

        });
    }
    //estas son las funciones que van a ir al html
    getTableHeader() {

        let header = '';

        Object.keys(this.data[0]).forEach( (key) => {
            header += `<th>${key}</th>`;
        });

        header += `<th></th>`;

        return `<tr>${header}</tr>`;
    }

    getTableData() {

        let data = '';

        this.data.forEach(element => {

            data += `<tr>`;

            Object.values(element).forEach( (value) => {
                data += `<td>${value}</td>`;
            });

            data += 
            `<td class="edit-button" data-id="${element.id}">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                </svg>
            </td>`;
            
            data += `</tr>`;
        });

        return data;
    }           
}

customElements.define('table-component', Table);
//el primer nombre 'es el que uso en el html', el Segundo es el que uso en el Js