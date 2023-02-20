const { v4 } = require('uuid');

let  contacts = [
    {
        id: v4(),
        name: 'Marcius Rogerio',
        email: 'marcius.cursos@gmail.com',
        phone: '11987654321',
        category_id: v4()
    },
    {
        id: v4(),
        name: 'Rogerio Marcius',
        email: 'marcius.treinamentos@gmail.com',
        phone: '11987654321',
        category_id: v4()
    }
];

class ContactRepository {
    findAll() {
        return new Promise((resolve) => { 
            resolve(contacts);
        });
    }
    findById(id) {
        return new Promise((resolve) => {
            resolve(contacts.find((item) => item.id === id));
        });
    }

    findByEmail(email) {
        return new Promise((resolve) => {
            resolve(contacts.find((item) => item.email === email));
        });
    }

    create({name, email, phone, category_id}) {
        return new Promise((resolve) =>{
            const newContact = {
                id:v4(),
                name,
                email,
                phone,
                category_id,
            };
            contacts.push(newContact);
            resolve(newContact);
        });
    }

    update(id,{name, email, phone, category_id}) {
        return new Promise((resolve) =>{
            const updatedContact = {
                id,
                name,
                email,
                phone,
                category_id,
            };
            contacts = contacts.map((contact) => {
                if(contact.id === id) {
                    updatedContact;
                    console.log('1',updatedContact);
                } else {
                    contact;
                    console.log('2',contact);
                }



                // contact.id === id ?  : contact;
            });

            resolve(updatedContact);
        });
    }

    delete(id) {
        return new Promise((resolve) => {
            contacts = contacts.filter((item) => item.id != id);
            resolve();
        });
    }

}

module.exports = new ContactRepository();