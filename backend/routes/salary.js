const express = require('express');
const router = express.Router();

// Base hourly rates
const baseRates = {
    metalIndustry: 20,
    constructionIndustry: 18,
    healthcareSocial: 22,
    retail: 15,
    logistics: 19,
    it: 25,
};

// Branch supplements in percentage
const branchSupplements = {
    metalIndustry: 0.15,
    constructionIndustry: 0.20,
    healthcareSocial: 0.10,
    retail: 0.05,
    logistics: 0.12,
    it: 0.25,
};

// Overtime multiplier
const overtimeMultiplier = 1.5;
const sundayBonus = 1.25;
const holidayBonus = 1.50;

// GET conventions
router.get('/conventions', (req, res) => {
    res.json({ baseRates, branchSupplements });
});

// GET specific branch supplement
router.get('/supplement/:industry', (req, res) => {
    const industry = req.params.industry;
    const supplement = branchSupplements[industry];
    if (supplement !== undefined) {
        res.json({ industry, supplement });
    } else {
        res.status(404).json({ message: 'Industry not found' });
    }
});

// POST calculate salary
router.post('/calculate-salary', (req, res) => {
    const { industry, hoursWorked, isOvertime, isSunday, isHoliday } = req.body;
    const baseRate = baseRates[industry];
    if (!baseRate) return res.status(400).json({ message: 'Invalid industry' });
    
    let salary = baseRate * hoursWorked;
    salary += salary * (branchSupplements[industry] || 0);
    
    if (isOvertime) salary *= overtimeMultiplier;
    if (isSunday) salary *= sundayBonus;
    if (isHoliday) salary *= holidayBonus;
    
    res.json({ salary });
});

module.exports = router;
