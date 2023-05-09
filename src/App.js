import './assets/App.css';
import Accueil from './Components/Accueil';
import {BrowserRouter, Routes,  Route} from "react-router-dom";
import GestionTickets from "./Components/GestionTickets";

function App() {
  return (
      <>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Accueil/>}/>
                  <Route path="/GestionTickets" element={<GestionTickets/>}/>
              </Routes>
          </BrowserRouter>
      </>
  );
}

export default App;
