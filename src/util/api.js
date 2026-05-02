// import axios from 'axios';

// const API = axios.create({
//   // Backend port 5001 ya 8000 (Jo bhi aapka backend hai wo yahan likhein)
//   baseURL: 'http://localhost:5000/api', 
   
// });

// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`; // Authorization header
//   }
//   return config;
// });

// export default API;




// import axios from 'axios';

// const API = axios.create({
//   // Aapka backend URL
//   baseURL: 'http://localhost:5000/api', 
// });

// // Request Interceptor: Har request ke saath token bhejne ke liye
// API.interceptors.request.use((config) => {
//   // 1. Local storage se sari keys check karein
//   // Kyunki aapka token 'roledoctortoken...' jaisi lambi key mein hai
//   let token = null;

//   for (let i = 0; i < localStorage.length; i++) {
//     const key = localStorage.key(i);
//     // Agar key mein 'token' ka lafz maujood hai
//     if (key.includes('token')) {
//       token = localStorage.getItem(key);
//       break;
//     }
//   }

//   // 2. Agar token mil jaye toh header mein set karein
//   if (token) {
//     // Note: Agar token ke andar 'userName' chipka hua hai, 
//     // toh use clean karna par sakta hai. Filhal hum pura bhej rahe hain.
//     config.headers.Authorization = `Bearer ${token}`;
//     console.log("Authorization Header Set: ✅");
//   } else {
//     console.warn("No Token Found in LocalStorage! ❌");
//   }

//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });

// // Response Interceptor: 401 error handle karne ke liye
// API.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       console.error("Token invalid ya expired hai. Login dubara karein.");
//       // Aap chahein to yahan user ko login page par redirect kar sakte hain
//       // window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

// export default API;














// import axios from 'axios';

// const API = axios.create({
 
//   baseURL: 'http://localhost:5000/api', 
// });


// API.interceptors.request.use((config) => {
//   let token = null;


//   for (let i = 0; i < localStorage.length; i++) {
//     const key = localStorage.key(i);
    
//     if (key && key.includes('token')) {
//       token = localStorage.getItem(key);
//       break;
//     }
//   }
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//     console.log("Authorization Header Set: ✅");
//   } else {
//     console.warn("No Token Found in LocalStorage! ❌");
//   }

//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });


// API.interceptors.response.use(
//   (response) => response,
//   (error) => {
    
//     if (error.response && error.response.status === 401) {
//       console.error("Token invalid ya expired hai. Cleaning up LocalStorage... 🧹");

      
//       localStorage.clear();

      
//       setTimeout(() => {
//         window.location.reload();
//       }, 500);
//     }
    
//     return Promise.reject(error);
//   }
// );

// export default API;























// import axios from 'axios';

// const API = axios.create({
//   baseURL: 'http://localhost:5000/api', 
// });

// API.interceptors.request.use((config) => {
//   // Direct 'token' key se nikaalna zyada safe hai
//   const token = localStorage.getItem('token');

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   } else {
//     // Agar fix key nahi mil rahi toh aapka loop wala logic:
//     for (let i = 0; i < localStorage.length; i++) {
//       const key = localStorage.key(i);
//       if (key && key.includes('token')) {
//         config.headers.Authorization = `Bearer ${localStorage.getItem(key)}`;
//         break;
//       }
//     }
//   }
//   return config;
// }, (error) => Promise.reject(error));

// API.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       localStorage.clear();
//       window.location.href = '/'; // Force redirect to login
//     }
//     return Promise.reject(error);
//   }
// );

// export default API;



































import axios from 'axios';

// Environment variable se URL uthayega, agar nahi mila toh localhost use karega
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : 'http://localhost:5000/api',
});


console.log(API);

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    // Backup logic agar key ka naam thoda mukhtalif ho
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.toLowerCase().includes('token')) {
        config.headers.Authorization = `Bearer ${localStorage.getItem(key)}`;
        break;
      }
    }
  }
  return config;
}, (error) => Promise.reject(error));

API.interceptors.response.use(
  (response) => response,
  (error) => {
    // 401 ka matlab hai session expire ho gaya ya token invalid hai
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      // Taake loop na ban jaye agar user pehle se login page par ho
      if (window.location.pathname !== '/') {
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);

export default API;