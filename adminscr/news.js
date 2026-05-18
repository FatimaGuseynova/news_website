let newsTable = document.getElementById("newsTable")
let categorySelect = document.getElementById("categorySelect")
let addNews = document.getElementById("addNews")
let inputsForm = document.querySelectorAll("#addNews input, #addNews textarea, #addNews select")
let updateCategorySelect = document.getElementById("updateCategorySelect")

addNews.onsubmit = async function (e) {
  e.preventDefault
  let [title, content, slug, categoryId, thumbnail] = Array.from(inputsForm).map(item => item.value)
  let obj = {
    title, content, slug, categoryId: +categoryId, thumbnail
  }
  let data = await createNews(obj)
  if (data.error) {
    my_modal_3.close()
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: data.message[0],
    });
  }
  else {
    my_modal_3.close()
    Swal.fire({
      title: data.message,
      icon: "success",
    });
  }

  getNews()
  latestNews()
  totalNewsShow()
}

async function getNews() {
  let data = await getAllNewsAdmin()
  renderNews(data.items)
}
getNews()

async function getCategorySelect() {
  let data = await getAllCategory()
  renderCategorySelect(data)
}

getCategorySelect()
function renderCategorySelect(arr) {
  let empty = ""
  arr.map(item => empty += `
    
                          <option value="${item.id}" >${item.title}</option>
    `)
  categorySelect.innerHTML += empty
  updateCategorySelect.innerHTML += empty

}

async function deleteNews(id) {
  Swal.fire({
    title: "Do you want to delete this news?",
    showCancelButton: true,
    confirmButtonText: "Delete",
  }).then(async (result) => {
    if (result.isConfirmed) {
      await deleteNewsId(id);
      await Swal.fire("Deleted!", "", "success");
      await getCategory();
      await getNews();
  latestNews()
  totalNewsShow()
    }
  });

}


let updateNewsForm = document.getElementById("updateNewsForm")
let inputsUp = updateNewsForm.querySelectorAll("input, select, textarea")

let globalIdUp = 0
async function updateNews(id) {
  globalIdUp = id
  my_modal_5.showModal()
  loaderDataStatus(true)
  let { news } = await updateNewsId(id)
  inputsUp[0].value = news.title
  inputsUp[1].value = news.content
  inputsUp[2].value = news.slug
  inputsUp[3].value = news.category.id
  inputsUp[4].value = news.thumbnail
  loaderDataStatus(false)

}

updateNewsForm.onsubmit = async function (e) {
  e.preventDefault
  let [title, content, slug, categoryId, thumbnail] = Array.from(inputsUp).map(item => item.value)
  let obj = {
    title, content, slug, categoryId: +categoryId, thumbnail
  }
  let data = await updateNewsIdSave(globalIdUp, obj)
  if (data.error) {
    my_modal_3.close()
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: data.message[0],
    });
  }
  else {
    my_modal_3.close()
    Swal.fire({
      title: data.message,
      icon: "success",
    });
  }

  getNews()
}

let deleteNewsForm = document.getElementById("deleteNewsForm")
let newsInputs = deleteNewsForm.querySelectorAll("input")

deleteNewsForm.onsubmit = async (e) => {
  e.preventDefault()
  let [email, password] = Array.from(newsInputs).map(item => item.value)
  let obj = { email, password }
  let res = await login(obj)
  if (res.error || res.user.role == "user") {
    my_modal_8.close()
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });

  }
  else {


    let res = await deleteAllNews()
    console.log(res)
    my_modal_8.close()
    Swal.fire({
      title: "Success!",
      icon: "success",
    });
  }

  getNews()
  latestNews()
  totalNewsShow()
}

function renderNews(arr) {
  let empty = ""
  arr.map(item => empty += `
         <tr class="bg-white shadow-sm rounded-lg hover:bg-gray-50 transition">

                    <!-- News -->
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-3">
                        <img src=${item.thumbnail}
                          class="w-16 h-10 object-cover rounded-md" />
                        <div>
                          <p class="font-medium text-gray-800">
                            ${item.title} 
                          </p>
                          <p class="text-xs text-gray-400">
                            ${item.slug}
                          </p>
                        </div>
                      </div>
                    </td>

                    <!-- Category -->
                    <td class="px-6 py-4">
                      <span class="bg-purple-100 text-purple-600 text-xs px-3 py-1 rounded-full">
                        ${item.category.title}
                      </span>
                    </td>

                    <!-- Stats -->
                    <td class="px-6 py-4 text-xs">
                      <div class="flex flex-col gap-1 text-gray-500">
                        <span>👍 ${item.like}</span>
                        <span>👎 ${item.dislike}</span>
                      </div>
                    </td>

                    <!-- Date -->
                    <td class="px-6 py-4 text-gray-500">
                      ${(item.createdAt).split("T")[0]}
                    </td>

                    <!-- Status -->
                    <td class="px-6 py-4">
                      <span class="bg-gray-100 text-gray-600 px-3 py-1 rounded-md text-xs">
                        ${item.isPin ? '<i class="fa-solid fa-thumbtack"></i>' : '<i class="fa-solid fa-thumbtack-slash"></i>'}
                      </span>
                    </td>

                    <!-- Actions -->
                    <td class="px-6 py-4">
                      <div class="flex gap-2">
                        <button onclick="updateNews(${item.id})" class="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded-md">
                          Edit
                        </button>
                        <button onclick="deleteNews(${item.id})" class="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded-md">
                          Delete
                        </button>
                      </div>
                    </td>

                  </tr>
        `)
  newsTable.innerHTML = empty
}

