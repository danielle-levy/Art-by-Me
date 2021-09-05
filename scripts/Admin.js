console.log("Admin page")
window.addEventListener('load', ()=> {

    async function setAdminPage() {
        try {
            let response = await fetch('/get-users-list')
            const data = await response.json()
            if (response.ok && data.result) {
                for (let i = 0; i < data.users.length; i++) {
                    let cartItems = ""
                    if (data.users[i].cart.length == 0) {
                        cartItems = "None"
                    } else {
                        for (let j=0; j < data.users[i].cart.length; j++) {
                            cartItems += `${data.users[i].cart[j].name.toString()} </br>`
                        }
                    }
                    document.getElementById("myAdminTable").innerHTML +=
                        `<tr>
                     <td class="username-search">${data.users[i].username}</td>
                     <td>${data.users[i].loginActivity.toString().replace(/,/g, "</br>")}</td>
                     <td>${data.users[i].logoutActivity.toString().replace(/,/g, "</br>")}</td>
                     <td>${cartItems}</td>
                     <td>${data.users[i].purchases.length}</td>
                </tr>`
                }
                document.getElementById("myAdminTable").innerHTML += "</table>"
            }
        } catch (err) {
            alert("Could not load users list!")
        }

    }

    setAdminPage()

    function search() {
        let input, filter, table, tr, td, i, txtValue;
        input = document.getElementById('searchbar')
        filter = input.value.toUpperCase();
        table = document.getElementById("myAdminTable");
        tr = table.getElementsByTagName("tr");

        // Loop through all table rows, and hide those who don't match the prefix search query
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByClassName("username-search")[0];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().startsWith(filter)) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
        document.getElementById("search-btn").innerHTML = "<i class=\"fas fa-times\"></i>"
        let cancel = document.getElementById("search-btn")
        cancel.removeEventListener('click', search)
        cancel.addEventListener('click', cancelSearch)

    }

    function cancelSearch() {
        document.getElementById("myAdminTable").innerHTML =
            "<tr class=\"header\">\n" +
            "          <th style=\"width:20%;\">Username</th>\n" +
            "          <th style=\"width:20%;\">Login Activity</th>\n" +
            "          <th style=\"width:20%;\">Logout Activity</th>\n" +
            "          <th style=\"width:20%;\">Current Cart Items</th>\n" +
            "          <th style=\"width:20%;\">Purchases</th>\n" +
            "        </tr>"
        setAdminPage()
        document.getElementById("search-btn").innerHTML = "<i class=\"fas fa-search\"></i>"
        let searchButton = document.getElementById("search-btn")
        searchButton.removeEventListener('click', cancelSearch)
        searchButton.addEventListener('click', search)
        document.getElementById('searchbar').value = ""

    }

    let searchButton = document.getElementById("search-btn")
    searchButton.addEventListener('click', search)



})