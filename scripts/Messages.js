console.log("Messages page")
window.addEventListener('load', ()=> {

    async function setMessagesPage() {
        try {
            let response = await fetch('/messages')
            const data = await response.json()
            if (response.ok && data.result) {
                for (let i = 0; i < data.messagesArray.length; i++) {
                    document.getElementById("myAdminTable").innerHTML +=
                        `<tr>
                     <td class="username-search">${data.messagesArray[i].user.username}</td>
                     <td>${data.messagesArray[i].sent_at}</td>
                     <td>${data.messagesArray[i].header}</td>
                     <td>${data.messagesArray[i].message}</td>
                </tr>`
                }
                document.getElementById("myAdminTable").innerHTML += "</table>"
            }
        } catch (err) {
            alert("Could not load messages!")
        }

    }
    setMessagesPage()
})