const demo = document.getElementById("demo");
const loaderComp = document.getElementById("loaderComp");
const latestNewsMain = document.getElementById("latestNewsMain");
const categoriesMain = document.getElementById("categoriesMain");
const totalCategoriesEl = document.getElementById("totalCategoriesMain");
const pageEl = document.getElementById("page");

function loaderStatus(status) {
    status ? loaderComp.classList.remove("hidden") : loaderComp.classList.add("hidden");
}


const d = new Date();
document.getElementById("topdate").textContent = d.toLocaleDateString("en-EN", {
    weekday: "long", year: "numeric", month: "long", day: "numeric"
});

document.querySelectorAll(".cat-item").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".cat-item").forEach(b => {
            b.classList.remove("text-accent", "border-accent");
            b.classList.add("text-muted", "border-transparent");
        });
        btn.classList.remove("text-muted", "border-transparent");
        btn.classList.add("text-accent", "border-accent");
    });
});

//  Displayed when the backend API is unavailable.
const FALLBACK_CATEGORIES = [
    { id: 1, title: "Technology", slug: "technology", createdAt: "2025-11-10T00:00:00Z" },
    { id: 2, title: "Science", slug: "science", createdAt: "2025-10-22T00:00:00Z" },
    { id: 3, title: "Economy", slug: "economy", createdAt: "2025-09-15T00:00:00Z" },
    { id: 4, title: "Culture", slug: "culture", createdAt: "2025-08-03T00:00:00Z" },
    { id: 5, title: "Health", slug: "health", createdAt: "2025-07-19T00:00:00Z" },
];

const FALLBACK_NEWS_ITEMS = [
    {
        id: 1,
        title: "Artificial Intelligence Sets New Record in Protein Structure Prediction",
        thumbnail: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600",
        category: { title: "Technology" },
        createdAt: "2025-12-10T09:00:00Z"
    },
    {
        id: 2,
        title: "Global Summit on Climate Change Concludes with Historic Emissions Agreement",
        thumbnail: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600",
        category: { title: "Science" },
        createdAt: "2025-12-08T14:30:00Z"
    },
    {
        id: 3,
        title: "World Economy Grows 3.2% in Q3 Despite Ongoing Geopolitical Tensions",
        thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600",
        category: { title: "Economy" },
        createdAt: "2025-12-05T11:00:00Z"
    },
    {
        id: 4,
        title: "Breakthrough in Quantum Computing Promises Faster Drug Discovery",
        thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600",
        category: { title: "Science" },
        createdAt: "2025-12-03T08:45:00Z"
    },
    {
        id: 5,
        title: "New Study Links Mediterranean Diet to Reduced Risk of Cognitive Decline",
        thumbnail: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600",
        category: { title: "Health" },
        createdAt: "2025-11-29T16:00:00Z"
    },
    {
        id: 6,
        title: "Major Tech Giants Announce Unified Standard for AI Safety Benchmarks",
        thumbnail: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600",
        category: { title: "Technology" },
        createdAt: "2025-11-25T10:20:00Z"
    },
    {
        id: 7,
        title: "Archaeologists Uncover 3,000-Year-Old City Beneath the Saharan Desert",
        thumbnail: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600",
        category: { title: "Science" },
        createdAt: "2025-11-20T13:00:00Z"
    },
    {
        id: 8,
        title: "International Film Festival Awards Best Picture to Azerbaijani Drama",
        thumbnail: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600",
        category: { title: "Culture" },
        createdAt: "2025-11-15T19:30:00Z"
    },
    {
        id: 9,
        title: "Renewable Energy Now Powers Over 40% of the Global Electricity Grid",
        thumbnail: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600",
        category: { title: "Science" },
        createdAt: "2025-11-10T07:00:00Z"
    },
    {
        id: 10,
        title: "Central Banks Signal Cautious Rate Cuts as Inflation Continues to Ease",
        thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600",
        category: { title: "Economy" },
        createdAt: "2025-11-05T12:00:00Z"
    },
];

const FALLBACK_NEWS = {
    items: FALLBACK_NEWS_ITEMS,
    meta: { page: 1, totalPages: 1, total: 10 }
};

