const api = axios.create({
    baseURL: 'https://api.escuelajs.co/api/v1'
})
//configuring AXIOS basic data as default

const API_URL_UPLOAD = "https://api.escuelajs.co/api/v1/files/upload";

const API_URL_PRODUCTS = "https://api.escuelajs.co/api/v1/products";
//storing api url that we'll be using through this project

const API_URL_CATEGORIES = "https://api.escuelajs.co/api/v1/categories";
//storing categories endpoint (acting as the "favourites" section related to the API consumption course)

async function fetchCategories(){
    const res = await fetch(`${API_URL_CATEGORIES}`);
    const data = await res.json();
    //fetching from categories to test "favourites" property

    if (res.status !== HTTPerrors.OK){
        productError.innerText = `Sorry, we had a ${res.status} error`
    } else {
        // console.log(data)
    //fetching first category

    }
}


async function getASingleProduct(num){
    const res = await fetch(`${API_URL_PRODUCTS}/${num}`);
    const data = await res.json();

    console.log(data)
}

getASingleProduct(251)
// just as an example

async function uploadNewProduct(){
    const res = await api.post('/products',{
        "title": "A brand new special digital product",
        "price": 9999999,
        "description": "some random descrition",
        "categoryId": 2,
        "images": ["https://placeimg.com/640/480/tech"]
    })
    //axios is simpler to use just by sending the method directly when calling the instance, also first parameter is the missing part of our API to facilitate the process of storing our URL and as second argument we send the body that axios already stringifyies for us
    
    if (res.status !== HTTPerrors.OK && res.status !== 201){
        productError.innerText = `Sorry, we had a ${res.status} error about ${res.data}`
    }  else {
        console.log(res.status)
        console.log('the product was succesfully uploaded!')
    }
}

uploadNewProduct();