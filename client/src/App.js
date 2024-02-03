import logo from './logo.svg';
import './App.css';
import DrIEEEmJournal from './components/DrIEEEmJournal';
import { AppContextProvider } from './AppContext';

function App() {
  return (
    <AppContextProvider>
    <DrIEEEmJournal/>
    </AppContextProvider>
  );
}

export default App;
