type HandleFetchInput = {
    request: Request,
    fetch: typeof fetch
}

/** @type {import('@sveltejs/kit').HandleFetch} */
export async function handleFetch({request, fetch}: HandleFetchInput) {
    if(request.url.startsWith("/api")) {
        request = new Request(
            request.url.replace("/api", "http://localhost:3000/api"),
            request
        )
    }

    console.log("Request rewritten", request);

    return fetch(request);
}