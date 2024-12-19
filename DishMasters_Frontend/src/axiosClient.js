import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    withCredentials: true, // Required for cookies
});

// Request Interceptor to fetch CSRF token if missing
axiosClient.interceptors.request.use(async (config) => {
    if (!document.cookie.includes("XSRF-TOKEN")) {
        try {
            await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie", {
                baseURL: "http://127.0.0.1:8000/api",
                withCredentials: true,
            }).then(() => {
                console.log("CSRF cookie fetched successfully");
            }).catch((error) => {
                console.error("Failed to fetch CSRF cookie", error);
            });
        } catch (error) {
            console.error("Error fetching CSRF token:", error.response ? error.response.data : error.message);
        }
    }
    return config;
});

// Response Interceptor to handle errors globally
axiosClient.interceptors.response.use(
    (response) => response, // Pass successful responses through
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("ACCESS_TOKEN"); // Handle unauthorized errors
        }
        console.error("Response error:", error.response ? error.response.data : error.message);
        return Promise.reject(error);
    }
);

export default axiosClient;
