let totalNews = document.getElementById("totalNews")
let totalUsers = document.getElementById("totalUsers")
let totalCategories = document.getElementById("totalCategories")
let totalLikes = document.getElementById("totalLikes")


async function totalNewsShow() {
    let res = await getAllNewsAdmin()
    totalNews.innerHTML = res.items.length
}
totalNewsShow()

async function totalUsersShow() {
    let res = await getUsers()
    totalUsers.innerHTML = res.length
}
totalUsersShow()

async function totalCategoriesShow() {
    let res = await getAllCategory()
    totalCategories.innerHTML = res.length
}
totalCategoriesShow()

async function totalLikesShow() {
    let res = await getAllNews()
    let likes = 0
    let allLikes = Array.from(res).map(item => like += item.like)
    if (allLikes.length === 0) {
        totalLikes.innerHTML = 0
    }
    else {
        totalLikes.innerHTML = allLikes
    }


}
totalLikesShow()


let latestNewsTable = document.getElementById("latestNewsTable")
async function latestNews() {
    loaderStatus(true)
    let res = await getAllNewsAdmin()
    let arr = res.items.splice((res.items.length - 3), res.items.length).reverse()
    renderLatestNews(arr)
    loaderStatus(false)
}
latestNews()

function renderLatestNews(arr) {
    let empty = ""
    arr.map(item => empty += `
                              <tr class="border-b hover:bg-gray-50 transition">
                        <td class="py-4">${item.title}</td>
                        <td>${item.category.title}</td>
                        <td>${(item.createdAt).split("T")[0]}</td>
                        <td>
                          <span class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                            ${item.slug}
                          </span>
                        </td>
                      </tr>
        `)
    latestNewsTable.innerHTML = empty
}

let latestUsersTable = document.getElementById("latestUsersTable")

async function latestUsers() {
    let res = await getUsers()
    let arr = res.splice((res.length - 3), res.length).reverse()
    renderLatestUsers(arr)
}
latestUsers()

function renderLatestUsers(arr) {
    let empty = ""
    arr.map(item => empty += `
         <tr class="border-b hover:bg-gray-50 transition">
                        <td class="py-4">${item.username}</td>
                        <td>${item.role}</td>
                        <td>${item.gender}</td>
                        <td>
                          <span class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                            ${item.email}
                          </span>
                        </td>
                      </tr>
        `)
        latestUsersTable.innerHTML = empty

}

