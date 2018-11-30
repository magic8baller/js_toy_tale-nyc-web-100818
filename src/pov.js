


// helpers

// 1- index has div with the id "toy-collection"
// 2- When the page loads, make a 'GET' request to fetch all toy objects. 
//page load = DOMContentLoaded !
// 3- With the response data, make a <div class="card"> for each toy and add it to the toy-collection div.

const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.getElementById('toy-collection')
let addToy = false // toggle true/false
const toyUrl = 'http://localhost:3000/toys'
const realForm = document.querySelector('.add-toy-form')

// YOUR CODE HERE

document.addEventListener('DOMContentLoaded', init());

  function init() {
    //check it werx
    console.log('DOM CONTENT LOADEDd');
    requestData().then(json => {
      json.map(createTemplate) // this was impt!!!
    })
}

addBtn.addEventListener('click', () => {
  // hide & seek with the form - toggle
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    realForm.addEventListener('submit', createToy)
  } else {
    toyForm.style.display = 'none'
  }
})



x
// 1- get all toys
//1st thing: fetch(url) -> returns Promise
// const toyUrl = 'http://localhost:3000/toys'

// GET is implied- dont need to add as 2nd arg
// promise =>  data we need
// fetch('http://localhost:3000/toys', {method: 'GET'})
// here: fetch data about all of them, then iterate over the
// return fetch -  bc returns Promise
function requestData() {
return fetch(toyUrl).then(res => res.json())
//.then((json) => {
//   //will map thru toy colln, createTemplate helper fn -> need 2 make
//   json.map(createTemplate)
// })
}


//make template! -> render all toys
// likes: interp
function createTemplate(toy){
  //add data-id class to div to access toy id!
  toyCollection.innerHTML += `
  <div data-id='${toy.id}' class='card'>
    <h3>${toy.name}</h3>
    <img src='${toy.image}' class='toy-avatar'>
    <p>${toy.likes} Likes</p>
    <button class="like-btn">Like <3</button>
    <button class="like-btn delete">NO THX --</button>
  </div>
  `
  
}
// 4- add new toy
// post via fetch
//OPTIMISTICALLY(coniditionally) render

const createToy = (e) => {
  e.preventDefault()
let inputs = document.querySelectorAll('.input-text')
let name = inputs[0].value
let image = inputs[1].value

let data = {
  name: name,
  image: image,
  likes: 0
}



//1- method of request? 2-body = what data is being sent to the server? 3- type of data u are looking for (eg couldve been /text)

// optimistic render:
//createTemplate(data)
// post input values to API
//fetch method: post
// get input values

createTemplate(data)


fetch(toyUrl, {
  method: 'POST',
  body: JSON.stringify(data),
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
// }).then(console.log)
//pessimistic = good for ids!
}).then(res => res.json()) //= 1 toy obj
.then(createTemplate) //NO ()
}


//likes and patch

function increaseLikes(e) {
 if(e.target.className === 'like-btn') {
   let id = e.target.parentElement.dataset.id
e
  }
}
toyCollection.addEventListener('click',(e) => {
  if (e.target.className === "like-btn delete"){
    deleteToy(e.target.parentElement.dataset.id)
  }else if(e.target.className === "like-btn") {
    increaseLike(e.target.parentElement.dataset.id)
  }
})



//nooooooooooo

//Global vars
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.getElementById('toy-collection')
let addToy = false // toggle true/false
const toyUrl = 'http://localhost:3000/toys'
const realForm = document.querySelector('.add-toy-form')




//DOM + initialized fns
document.addEventListener('DOMContentLoaded', init())

function init() {
  console.log('help me i am trapped in this loaded web browser!')
  requestData().then(json => json.map(createTemplate))
}

addBtn.addEventListener('click', () => {
  // hide & seek with the form - toggle
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    realForm.addEventListener('submit', createToy)
  } else {
    toyForm.style.display = 'none'
  }
})



// fetch data 

function requestData() {
  return fetch(toyUrl).then(response => response.json())
}

// POST data=> templating
const postRequest = () => {
fetch(toyUrl, {
  method: 'POST',
  body: JSON.stringify({
    name: name,
    image: image,
    likes: 0
  }),
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
  //resp.json() = 1 toyObj
}).then(resp => resp.json()).then(createTemplate)
//pessimistic rendering = good if using ids!
}


//update DOM
// render 1
function createTemplate(toy){
  //add data-id class to div to access toy id!
  toyCollection.innerHTML += `
  <div data-id='${toy.id}' class='card'>
    <h3>${toy.name}</h3>
    <img src='${toy.image}' class='toy-avatar'>
    <p>${toy.likes} Likes</p>
    <button class="like-btn">Like <3</button>
    <button class="like-btn delete">NO THX --</button>
  </div>
  `  
}


//updateServer
const createToy = (toy) => {
  let inputs = document.querySelectorAll('.input-text')
  let name = inputs[0].value
  let image = inputs[1].value
  
  let data = {
    name: name,
    image: image,
    likes: 0
  }

  createTemplate(toy) 
  postRequest(toy)
}
