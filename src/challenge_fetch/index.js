const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// const hdrs = new Headers();
// hdrs.append('Content-type', 'application/json')
// hdrs.append('cors', 'no-cors')
// hdrs.append('credentials', 'omit')
// console.log(hdrs)

// const parameters = {
//     method: 'GET',
//     hdrs,
//     // body: JSON.stringify({
        // "title": "New Product",
        // "price": 10,
        // "description": "A description",
        // "categoryId": 1,
        // "images": ["https://placeimg.com/640/480/any"]
//     // })
// }

const API_URL_PRODUCTS = "https://api.escuelajs.co/api/v1/products";

// function fetchData(urlApi){
//     const hrds = new Headers({
//         'Content-Type': 'application/json',
//     })
//     const req = new Request(urlApi, hrds)
//     return new Promise((resolve, reject) => {

//     })
// }


async function fetchCustom(){
    const requ = new Request(`${API_URL_PRODUCTS}/`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            "title": "New Product",
            "price": 10,
            "description": "A description",
            "categoryId": 1,
            "images": ["https://placeimg.com/640/480/any"]
        })
    });
    const res = await requ.json()
    console.log(res)
}
fetchCustom()


//using XMLHTTPRequest
async function customFetch(urlApi){
    const xhttp = new XMLHttpRequest();

    const req = new Request(urlApi, init = {});

    const hdrs = new Headers();
    hdrs.append('Content-type', 'application/json')
    hdrs.append('cors', 'no-cors')
    hdrs.append('credentials', 'omit')

    xhttp.open(req.method, urlApi, true)

    xhttp.onreadystatechange = function (ev){
        if(xhttp.readyState === 4 && xhttp.status === 200){
            const res = JSON.parse(xhttp.responseText);
            console.log(res)
        }
        else {
            console.error(ev)
        }
    }
    xhttp.send()
}

customFetch(API_URL_PRODUCTS)

// function fetchData(urlApi, callback) {
//     let xhttp = new XMLHttpRequest();
  
//     xhttp.open('GET', urlApi, true);
//     xhttp.onreadystatechange = function (event) {
//       if (xhttp.readyState === 4) {
//         if (xhttp.status === 200) {
//           callback(null, JSON.parse(xhttp.responseText));
//         } else {
//           const error = new Error('Error' + urlApi);
//           return callback(error, null);
//         }
//       }
//     }
//     xhttp.send();
//   }