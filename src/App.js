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
import { AlertProvider } from './components/AlertProvider';
import PrivateRoute from './route/PrivateRoute';


function App() {

  return (
   <MemberProvider>
       <Router>
          <NavigationBar />
          <AlertProvider>
          <div class="d-flex flex-column min-vh-100">
               <main className="mt-5 flex-grow-1">
                 <Routes>
                   <Route path="/" element={<HomePage />} />
                   <Route path="/chat"
                     element={
                       <PrivateRoute>
                         <ChatPage />
                       </PrivateRoute>
                     }
                   />

                   <Route path="/chatRoom"
                       element={
                         <PrivateRoute>
                           <ChatRoomPage />
                         </PrivateRoute>
                       }
                     />

                   <Route path="/chatArchive"
                     element={
                       <PrivateRoute>
                         <ChatArchivePage />
                       </PrivateRoute>
                     }
                   />

                   <Route path="/community"
                     element={
                       <PrivateRoute>
                         <CommunityPage />
                       </PrivateRoute>
                     }
                   />


                 </Routes>
               </main>
               <Footer />
           </div>
           </AlertProvider>
        </Router>
   </MemberProvider>
  );
}

export default App;
