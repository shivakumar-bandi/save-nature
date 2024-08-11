const express = require('express')

const router =express.Router()

const donationController = require('../controllers/donationController')

// Route for creating a donation

router.post('/donations', donationController.createDonation)

// Route for retrieving all donations
router.get('/donations', donationController.getDonations)

module.exports =router