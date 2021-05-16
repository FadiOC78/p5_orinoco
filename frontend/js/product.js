///// ///// ///// ///// PAGE PRODUIT ////// ///// ///// /////

//Création d'une classe pour structurer le tableau product
class MyProduct {
    constructor(idCamera, selectedLenses) {
        this.idCamera = idCamera;
        this.selectedLenses = selectedLenses;
    }
}

//////////////////////////////CREATION DES CARDS INDIVIDUELLES DE PRODUIT //////////////////////////////////

//Récupération de l'Id dans l'url
function getIdUrlAndCard(cameras) {
    let urlSearch = new URLSearchParams(window.location.search);
    console.log(urlSearch);
    let idCamera = urlSearch.get('id');
    console.log(idCamera);
    getCameraItem(cameras, idCamera);
}

//Récupération de la caméra correspondant à l'Id
function getCameraItem(cameras, idCamera) {
    let choosenCamera = cameras.find(cameras => cameras['_id'] == idCamera);
    console.log(choosenCamera);
    createCardCamera(choosenCamera, idCamera);
}

//Création de la structure HTML de la caméra choisie
function createCardCamera(choosenCamera, idCamera) {
    let divParentParent = document.createElement("div");
    const mainProduct = document.getElementById("main-product");
    mainProduct.appendChild(divParentParent);
    divParentParent.classList.add("row", "mx-auto", "my-3", "w-75");

    let divParent = document.createElement("div");
    divParentParent.appendChild(divParent);
    divParent.classList.add("card", "col", "m-auto", "p-5");

    let imageCamera = document.createElement("img");
    divParent.appendChild(imageCamera);
    imageCamera.classList.add("card-image-top", "photo", "img-fluid");
    imageCamera.src = choosenCamera.imageUrl;

    let divCardBody = document.createElement("div");
    divParent.appendChild(divCardBody);
    divCardBody.classList.add("card-body", "text-center", "px-0", "d-flex", "flex-column", "justify-content-between");


    // Création des éléments enfants de la div CardBody
    let titleCamera = document.createElement("h3");
    divCardBody.appendChild(titleCamera);
    titleCamera.classList.add("card-title", "title-product");
    titleCamera.textContent = choosenCamera.name;

    let descriptionCamera = document.createElement("p");
    divCardBody.appendChild(descriptionCamera);
    descriptionCamera.classList.add("description-product", "text-justify");
    descriptionCamera.textContent = choosenCamera.description;

    chooseLense(divCardBody, choosenCamera);

    // Création d'une div englobant prix et bouton
    let divLinkPrice = document.createElement("div");
    divCardBody.appendChild(divLinkPrice);
    divLinkPrice.classList.add("d-flex", "flex-md-row", "flex-column", "justify-content-between");

    // Création du prix
    let priceCamera = document.createElement("p");
    divLinkPrice.appendChild(priceCamera);
    priceCamera.classList.add("price-product", "font-weight-bold");
    priceCamera.textContent = choosenCamera.price + ' $';

    let linkProduct = document.createElement("a");
    divLinkPrice.appendChild(linkProduct);
    // Création du bouton 
    let buttonBuy = document.createElement("button");
    linkProduct.appendChild(buttonBuy);
    buttonBuy.classList.add("btn", "btn-warning", "block-right");
    // Ajout texte au bouton
    buttonBuy.textContent = "Ajouter au panier";
    console.log(idCamera);
    getLensCamera(buttonBuy, idCamera);
}

//Ajout de la sélection de lentille disponible par caméra
function chooseLense(divCardBody, choosenCamera) {
    let sentenceChoiceLens = document.createElement("p");
    divCardBody.appendChild(sentenceChoiceLens);
    sentenceChoiceLens.classList.add("text-left", "my-3");
    sentenceChoiceLens.textContent = "Choisir la lentille :";

    let choiceLens = document.createElement("select");
    divCardBody.appendChild(choiceLens);
    choiceLens.classList.add("form-control", "mb-5");
    choiceLens.id = "list";

    numberLenses = choosenCamera.lenses;
    for (let i = 0; i < numberLenses.length; i++) {
        let optionLens = document.createElement("option");
        choiceLens.appendChild(optionLens);
        optionLens.textContent = choosenCamera.lenses[i];
    }
}


//////////////////////////////AJOUT DES ARTICLES DANS LE PANIER //////////////////////////////////

function getLensCamera(buttonBuy, idCamera) {
    buttonBuy.addEventListener('click', function () {
        let basketContent = JSON.parse(localStorage.getItem("basketContent"));
        let selectedLenses = document.getElementById('list').value;
        // console.log(selectedLenses);
        if (basketContent === null) {
            basketContent = [];
        }
        let product = new MyProduct(idCamera, selectedLenses);
        basketContent.push(product);
        localStorage.setItem("basketContent", JSON.stringify(basketContent));
    })
}


/////////////////////////////REQUETE API////////////////////////////////////////////////////////////////

async function getCameras() {
    try {
        let response = await fetch("http://localhost:3000/api/cameras");
        if (response.ok) {
            let cameras = await response.json();
            console.log(cameras);
            getIdUrlAndCard(cameras);
        } else {
            console.error('Retour du serveur : ', response.status)
        }
    } catch (e) {
        console.log(e);
    }
}


/////////////////////////////APPEL DE LA FONCTION/////////////////////////////////
getCameras();
