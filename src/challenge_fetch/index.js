const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const API_URL_PRODUCTS = "https://api.escuelajs.co/api/v1/products";

//using XMLHTTPRequest to "clone" Axios
class customFetch { 
    constructor(){
        this.methods = {
            get: 'GET',
            post: 'POST',
            put:'PUT',
            delete: 'DELETE',
        }
        //instancing the prototype with its methods to access them when its needed during the requests
    }
    get({
        urlApi,
        id = null,
        params = null,
        addition = null,
    }){ 
        this.#call({
            urlApi, id, params, addition, method: this.methods.get
        })
        //calling private method to make xhttp request with its corresponding HTTP method
    }
    put({
        urlApi,
        id = null,
        params = null,
        addition = null,
    }){
        this.#call({
            urlApi, id, params, addition, method: this.methods.put
        })
    }
    post({
        urlApi,
        id = null,
        params = null,
        addition = null,
    }){
        this.#call({
            urlApi, id, params, addition, method: this.methods.post
        })
    }
    del({
        urlApi,
        id = null,
        params = null,
        addition = null,
    }){
        this.#call({
            urlApi, id, params, addition, method: this.methods.delete
        })
    }
    #call({
        urlApi,
        id = null,
        params = null,
        addition = null,
        method = null,
    }){
        const xhttp = new XMLHttpRequest();
        //creating XMLHttpRequest instance

        let newApi = urlApi;
        //storing urlApi as a variable to concat it with another variable

        if(addition){
            let newApi = `${urlApi}/ + ${id}`;
            //newApi will be the sum of both variables
        }

        xhttp.open(method, newApi, true);
        //opening the asynchronous communication with the newApi variable and the method pointed in the call of ' #call ' method

        xhttp.setRequestHeader('Content-type', 'application/json');
        //sending headers

        xhttp.onreadystatechange = function (ev){
            if(xhttp.readyState === 4) {
                if(xhttp.status === 200) {

                const res = JSON.parse(xhttp.responseText);

                console.log(res)
                //parsing and recieving in console result of xhttp request
            }
                else {
                    console.error(ev)
                }
            }
        }

        let stringified = JSON.stringify(params);
        //converting into a string the body of the request

        xhttp.send(stringified)
        //sending body
    }
}

const custom = new customFetch();
//instancing class

custom.get({urlApi: API_URL_PRODUCTS})
//getting the list of all products

custom.put({
    urlApi: API_URL_PRODUCTS,
    id: 62,
    params: {
        "title": "Change title",
        "price": 100
    },
})
//updating a product

custom.post({
    urlApi: API_URL_PRODUCTS,
    params: {
        "title": "New Product",
        "price": 10,
        "description": "A description",
        "categoryId": 1,
        "images": ["https://placeimg.com/640/480/any"]
    }
})
//creating a product

custom.del({
    urlApi: API_URL_PRODUCTS,
    id: 62,
    addition: 62
})
//deleting a product

