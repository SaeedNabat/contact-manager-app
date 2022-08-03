import {useState,useEffect} from 'react';
import {AddContact,EditContact,ViewContact, Contacts,Navbar} from './components'
import {Routes,Route,useNavigate,Navigate} from 'react-router-dom'
import {getAllContacts,deleteContact,getAllGroups, getContact,addContact} from './services/contactService'
import { confirmAlert } from 'react-confirm-alert';
import './App.css';
import { CURRENTLINE, PURPLE, YELLOW,COMMENT,FOREGROUND } from './helpers/colors';


const App =()=> {
  const [getContacts,setContacts] = useState([]);
  const [getFilteredContacts,setFilteredContacts] = useState([]);
  const [getGroups,setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [getContact,setContact] = useState({
    fullname:"",
    photo:"",
    email:"",
    job:"",
    group:""

  })
  const [query,setQuery] = useState({
    text:""
  });
  const [forceRender, setForceRender] = useState(false);
  const navigate = useNavigate()
  useEffect(()=>{
    const fetchData = async ()=>{
     
      try{
        setLoading(true);
        const {data : contactData} = await getAllContacts();
        const {data : groupData} = await getAllGroups();
      
        console.log(contactData)
        setContacts(contactData);
        setFilteredContacts(contactData)
        setGroups(groupData);
        setLoading(false);

      }catch(err){
        console.log(err.message);
        setLoading(false);
      }
    }
    fetchData();
  },[])
  const setContactInfo = (event)=>{
    setContact({...getContact,[event.target.name]:event.target.value})
  }
  const confirm = (contactId,contactFullname)=>{
    confirmAlert({
      customUI:({onClose})=>{
        return <div dir="rtl" style={{
          backgroundColor:CURRENTLINE,
          border:`1px solid ${PURPLE}`,
          borderRadius:"1rem",
        }}
        className="p-4">
          <h1 style ={{color:YELLOW}}>پاک کردن مخاطب</h1>
          <p style={{color: FOREGROUND}}>
            مطمینی که میخوای مخاطب {contactFullname} رو پاک کنی؟
          </p>
          <button 
          onClick={()=>{
            removeContact(contactId);
            onClose();
          }}
          className="btn mx-2"
          style={{backgroundColor:PURPLE}}
          >
            مطمین هستم
          </button>
          <button onClick={onClose}
                  className="btn"
                  style={{backgroundColor:COMMENT}}

          >
            انصراف
          </button>

        </div>

      }
    })
  }
  const removeContact = async (contactId)=>{
    try {
      setLoading(true);
      const response = await deleteContact(contactId);
      if(response){
        const {data:contactsData} = await getAllContacts();
        setContacts(contactsData);
        setLoading(false);
      }
    }catch(err){
      console.log(err.message);
      setLoading(false)
    }
  }
  const contactSearch =(event)=>{
    setQuery({...query, text:event.target.value});
    const allContacts = getContacts.filter(contact=>{
      return contact.fullname.toString().toLowerCase().includes(event.target.value.toLowerCase());
    })
    setFilteredContacts(allContacts);
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
      <Navbar query={query} search={contactSearch}/> 
      <Routes>
         <Route path="/" element={<Navigate to="/contacts" />}/>
         <Route path="/contacts" element={<Contacts confirmDelete={confirm} contacts={getFilteredContacts} loading={loading} />} />
         <Route path="/contacts/:contactId" element={<ViewContact />} />
         <Route path="/contacts/Add" element={<AddContact loading={loading} setContactInfo={setContactInfo}  contact={getContact} createContactForm={createContactForm} groups={getGroups}/>} />
         <Route path="/contacts/Edit/:contactId" element={<EditContact forceRender ={forceRender} setForceRender={setForceRender}/>} />
      </Routes>
    </div>
  );
}

export default App;
