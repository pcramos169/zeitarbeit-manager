const express = require('express');
const router = express.Router();

// Sample data
let agreements = [
    { id: 1, type: 'zeitarbeit', description: 'Temporary work agreements' },
    { id: 2, type: 'bautagelohner', description: 'Construction wage agreements' },
    { id: 3, type: 'pflegeberufe', description: 'Care professions agreements' },
];

// GET all agreements
router.get('/', (req, res) => {
    res.json(agreements);
});

// GET an agreement by ID
router.get('/:id', (req, res) => {
    const agreement = agreements.find(a => a.id === parseInt(req.params.id));
    if (!agreement) return res.status(404).send('Agreement not found.');
    res.json(agreement);
});

// POST a new agreement
router.post('/', (req, res) => {
    const { type, description } = req.body;
    const newAgreement = { id: agreements.length + 1, type, description };
    agreements.push(newAgreement);
    res.status(201).json(newAgreement);
});

// PUT (update) an existing agreement
router.put('/:id', (req, res) => {
    const agreement = agreements.find(a => a.id === parseInt(req.params.id));
    if (!agreement) return res.status(404).send('Agreement not found.');

    const { type, description } = req.body;
    agreement.type = type;
    agreement.description = description;
    res.json(agreement);
});

// DELETE an agreement
router.delete('/:id', (req, res) => {
    const agreementIndex = agreements.findIndex(a => a.id === parseInt(req.params.id));
    if (agreementIndex === -1) return res.status(404).send('Agreement not found.');
    agreements.splice(agreementIndex, 1);
    res.status(204).send();
});

module.exports = router;