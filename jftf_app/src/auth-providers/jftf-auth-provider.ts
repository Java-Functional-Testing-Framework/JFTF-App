export const authProvider = {
    // add your authentication logic here, e.g. make a request to the authentication endpoint with the user credentials
    login: ({ username, password }) => {
        const request = new Request('http://localhost:8000/api/token-auth/', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });

        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }

                return response.json();
            })
            .then(({ token }) => {
                localStorage.setItem('token', token);
            });
    },

    // add your logout logic here, e.g. remove the authentication token from the local storage
    logout: () => {
        localStorage.removeItem('token');
        return Promise.resolve();
    },

    // add your authentication headers logic here, e.g. get the authentication token from the local storage
    checkAuth: () => {
        return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
    },

    // add your authentication headers logic here, e.g. get the authentication token from the local storage
    checkError: ({ status }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            return Promise.reject();
        }

        return Promise.resolve();
    },

    // add your authentication headers logic here, e.g. get the authentication token from the local storage
    getPermissions: () => {
        return localStorage.getItem('permissions') ? Promise.resolve(JSON.parse(localStorage.getItem('permissions'))) : Promise.reject();
    },
};