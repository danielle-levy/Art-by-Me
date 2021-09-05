console.log("Checkout page loaded")
window.addEventListener('load', ()=> { //post to a route that registers the user to the db
    const checkoutButton = document.getElementById("checkout-btn")
    async function setMyCart() {
        try {
            let response = await fetch('/user')
            const data = await response.json()
            if (response.ok) {
                let cart = data.cart
                let total = 0
                document.getElementById('cart-length').innerText = cart.length.toString()
                for (let i = 0; i < cart.length; i++) {
                    total += parseInt(cart[i].price)
                    document.getElementById("cart-products").innerHTML +=
                        `<p>${cart[i].name} <span class="price">$${cart[i].price}</span></p>`
                }
                document.getElementById("cart-total-price").innerHTML = '$' + total.toString()

            }
        } catch (err) {
            alert("Could not load your cart info!")
        }
    }

    setMyCart()

    checkoutButton.addEventListener('click', async (event)=> {
        console.log('Checkout button was clicked')
        document.getElementsByClassName('error')[0].innerHTML = ""
        let validForm = true

        if (document.getElementById("fname").value == '') {
            validForm = false
            document.getElementsByClassName('error')[0].innerHTML += "You must fill your <strong>full name</strong> in the corresponding field"
        }

        if (document.getElementById("email").value == '') {
            validForm = false
            document.getElementsByClassName('error')[0].innerHTML += "<br/>You must fill your <strong>email</strong> in the corresponding field"
        }

        if (document.getElementById("adr").value == '') {
            validForm = false
            document.getElementsByClassName('error')[0].innerHTML += "</br>You must fill your <strong>address</strong> in the corresponding field"
        }

        if (document.getElementById("city").value == '') {
            validForm = false
            document.getElementsByClassName('error')[0].innerHTML += "</br>You must fill your <strong>city</strong> in the corresponding field"
        }

        if (document.getElementById("state").value == '') {
            validForm = false
            document.getElementsByClassName('error')[0].innerHTML += "</br>You must fill your <strong>state</strong> in the corresponding field"
        }

        if (document.getElementById("zip").value == '') {
            validForm = false
            document.getElementsByClassName('error')[0].innerHTML += "</br>You must fill your <strong>zip</strong> in the corresponding field"
        }

        if (document.getElementById("cname").value == '') {
            validForm = false
            document.getElementsByClassName('error')[0].innerHTML += "</br>You must fill your <strong>name on card</strong> in the corresponding field"
        }

        if (document.getElementById("ccnum").value == '') {
            validForm = false
            document.getElementsByClassName('error')[0].innerHTML += "</br>You must fill your <strong>card number</strong> in the corresponding field"
        } else if (document.getElementById("ccnum").value.length != 16){
            validForm = false
            document.getElementsByClassName('error')[0].innerHTML += "</br>Your <strong>card number</strong> is not valid!"
        }

        if (document.getElementById("expmonth").value == '') {
            validForm = false
            document.getElementsByClassName('error')[0].innerHTML += "</br>You must fill your <strong>card's expiration date</strong> in the corresponding field"
        }

        if (document.getElementById("expyear").value == '') {
            validForm = false
            document.getElementsByClassName('error')[0].innerHTML += "</br>You must fill your <strong>card's expiration year</strong> in the corresponding field"
        } else if (parseInt(document.getElementById("expyear").value) < 2020) {
            validForm = false
            document.getElementsByClassName('error')[0].innerHTML += "</br>Your <strong>card's expiration year</strong> is not valid"
        }

        if (document.getElementById("cvv").value == '') {
            validForm = false
            document.getElementsByClassName('error')[0].innerHTML += "</br>You must fill your <strong>card's cvv</strong> in the corresponding field"
        } else if (document.getElementById("cvv").value.length != 3){
            validForm = false
            document.getElementsByClassName('error')[0].innerHTML += "</br>Your <strong>cvv</strong> is not valid!"
        }

        if (validForm) {
            try {
                let response = await fetch('/checkout', {
                    method: 'put'
                })
                let data = await response.json()
                if (response.ok) {
                    alert(data.result)
                    document.location.replace('/Store.html')
                }
            } catch (err) {
                alert("Could not start checkout process!")
            }

        }

    })

})