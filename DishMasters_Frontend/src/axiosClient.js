import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const axiosClient = axios.create({
    baseURL: "http://localhost:8000/api",
    withCredentials: true,
});

// Request Interceptor to fetch CSRF token if missing
axiosClient.interceptors.request.use(async (config) => {
    if (!document.cookie.includes("XSRF-TOKEN")) {
        try {
            await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
                withCredentials: true,
            });
            console.log("CSRF cookie fetched");
        } catch (error) {
            console.error("Failed to fetch CSRF cookie:", error.response?.data || error.message);
        }
    }
    return config;
});

// Response Interceptor to handle errors globally
axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("ACCESS_TOKEN"); // Handle unauthorized errors
        }
        console.error(
            "Response error:",
            error.response ? error.response.data : error.message
        );
        return Promise.reject(error);
    }
);

export default axiosClient;
