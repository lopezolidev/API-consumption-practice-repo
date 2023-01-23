const api = axios.create({
    baseURL: 'https://api.escuelajs.co/api/v1'
})
//configuring AXIOS basic data as default

//To-do:
// Create basic fetch function to extract products from the API
// Generate random products selection
// display products images in section
// add buttons functionality to alter the DOM for favourites and deletion

const API_URL_UPLOAD = "https://api.escuelajs.co/api/v1/files/upload";

const API_URL_PRODUCTS = "https://api.escuelajs.co/api/v1/products";
//storing api url that we'll be using through this project

const API_URL_CATEGORIES = "https://api.escuelajs.co/api/v1/categories";
//storing categories endpoint (acting as the "favourites" section related to the API consumption course)

const productError = document.querySelector('#productError');
//error span for such cases

const images_section = document.querySelector(".images-section")
//taking from HTML the image section container

const favorites_section = document.querySelector(".favorite-imgs");
//favorite images section

const deleteBtn = document.querySelector("body > section.favorites-section > button");
//delete favorite images button

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
    const res = await fetch(API_URL_PRODUCTS);
    const data = await res.json();
    //parsed information of the first 20 products

    if(res.status !== HTTPerrors.OK){
        productError.innerText = `Sorry, we had a ${res.status} error`
    }else {
        const image_array = []
        //this image array will be filled with JS created images
    
        for (let i = 0; i < 9; i++){
            const wrapper = document.createElement('div')
            //image container

            wrapper.classList.add('img-container')
            //adding class to wraper

            const newImg = document.createElement("img")
            //creating image
    
            const fav = document.createElement('div')
            fav.classList.add('fav-container');
            //creating fav element on every image

            fav.addEventListener('click', (e) => {
                selectedProducts(e)
            })
            //adding event of click to make the image a favorite

            newImg.classList.add('img',`newImg${i}`);
            //adding a new class

            wrapper.append(newImg, fav)
            //appending newImg and fav icon into the container

            image_array.push(wrapper)
            //pushing new images into the array of images
        }
        //for loop to create new images
    
        const productImg = data.map( i => {
            return i.images[Math.floor(Math.random() * 3)]
            //generating random number for selecting an image
        })
        //images array
    
        image_array.map( imageContainer => {
            imageContainer.children[0].src = productImg[Math.floor(Math.random() * 200)]
            //selecting randomly any image from products image array to insert them in the src attribute of each image in image_array.
            //to be precise, selecting through the children nodes and setting the src attribute to the first child

            if (imageContainer.children[0].src == "http://127.0.0.1:5500/src/undefined"){
                imageContainer.removeChild(imageContainer.children[0])
                //removing the image if no url is found, therefore no "teared image" appears
            }
        })
        images_section.append(...image_array)
        //displaying images in the DOM every time we load the page or the button gets clicked
        //using spread operator we can load the images in the DOM only once, therefore reducing the load on the DOM API
    }
    //in case of no errors the images will display in the DOM
   } catch (err) {
    console.error(`Error: ${err}`)
   }
   //using try/catch as best practice
}


fetchData10()
//fetching products the moment the tab loads


function selectedProducts(e) {
    const wrapper = e.srcElement.parentElement;
    wrapper.classList.toggle('selected')

    console.log({wrapper})
    // TO RETURN WRAPPER
}

function renderFavorites(){

    const selected = images_section.cloneNode(true)
    //taking images_section as the container we'll resort, also creating as a clone to not cut images from the original images_section

    const imagesArray = [...selected.children]
    //turning into an iterable the children of the selected images section, making it the images list

    const favorites = imagesArray.filter( img => {
        if(img.classList[1]){
            const bar1 = document.createElement('div');
            const bar2 = document.createElement('div');
            const bar3 = document.createElement('div');
            bar1.classList.add('b');
            bar2.classList.add('b');
            bar3.classList.add('b');
            //creating internal bars for effect
        
            const deleteIcon = document.createElement('div');
            deleteIcon.classList.add('delete-icon');
            deleteIcon.append(bar1, bar2, bar3)
            //delete icon container with children
        
            deleteIcon.addEventListener('click', (e) => {
                deleteProduct(e);
            })
            //adding event on the delete icon to select images

            img.append(deleteIcon)
            //appending deleting icon

            img.addEventListener('click', e => {
                selectedProducts(e)});
            img.classList.toggle('selected')
            return img;
            //removing class selected and returning the image
        }
    })
    //storing as favorites the images that are selected 

    const original = [...images_section.children];
    //creating iterable variable related to original images section

    original.map( img => {
        if(img.classList.contains('selected')){
            img.classList.toggle('selected');
        }  
    })
    //toggling original selected class from random images section to leave the favorite section with those images

    favorites_section.append(...favorites)
    //appending images to favourites section
}

function deleteImgs(){
    const children = [...favorites_section.children];
    //turning into array a node list

    children.forEach(img => {
        if(img.classList.contains('selected')){
            img.remove()
        }
    })
    //removing images from favourites section
}

function deleteProduct(e){
    const card = e.target.parentElement;
    card.remove()
}

// Upload product picture function

async function uploadProductPic(){
    const form = document.getElementById("uploadingForm");
    const form_Data = new FormData(form);

    console.log(form_Data.get('file'));

    const res = await fetch(API_URL_UPLOAD, {
        method: "POST",
        headers: {
            "Content-type": "multipart/form-data"
        },
        body: {
            "file": form_Data,
        }
    });

    const data = await res.json();

    if (res.status !== HTTPerrors.OK && res.status !== 201){
        productError.innerText = `Sorry, we had a ${res.status} error about ${data.message}`
        console.log({data})
    } else {
        console.log("Your image was uploaded!");
        console.log({ data });
        console.log(data.url);
        //we can call the render favourites images here to load them in favourites section
    }
}

// DELETION event

deleteBtn.addEventListener('click', () => {
    deleteImgs()
})
