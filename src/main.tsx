
  import { createRoot } from "react-dom/client";

  // Self-hosted fonts (latin-only, woff2-only — see src/fonts.css).
  // This replaces an external Google Fonts <link>, removing a
  // render-path DNS + connection round-trip and improving LCP.
  import "./fonts.css";

  import "./index.css";
  import App from "./App.tsx";
  createRoot(document.getElementById("root")!).render(<App />);
  
