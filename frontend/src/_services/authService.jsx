import requestApi from "./apiService";

export async function authenticateUser(email, password) {
    return await requestApi("POST", "/login", {}, {
        "email": email,
        "password": password
    })
}

export async function createUser(name, email, password) {
    return await requestApi("POST", "/register", {}, {
        "name": name,
        "email": email,
        "password": password
    })
}