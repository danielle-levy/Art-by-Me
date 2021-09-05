console.log("User details")
async function setDetails() {
    try {
        let response = await fetch('/user')
        const data = await response.json()
        if (response.ok) {
            if (data.purchases.length > 0) {
                document.getElementById("user-p").innerHTML = `<i>${data.purchases.length}</i></br>`
            } else {
                document.getElementById("user-p").innerHTML = `<i>None</i></br>`
            }

            document.getElementById("user-username").innerText = data.username
            document.getElementById("user-act-in").innerText = data.loginActivity.toString().replace(/,/g, "\n")
            document.getElementById("user-act-out").innerText = data.logoutActivity.toString().replace(/,/g, "\n")

            if (data.isAdmin) {
                document.getElementById("is-admin").innerHTML +=
                    `<a href='/Admin.html'>View Admin Page</a> | <a href='/Messages.html'>View Messages Page</a> `
            }
        }
    } catch (err) {
        alert("Something happened! Could not load your user info!")
    }

}

setDetails()

