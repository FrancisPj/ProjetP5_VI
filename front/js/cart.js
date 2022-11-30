const Title = document.querySelector("title");
Title.innerText = "Cart : Mon panier";

let cart = localStorage.getItem('products');
cart = JSON.parse(cart);

let cartItem = document.getElementById('cart__items');
let deleteButton = document.getElementsByClassName('deleteItem');


if (cart === null) {
    // Message panier vide
    cartItem.innerText = "Votre panier est vide"
} else {
    for (let item of cart) {
        fetch("http://localhost:3000/api/products/" + item.id)
            .then(function (res) {
                if (res.ok) {
                    return res.json();
                }
            })
            .then(function (product) {
                let element = `
            <article class="cart__item" data-id="${product._id}" data-color="${item.color}">
                <div class="cart__item__img">
                  <img src="${product.imageUrl}" alt=${product.altTxt}>
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${product.name}</h2>
                    <p>${item.color}</p>
                    <p>${product.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${item.quantity}>
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
            `;

                cartItem.innerHTML += element;

            })
            // fonction de suppression
            // la boucle for qui montre combien de produits il y a dans mon tableau
            .then(function () {
                for (let i = 0; i < deleteButton.length; i++) {
                    deleteButton[i].addEventListener('click', function () {
                        deleteProduct(this)
                        // avertir de la suppression et recharger la page
                        alert('Votre article va bien être supprimé.');
                    })
                }

            })
        // je crée ma fonction pour la modif des quantités

            .then(function () {
                let modifQuantity = document.querySelectorAll(".itemQuantity")
                /*console.log(modifQuantity);*/
                for (let k = 0; k < modifQuantity.length; k++) {
            modifQuantity[k].addEventListener("change", function (e) {
                event.preventDefault();

                let newQuantity = modifQuantity[k].value;
               /* console.log(newQuantity)*/
            })}
        })
        //Selection de l'element à modifier en fonction de son id ET sa couleur
        function modifquantityProduct(element) {

            let article = element.closest('article');
            let productId = article.dataset.id;
            let productColor = article.dataset.color;

            console.log(productId, productColor)
        }
// fonction de modification du localStorage après la suppression
        function deleteProduct(element) {

            let article = element.closest('article');
            let productId = article.dataset.id;
            let productColor = article.dataset.color;

            //console.log(productId, productColor);

            for (let j = 0; j < cart.length; j++) {
                if (cart[j].id === productId && cart[j].color === productColor) {
                    cart.splice(j, 1)
                    localStorage.setItem('products', JSON.stringify(cart))
                }
            }

            article.remove();

        }
    }
}
