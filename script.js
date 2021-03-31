const imageContainer = document.getElementById('img-container');
const loader = document.getElementById('loader')

var photoArray =[];
const count = 10;
const apiKey = 'BbltDyLd9Ga8fvePQkMixXUJs4XZtIoA7yAL51HFgB0'
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

//Showing each object of photoArray
function displayPhotos(){
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
getPhoto();