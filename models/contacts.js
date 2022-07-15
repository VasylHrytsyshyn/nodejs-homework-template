const fs = require('fs/promises')
const path = require('path')
const ObjectID = require("bson-objectid")


const contactsPath = path.join(__dirname, "/contacts.json")

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
}

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contactById = contacts.find(item => item.id === contactId);
  if (!contactById) {
    return null;
  };
  return contactById;
};

const removeContact = async (contactId) => {
    const contacts = await listContacts()
    const idx = contacts.findIndex(item => item.id === contactId);
    if(idx === -1){
        return null;
    }
    const [removeContact] = contacts.splice(idx, 1);
    updateContacts(contacts);
    return removeContact;
}

const addContact = async (body) => {
  const { name, email, phone } = body
  const contacts = await listContacts();
    const newContact = {
      id: ObjectID(),
      name,
      email,
      phone
    };
    contacts.push(newContact);
    updateContacts(contacts);
    return newContact;
}

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === contactId);
    if(idx === -1){
        return null;
    }
    contacts[idx] = {id:contactId, name, email, phone};
    updateContacts(contacts);
    return contacts[idx];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
