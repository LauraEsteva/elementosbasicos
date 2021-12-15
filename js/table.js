export const table = () => {
    window.addEventListener("load", () =>{

        let tables = document.querySelectorAll(".tabla");

        if(tables){

            tables.forEach(table => {

                let url = table.dataset.url;
                
                let sendGetRequest = async () => {
            
                    let request = await fetch(url, {
                        method: 'GET', 
                        headers:{
                            "Authorization" : "Bearer " + localStorage.getItem("token"),
                        }
                    })
                    .then(response => {
                        if (!response.ok) throw response;

                        return response.json();
                    })
                    .then(json => {

                        console.log(json.data);
                        let data = json.data;
                        let tableElement = document.createElement('table');
                        let tableHeader = document.createElement('tr');
                        tableElement.appendChild(tableHeader);

                        data.forEach( row => {
                            console.log(row);
                        })

                        Object.keys(data).forEach( (key) =>{

                            console.log(key);
                            let tableHeaderElement = document.createElement('th');
                            tableHeaderElement.textContent = key;
                        })                        

                    })

                    
                //    .then(json => {
                //        console.log(json.data);
                //    })


               //     .then(json => {
                //        console.log(json.data);
                //        let users = json.data;

                //        Object.keys(users).forEach( (key) =>{
                //            let headerTable = document.createElement('th');
                //            headerTable.textContent = [key];
                //            users.insertAdjacentElement('beforeend', errorMessage);
                //            document.querySelector(`[name=${key}]`).classList.add("error");
                //        })

                //    })
                    .catch(error => {
                    
                        console.log(error);
                    });                    
                };
                sendGetRequest();
            });        
        };
    });
}

    