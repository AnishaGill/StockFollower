import {BrowserRouter, Routes, Route} from "react-router-dom"
import {StockOverviewPage} from "./pages/StockOverviewPage";
import {StockDetailPage} from "./pages/StockDetailPage";



function App() {
  return (
    <main className="container">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<StockOverviewPage />}>
          {/* Syntax for element*/}
        </Route>

        <Route path="/detail/:symbol" element={<StockDetailPage/>}>
          {/* Dynatic Variable*/}
        </Route>
      </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
