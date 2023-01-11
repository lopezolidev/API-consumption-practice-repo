//To-do:
// Create basic fetch function to extract products from the API
// Generate random products selection
// display products images in section
// add buttons functionality to alter the DOM
// implement parameters to select and vary products selection and exploring section


const API_URL = "https://api.escuelajs.co/api/v1/products";
//storing api url that we'll be using through this project

async function fetchData(){
    const res = await fetch(API_URL);
    const data = await res.json();
    //parsed information of products

    const image_array = []
    //this image array will be filled with JS created images

    for (let i = 0; i < 10; i++){
        let newImg = document.createElement("img")
        //creating image

        newImg.classList.add('newImg')
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

fetchData()
