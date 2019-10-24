const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const TOYS_URL = "http://localhost:3000/toys"
let addToy = false

let form = document.querySelector(".add-toy-form");
form.addEventListener("submit", handleSubmit);

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block';
  } else {
    toyForm.style.display = 'none'
  }
})

document.addEventListener('DOMContentLoaded', () => {		
    fetchToys();
})

function fetchToys() {
  return fetch(TOYS_URL)
          .then(resp => resp.json())
          .then (json => renderToys(json));  
}

function renderToys(toys) {
	toys.forEach((toy) => {renderToyCard(toy)});
}

function renderToyCard(toy) {
	const collection = document.getElementById("toy-collection");
	const card = document.createElement("div");
	card.setAttribute('class', "card");
	card.setAttribute("data-id", `${toy.id}`);

	const h = document.createElement("h2");
	h.innerHTML = toy.name;

	const img = document.createElement("img");
	img.className = "toy-avatar";
	img.src = toy.image;

	const p = document.createElement("p");
	p.innerHTML = `${toy.likes} likes`;

	const likeBtn = document.createElement("button");
	likeBtn.addEventListener("click", handleLike);
	likeBtn.setAttribute("data-id", toy.id);
	likeBtn.className = "like-btn";
	likeBtn.innerHTML = "Like";

	const deleteBtn = document.createElement("button");
	deleteBtn.addEventListener("click", handleDelete);
	deleteBtn.setAttribute("data-id", toy.id);
	deleteBtn.className = "delete-btn";
	deleteBtn.innerHTML = "Delete";

	collection.appendChild(card);

	card.appendChild(h);
	card.appendChild(img);
	card.appendChild(p);
	card.appendChild(likeBtn);
	card.appendChild(deleteBtn);
}

function handleSubmit(e){
  e.preventDefault()
  let toyFormData = {
	  								name: e.target.name.value,
	     						  image: e.target.image.value
  									}
  addNewToy(toyFormData);
  document.querySelector(".add-toy-form").reset();
  return false;
}

function addNewToy(toy) {
	let options = {
									method: "POST",
									headers: 
													{
														 "Content-Type": "application/json",
															Accept: "application/json"
													},
									body: 	JSON.stringify({
											      name: toy.name,
											      image: toy.image,
											      likes: 0
											    })
	}
  fetch(TOYS_URL, options)
          .then(resp => resp.json())
          .then (json => renderToyCard(json))
          .catch(err => console.log(err));
}

function handleLike(e) {
  let moreLikes = parseInt(e.target.previousElementSibling.innerText) + 1;

  let options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: moreLikes
    })
    }

  fetch(TOYS_URL + `/${e.target.dataset.id}`, options)
    .then(resp => resp.json())
    .then(data => {
      e.target.previousElementSibling.innerText = `${moreLikes} likes`
    });
}

function handleDelete(e) {
		let toyObj = {
				 "id": e.target.parentElement.dataset.id
		};
    let options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(toyObj)
    };

    fetch(TOYS_URL + `/${toyObj.id}`, options)
        .then(res => res.json())
        .then(obj => console.log(`Removed toy ${toyObj.name} with id ${toyObj.id}!`))
        .catch(err => console.log(err));

    e.target.parentElement.remove();

}




