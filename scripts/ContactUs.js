console.log("Contact page")
window.addEventListener('load', ()=> {

    const sendButton = document.getElementById("go")
    sendButton.addEventListener('click', async (event)=> {
        const header = document.getElementById('message-header').value
        const content = document.getElementById('subject').value
        console.log('Send button was clicked')
        if (header.length == 0) {
            document.getElementsByClassName('error')[0].innerHTML = "Your message must have a subject!"
        } else if (content.length > 500) {
            document.getElementsByClassName('error')[0].innerHTML = "Your message must contain less than 500 characters!"
        } else {
            try {
                let response = await fetch(`/send-message/${header}/${content}`, {
                    method: 'post'
                })
                let data = await response.json()
                if (response.ok && data.result) {
                    alert("Your message was sent to our system successfully!")
                    document.location.replace('/HomePage.html')
                }
            } catch (err) {
                alert("Could not post your message!")
            }

        }

    })

})