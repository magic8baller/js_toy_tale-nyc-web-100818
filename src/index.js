const addBtn = document.querySelector('#new-toy-btn')
const toyCollection = document.querySelector('#toy-collection')
const toyForm = document.querySelector('.container')
const url = 'http://localhost:3000/toys'
let addToy = false
let allToys = []

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c help me im trapped in a loaded browzer!', 'color: yellow')

  fetch(url)
    .then(resp => resp.json())
    .then(json => {
      allToys = json
      renderAll(allToys)
    })
})


addBtn.addEventListener('click', () => {
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block';
  } else {
    toyForm.style.display = 'none';
  }
});

function toyTemplate(toy) {
  toyCollection.innerHTML += `
    <div class='card' data-id='${toy.id}'>
      <h2>${toy.name}</h2>
      <img src='${toy.image}' class='toy-avatar'>
      <p><span class='toy-likes'>${toy.likes}</span> Likes</p>
      <button class='like-btn likes' data-id='${toy.id}' data-action='like'>Like <3</button>
      <br>
      <button class='like-btn' data-id='${toy.id}' data-action='delete'>DESTROY THIS SHIT</button>
    </div>
    `
}

function renderAll(toys) {
  toys.map(toyTemplate)
}

function postNewToy(options) {
  fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(options)
    })
    .then(res => res.json())
    .then(toyTemplate)
}

toyForm.addEventListener('submit', e => {
  e.preventDefault()
  let name = e.target.name.value
  let image = e.target.image.value

  const data = {
    "name": name,
    "image": image,
    "likes": 0
  }
  postNewToy(data)
})

function updateLikes(id, likes) {
  fetch(`${url}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      likes
    })
  })
}

toyCollection.addEventListener('click', e => {

  if (e.target.className === 'like-btn') {
    let toyId = e.target.dataset.id
    let toyLikes = e.target.parentElement.querySelector('.toy-likes')

    if (e.target.dataset.action === 'like') {
      toyLikes.textContent = parseInt(toyLikes.textContent) + 1
      let incrementLikes = toyLikes.textContent
      updateLikes(toyId, incrementLikes)

    } else if (e.target.dataset.action === 'delete') {
      e.target.parentElement.remove()
      fetch(`${url}/${toyId}`, {
        method: 'DELETE'
      })
    }
  }
});