// let readMoreSection = document.getElementById("readMoreSection")

// async function getNewsReadMore(id) {
//     let res = await updateNewsId(id)
//     console.log(res)
//     getNewsReadMoreShow(res.news)

// }

// const urlParams = new URLSearchParams(window.location.search)
// const id = urlParams.get("id")
// getNewsReadMore(id)

// function getNewsReadMoreShow(item) {
//     readMoreSection.innerHTML += `
//             <!-- Top bar -->
//     <div class="bg-red-700 px-6 py-1.5 text-white text-xs tracking-widest uppercase">
//         ● Technology &nbsp; ● Science &nbsp; ● Society
//     </div>

//     <!-- Navbar -->
//     <nav class="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
//         <div class="font-serif text-2xl font-bold tracking-tight text-gray-900">F—145</div>
//         <div class="flex gap-6 text-xs tracking-widest uppercase text-gray-500">
//             <a class="hover:text-gray-900">Main</a>
//             <a class="hover:text-gray-900">Technology</a>
//             <a class="text-red-700 font-semibold">Society</a>
//         </div>
//     </nav>

//     <!-- Main content -->
//     <div class=" mx-auto px-6 py-8">

//         <!-- Category label -->
//         <div class="flex items-center gap-2 mb-4">
//             <div class="w-7 h-0.5 bg-red-700"></div>
//             <span class="text-xs tracking-widest uppercase text-red-700 font-semibold">${item.category.title}</span>
//         </div>

//         <!-- Title -->
//         <h1 class="font-serif text-4xl font-bold leading-tight text-gray-900 mb-5 max-w-2xl">
//             ${item.title}
//         </h1>

//         <!-- Meta row -->
//         <div class="flex items-center gap-5 mb-7 pb-5 border-b border-gray-200">
//             <span class="flex items-center gap-1.5 text-sm text-gray-500">
//                 <!-- calendar icon --> 30 May 2026
//             </span>
//             <span class="flex items-center gap-1.5 text-sm text-gray-500">
//                 <!-- eye icon --> 0 views
//             </span>
//             <div class="ml-auto flex items-center gap-3">
//                 <button
//                     class="flex items-center gap-1.5 border border-gray-200 rounded-full px-4 py-1 text-sm text-gray-600 hover:bg-gray-50">
//                     👍 0
//                 </button>
//                 <button
//                     class="flex items-center gap-1.5 border border-gray-200 rounded-full px-4 py-1 text-sm text-gray-600 hover:bg-gray-50">
//                     👎 0
//                 </button>
//                 <button onclick="backToMain()"
//                     class="flex items-center gap-1.5 border border-red-400-200 rounded-full px-4 py-1 text-sm text-white bg-red-700 hover:bg-red-800">
//                     View All News
//                 </button>
//             </div>
//         </div>

//         <!-- Grid: article + sidebar -->
//         <div class="flex justify-center items-center">

//             <!-- Article body -->
//             <div>
// <img
//   src="${item.thumbnail}"
//   alt="${item.title}"
//   class="w-full rounded object-contain mb-6"
//   style="max-height: 480px; min-height: 280px;"
// />
//                 <div class="font-serif text-lg leading-relaxed text-gray-800 space-y-5">
//                     <p>${item.content}</p>
//                     <blockquote class="border-l-4 border-red-700 pl-5 italic text-gray-500 text-xl">
//                         "The future is today. Information is power."
//                     </blockquote>
//                 </div>
//                 <!-- Tags -->
//                 <div class="mt-8 pt-6 border-t border-gray-200 flex items-center gap-3">
//                     <span class="text-xs tracking-widest uppercase text-gray-400">Tags:</span>
//                     <span class="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
//                         ${item.category.title}
//                     </span>
//                 </div>
//             </div>

//             <!-- Sidebar -->
//             <aside class="flex flex-col gap-5">
//         `
// }

// function backToMain(){
//     location.replace("../index.html")
// }
const readMoreSection = document.getElementById("readMoreSection");

function renderReadPage() {
    readMoreSection.innerHTML = `
        <div class="min-h-screen bg-[#f9fafb] flex items-center justify-center px-6">
            <div class="max-w-[720px] w-full bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] p-10">

                <div class="flex items-center gap-3 mb-6">
                    <div class="w-3 h-3 rounded-full bg-red-600"></div>
                    <span class="text-[12px] uppercase tracking-[0.08em] text-red-600 font-semibold">
                        System Notice
                    </span>
                </div>

                <h1 class="text-[34px] font-bold leading-tight text-[#111827] mb-5">
                    Article temporarily unavailable
                </h1>

                <p class="text-gray-600 leading-8 text-[16px] mb-8">
                    We are currently experiencing backend connectivity issues.
                    The full article content cannot be displayed at this moment.
                </p>

                <div class="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-8">
                    <p class="text-gray-500 text-[14px] leading-7">
                        This page is operating in <strong>archive mode</strong>.
                        Static preview data is available on the homepage, but
                        detailed article rendering is currently disabled.
                    </p>
                </div>

                <button
                    onclick="location.replace('../index.html')"
                    class="bg-red-600 text-white px-6 py-3 rounded-lg text-[14px] font-medium transition-opacity hover:opacity-90"
                >
                    Return to homepage
                </button>

            </div>
        </div>
    `;
}

renderReadPage();