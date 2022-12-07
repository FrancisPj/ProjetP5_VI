const queryString_url_id = window.location.search;
const urlSearchParams = new URLSearchParams(queryString_url_id);
const _id = urlSearchParams.get("id");
//la fonction fetch ci-dessous permettra d’envoyer une requête GET sur le serveur localhost:
fetch("http://localhost:3000/api/products/" + _id)
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
        console.log()
    })
    .then(function (value) {
        displayProduct(value);
    })
    // Une erreur est survenue
    .catch(function (err) {
        let container = document.querySelector(".limitedWidthBlockContainer");
        container.innerText =
            "<h3>Nous n'avons pas réussi à afficher votre choix. Avez-vous bien lancé le serveur local (Port 3000) ? <br>Si le problème persiste, contactez-nous.</h3>";
        container.style.textAlign = "center";
        container.style.padding = "15px 0";
    })

// ETAPE 3 : Afficher les informations du fetch dans le DOM
// Affichage du nom de produit dans la balise h1
function displayProduct(product) {

    let parentTitle = document.getElementById("title")
    parentTitle.innerText = product.name
    //Affichage du nom de la page dans la balise Title pour l'onglet
    const Title = document.querySelector("title");
    Title.innerText = product.name;

    // Affichage de l'image
    let img = document.createElement('img');
    img.src = product.imageUrl;
    img.alt = product.altTxt;
    // Ajout de l'image dans la balise correspondante
    document.querySelector('.item__img').appendChild(img);
    // Insertion du Prix dans le span dédié
    document.getElementById('price').innerText = product.price
    let prix = product.price
    // Description du produit
    document.getElementById("description").innerText = product.description

    for (let color of product.colors) {
        let productColor = document.createElement('option');
        document.querySelector('#colors').appendChild(productColor);
        productColor.value = color;
        productColor.innerText = color;
    }
    // Activation du bouton
    let addBtn = document.querySelector('#addToCart');

    addBtn.addEventListener('click', (e) => {
        e.preventDefault();


        let color = document.querySelector('#colors').value;
        let quantity = document.querySelector('#quantity').value;

        if (color === "" ) {
            alert("veuillez indiquer la couleur choisie!")
        } else if (quantity <= 0 || quantity > 100) {
            alert("veuillez indiquer la quantité entre 1 et 100")
        } else {

            let productOrder = {
                id: _id,
                color: color,
                quantity: Number(quantity)
            };

            console.log(productOrder);
            let cart = localStorage.getItem("products");


            if (cart === null) {
                cart = [];
            } else {
                cart = JSON.parse(cart);
            }

            let newItem = true;

            // Localstorage = id = 1, qty = 3 , Sinopé , black

            for (let produit of cart) {

              // EXEMPLE 1 :  id = 1, qty = 2 , Sinopé, black
                // EXEMPLE 2 : id = 2, qty = 4, Kalycé, ROUGE
                if (produit.id === _id && produit.color === color) {
                    // Je passe ici EXEMPLE 1
                    produit.quantity += productOrder.quantity;
                    // Localstorage = id = 1, qty = 5 , Sinopé , black

                    newItem = false;

                    // EXEMPLE 1 Newitem = false;
                }
            }

            // EXEMPLE 1 = newitem = false;
            // EXEMPLE 2 = newItem = true;

            //  let cart = localStorage.getItem("products");
            //  Localstorage = id = 1, qty = 3 , Sinopé , black

            if (newItem === true) {
                cart.push(productOrder)
            }

            localStorage.setItem('products', JSON.stringify(cart))

            if (window.confirm(`Le canapé de référence ${product.name} et de couleur ${color}  a été ajouté au panier.
Consulter le panier OK ou rester sur la page`)) {
                document.location.href = './cart.html'
            }

        }
    });

};




