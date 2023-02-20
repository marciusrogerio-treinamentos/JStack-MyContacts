const ContactRepository = require('../repositories/ContactRepository');

class ContactController {

    async index(request, response) {
        // Listar todos registros
        const conytacts = await ContactRepository.findAll();
        response.json(conytacts);
    }

    async show(request, response) {
        // Obter um registro
        const { id } = request.params;
        const contact = await ContactRepository.findById(id);

        if(!contact) {
            return response.status(404).json({ error: 'Contact not found!'});
        }

        return response.json(contact);

    }

    async store(request, response) {
        // Criar um registro
        const {name, email, phone, category_id} = request.body;

        if (!name) {
            return response.status(400).json({ error: 'Name is required'});
        }
        const contactExists = await ContactRepository.findByEmail(email);

        if (contactExists) {
            return response.status(400).json({ error: 'This e-mail is already in use'});
        }

        const contact = await ContactRepository.create({
            name, email, phone, category_id
        });


        response.json(contact);
    }

    async update(request, response) {
        // Editar um registro
        const { id } = request.params;
        const {name, email, phone, category_id} = request.body;
        
        if (!name) {
            return response.status(400).json({ error: 'Name is required'});
        }        
        
        const contactById = await ContactRepository.findById(id);
        if(!contactById) {
            return response.status(404).json({ error: 'Contact not found!'});
        }        

        const contactByEmail = await ContactRepository.findByEmail(email);
        if (contactByEmail && contactByEmail.id != id) {
            return response.status(400).json({ error: 'This e-mail is already in use'});
        }

        const contact = await ContactRepository.update(id, {name, email, phone, category_id});

        response.json(contact);





    }

    async delete(request, response) {
        // Deletar um registro
        const { id } = request.params;
        const contact = await ContactRepository.findById(id);

        if(!contact) {
            return response.status(404).json({ error: 'Contact not found!'});
        }

        await ContactRepository.delete(id);

        return response.sendStatus(204);

    }


}

module.exports = new ContactController();