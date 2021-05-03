// RECOVERY OF THE ORDER
const order = JSON.parse(localStorage.getItem('order'))

const contact = order.contact
const products = order.products
const orderId =  order.orderId

// REPLACEMENT VARIABLE CODE
let HTMLOrder = document.getElementById("confirmation_text")
let myHTMLOrder = ""

let HTMLArticles = document.getElementById("purchase_articles")
let myHTMLArticles = ""

let totalPrice = document.getElementById("total_price")
let newTotalPrice = 0


// MODIFICATION OF THE TEXT WHEN THE ORDER TAKES PLACE
myHTMLOrder = `<h1 class="big_title">Merci ${contact.firstName} ${contact.lastName} pour votre commande. 
			Nous éspérons qu'elle vous donnera entiére satisfaction. Voici le numéro de votre commande : <br>
			Vous receverez dans quelques minutes un e-mail de confirmation et d'ici quelques heures vous pourrez suivre votre colis.</h1>
				<p class="purchase_id">${orderId}</p>`

HTMLOrder.innerHTML = myHTMLOrder

// SUMARY ORDER
products.forEach(article_order =>{

	// MODIFICATION PRICE
	let originalPrice = article_order.price /100
  	let newPrice = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(originalPrice)

  	// MOFIFCATION HTML
  	myHTMLArticles += `<div class="ordered_article">
					<img src="${article_order.imageUrl}">
					<div>
						<p>${article_order.name}</p>
						<p>${newPrice}</p>
					</div>
				</div>`

	newTotalPrice =  newTotalPrice + article_order.price

	HTMLArticles.innerHTML = myHTMLArticles
	totalPrice.innerHTML = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(newTotalPrice/100)
})

// BASKET IS CLEAR
localStorage.clear()