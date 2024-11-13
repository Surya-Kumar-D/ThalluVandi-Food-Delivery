import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Item from "./Components/Item.tsx";
import RootLayout from "./Components/RootLayout.tsx";
import SignUp from "./Auth/SignUp.tsx";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    path: "/",
    errorElement: <div>404 NOT FOUND</div>,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "/items",
        children: [
          {
            path: ":slug",
            element: <Item />,
          },
        ],
      },
    ],
  },
]);

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