// ============================================================
//  OFFLINE BANNER
//  Injected once above the news section when API is down.
// ============================================================
function showOfflineBanner() {
    if (document.getElementById("offlineBanner")) return;

    const banner = document.createElement("div");
    banner.id = "offlineBanner";
    // ↓ replace YOUR_GITHUB_URL with your actual repo link
    banner.innerHTML = `
        <div style="
            background: linear-gradient(90deg, #111827 0%, #1a2332 100%);
            border-bottom: 2px solid #c8392b;
            padding: 10px 40px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 10px;
            font-family: 'DM Sans', sans-serif;
        ">
            <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap; padding:15px">
                <span style="position: relative; display: inline-flex; width: 10px; height: 10px; flex-shrink: 0;">
                   
                    <span style="
                        position: relative; border-radius: 50%;
                        width: 10px; height: 10px; background: #c8392b;
                    "></span>
                </span>
                <span style="color: rgba(255,255,255,0.55); font-size: 18px; letter-spacing: 0.01em;">
                    Backend is currently unavailable.
                </span>
                <span style="color: white; font-size: 16px; font-weight: 600; letter-spacing: 0.01em;">
                    Showing archived news
                </span>
                <span style="
                    display: inline-flex; align-items: center; gap: 5px;
                    color: rgba(255,255,255,0.4); font-size: 12px;
                    font-family: 'DM Mono', monospace;
                    letter-spacing: 0.06em; text-transform: uppercase;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.08);
                    padding: 3px 10px; border-radius: 20px;
                ">
                    <span style="color: #c8392b; font-size: 15px">●</span> All API endpoints and core functions work correctly in the live backend environment
                </span>
            </div>
            <a
                href="https://github.com/FatimaGuseynova/news_website"
                target="_blank"
                rel="noopener noreferrer"
                style="
                    display: inline-flex; align-items: center; gap: 7px;
                    background: #c8392b; color: white; text-decoration: none;
                    padding: 7px 18px; border-radius: 20px;
                    font-size: 12px; font-weight: 600;
                    letter-spacing: 0.05em; text-transform: uppercase;
                    transition: opacity 0.2s; white-space: nowrap; flex-shrink: 0;
                "
                onmouseover="this.style.opacity='0.82'"
                onmouseout="this.style.opacity='1'"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="white" style="flex-shrink:0;">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57
                    0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695
                    -.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99
                    .105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225
                    -.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405
                    c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225
                    0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3
                    0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                View full code on GitHub
            </a>
        </div>
        <style>
            @keyframes bannerPing {
                75%, 100% { transform: scale(2.2); opacity: 0; }
            }
        </style>
    `;

    const newsSection = document.getElementById("news");
    newsSection.parentNode.insertBefore(banner, newsSection);
}

// ============================================================
//  SKELETON TEMPLATES
//  Displayed immediately while data is being fetched.
// ============================================================

/** Featured 2×2 grid skeleton */
function renderLatestNewsSkeleton() {
    latestNewsMain.innerHTML = `
        <div class="bg-gray-100 relative overflow-hidden min-h-[520px] animate-pulse row-span-2">
            <div class="w-full h-full" style="background: linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%);"></div>
            <div class="absolute bottom-0 left-0 right-0 p-7 space-y-3">
                <div class="h-2 rounded-full w-20" style="background: rgba(255,255,255,0.35);"></div>
                <div class="h-5 rounded w-5/6" style="background: rgba(255,255,255,0.3);"></div>
                <div class="h-5 rounded w-3/5" style="background: rgba(255,255,255,0.25);"></div>
                <div class="h-2 rounded-full w-24 mt-2" style="background: rgba(255,255,255,0.2);"></div>
            </div>
        </div>
        <div class="bg-gray-100 relative overflow-hidden min-h-[260px] animate-pulse" style="animation-delay:0.1s;">
            <div class="w-full h-full" style="background: linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%);"></div>
            <div class="absolute bottom-0 left-0 right-0 p-4 space-y-2">
                <div class="h-2 rounded-full w-14" style="background: rgba(255,255,255,0.35);"></div>
                <div class="h-4 rounded w-5/6" style="background: rgba(255,255,255,0.3);"></div>
                <div class="h-2 rounded-full w-20 mt-1" style="background: rgba(255,255,255,0.2);"></div>
            </div>
        </div>
        <div class="bg-gray-100 relative overflow-hidden min-h-[260px] animate-pulse" style="animation-delay:0.2s;">
            <div class="w-full h-full" style="background: linear-gradient(135deg, #d1d5db 0%, #e5e7eb 100%);"></div>
            <div class="absolute bottom-0 left-0 right-0 p-4 space-y-2">
                <div class="h-2 rounded-full w-16" style="background: rgba(255,255,255,0.35);"></div>
                <div class="h-4 rounded w-4/6" style="background: rgba(255,255,255,0.3);"></div>
                <div class="h-2 rounded-full w-24 mt-1" style="background: rgba(255,255,255,0.2);"></div>
            </div>
        </div>
    `;
}

