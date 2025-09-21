import Header from "./components/header";
import Footer from "./components/footer";
import ProductListPage from "./pages/ProductListPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Header />
      <main className="contents">
        <Routes>
          <Route path="/" element={<ProductListPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
