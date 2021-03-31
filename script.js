const imageContainer = document.getElementById('img-container');
const loader = document.getElementById('loader')

let imagesAreReady= false;
let imagesNoLoaded = 0;
let totalImages = 0;
var photoArray =[];
const count = 10;
const apiKey = 'BbltDyLd9Ga8fvePQkMixXUJs4XZtIoA7yAL51HFgB0'
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

//Checking if images are loaded
function imageLoaded(){
    imagesNoLoaded++;
    if(imagesNoLoaded === totalImages){
        imagesAreReady= true;
        loader.hidden = true;
    }
}
//Showing each object of photoArray
function displayPhotos(){
    imagesNoLoaded = 0;
    totalImages = photoArray.length;
    photoArray.forEach((photo)=>{     
        // create a to link to unsplash
        const item = document.createElement('a');     
        item.setAttribute('href', photo.links.html)
        item.setAttribute('target', '_blank')
        //create image for photo
        const imge = document.createElement('img')
        imge.setAttribute('src', photo.urls.regular)
        imge.setAttribute('alt', photo.alt_description)
        imge.setAttribute('title', photo.alt_description)
        //Check if image is loaded
        imge.addEventListener('load', imageLoaded)
       // put img inside <a> then put both inisde img-container
        item.appendChild(imge);
        imageContainer.appendChild(item);
    })
}
// Getting Photos from Unsplash API
async function getPhoto(){
    try{
        const response = await fetch(apiURL);
        photoArray = await response.json();
        // console.log(photoArray)
        displayPhotos();
    }
    catch(error){
        console.log("error is: ",error)
    }
}

//check if scrolling is near bottom
window.addEventListener('scroll', ()=>{
        if(window.innerHeight + window.scrollY >= document.body.offsetHeight-1000 && imagesAreReady){
              imagesAreReady = false;
              getPhoto();
        }
})
getPhoto();