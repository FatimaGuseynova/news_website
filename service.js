let BASE_URL = 'https://news.apasni.me/api'
let tokens = localStorage.getItem('token')

const getAllNews = async (page = 1, limit = 10) => {
    let res = await fetch(`${BASE_URL}/news?page=${page}&limit=${limit}`)
    let data = await res.json()
    return data
}

const login = async (params) => {
    let responsive = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        body: JSON.stringify(params),
        headers : {
            "content-type": "application/json"
        }
    })
    let data = await responsive.json()
    return data

}

let getAllCategory = async () => {
    let res = await fetch(`${BASE_URL}/category`)
    let data = await res.json()
    return data
    
} 

let createNews = async (params) => {
    let res = await fetch(`${BASE_URL}/news`, {
        method: "POST",
        body: JSON.stringify(params), 
        headers: {
            "content-type": "application/json",
            "authorization" : `Bearer ${tokens}`
        }
    })
    let data = await res.json()
    return data
}

let createCategory = async (params) =>{
    let res = await fetch(`${BASE_URL}/category`,{
        method : "POST",
        body: JSON.stringify(params),
        headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${tokens}`
        }
    })
    let data = await res.json()
    return data
}

let createCategoryId = async (params, id) =>{
    let res = await fetch(`${BASE_URL}/category`,{
        method : "POST",
        body: JSON.stringify(params),
        headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${tokens}`
        }
    })
    let data = await res.json()
    return data
}