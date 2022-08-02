import axios from 'axios';

const SERVER_URL = 'http://localhost:9000';

export const getAllContacts = ()=>{
    return axios.get(`${SERVER_URL}/contacts`);
}
export const getAllGroups = ()=>{
    return axios.get(`${SERVER_URL}/groups`);
}
export const getContact = (contactId)=>{
    return axios.get(`${SERVER_URL}/contacts/${contactId}`);
}
export const getGroup = (groupId)=>{
    return axios.get(`${SERVER_URL}/groups/${groupId}`);
}

export const addContact = (contact)=>{
    return axios.post(`${SERVER_URL}/contacts`, contact);
}
export const updateContact = (contact,contactId)=>{
    return axios.put(`${SERVER_URL}/contacts/${contactId}`, contact);
};
export const deleteContact = (contactId)=>{
    return axios.delete(`${SERVER_URL}/contacts/${contactId}`);
}