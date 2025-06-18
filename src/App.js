import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Chat from './pages/Chat';
import ChatRoom from './pages/ChatRoom';

function App() {
  return (
  <Router>
       <NavigationBar />
       <main>
         <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/about" element={<About />} />
           <Route path="/chat" element={<Chat />} />
           <Route path="/chatRoom" element={<ChatRoom />} />
         </Routes>
       </main>
        <Footer />

     </Router>
  );
}

export default App;
