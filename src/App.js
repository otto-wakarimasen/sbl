import { BlogContent } from "./containers/BlogPage/BlogContent";
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
        <Route path="/" element={<BlogContent />} />
     </Routes>
    </main>
      <Footer year={new Date().getFullYear()}/>
    </div>
    </Router>
  );
}

export default App;
