import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { SidebarProvider } from "./components/ui/sidebar.tsx";


// Polyfill for global object
if (typeof global === "undefined") {
  (window as typeof globalThis).global = window;
}
createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <SidebarProvider>
      <App />
    </SidebarProvider>
  </Provider>
);
