import React, { useContext } from 'react';
import {Link} from 'react-router-dom';
import { ContactContext } from '../../context/contactContext';
import {Contact,Spinner} from '../'
import NotFound from '../../assets/no-found.gif'
import { CURRENTLINE, ORANGE, PINK } from '../../helpers/colors';
const Contacts = ()=>{
    const {loading, contacts, deleteContact,filteredContacts} = useContext(ContactContext);
    return (
        <>
            <section className="container">
                <div className="grid">
                    <div className="row">
                        <div className="col">
                            <p className="h3">
                                <Link to='/contacts/add' className="btn mx-2" style={{backgroundColor:PINK}}>
                                    ساخت مخاطب جدید
                                    <i className="fa fa-plus-circle mx-2"></i>
                                </Link>

                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="container">
                <div className="row">
                    {   loading ? <Spinner/>:
                        filteredContacts.length > 0 ? filteredContacts.map(contact =><Contact deleteContact={()=>deleteContact(contact.id,contact.fullname)} key={contact.id} contact={contact} />) : <div className="text-center py-5" style={{
                            backgroundColor:CURRENTLINE
                        }}>
                            <p className="h3" style={{color:ORANGE}}>
                                مخاطب یافت نشد...
                            </p>
                            <img src={NotFound} alt="" className="w-25"/>
                        </div> 
                        
                        }
                </div>
            </section>
        </>
    )
}
export default Contacts;