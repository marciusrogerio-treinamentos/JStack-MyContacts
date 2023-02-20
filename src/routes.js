const { Router } = require('express');

const ContactController = require('./app/controllers/ContactController');

const router = Router();

router.get('/', (_request, response) => {
response.send('Alo Brasil!!');
});
  

router.get('/contacts', ContactController.index);
router.get('/contacts/:id', ContactController.show);
router.delete('/contacts/:id', ContactController.delete);
router.put('/contacts/:id', ContactController.update);
router.post('/contacts', ContactController.store);

module.exports = router;

