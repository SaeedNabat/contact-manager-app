import {useState} from 'react';
import {Contacts,Navbar} from './components'
import './App.css';


const App =()=> {
  const [getContacts,setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  return (
    <div className="App">
      <Navbar /> 
      <Contacts contacts={getContacts} loading={loading}/>         
    </div>
  );
}

export default App;