/** News list skeleton */
function renderNewsSkeleton(count = 6) {
    let html = "";
    for (let i = 0; i < count; i++) {
        html += `
        <div class="bg-white px-6 py-5 grid gap-[18px] items-start animate-pulse"
             style="grid-template-columns: 90px 1fr; animation-delay: ${i * 0.07}s;">
            <div class="w-[90px] h-[70px] bg-gray-200 rounded-md flex-shrink-0"></div>
            <div class="space-y-2 pt-1">
                <div class="h-2 bg-gray-200 rounded-full w-16"></div>
                <div class="h-4 bg-gray-200 rounded w-full"></div>
                <div class="h-4 bg-gray-200 rounded w-4/5"></div>
                <div class="h-2 bg-gray-200 rounded-full w-20 mt-1"></div>
            </div>
        </div>`;
    }
    demo.innerHTML = html;
}

/** Sidebar categories skeleton */
function renderCategoriesSkeleton(count = 5) {
    let html = "";
    for (let i = 0; i < count; i++) {
        html += `
        <div class="flex items-center gap-3 mb-5 animate-pulse" style="animation-delay: ${i * 0.08}s;">
            <div class="min-w-[36px] h-10 bg-gray-200 rounded w-9"></div>
            <div class="space-y-2 flex-1">
                <div class="h-2 bg-gray-200 rounded-full w-14"></div>
                <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                <div class="h-2 bg-gray-200 rounded-full w-20"></div>
            </div>
        </div>`;
    }
    categoriesMain.innerHTML = html;
}

// ============================================================
//  RENDER FUNCTIONS
// ============================================================

function renderPagination(activePage, totalPage) {
    let html = "";
    Array.from({ length: totalPage }).forEach((_, i) => {
        html += `
        <button
            onclick="changePage(${i + 1})"
            class="px-4 py-2 text-[13px] font-medium border border-border2 bg-white text-paper
                   transition-all duration-200 hover:border-accent hover:text-accent hover:-translate-y-[1px]
                   ${activePage === i + 1 ? "!bg-accent !text-white !border-accent shadow-sm" : ""}"
        >${i + 1}</button>`;
    });
    pageEl.innerHTML = html;
}

function renderCards(arr) {
    let html = "";
    arr.forEach(item => {
        html += `
        <div onclick="newsReadMore(${item.id})"
             class="bg-white px-6 py-5 grid gap-[18px] items-start cursor-pointer transition-colors hover:bg-surface"
             style="grid-template-columns: 90px 1fr;">
            <img src="${item.thumbnail}" alt="" class="w-[90px] h-[70px] object-cover rounded-md flex-shrink-0">
            <div>
                <div class="font-mono2 text-[10px] tracking-[0.1em] uppercase text-accent2 mb-1">${item.category.title}</div>
                <div class="font-playfair text-[15px] font-bold leading-snug mb-1.5 text-paper">${item.title}</div>
                <div class="text-[11px] text-muted font-mono2">${item.createdAt.split("T")[0]}</div>
            </div>
        </div>`;
    });
    demo.innerHTML = html;
}

