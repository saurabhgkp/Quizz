import logo from './logo.svg';
import Navbar from './components/Navbar';
import Question from './components/Question';

function App() {
  return (
    <div className="mainDiv bg-light">
      <Navbar />
      <div >

        <Question />
      </div>


    </div>

  );
}

export default App;
