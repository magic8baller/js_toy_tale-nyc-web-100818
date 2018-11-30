

// VARIABLES
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector('#toy-collection')
let addToy = false
const toysUrl = 'http://localhost:3000/toys'
let newToy = {
  name: '',
  image: '',
  likes: 0
}
let likesBtn = document.querySelector('button')


const toyTemplate = (toy) => {
  toyCollection.innerHTML += `
  <div class='card'>
    <h3>${toy.name}</h3>
    <img src='${toy.image}' class='toy-avatar'>
    <p>${toy.likes} Likes</p>
    <button class='like-btn'>Like <3</button>
    <button class='like-btn delete' data-id='${toy.id}'>NO THX --</button>
  </div>
  `


}


// EVENT LISTENERS

//2- update dom - dom is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('help me i am trapped in this loaded web browser!')
  // render
  getToys(toysUrl).then(json => json.map(toyTemplate))
})

// form behavior - can target scope
addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    //target form scope- has own event listener for SUBMIT!
    // submit listener
    const form = toyForm.querySelector('.add-toy-form')
    form.addEventListener('submit',(e) => {
      e.preventDefault()
      //update newToy object
      newToy.name = form.querySelector("input[name='name']").value
      newToy.image = form.querySelector("input[name='image']").value
      // submit and add to DB
      addToyToDb(toysUrl, newToy)
      // .then(data => console.log(data))
})
  } else {
    toyForm.style.display = 'none'
  }
})

// likesBtn.addEventListener('click', (e) => {
//   let toyId = e.target.dataset.id

// })

// const findLikes = (toyId) => {
//   let currentToy = 
// }

// function requestData() {
  // return fetch(toyUrl).then(res => res.json())

// ./.DOMContentLoaded.. (e) =>
//     requestData().then(json => {
  // json.map(toyTemplate) 
// does render all for u basically?

