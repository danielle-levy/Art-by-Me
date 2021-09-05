console.log("This is my Register page")
window.addEventListener('load', ()=>{ //post to a route that registers the user to the db

    const logInButton = document.getElementById('go')
    logInButton.addEventListener('click', async(clickEvent)=>{
        console.log('Create new user in clicked')
        const user = document.getElementById("user").value
        const pass = document.getElementById("pass").value
        if(user.length > 2 && pass.length > 2) { // conditions for usernames and password
            try {
                let response = await fetch(`/register/${user}/${pass}`, {
                    method: 'post'
                })
                const data = await response.json()
                console.log(data)
                if(response.ok){
                    if(data.result == true){
                        alert(`User was created successfully! Please login to start shopping...`)
                        location.replace("/Index.html")

                    } else {
                        document.getElementsByClassName('error')[0].innerText = (`User: ${user} already exists, please try another username`)
                        //location.replace('/Register.html')
                    }
                } else {
                    document.getElementsByClassName('error')[0].innerText = "An error occurred, refreshing page..."
                    location.replace('/Register.html')
                }
            } catch (err) {
                alert("Something happend! Could not register :(")
            }

        } else {
            document.getElementsByClassName('error')[0].innerText = "Both username and password should contain more than 2 characters..."
        }
    })
})
