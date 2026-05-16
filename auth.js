let loginForm = document.getElementById("loginForm")
let inputs = loginForm.querySelectorAll("input")
let loginBtn = document.getElementById("loginBtn")
let forToast = document.getElementById("forToast")


loginForm.onsubmit = async (e) => {
    e.preventDefault()
    loginBtn.innerHTML = `<span class="loading loading-spinner loading-sm"></span>`
    loginBtn.disabled = true
    let [email, password] = Array.from(inputs).map(item => item.value)
    let obj = { email, password }
    let res = await login(obj)
    loginBtn.innerHTML = "Submit"
    loginBtn.disabled = false
    if (res.error || res.user.role == "user") {
        let message = res.error ? res.massage : "Access Denied"
        renderToast(false, message)

    }
    else {
        renderToast(true, res.message)
        localStorage.setItem("token", res.token)
        localStorage.setItem("user", JSON.stringify(res.user))
    }


}

function renderToast(error, message) {
    forToast.innerHTML = `
     <div class="toast toast-top toast-end">
  <div class="alert ${error ? 'alert-success' : 'alert-error'}">
    <span>${message}</span>
  </div>
</div>
     `

    setTimeout(() => {
        forToast.innerHTML = ""
    }, 3000)

    if (error) {
        setTimeout(() => {
            location.replace("admin.html")
        }, 2000)

    }
}


