const imageContainer = document.getElementById('img-container');

let photoArray =[];

const count = 10;
const apiKey = 'BbltDyLd9Ga8fvePQkMixXUJs4XZtIoA7yAL51HFgB0'
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`


//Helper function to set Attributes to elements
function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttributes(key, attributes[key])
    }
}
//Showing each object of photoArray
function displayPhotos(){
    photoArray.forEach((photo)=>{
        // create a to link to unsplash
        const item = document.getElementById('a');  
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        })
        //create image for photo
        const img = document.getElementById('img');
        setAttributes(img,{
            src: photo.urls.regular,
            alt: photo.alt.description,
            title: photo.alt.title
        })
        //put img inside <a> then put both inisde img-container
        item.appendChild(img);
        imageContainer.appendChild(item);   




    })
}

// Getting Photos from Unsplash API
async function getPhoto(){
    try{
        const response = await fetch(apiURL);
        photoArray = await response.json();

        displayPhotos();
    }
    catch(error){

    }
}
getPhoto();