// RECOVERY OF THE BASKET
let basket = JSON.parse(localStorage.getItem('basket'))

// REPLACEMENT VARIABLE CODE
let HTML = document.getElementById("ordered_articles")
let myHTML = ""

const totalAmount = function(basket){
	let total = 0;
	basket.forEach(article => total += article.price);
	return total / 100;
}

let totalPrice = document.getElementById("total_price")
let newTotalPrice = 0

const basketToEmpty = document.getElementById("basketToEmpty");
basketToEmpty.addEventListener('click', () => {
	localStorage.setItem('basket', null); // vide LOCALSTORAGE
	basket = [];
	document.getElementById('ordered_articles').innerHTML = ''; // enléve les articles du pannier lors du click
	totalPrice.innerHTML = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(totalAmount(basket));
});

// TOTAL PRICE
basket.forEach(article_order =>{
	
	// MODIFICATION OF THE PRICE
  	let newPrice = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(article_order.price /100)

  	// MODIFICATION OF THE HTML
  	myHTML += `<div class="ordered_article">
				<img src="${article_order.imageUrl}" alt="Appareil photo">
				<div>
					<div>
						<h3>${article_order.name}</h3>
						<p>${article_order.color}</p>
					</div>
					<p>${newPrice}</p>
				</div>
			</div>`

	HTML.innerHTML = myHTML
})
totalPrice.innerHTML = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(totalAmount(basket));



// INITIALIZATION OF ALL VARIABLES
let firstName = document.getElementById('firstName')
let lastName = document.getElementById('lastName')
let email = document.getElementById('email')
let address = document.getElementById('address')
let city = document.getElementById('city')
let btnOrder = document.getElementById("order")

let firstNameValid = ""
let lastNameValid = ""
let emailValid = ""
let addressValid = ""
let cityValid = ""

// REGEX
let lettersNumbersRg = /^[-'a-zA-Z0-9À-ÖØ-öø-ÿ\s]+$/
let lettersRg = /^[-'a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/
let emailRg = /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/

// FUNCTIONS
function validation (regex, elt) {
	let regexValide = regex.test(elt);

	if (regexValide){
		return true
	}else{
		return false
	}
}

function message(message, eltValid){
	if (eltValid != true && message) {
		alert(message)
	}
}

function validationStatus(inputElt, regex){
	let eltValue = inputElt.value
	return validation(regex, eltValue)
}

// CHECK THE INPUTS WHEN THE PAGE APPEARS
firstNameValid = validationStatus(firstName, lettersRg)
lastNameValid = validationStatus(lastName, lettersRg)
emailValid = validationStatus(email, emailRg)
addressValid = validationStatus(address, lettersNumbersRg)
cityValid = validationStatus(city, lettersNumbersRg)

// CHECK THE INPUT WHEN THE PAGE LOADS
firstName.addEventListener('change', (event) =>{
    let inputValue = event.target.value
	firstNameValid = validation(lettersRg, inputValue)
	message("Seuless les lettres sont acceptés", firstNameValid)
})

lastName.addEventListener('change', (event) =>{
	let inputValue = event.target.value
	lastNameValid = validation(lettersRg, inputValue)
	message("Seuless les lettres sont acceptés", lastNameValid)
})

email.addEventListener('change', (event) =>{
	let inputValue = event.target.value
	emailValid = validation(emailRg, inputValue)
	message("Le format n'est pas valide", emailValid)
})

address.addEventListener('change', (event) =>{
	let inputValue = event.target.value
	addressValid = validation(lettersNumbersRg, inputValue)
	message("Seuless les lettres et les chiffres sont acceptés", addressValid)
})

city.addEventListener('change', (event) =>{
	let inputValue = event.target.value
	cityValid = validation(lettersNumbersRg, inputValue)
	message("Seules les lettres et les chiffres sont acceptés", cityValid)
})

// CLICKED BUTTON
const form = document.querySelector('form');
let url = "http://localhost:3000/api/cameras/order"
form.addEventListener("submit", event => {
	event.preventDefault()

	// CONTACT
	let contact = {
		firstName : document.getElementById('firstName').value,
		lastName : document.getElementById('lastName').value,
		email : document.getElementById('email').value,
		address : document.getElementById('address').value,
		city : document.getElementById('city').value,
	}

	// PRODUCTS ID RECOVERY
	let products = []
	basket.forEach(product => {
		products.push(product._id)
	})

	// COMPILATION
	const request = {
		contact : contact,
		products : products,
	}

	// SEND TO THE URL:  http://localhost:3000/api/cameras/order
	const options = {
	    method: 'POST',
	    body: JSON.stringify(request),
	    headers: {
	        'Content-Type': 'application/json'
	    }
	}

	fetch(url, options)
    .then(res => res.json())
    .then(res => {
    	let order = JSON.stringify(res)
    	localStorage.setItem('order', order)
    	console.log(localStorage.getItem('order'));
		

    	// REDIRECTION IF ITS OK TO CONFIRMATION.HTML
    	window.location.href = 'confirmation.html';
    })
    .catch(function(error) {
	  alert('Impossible d\'envoyer la demande');
	})
})

