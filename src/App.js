import { Provider } from 'react-redux';
import store from './redux/store';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <h1>React app using the redux provider</h1>
      </div>
    </Provider>
  );
}

export default App;
