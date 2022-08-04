import {useState,useEffect} from 'react';
import {AddContact,EditContact,ViewContact, Contacts,Navbar} from './components'
import {Routes,Route,useNavigate,Navigate} from 'react-router-dom'
import {getAllContacts,deleteContact,getAllGroups, getContact,addContact} from './services/contactService'
import { confirmAlert } from 'react-confirm-alert';
import './App.css';
import { CURRENTLINE, PURPLE, YELLOW,COMMENT,FOREGROUND } from './helpers/colors';
import {ContactContext} from './context/contactContext'

const App =()=> {
  const [contacts,setContacts] = useState([]);
  const [filteredContacts,setFilteredContacts] = useState([]);
  const [groups,setGroups] = useState([]);
  const [group,setGroup] = useState({});
  const [loading, setLoading] = useState(true);
  const [contact,setContact] = useState({})
  const [contactQuery,setContactQuery] = useState({
    text:""
  });
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
  const onContactChange = (event)=>{
    setContact({...contact,[event.target.name]:event.target.value})
  }
  const confirmDelete = (contactId,contactFullname)=>{
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
    const allContacts = [...contacts];

    try {
      const updatedContacts = allContacts.filter(contact=>contact.id !== parseInt(contactId))
      setContacts(updatedContacts)
      setFilteredContacts(updatedContacts)
      setLoading(true);
      const {status} = await deleteContact(contactId);
      if(status!==200){
        setContacts(updatedContacts)
        setFilteredContacts(updatedContacts)
        setLoading(false);
      }
    }catch(err){
      console.log(err.message);
      setContacts(allContacts)
      setFilteredContacts(allContacts)
      setLoading(false)
    }
  }
  const contactSearch =(event)=>{
    setContactQuery({...contactQuery, text:event.target.value});
    const allContacts = contacts.filter(contact=>{
      return contact.fullname.toLowerCase().includes(event.target.value.toLowerCase());
    })
    setFilteredContacts(allContacts);
    console.log(filteredContacts);
  }
  const createContactForm = async (event)=>{
    event.preventDefault();
    /* Note

    */
    try{
      setLoading(preLoading=>!preLoading);
      const {status,data} = await addContact(contact);
      console.log(status)
      if(status === 201){
        const allContacts = [...contacts,data];
        setContacts(allContacts);
        setFilteredContacts(allContacts);
        setContact({})
        setLoading(prevLoading=>!prevLoading);
        navigate('/contacts');
      }

    }
    catch(err){
      console.log(err.message);
      setLoading(preLoading=>!preLoading);
    }
  }
  return (
    <ContactContext.Provider value={{
      loading,
      setLoading,
      contact,
      setContact,
      contacts,
      setContacts,
      filteredContacts,
      setFilteredContacts,
      groups,
      group,
      setGroups,
      setGroup,
      onContactChange,
      deleteContact:confirmDelete,
      createContact:createContactForm,
      contactSearch,
      contactQuery,


    }}>
<div className="App">
      <Navbar /> 
      <Routes>
         <Route path="/" element={<Navigate to="/contacts" />}/>
         <Route path="/contacts" element={<Contacts />} />
         <Route path="/contacts/:contactId" element={<ViewContact />} />
         <Route path="/contacts/Add" element={<AddContact loading={loading} setContactInfo={onContactChange}  contact={contact} createContactForm={createContactForm} groups={groups}/>} />
         <Route path="/contacts/Edit/:contactId" element={<EditContact  />} />
      </Routes>
    </div>
    </ContactContext.Provider>
    
  );
}

export default App;
