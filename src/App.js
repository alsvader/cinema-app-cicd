import { Provider } from 'react-redux';
import store from './redux/store';
import Header from './components/header/Header';
import Main from './components/main/Main';
import './App.scss';

function App() {
  return (
    <Provider store={store}>
      <Header />
      <div className="app">
        <Main />
      </div>
    </Provider>
  );
}

export default App;
