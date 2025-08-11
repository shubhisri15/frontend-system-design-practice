function myFetch (url, options = {}) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open(options.method || 'GET', url, true);

        // Set headers if provided
        if (options.headers) {
        for (const [key, value] of Object.entries(options.headers)) {
            xhr.setRequestHeader(key, value);
        }
        }

        xhr.onload = () => {
        const response = {
            ok: (xhr.status >= 200 && xhr.status < 300),
            status: xhr.status,
            statusText: xhr.statusText,
            url: xhr.responseURL,
            text: () => Promise.resolve(xhr.responseText),
            json: () => Promise.resolve().then(() => JSON.parse(xhr.responseText)),
        };
        resolve(response);
        };

        xhr.onerror = () => reject(new TypeError('Network request failed'));
        xhr.ontimeout = () => reject(new TypeError('Network request timed out'));

        xhr.send(options.body || null);
    })
}