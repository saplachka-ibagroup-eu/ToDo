import axios from "axios";

const axiosInstance = axios.create();
axiosInstance.interceptors.response.use((response) => response, (error) => {

    const { status } = error.response;

    if (status === 401) {
        localStorage.removeItem("idToken");
        window.location = "/sign-in";
    }

    throw error;
});

export default axiosInstance;