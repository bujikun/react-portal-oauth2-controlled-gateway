import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext.tsx";
import "./index.css";
import AdminPage from "./pages/AdminPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import ProtectedRoute from "./pages/ProtectedRoute.tsx";
import UserPage from "./pages/UserPage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";


// const router = createBrowserRouter(
//   [
//     {
//       path: "/",
//       element: <LandingPage />,
//     },
//   ],
//   {
//     basename: import.meta.env.BASE_URL, // dynamically get from Vite config
//   }
// );
export const axiosClient = axios.create();
axiosClient.interceptors.response.use(
  (response) => {
   // console.log("headers",response.headers["x-session-expired"])
    // if (response.request.responseURL === "https://home.dev/login")
    if (response.request.responseURL === "http://127.0.0.1:8010/auth")
      //window.location.href = "https://home.dev/login";
    //window.location.reload();
    window.location.replace("http://127.0.0.1:8010/app");
    // window.location.replace("https://home.dev/app");
    //console.log(response.request)
    return response;
  },
  (error) => {
    const err = error as AxiosError
    console.log(err?.code)
    //if(err.code.)
    return Promise.reject(error);
  }
);
//import.meta.env.BASE_URL
const router = createBrowserRouter([
  {
    path: `${import.meta.env.BASE_URL}`,
    element: <HomePage />,
    // loader: async () => {
    //   return fetch("http://127.0.0.1:8010/session");
    // },
    children: [
      {
        path: `user`,
        element: <UserPage />,
      },
      {
        path: `admin`,
        element: (
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
],);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
