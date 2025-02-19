import requestApi from "./apiService";

export async function getEvents() {
    return await requestApi("GET", "/events", {}, {})
}

export async function getUniqueEvent(id) {
    return await requestApi("GET", `/events/${id}}`, {}, {})
}

export async function create(data) {
    return await requestApi("POST", "/events", {}, {...data})
}


export async function update(id, data) {
    return await requestApi("PUT", `/events/${id}`, {}, {...data})
}


export async function deleteEvent(id) {
    return await requestApi("DELETE", `/events/${id}`, {}, {})
}