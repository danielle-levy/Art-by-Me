console.log("This is my Store page")
window.addEventListener('load', ()=> { //post to a route that registers the user to the db
    async function setStoreProducts() {
        try {
            let response = await fetch('/products')
            const data = await response.json()
            if (response.ok) {
                let products = data.products
                if (products.length != 0) { // cart is not empty! fill it with details
                    for (const product of products) {
                        // /add-to-cart/${product.name}/${product.price}/${product.image_path.replace(/\//g, "-")}
                        document.getElementsByClassName("product-container")[1].innerHTML +=
                            `<div class="product-box">
                           <!--product-img------------>
                             <div class="product-img">
                               <!--add-cart---->
                                <div id="${product.name}" class="add-cart">
                                    <i class="fa fa-shopping-cart" aria-hidden="true" style="height: 12px; width: 12px"></i>
                                 </div>
                                  <!--img------>
                            <img src=${product.image_path.toString().replace(/ /g, "%20")}>
                       </div>
                    <!--product-details-------->
                    <div class="product-details">
                        <a href="#" class="p-name">${product.name.toString().replace(/-/g, " ")}</a>
                        <h3>$${product.price}</h3>
                    </div>
                </div>`

                    }
                }
            }
        } catch (err) {
            alert("Something happened! Could not load products :(")
        }

    }

    setStoreProducts()
        .then(addStoreFunctionality)

    function addStoreFunctionality() {

        let addToCart = document.getElementsByClassName('add-cart')
        for (let i = 0; i < addToCart.length; i++) {
            let button = addToCart[i]
            let productName = addToCart[i].id
            button.addEventListener('click', async (event) => {
                try {
                    let response = await fetch(`/add-to-cart/${productName}`, {
                        method: 'put'
                    })
                    let data = await response.json()
                    if (response.ok) {
                        alert(data.result)
                        document.location.replace("/Store.html")
                    }
                } catch (err) {
                    alert("Something happened! Could not add item to your cart :(")
                }

            })
        }
    }

    function search() {
        let input = document.getElementById('searchbar').value
        input = input.toLowerCase();
        let x = document.getElementsByClassName('product-box');

        for (let i = 0; i < x.length; i++) {
            if (!x[i].innerHTML.toLowerCase().includes(input)) {
                x[i].style.display="none";
            }
            else {
                x[i].style.display="list-style-type=none";
            }
        }
        document.getElementById("search-btn").innerHTML = "<i class=\"fas fa-times\"></i>"
        let cancel = document.getElementById("search-btn")
        cancel.removeEventListener('click', search)
        cancel.addEventListener('click', cancelSearch)

    }

    function cancelSearch() {
        document.location.reload()

    }

    let searchButton = document.getElementById("search-btn")
    searchButton.addEventListener('click', search)

})