console.log("This is my Shopping Cart page")
window.addEventListener('load', ()=> { //post to a route that registers the user to the db
    function defaultCartSettings() {
        // setting the price and num of items to 0
        document.getElementById("total-price").innerText = "0$"
        document.getElementById("num-of-items").innerText = "0"
    }

    async function setMyCart() {
        defaultCartSettings()
        try {
            let response = await fetch('/user')
            const data = await response.json()
            if (response.ok) {
                let cartItems = data.cart
                if (data.cart.length != 0) { // cart is not empty! fill it with details
                    document.getElementById("num-of-items").innerText = cartItems.length.toString()
                    let totalPrice = 0
                    let color = `ffffff`
                    for (const cartItem of cartItems) {
                        totalPrice += cartItem.price
                        let item = document.getElementById(cartItem.name)
                        let occurrences = 1
                        if (item == undefined || !item.toString().includes("color-pick")) {
                            let path = cartItem.image_path
                            if (cartItem.image_background) {
                                color = cartItem.image_background
                            } else {
                                occurrences = getOccurrence(cartItems, cartItem)
                            }
                            document.getElementsByClassName("products")[0].innerHTML +=
                                `<div class="product" id="${cartItem.name}">
                         <img src="${path}" alt="${path}" style="background-color: #${color}">
                         <div class="product-info">
                         <h3 class="product-name">${cartItem.name.replace(/-/g, " ")}</h3>
                         <h4 class="product-price">${cartItem.price}$</h4>
                         <p class="product-quantity">Qnt: <input value="${occurrences}" class="qnt">
                            <p class="product-remove">
                                <i class="fa fa-trash" aria-hidden="true"></i>
                               <span class="remove"><a href="#" id="${cartItem.name}">Remove</a></span>
                           </p>
                          </div>
                       </div>`
                        }
                        document.getElementById("total-price").innerText = totalPrice.toString() + "$"

                    }

                } else {
                    document.getElementsByClassName("products")[0].innerHTML =
                        "<i>Nothing to see here... </br>" +
                        "Your cart is currently empty :(</i>"
                }
            }
        } catch (err) {
            alert("Something happened! Could not load your cart information!")
        }

    }

    setMyCart().then(addCartFunctionality)

    function addCartFunctionality() {
        let removeCartItemButtons = document.getElementsByClassName('remove')
        console.log(removeCartItemButtons)
        for (let i = 0; i < removeCartItemButtons.length; i++) {
            let button = removeCartItemButtons[i]
            let productName = removeCartItemButtons[i].children[0].id
            button.addEventListener('click', async (event)=> {
                try {
                    let response = await fetch(`/remove-from-cart/${productName}`, {
                        method: 'put'
                    })
                    let data = await response.json()
                    if (response.ok) {
                        alert(data.result)
                        //alert('The selected item was removed from your cart successfully!')
                        document.location.replace("/ShoppingCart.html")
                    }
                } catch (err) {
                    alert("Something happened! Could not remove the item from your cart :(")
                }

            })
        }

    }

    function getOccurrence(array, value) {
        let count = 0;
        array.forEach((v) => (v.name === value.name && count++));
        return count;
    }

})
