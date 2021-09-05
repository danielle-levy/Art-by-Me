console.log("This is my Login page")
window.addEventListener('load', ()=>{

    const logInButton = document.getElementById('go')
    logInButton.addEventListener('click', async(clickEvent)=>{
        console.log('Log in clicked')
        const user = document.getElementById("user").value
        const pass = document.getElementById("pass").value
        const rmCheck = document.getElementById("rememberMe")
        if(user.length > 2 && pass.length > 2){ // conditions for usernames and password
            console.log(`Sending user:${user} and password:${pass} to the server`)
            try {
                let response = await fetch(`/login/${user}/${pass}/${rmCheck.checked}`, {
                    method: 'post'
                })
                const data = await response.json()
                if(response.ok){
                    if(data.result == 'userFound'){ // if the user was found
                        if (rmCheck.checked) {

                        } // else cookie expires after 30 minutes
                        location.replace('/Store.html')
                    } else {
                        if(data.result == 'wrongPassword'){
                            document.getElementsByClassName('error')[0].innerText = "Wrong password, please try again"
                        } else {
                            document.getElementsByClassName('error')[0].innerText = "User doesn't exist, please try again"
                        }
                    }
                } else {
                    document.getElementsByClassName('error')[0].innerText = "An error occurred, refreshing page..."
                    location.replace('/Index.html')
                }
            } catch (err) {
                alert("Could not log in!")
            }

        } else {
            document.getElementsByClassName('error')[0].innerText = "Please make sure that the username and the password's length contains more than 2 characters"
        }
    })

})
