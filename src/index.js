// const { selectNode } = require("happy-dom/cjs/PropertySymbol.cjs")

// index.js
const baseURL = "http://localhost:3000/ramens"
// Callbacks
const handleClick = (eachRamen) => {
    const ramenImg = document.getElementsByClassName("detail-image")
    const ramenName = document.getElementsByClassName("name")
    const ramenResto = document.getElementsByClassName("restaurant")
    const comment = document.getElementById("comment-display")
    const rating = document.getElementById("rating-display")
    ramenImg[0].src = eachRamen.image
    ramenName[0].textContent = eachRamen.name
    ramenResto[0].textContent = eachRamen.restaurant
    comment.textContent = eachRamen.comment
    rating.textContent = eachRamen.rating
}

const submitListenerCallback = (e) => {
  e.preventDefault()

  const newName = document.getElementById("new-name")
  const newResto = document.getElementById("new-restaurant")
  const newImage = document.getElementById("new-image")
  const newRating = document.getElementById("new-rating")
  const newComment = document.getElementById("new-comment")
  let newRamen = {
    name: newName.value,
    restaurant: newResto.value,
    image: newImage.value,
    rating: newRating.value,
    comment: newComment.value,
  }

  renderRamen(newRamen)
  fetch(baseURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(newRamen)
      })
       .then((resp) => resp.json())
       .then((ramen) => console.log(ramen)) 
}

const addSubmitListener = () => {
    // Add code
    document.getElementById("new-ramen").addEventListener("submit", submitListenerCallback)
}

function renderRamen(ramens){
  const ramenMenu = document.getElementById("ramen-menu")
  const ramenImg = ramens.image
  const imageTag = document.createElement("img")
  imageTag.src = ramenImg
  imageTag.id = ramens.id
  ramenMenu.append(imageTag)
  imageTag.addEventListener("click", () => handleClick(ramens))
}


const displayRamens = () => {
  // Add code
  fetch(baseURL)
  .then((resp) => resp.json())
  .then((ramens) => {
    ramens.forEach(eachRamens => renderRamen(eachRamens));
    handleClick(ramens[0]);
  })
  };

const main = () => {
  document.addEventListener('DOMContentLoaded', () => {
    // Invoke displayRamens here
    displayRamens()
    // Invoke addSubmitListener here
    addSubmitListener()
  })
};

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};


// function patchRamen(ramen){
//   fetch(`baseURl+${ramen.id}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//       "Accept": "application/json"
//     },
//     body: JSON.stringify(ramen)
//   })
//    .then((resp) => resp.json())
//    .then((ramen) => console.log(ramen)) 
// }
