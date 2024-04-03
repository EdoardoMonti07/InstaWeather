import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/InstaWeather/" element={<Homepage />} />
        <Route path="appLayout" element={<AppLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
