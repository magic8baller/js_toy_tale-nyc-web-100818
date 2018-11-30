// 1- fetch data -fn- server
const getToys = (url) => {
  return fetch(url)
    .then(response => response.json()) //fetch doy list data
}

// create new toy
const addToyToDb = (url, newToy) => {
  return fetch(url, {
    method: 'POST',
    headers: 
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      //pass obj for newtoy & convert to send data
    body: JSON.stringify(newToy)
  }).then(resp => resp.json()) 
}

// // create new 'likes'
// const likeToyUpdate = (e) => {
//   let likes = e.currentTarget.dataset.id
//   return fetch(`toysUrl/${id}`, {
//     method: 'PATCH',
//     headers: 
//       {
//         "Content-Type": "application/json",
//         Accept: "application/json"
//       },
//       //pass obj for newtoy & convert to send data
//     body: JSON.stringify({likes: ++likes}) // {likes: likes}
//   }).then(resp => resp.json())
//   .then(data => console.log(data))
// }

// const updateLikes = (likesId, newLikesCount) => {
//   let likesId = likesBtn.dataset.id
//   let ele;
// }