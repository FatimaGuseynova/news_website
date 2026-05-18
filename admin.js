let tab = document.querySelectorAll("#navbar a")
let main = document.querySelectorAll(".page")

Array.from(tab).map((item, index) => item.onclick = function () {
    Array.from(main).map(div => div.classList.add("hidden"))
    main[index].classList.remove("hidden")
    Array.from(tab).map(i => i.classList.remove("bg-gray-700"))
    item.classList.add("bg-gray-700")
})

let loaderComp = document.getElementById("loaderComp")
let loaderData = document.getElementById("loaderData")

function loaderStatus(status) {
    status ? loaderComp.classList.remove("hidden") : loaderComp.classList.add("hidden")
}
function loaderDataStatus(status) {
    status ? loaderData.classList.remove("hidden") : loaderData.classList.add("hidden")

}

let logOut = () => {
    localStorage.clear()
    location.replace('auth.html')
}

function goToWeb() {
    location.replace("index.html")
}
