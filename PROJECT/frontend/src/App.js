import logo from './logo.svg';
import './App.css';
import MainContent from './components/MainContent/MainContent.js';
import Navbar from './components/Navbar/Navbar.js';
import ShowCard from './components/ShowCard/ShowCard.js';
import Sidebar from './components/Sidebar/Sidebar.js';


function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="not-navbar">
        <Sidebar />
        <MainContent />
      </div>
    </div>
  );
}

export default App;
