import React from 'react';
import {Contact,Spinner} from '../'
import NotFound from '../../assets/no-found.gif'
import { CURRENTLINE, ORANGE, PINK } from '../../helpers/colors';
const Contacts = ({contacts,loading})=>{
    return (
        <>
            <section className="container">
                <div className="grid">
                    <div className="row">
                        <div className="col">
                            <p className="h3">
                                <button className="btn mx-2" style={{backgroundColor:PINK}}>
                                    ساخت مخاطب جدید
                                    <i className="fa fa-plus-circle mx-2"></i>
                                </button>

                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="container">
                <div className="row">
                    {   loading ? <Spinner/>:
                        contacts.length > 0 ? contacts.map(contact => (
                            <Contact key={contact.id} contact={contact} />
                        )) : <div className="text-center py-5" style={{
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