import axios from '../helpers/axios';
const API = "/auth/login";


class AuthService {
    async login({ name, password }) {

        return await axios.post(API, {
            name,
            password,

        });

    }

    getHeaders(withAuthorization, contentType = { 'Content-Type': 'application/json' }) {
        
        const token = localStorage.getItem("idToken");
        console.log(token);
        let headers = contentType;
        if (withAuthorization && token) {
            headers = { ...headers, "Authorization": `Bearer ${token}` }

        };
        console.log(headers);
        return headers;
    };

    saveTokens({ token }) {
        localStorage.setItem("idToken", token);

    }

    logout() {
        localStorage.removeItem("idToken");

    }
    fetchCurrentUser() {
        return axios.get("/auth/user", {
            headers: this.getHeaders(true)
        });
    }
}

export const authService = new AuthService();