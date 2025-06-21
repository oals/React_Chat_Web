import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import ChatRoomPage from './pages/ChatRoomPage';
import ChatArchivePage from './pages/ChatArchivePage';
import CommunityPage from './pages/CommunityPage';
import { MemberProvider } from './contexts/MemberContext';


function App() {

  return (
   <MemberProvider>
       <Router>
          <NavigationBar />
          <div class="d-flex flex-column min-vh-100">
               <main className="mt-5 flex-grow-1">
                 <Routes>
                   <Route path="/" element={<HomePage />} />
                   <Route path="/chat" element={<ChatPage />} />
                   <Route path="/chatRoom" element={<ChatRoomPage />} />
                   <Route path="/chatArchive" element={<ChatArchivePage />} />
                   <Route path="/community" element={<CommunityPage />} />
                 </Routes>
               </main>
               <Footer />
           </div>
        </Router>
   </MemberProvider>
  );
}

export default App;
