import AppComponent from './components/AppComponent';
import JsonData from '././init.json';

export default function App() {
  return (
    <div className="container rounded text-center bg-dark bg-gradient col-md-6 p-3 shadow my-3">
      <h1 className='p-3 text-light'>PROGRAMMING LANGUAGES</h1>
      <AppComponent list={JsonData}/>
    </div>
  );
}
