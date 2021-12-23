import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Container from 'components/Container';
import HomePage from 'components/HomePage';

function App() {
  return (
    <>
      <Container>
        <HomePage />
      </Container>
      <ToastContainer />
    </>
  );
}

export default App;
