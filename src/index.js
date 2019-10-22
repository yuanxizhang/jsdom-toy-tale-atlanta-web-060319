const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const TOYS_URL = "http://localhost:3000/toys"
let addToy = false

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
		let form = document.querySelector(".add-toy-form");
  	form.addEventListener("submit", handleSubmit);
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
	const list = document.getElementById("toy-collection");
	const card = document.createElement("div");
	card.setAttribute('class', "card");
	card.setAttribute("data-id", `${toy.id}`)

	const h = document.createElement("h2");
	h.innerHTML = toy.name;
	const img = document.createElement("img");
	img.className = "toy-avatar";
	img.src = toy.image;

	const p = document.createElement("p");
	p.innerHTML = `${toy.likes} likes`
	const likeBtn = document.createElement("button");
	likeBtn.className = "like-btn";
	likeBtn.innerHTML = "like";

	list.appendChild(card);

	card.appendChild(h);
	card.appendChild(img);
	card.appendChild(p);
	card.appendChild(likeBtn);
}

function handleSubmit(e){
  e.preventDefault()
  let toyFormData = {
  								name: e.target.name.value,
     						  image: e.target.image.value
  							}
  addToyCard(toyFormData);

}

function addToyCard(toy) {
	options = {
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
          .then (json => renderToyCard(json));
}


