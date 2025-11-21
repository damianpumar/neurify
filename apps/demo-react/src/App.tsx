import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { AIComponent } from "@adaptive-ui/components/react";

function App() {
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <AIComponent
        intent="ProductCard"
        data={{
          productName: "Premium Headphones",
          price: "$299",
          features: [
            "High-fidelity sound",
            "Noise cancellation",
            "Comfort fit",
          ],
        }}
      />
    </>
  );
}

export default App;
