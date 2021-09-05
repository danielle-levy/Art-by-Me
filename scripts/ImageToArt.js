console.log("Image To Art page")
window.addEventListener('load', ()=> {
    let x = document.getElementById("myFile");

    const submitButton = document.getElementsByClassName("submit-file")[0]
    submitButton.addEventListener('click', async (event)=> {
        console.log("clicked!")
        if ('files' in x) {
            if (x.files.length != 0) {
                try {
                    let response = undefined
                    for (let i = 0; i < x.files.length; i++) {
                        response = await fetch(`/image-to-art/add-to-cart/${x.files[i].name}`, {
                            method: 'put'
                        })
                    }
                    let data = await response.json()
                    if (response.ok) {
                        alert(data.result)
                        document.location.replace("/ImageToArt.html")
                    }
                } catch (err) {
                    alert("Could not add the items to your cart!")
                }

            }
        }
        if (x.files[0] == undefined) {
            alert("Sorry! you didn't choose any file to submit, please try again")
        }
    })

    document.getElementById("myFile").onchange = ()=> {
        if ('files' in x) {
            if (x.files.length != 0) {
                document.getElementById('preview').innerHTML =
                    "<h3 style=\"color: #999999; letter-spacing: 4px\">PREVIEW SELECTED IMAGES</h3>\n" +
                    "<div class=\"product-container\">\n"

                for (let i = 0; i < x.files.length; i++) {
                    // document.getElementById('preview').innerHTML = `<img src=${x.files[i].d} width="100%">`
                    let reader = new FileReader()
                    reader.onload = function (e) {
                        document.getElementsByClassName("product-container")[0].innerHTML +=
                            `<div class="product-box">
                                <!--product-img------------>
                                 <div class="product-img">
                                    <!--img------>
                               <img src=${e.target.result}>
                           </div>
                     <!--product-details-------->
                     <div class="product-details">
                          <a href="#" class="p-name">${x.files[i].name}</a>
                            <h3 style="color: #999999">${x.files[i].size} bytes</h3>
                           <h3>$20</h3>
                      </div>
                     </div>`
                    }

                    reader.readAsDataURL(x.files[i]);

                }
                document.getElementById('preview').innerHTML +=  "</div>\n"
            }
        }
    }

})