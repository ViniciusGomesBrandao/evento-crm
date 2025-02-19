async function requestApi(method, endpoint, params = {}, body = null) {
    const url = new URL(`/api${endpoint}`, "http://localhost:9000");
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    try {
        const token = localStorage.getItem("access_token");

        const response = await fetch(url, {
            method,
            headers: {
                ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
                ...(method !== "GET" ? { "Content-Type": "application/json" } : {})
            },
            ...(method !== "GET" && body ? { body: JSON.stringify(body) } : {})
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }

        return {
            success: true,
            data: await response.json()
        };
    } catch (error) {
        console.error("Erro na requisição:", error.message);

        return {
            success: false,
            message: error.message
        };
    }
}

export default requestApi;
