console.log("This is my purchases page")
window.addEventListener('load', ()=> { //post to a route that registers the user to the db
    async function setMyCart() {
        try {
            let response = await fetch('/user')
            const data = await response.json()
            if (response.ok) {
                let purchases = data.purchases
                if (data.purchases.length != 0) { // cart is not empty! fill it with details
                    let color = `ffffff`
                    for (const purchase of purchases) {
                        let items = ""
                        for (let i = 0; i < purchase.items.length; i++) {
                            items += `${purchase.items[i].name} | $${purchase.items[i].price} </br>`
                        }
                        if (purchase.items[0].image_background) {
                            color = purchase.items[0].image_background
                        }
                        document.getElementsByClassName("products")[0].innerHTML +=
                            `<div class="product"">
                         <img src="${purchase.items[0].image_path}" style="background-color: #${color}">
                         <div class="product-info">
                         <h3>purchased at ${purchase.purchased_at}</h3>
                         <div style="line-height: 15px">${items}</div>
                         <h3>${getTotalPurchase(purchase.items)}$</h3>                        
                          </div>
                       </div>`
                    }


                } else {
                    document.getElementsByClassName("products")[0].innerHTML =
                        "<i>Nothing to see here... </br>" +
                        "Your have not purchased anything yet :(</i>"
                }
            }
        } catch (err) {
            alert("Could not load your purchases info!")
        }

    }

    setMyCart()

    function getTotalPurchase(items) {
        console.log(items)
        let total = 0
        for (let i = 0; i < items.length; i++) {
            total += parseInt(items[i].price)
        }
        return total.toString()
    }


})