function renderlatestNewsShowMain(arr) {
    let html = "";
    arr.forEach(item => {
        html += `
        <div onclick="newsReadMore(${item.id})"
             class="card bg-white relative overflow-hidden cursor-pointer transition-transform row-span-2 min-h-[520px]">
            <img class="card-img w-full h-full object-cover block transition-transform duration-[600ms] ease-in-out"
                 src="${item.thumbnail}" alt="">
            <div class="absolute inset-0"
                 style="background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.1) 60%, transparent 100%);"></div>
            <div class="absolute bottom-0 left-0 right-0 p-7 text-white">
                <span class="inline-block font-mono2 text-[10px] tracking-[0.1em] uppercase text-accent
                             bg-[rgba(200,57,43,0.15)] border border-[rgba(200,57,43,0.3)] px-2.5 py-0.5 rounded mb-2.5">
                    ${item.category.title}
                </span>
                <div class="font-playfair text-[clamp(16px,2vw,24px)] font-bold leading-tight tracking-tight mb-2.5">
                    ${item.title}
                </div>
                <div class="flex items-center gap-3 text-[11px] text-muted font-mono2 mt-2">
                    <span>${item.createdAt.split("T")[0]}</span>
                    <span class="hero-tag inline-flex items-center gap-2 font-mono2 text-[10px] tracking-[0.12em] uppercase text-accent">
                        Read More
                    </span>
                </div>
            </div>
        </div>`;
    });
    latestNewsMain.innerHTML = html;
}

function renderCategoriesMain(arr) {
    let html = "";
    arr.forEach((item, i) => {
        html += `
        <div class="flex items-center gap-2 mb-4">
            <div class="trend-num font-playfair text-[40px] font-black text-border2 leading-[0.9] min-w-[36px] transition-colors hover:text-[#c8392b]">
                ${i + 1}
            </div>
            <div>
                <div class="font-mono2 text-[10px] uppercase tracking-[0.08em] text-accent mb-1">${item.slug}</div>
                <div class="font-playfair text-[15px] font-bold leading-snug">${item.title}</div>
                <div class="text-[11px] text-muted mt-1 font-mono2">${item.createdAt.split("T")[0]}</div>
            </div>
        </div>`;
    });
    categoriesMain.innerHTML = html;
}

async function getNews(currentPage = 1, limit = 10) {
    try {
        const news = await getAllNews(currentPage, limit);
        renderCards(news.items);
        renderPagination(news.meta.page, news.meta.totalPages);
    } catch (err) {
        console.warn("[F-145] News API unavailable — using static fallback data.", err);
        showOfflineBanner();
        const start = (currentPage - 1) * limit;
        const sliced = FALLBACK_NEWS.items.slice(start, start + limit);
        renderCards(sliced);
        renderPagination(currentPage, FALLBACK_NEWS.meta.totalPages);
    }
}

async function totalCategoriesShowMain() {
    try {
        const res = await getAllCategory();
        totalCategoriesEl.textContent = res.length;
    } catch {
        totalCategoriesEl.textContent = FALLBACK_CATEGORIES.length;
    }
}

async function getCategoriesMain() {
    try {
        const res = await getAllCategory();
        renderCategoriesMain(res);
    } catch {
        renderCategoriesMain(FALLBACK_CATEGORIES);
    }
}

async function latestNewsShowMain() {
    try {
        const res = await getAllNews();
        const arr = res.items.slice(res.items.length - 4).reverse();
        renderlatestNewsShowMain(arr);
    } catch {
        renderlatestNewsShowMain(FALLBACK_NEWS_ITEMS.slice(0, 4));
    }
}

renderLatestNewsSkeleton();
renderNewsSkeleton(6);
renderCategoriesSkeleton(5);

getNews();
totalCategoriesShowMain();
getCategoriesMain();
latestNewsShowMain();


const changePage = async (index) => {
    await getNews(index);
    document.getElementById("news").scrollIntoView({ behavior: "smooth" });
};

// ─── NAVIGATION ──────────────────────────────────────────────
function newsReadMore(id) {
    location.replace(`user/read.html`);
}

function registrationFormUser() {
    location.replace("user/registration.html");
}