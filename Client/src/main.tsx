import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "sonner";

const clientId = import.meta.env.VITE_OAUTH_ID;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <Toaster position="top-center" richColors />
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
);
