import { Route, Routes } from "react-router-dom";
import Cart from "./components/Cart";

import Header from "./components/Header";
import Book from "./pages/Book";
import Home from "./pages/Home";

function App() {
  return (
    <div className="w-full relative">
      <Header />
      <div className="w-full pt-24">
        <Routes>
          <Route path="/" element={<Home />} />  
          <Route path="/book/:id" element={<Book />} />  
        </Routes>  
      </div>
      <Cart />
    </div>
  );
}

export default App;
