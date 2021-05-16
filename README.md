# Orinoco


Conception du site e-commerce Orinoco.

Dans le cadre de la formation Développeur Web au sein de l'école Openclassrooms, nous avons 
pour projet de faire la conception d'un site e-commerce nommé Orinoco en MVP (Minimum Viable Product).

Obejectifs:

*** ARCHITECTURE ***

L'applicattion web sera composée de 4 pages:

● Une page de vue sous forme de liste, montrant  tous les articles disponibles à la vente;

● Une page "produit", qui affiche de manière dynamique l'élément sélectionné par l'utilisateur 
  et lui permet de personaliser le produit et de l'ajouter à son panier;

● Une page "panier" contenant un résumé des produits dans le panier, le prix total et 
  un formulaire permettant de passer une commande.
  Les données du formulaire doivent être correctes et bien formatées avant d'être 
  renvoyées au back-end.
  Par exemple, pas de texte dans les champs date;

● Une page de confirmation de commande, remerciant l'utilsateur pour sa commande, et 
  indiquant le prix total et l'identifiant de commande envoyé par le serveur.

* PRODUITS A PRESENTES *

    Dans une premier temps, une seule catégorie de produits sera présentée.
Choix à faire entre les 3 propositions suivantes:

● Ours en peluche faits à la main;

● Caméras vintage;

● Meubles en chêne

*** TESTS UNITAIRES ***

Planifiez une suite de tests unitaires pour couvrir au minimum 80% de la base
de code pour le front-end.
Vous devrez formaliser un plan pour atteindre ce résultat, sans obligation d'écrire ces tets.
Expliquez quelles lignes seront testées, et quels "test cases" seront envisagés.

* INFORMATIONS COMPLEMENTAIRES *

Pour le MVP, la personalisation du produit ne sera pas fonctionnelle: La page contenant
un seul article aura un menu déroulant permettant à l'utilisateur de choisir une option
de personalisation, mais cell-ci ne sera ni envoyée au serveur ni reflétée dans la réponse du serveur.

Le code source devra être indenté et utiliser des commentaires.
Il devra également utiliser des fonctions globales.

Concernat l'API, des promesses devront être utilisées pour éviter les rappels.
Les inputs des utilisateurs doivent être validés avant l'envoi à l'API.

*** TECHNOLOGIES UTILISEES ***

HTML, CSS, JavaScript

***************************

! Pour les routes POST, l'objet "contact" envoyé au serveur doit contenir 
  les champs prénom, nom, adresse, ville et adresse électronique.
  Tout les champs sont obligatoire.


*** Conditions préalables ***

Vous devrez avoir Node et npm installés localement sur votre machine.

*** Installation ***

Clonez ce dépôt. 
À partir du dossier du projet, exécutez npm install. 
Vous pouvez ensuite exécuter le serveur avec node server. 
Le serveur doit fonctionner localhostavec le port par défaut 3000. 
Si le serveur fonctionne sur un autre port pour une raison quelconque, 
cela est imprimé sur la console au démarrage du serveur, par exemple Listening on port 3001.