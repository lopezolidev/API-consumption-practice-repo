//To-do:
// Create basic fetch function to extract products from the API
// Generate random products selection
// display products images in section
// add buttons functionality to alter the DOM
// implement parameters to select and vary products selection and exploring section


const API_URL_PRODUCTS = "https://api.escuelajs.co/api/v1/products";
//storing api url that we'll be using through this project

const API_URL_CATEGORIES = "https://api.escuelajs.co/api/v1/categories";
//storing categories endpoint (acting as the "favourites" section related to the API consumption course)

const productError = document.querySelector('#productError');
//error span for such cases

const HTTPerrors = {
    'OK': 200,
    'CREATED': 201,
    'BAD_REQUEST': 400,
    'NOT_AUTHORIZED': 401,
    'FORBIDDEN': 403,
    'NOT_FOUND': 404,
    'SERVER_ERROR': 500,
    'SERVICE_UNAVAILABLE': 503,
    'GATEWAY_TIMEOUT': 504,
}


async function fetchData10(){
   try {
    const res = await fetch(`${API_URL_PRODUCTS}?offset=20&limit=10`);
    const data = await res.json();
    //parsed information of the first 20 products

    if(res.status !== HTTPerrors.OK){
        productError.innerText = `Sorry, we had a ${res.status} error`
    }else {
        const image_array = []
        //this image array will be filled with JS created images
    
        for (let i = 0; i < 9; i++){
            let newImg = document.createElement("img")
            //creating image
    
            newImg.classList.add('img',`newImg${i}`);
            //adding a new class
    
            image_array.push(newImg)
            //pushing new images into the array of images
        }
        //for loop to create new images
    
        const productImg = data.map( i => {
            return i.images[Math.floor(Math.random() * 3)]
            //generating random number for selecting an image
        })
        //images array
    
        const images_section = document.querySelector(".images-section")
        //taking from HTML the image section container
    
        image_array.map( image => {
            image.src = productImg[Math.floor(Math.random() * 202)]
            //selecting randomly any image from products image array to insert them in the src attribute of each image in image_array
    
            images_section.appendChild(image);
        })
        //displaying images in the DOM every time we load the page or the button gets clicked
    }
    //in case of no errors the images will display in the DOM
   } catch (err) {
    console.error(`Error: ${err}`)
   }
   //using try/catch as best practice
}

async function fetchCategories(){
    const res = await fetch(`${API_URL_CATEGORIES}/1`);
    const data = await res.json();
    //fetching from categories to test "favourites" property

    if (res.status !== HTTPerrors.OK){
        productError.innerText = `Sorry, we had a ${res.status} error`
    } else {
        console.log(data)
    //fetching first category

    }
}

fetchData10()
fetchCategories()