let categoryTable = document.getElementById("categoryTable")

async function getCategory() {
  let data = await getAllCategory()
  renderCategory(data)
}
getCategory()
let categoryForm = document.getElementById("categoryForm")
let categoryInputs = document.querySelectorAll("#categoryForm input")
let saveCategory = document.getElementById("saveCategory")

let loadingSave = (status) => {
  status ? saveCategory.innerHTML = `
      <div class="w-full gap-x-1 flex justify-center items-center">
      <div class="w-3 bg-[#d991c2] animate-pulse h-3 rounded-full animate-bounce"></div>
      <div class="w-3 animate-pulse h-3 bg-[#9869b8] rounded-full animate-bounce"></div>
      <div class="w-3 h-3 animate-pulse bg-[#6756cc] rounded-full animate-bounce"></div>
    </div>
  ` : saveCategory.innerHTML = "Save Category"
}

categoryForm.onsubmit = async (e) => {
  e.preventDefault()
  let [title, slug] = Array.from(categoryInputs).map(item => item.value)
  let obj = { title, slug }
  loadingSave(true)
  let res = await createCategory(obj)
  loadingSave(false)

  if (res.error) {
    my_modal_2.close()
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: res.message[0],
    });
  }
  else {
    my_modal_2.close()
    Swal.fire({
      title: res.message,
      icon: "success",
    });
  }
  getCategory()


}

let titleinp1 = document.getElementById("titleinp1")
let titleinp2 = document.getElementById("titleinp2")
let categoryFormUp = document.getElementById("categoryFormUp")

function openCategoryUp(title, slug) {
  my_modal_4.showModal()
  titleinp1.value = title
  titleinp2.value = title

}

function renderCategory(arr) {
  let empty = ""
  arr.map((item, index) => empty += `
        <tr class="bg-white hover:bg-gray-50 transition shadow-sm">

                    <!-- ID -->
                    <td class="px-6 py-4 font-medium text-gray-700">
                      ${index + 1}
                    </td>

                    <!-- Title -->
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-2">

                        <div class="w-3 h-3 rounded-full bg-purple-500"></div>

                        <span class="font-medium text-gray-800">
                          ${item.title}
                        </span>
                      </div>
                    </td>

                    <!-- Slug -->
                    <td class="px-6 py-4 text-gray-500">
                      ${item.slug}
                    </td>

                    <!-- Created -->
                    <td class="px-6 py-4 text-gray-500">
                     ${(item.createdAt).split("T")[0]}
                    </td>

                    <!-- Updated -->
                    <td class="px-6 py-4 text-gray-500">
                     ${(item.updatedAd).split("T")[0]}
                    </td>

                    <!-- Actions -->
                    <td class="px-6 py-4">
                      <div class="flex gap-2">

                        <button onclick="openCategoryUp('${item.title}', '${item.slug}')" class="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded-md">
                          Edit
                        </button>

                        <button class="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded-md">
                          Delete
                        </button>

                      </div>
                    </td>

                  </tr>
        `)
  categoryTable.innerHTML = empty
}