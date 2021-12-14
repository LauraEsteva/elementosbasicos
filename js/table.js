export const table = () => {
    window.addEventListener('load', () =>{

        let tables = document.querySelectorAll("#tabla");
        if(tables){
            tables.forEach(table => {
                let url = table.dataset.url;
                // let headers = JSON.parse(table.dataset.headers);
                sendGetRequest();
                let sendGetRequest = async () => {
            
                    let request = await fetch(url, {
                        method: 'GET', 
                        headers:{
                            "Authorization" : "Bearer " + localStorage.getItem("token"),
                        }
                    })
                    .then(response => {
                        if (!response.ok) throw response;
                        console.log(response.data);
                        return response.json();
                    })
                    .then(json => {
                        // console.log(headers);
                        console.log(json.data);
                    });                    
                };
            });        
        };
    });
}
    