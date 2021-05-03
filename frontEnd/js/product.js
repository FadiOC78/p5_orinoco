// RETRIEVING URL PARAM
const urlParams = new URLSearchParams(window.location.search) 
const productId = urlParams.get("given_id") 

// URL INIT
let url = `http://localhost:3000/api/cameras/${productId}` 


// RECOVERY OF THE PRODUCTS
fetch(url, {method : 'GET'})
.then(data => {
	return data.json()

// OBJETS INTO JSON
}).then(article =>{

	// VARIABLE REPLACEMENT CODE
	let HTML = document.getElementById("object")

	let newHTML = ""

	// PRICE MODIFICATION
	let originalPrice = article.price /100
  	let newPrice = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(originalPrice)

  	// HTML MODIFICATION
  	myHTML = `<img src="${article.imageUrl}" />
				<!--content-->
				<form id="description">
					<div class="desc-product">
						<div>
							<h2>${article.name}</h2>
							<p>${newPrice}</p>
						</div>
						<div>
							<!--dropdown list-->
							<label for="lenses">Choisissez la lentille</label><br>
							<select name="lenses" id="lenses">
							</select>
						</div>
					</div>
					<p>${article.description}</p>
					<!--Submit Button-->
					<button id="addtobasket" type="submit">Ajouter au Panier</button>
				</form>`

	HTML.innerHTML = myHTML

	// OPTIONS MOFIFICATIONS
	// VARIABLE REPLACEMENT CODE
	let option = document.getElementById("lenses")
	let newoption = ""

	// OPTIONS INIT
	article.lenses.forEach(optionLenses =>{
		newoption += `<option value="${optionLenses}">${optionLenses}</option>`
	}) 

	option.innerHTML = newoption

	// SELECTION FORM
	const form = document.querySelector('form');

	// CLICK REACTION
	form.addEventListener("submit", event => {
		event.preventDefault()
		let selectLenses = event.target.lenses.value

        if (localStorage.getItem('basket')){
            basket = JSON.parse(localStorage.getItem('basket')); // TRANSFORM THE LOCAL STORAGE STRING INTO OBJET
        } 

		if (!Array.isArray(basket)) { // IF NTO AN ARRAY, GIVE ME AN ARRAY
			basket = [];
		}
// WE CAN PUSH INTO AN ARRAY
        basket.push(article);

        localStorage.setItem('basket', JSON.stringify(basket));

		alert('Article ajouté au panier')
	})
})
.catch(function(error) {
  alert('Ressource non trouvée')
})
