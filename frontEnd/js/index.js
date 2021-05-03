// INITIALIZATION OF THE URL
let url = 'http://localhost:3000/api/cameras' 

// RECOVERY OF THE PRODUCTS
fetch(url)
.then(data => {
	return data.json()

// OBJECTS TO -> JSON
}).then(products =>{

	// VARIABLE REPLACEMENT CODE
	let HTML = document.getElementById("products")

	let myHTML = ""

	// ADD PRODUCTS FOREACH
	products.forEach(product =>{

		// PRICE MODIFICATION WHEN ADDING TO BASKET
		let originalPrice = product.price /100
  		let newPrice = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(originalPrice)

		// HTML MODIFICATION
		myHTML += `<figure>
						<img src="${product.imageUrl}" alt="${product.name}">
						<figcaption>
							<h2>${product.name}</h2>
							<p>${newPrice}</p>
							<a href="product.html?given_id=${product._id}">Voir le produit</a>
						</figcaption>
					</figure>`
	}) 
	HTML.innerHTML = myHTML
})
.catch(function(error) {
  alert('Element non trouvé')
})