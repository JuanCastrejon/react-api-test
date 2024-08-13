import logo from './logo.svg';
import './App.css';
import ListaSeries from './components/ListaSeries';
import Formulario from './components/Formulario';

function App() {
  return (
    <div className="App">
      <div className='grid'>
        <ListaSeries />
        <Formulario />
      </div>
    </div>
  );
}

export default App;
