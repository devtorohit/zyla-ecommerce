import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true
});

let isrefresh = false;
let refreshSubscriber = [];

function subscriberTokenRefresh(cb) {
    refreshSubscriber.push(cb);
}

function onrefresh() {
    refreshSubscriber.forEach(cb => cb());
    refreshSubscriber = [];
}

API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // 1. Agar refresh call khud 401/403 de, toh seedha logout
        if (originalRequest.url.includes("/auth/refresh")) {
            isrefresh = false;
            refreshSubscriber = [];
            // window.location.href = "/auth/login"; 
            return Promise.reject(error); 
        }

        // 2. Login fail par koi refresh nahi
        if (originalRequest.url.includes("/auth/login")) {
            return Promise.reject(error);
        }

        // 3. REFRESH LOGIC
        if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
            
            // AGAR PEHLE SE REFRESH CHAL RAHA HAI, TOH WAIT KARO (Yeh missing tha)
            if (isrefresh) {
                return new Promise((resolve) => {
                    subscriberTokenRefresh(() => {
                        resolve(API(originalRequest));
                    });
                });
            }

            originalRequest._retry = true;
            isrefresh = true;

            try {
                await API.post('/auth/refresh');
                isrefresh = false;
                onrefresh();
                return API(originalRequest);
            } catch (refresherror) {
                isrefresh = false;
                refreshSubscriber = [];
                // window.location.href = "/auth/login";
                return Promise.reject(refresherror);
            }
        }

        return Promise.reject(error);
    }
);

export default API;