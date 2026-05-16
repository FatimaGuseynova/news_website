let userTable = document.getElementById("userTable")

let getAllUsers = async () => {
  let res = await getUsers()
  renderUserTable(res)
}
getAllUsers()

function renderUserTable(arr) {
  let empty = ""
  arr.map(item => empty += `
        <tr class="hover:bg-gray-50 transition">

        <!-- User Info -->
        <td class="px-8 py-6">
          <div class="flex items-center gap-4">

            <div class="max-w-[420px]">
              <h3 class="font-semibold text-[15px] leading-6 text-gray-900">
                ${item.username}
              </h3>

              <p class="text-sm text-gray-500 mt-1">
                ${item.email}
              </p>

              <p class="text-xs text-gray-400 mt-1 truncate">
                ${item.fullName}
              </p>
            </div>

          </div>
        </td>

        <!-- Role -->
        <td class="px-4 py-6">
          <span class="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm">
            ${item.role}
          </span>
        </td>

        <!-- Provider -->
        <td class="px-4 py-6 text-gray-600">
          ${item.provider}
        </td>

        <!-- Gender -->
        <td class="px-4 py-6 text-gray-600">
          ${item.gender}
        </td>

        <!-- Status -->
        <td class="px-4 py-6">
          <span class="bg-green-100 text-green-600 px-3 py-1 rounded-lg text-sm">
           ${item.password}
          </span>
        </td>


      </tr>
        `)
  userTable.innerHTML = empty
}