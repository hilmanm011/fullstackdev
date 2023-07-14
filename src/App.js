import BodyComponent from "./components/BodyComponent";
import Navbar from "./components/Navbar";
import ListGroup from './components/ListGroup'

function App() {
  return (
    <div className="container mt-1">
      <Navbar />
      <BodyComponent />
      <ListGroup/>
    </div>
  );
}

export default App;
