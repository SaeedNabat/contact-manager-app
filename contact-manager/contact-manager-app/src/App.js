import {useState,useEffect} from 'react';
import {AddContact,EditContact,Contact, Contacts,Navbar} from './components'
import {Routes,Route,useNavigate,Navigate} from 'react-router-dom'
import {getAllContacts,getAllGroups, getContact,addContact} from './services/contactService'

import './App.css';


const App =()=> {
  const [getContacts,setContacts] = useState([]);
  const [getGroups,setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [getContact,setContact] = useState({
    fullname:"",
    photo:"",
    email:"",
    job:"",
    group:""

  })
  const navigate = useNavigate()
  useEffect(()=>{
    const fetchData = async ()=>{
     
      try{
        setLoading(true);
        const {data : contactData} = await getAllContacts();
        const {data : groupData} = await getAllGroups();
      
        console.log(contactData)
        setContacts(contactData);
        setGroups(groupData);
        setLoading(false);

      }catch(err){
        console.log(err.message);
        setLoading(false);
      }
    }
    fetchData();
  },[contacts])
  const setContactInfo = (event)=>{
    setContact({...getContact,[event.target.name]:event.target.value})
  }
  const createContactForm = async (event)=>{
    event.preventDefault();
    try{
      const {status} = await addContact(getContact);
      console.log(status)
      if(status === 201){
        setContact({})
        navigate('/contacts');
      }

    }
    catch(err){
      console.log(err.message);
    }
  }
  return (
    <div className="App">
      <Navbar /> 
      <Routes>
         <Route path="/" element={<Navigate to="/contacts" />}/>
         <Route path="/contacts" element={<Contacts contacts={getContacts} loading={loading} />} />
         {/* <Route path="/contacts/:contactId" element={<Contact />} /> */}
         <Route path="/contacts/Add" element={<AddContact loading={loading} setContactInfo={setContactInfo}  contact={getContact} createContactForm={createContactForm} groups={getGroups}/>} />
         <Route path="/contacts/Edit/:contactId" element={<EditContact />} />
      </Routes>
    </div>
  );
}

export default App;
