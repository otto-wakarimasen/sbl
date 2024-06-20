import { BlogPage } from "./containers/BlogPage/BlogPage";
import { LoginPage } from "./containers/LoginPage/LoginPage";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import "./App.css"
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {
  return (
    <Router>
    <div>
<Header />
    <main>
     <Routes>
        <Route exact path="/" element={<BlogPage />} />
        <Route path="/login" element={<LoginPage />} />
     </Routes>
    </main>
      <Footer year={new Date().getFullYear()}/>
    </div>
    </Router>
  );
}

export default App;
