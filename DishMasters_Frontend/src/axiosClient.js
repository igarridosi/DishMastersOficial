import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const axiosClient = axios.create({
    baseURL: "http://localhost:8000/api",
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

axiosClient.interceptors.request.use(
    (response) => {
        return response;
    },
    (error) => {
        try {
            const { response } = error;
            if (response.status === 401) {
                localStorage.removeItem("ACCESS_TOKEN");
            }
        } catch (err) {
            console.error(err);
        }
        throw error;
    }
);

/*
// Asegúrate de incluir el token en cada solicitud
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken'); // O el lugar donde guardas el token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
/*

axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL + '/api',
    withCredentials: true,
});

// Request Interceptor to fetch CSRF token if missing
axiosClient.interceptors.request.use(async (config) => {
    if (!document.cookie.includes("XSRF-TOKEN")) {
        try {
            await axios.get(import.meta.env.VITE_API_BASE_URL + '/sanctum/csrf-cookie', {
                withCredentials: true,
            });
            console.log("CSRF cookie fetched");
        } catch (error) {
            console.error("Failed to fetch CSRF cookie:", error.response?.data || error.message);
        }
    }
    return config;
});

axiosClient.get('/test')
    .then(response => console.log(response.data))
    .catch(error => console.error('Error:', error));

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
*/

export default axiosClient;
