console.log("menu js is here!")
async function setMenuDetails() {
    try {
        let response = await fetch('/user')
        const data = await response.json()
        if (response.ok && data.username != undefined) {
            document.getElementById("username").innerText = data.username
            document.getElementsByClassName("num-cart-product")[0].innerHTML = data.cart.length.toString()
        }
    } catch (err) {
        alert("Could not load your info!")
    }

}

setMenuDetails()

