import { BlogContent } from "./components/BlogContent/BlogContent";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import "./App.css"

function App() {
  return (
    <div>
<Header />
    <main>
      <BlogContent />
    </main>
      <Footer year={new Date().getFullYear()}/>
    </div>
  );
}

export default App;
