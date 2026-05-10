let demo = document.getElementById("demo")

async function getNews(page = 1, limit = 10) {
    let news = await getAllNews(page, limit)
    renderCards(news.items)
    renderPagination(news.meta.page, news.meta.totalPages)
}

getNews()

let page = document.getElementById("page")

function renderPagination(activePage, totalPage) {
    let empty = ""
    let arr = Array.from({ length: totalPage })
    arr.map((item, i) => empty += `<button onclick="changePage(${i + 1})" class="${activePage == i + 1 ? 'btn-active' : " "} join-item btn">${i + 1}</button>
        `)
    // for (let i = 1; i <= totalPage; i++) {
    //     empty += `<button onclick="changePage(${i})" class="${activePage == i ? 'btn-active' : " "} join-item btn">${i}</button>`
    // }
    page.innerHTML = empty
}

let changePage = async (index) => {
    await getNews(index)
}


function renderCards(arr) {
    let empty = ""
    arr.map(item => empty += `
        <div
                class="w-[300px] bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 hover:-translate-y-2 cursor-pointer">

                <!-- IMAGE -->
                <div class="relative h-[180px] overflow-hidden">
                    <img src=${item.thumbnail}
                        class="w-full h-full object-cover transition duration-300 hover:scale-105">

                    <!-- CATEGORY -->
                    <span class="absolute top-3 left-3 bg-black text-white text-xs px-3 py-1 rounded-full">
                        ${item.category.title}
                    </span>
                </div>

                <!-- BODY -->
                <div class="p-4">
                    <h3 class="text-lg font-semibold text-gray-800 mb-2">
                        ${item.title}
                    </h3>

                    <!-- META -->
                    <div class="flex justify-between text-sm text-gray-500 mb-3">
                        <span class="flex items-center gap-1">
                            <i class="fa-solid fa-calendar"></i> 07 Mar 2026
                        </span>
                        <span class="flex items-center gap-1">
                            <i class="fa-solid fa-eye"></i> ${item.views}
                        </span>
                    </div>

                    <!-- ACTIONS -->
                    <div class="flex justify-between text-gray-600 text-sm">
                        <span class="flex items-center gap-1 hover:text-green-600 transition">
                            <i class="fa-solid fa-thumbs-up"></i> ${item.like}
                        </span>

                        <span class="flex items-center gap-1 hover:text-red-600 transition">
                            <i class="fa-solid fa-thumbs-down"></i> ${item.dislike}
                        </span>
                    </div>
                </div>

            </div>
        `)
    demo.innerHTML = empty
}