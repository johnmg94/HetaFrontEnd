import logo from './logo.svg';
import './App.css';
import Navigation from './Nav.js'
import DataViewer from './DataViewer.js'
import  makeRequest from './GetData.js'

function App() {
  return (
    <div className="App">
      <Navigation></Navigation>
      <DataViewer></DataViewer>
    </div>
  );
}

export default App;