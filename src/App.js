import logo from './logo.svg';
import Navbar from './components/Navbar';
import Question from './components/Question';
import ListData from './components/ListData';
import AddQuestion from './components/AddQuestion';

function App() {
  return (
    <div className="mainDiv bg-light">
      <Navbar />
      <div >
        {/* <AddQuestion /> */}
        {/* <Question /> */}
        <ListData />
      </div>


    </div>

  );
}

export default App;
