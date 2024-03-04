
const form = document.querySelector("#searchForm");

form.addEventListener("submit", async function (e) {
    try {        
        e.preventDefault();

        removePrevResult();
        
        const searchValue = this.elements.query.value.trim();
        const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(searchValue)}*`);

        console.log(response.data);
        displayImages(response.data);
        
    } catch (error) {
        console.log("ERROR! CANNOT FIND IMAGE");
    }
    
})

const displayImages = (images) => {
    images.forEach(img => {
        if (img.show.image) { // if that specific property exists, if there's no image or null, then skip this code
            console.log(img.show.image.medium);
            const newImg = document.createElement("img")
            newImg.src = img.show.image.medium;
            document.body.append(newImg);
        }
        
    });
}

const removePrevResult = () => {
    let tempImgs = document.querySelectorAll("img");
    tempImgs.forEach(img => {
        img.parentNode.removeChild(img);
    })
}