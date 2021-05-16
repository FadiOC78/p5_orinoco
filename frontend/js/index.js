///// ///// ///// ///// PAGE ACCUEIL ////// ///// ///// /////

////////////////CREATION DES CARDS A PARTIR DES DONNEES DE L'API//////////////////////////////////////////////////////////

//Création des cards
function createCardCameras(cameras) {
    let divParentParent = document.createElement("div");
    const mainHome = document.getElementById("main-home");
    mainHome.appendChild(divParentParent);
    divParentParent.classList.add("row-cols-1", "row-cols-md-4", "row-cols-lg-5", "d-flex", "flex-wrap", "justify-content-between", "align-items-between");

    for (let i = 0; i < cameras.length; i++) {

        let divParent = document.createElement("div");
        divParentParent.appendChild(divParent);
        divParent.classList.add("card", "col", "m-3", "pt-3");


        // Création des élements images et div avec la classe card body, enfants de divParent 
        let imageCamera = document.createElement("img");
        divParent.appendChild(imageCamera);
        imageCamera.classList.add("card-image-top", "photo", "img-fluid");
        imageCamera.src = cameras[i].imageUrl;

        let divCardBody = document.createElement("div");
        divParent.appendChild(divCardBody);
        divCardBody.classList.add("card-body", "text-center", "px-0", "d-flex", "flex-column", "justify-content-between");


        // Création des éléments enfants de divCardBody
        let titleCamera = document.createElement("h3");
        divCardBody.appendChild(titleCamera);
        titleCamera.classList.add("card-title", "title");
        titleCamera.textContent = cameras[i].name;

        let descriptionCamera = document.createElement("p");
        divCardBody.appendChild(descriptionCamera);
        descriptionCamera.classList.add("description", "text-justify");
        descriptionCamera.textContent = cameras[i].description;


        // Création d'une div englobant prix et bouton
        let divLinkPrice = document.createElement("div");
        divCardBody.appendChild(divLinkPrice);
        divLinkPrice.classList.add("d-flex", "flex-row", "justify-content-between");

        // Création du prix
        let priceCamera = document.createElement("p");
        divLinkPrice.appendChild(priceCamera);
        priceCamera.classList.add("price", "my-2", "font-weight-bold");
        priceCamera.textContent = cameras[i].price + ' $';

        let linkProduct = document.createElement("a");
        divLinkPrice.appendChild(linkProduct);
        getUrlProduct(cameras,i,linkProduct);
        createButtonLinkProduct(linkProduct);
    }
}

//Récupération de l'id pour rediriger vers la page product correspondante
function getUrlProduct(cameras,i,linkProduct) {
   
    // récupération de l'url
    let splitUrl = window.location.pathname.split("/");
    let lastItem = splitUrl.pop();
    // console.log(window.location.pathname.replace(lastItem, 'product.html'))
    let url = window.location.origin + window.location.pathname.replace(lastItem, './frontend/page/product.html');

    // // Création d'un objet url
    let urlObj = new URL(url);
    let idCameras = cameras[i]._id;
    // Ajout du query string id
    urlObj.searchParams.append("id", idCameras);
    linkProduct.href = urlObj;
}

//Création du bouton de redirection avec le bon url
function createButtonLinkProduct(linkProduct) {
    let buttonBuy = document.createElement("button");
    linkProduct.appendChild(buttonBuy);
    buttonBuy.classList.add("btn", "btn-warning", "block-right");
    // Ajout texte au bouton
    buttonBuy.textContent = "Voir";
}

//Appel de l'API pour récupérer les données de chaques articles disponibles
async function getCameras() {
    try {
        let response = await fetch("http://localhost:3000/api/cameras");
        if (response.ok) {
            let cameras = await response.json();
            createCardCameras(cameras);
        } else {
            console.error('Retour du serveur : ', response.status)
        }
    } catch (e) {
        console.log(e);
    }
}


///////////////////////////////////////APPEL DE LA FONCTION///////////////////////////////////////////////
getCameras()







