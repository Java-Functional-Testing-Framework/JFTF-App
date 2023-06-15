export function getCSRFToken() {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();

        // Check if the cookie starts with 'csrftoken='
        if (cookie.indexOf('csrftoken=') === 0) {
            // Extract and return the value of the csrftoken cookie
            return cookie.substring('csrftoken='.length, cookie.length);
        }
    }

    // Return null if the csrftoken cookie is not found
    return null;
}
