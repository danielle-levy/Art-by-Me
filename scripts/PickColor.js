console.log("Pick Color page!")
window.addEventListener('load', ()=> { //post to a route that registers the user to the db
    async function setStoreProducts() {
        try {
            let response = await fetch('/personal-products')
            const data = await response.json()
            if (response.ok) {
                let products = data.products
                if (products.length != 0) { // cart is not empty! fill it with details
                    for (const product of products) {
                        if (product.name != "Image-To-Art") {
                            // /add-to-cart/${product.name}/${product.price}/${product.image_path.replace(/\//g, "-")}
                            document.getElementsByClassName("product-container")[0].innerHTML +=
                                `<div class="product-box">
                           <!--product-img------------>
                             <div class="product-img">
                               <!--add-cart---->
                                <div id="${product.name}" class="add-cart">
                                    <i class="fa fa-shopping-cart" aria-hidden="true" style="height: 12px; width: 12px"></i>
                                 </div>
                                  <!--img------>
                            <img src=${product.image_path.toString().replace(/ /g, "%20")} id="img-${product.name}">
                       </div>
                    <!--product-details-------->
                    <div class="product-details">
                        <a href="#" class="p-name">${product.name.toString().replace(/-/g, " ")}</a>
                        
                        <label for="colorpicker" style="color: grey; letter-spacing: 4px; padding: 10px; font-weight: bold">Color Picker:
    <input type="color" id="colorpicker-${product.name}" value="#E8E8E8"></label>
    <input class="button" id="try-${product.name}" value="try this" style="font-family: inherit">
                        
                        
           
                    </div>
                </div>`

                        }

                    }
                }
            }
        } catch (err) {
            alert("Something happend! Could not load items :(")
        }

    }

    setStoreProducts()
        .then(addStoreFunctionality)

    function addStoreFunctionality() {

        let addToCart = document.getElementsByClassName('add-cart')
        for (let i = 0; i < addToCart.length; i++) {
            let button = addToCart[i]
            let productName = addToCart[i].id
            let colorPicker = document.getElementById(`colorpicker-${productName}`)
            button.addEventListener('click', async (event) => {
                try {
                    let response = await fetch(`/pickColor/add-to-cart/${productName}/${colorPicker.value.toString().replace(/#/, "")}`, {
                        method: 'put'
                    })
                    let data = await response.json()
                    if (response.ok) {
                        alert(data.result)
                        document.location.replace("/PickColor.html")
                    }
                } catch (err) {
                    alert("Something happend! Could not add item to your cart :(")
                }

            })
        }

        let tryButtons = document.getElementsByClassName('button')
        for (let i = 0; i < tryButtons.length; i++) {
            let button = tryButtons[i]
            let productName = tryButtons[i].id.toString().replace(/try-/, "")
            let colorPicker = document.getElementById(`colorpicker-${productName}`)
            button.addEventListener('click', async (event) => {
                document.getElementById(`img-${productName}`).style.background = colorPicker.value
            })
        }
    }

})