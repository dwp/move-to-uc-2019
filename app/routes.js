const express = require('express')
const router = express.Router()
const fs = require('fs')
// Claimant data
const data = require('./assets/claimants.json')

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

// On sign out delete session data
router.get('/signout', function (req, res) {
  // var starter = require('./assets/claimants-starter.json')
  for (var i = 1; i < data.length; i++) {
    delete data[i];
  }
  fs.writeFile('app/assets/claimants.json', JSON.stringify(data,null,2), (err) => {
    if (err) throw err;
    console.log('JSON reset');
  })


  req.session.destroy()
  res.redirect('/')
})

// Search claimants from JSON file and render claimant view or no results view
router.get('/results', (req, res) => {
  res.locals.claimants = data;
  const search = req.session.data['find'].replace(/ /g,'').toUpperCase()
  const claimant = data.filter(claimant => claimant.nino === search)
  res.locals.claimant = claimant[0]

  if (claimant == false) {
    res.render('find/no-match')
  } else {
    res.render('claimant/index')
  }
})

// Create a new claimant
router.post('/create', (req, res) => {
  const newItem = Object.assign({
    nino: req.body.nino.replace(/ /g,'').toUpperCase(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dob: [
      req.body.dobYear,
      req.body.dobMonth,
      req.body.dobDay
    ],
    // phone: req.body.phone,
    address: {
      street: req.body.addressStreet1,
      street2: req.body.addressStreet2,
      city: req.body.addressCity,
      postcode: req.body.addressPostcode
    },
    partner: req.body.partner,
    partnerName: req.body.partnerName,
    partnerCode: req.body.partnerCode,
    appointee: req.body.appointee,
    appointeeName: req.body.appointeeName,
    legacyBenefits: req.body.legacyBenefits,
    welsh: req.body.welsh
  })
  data.push(newItem)
  fs.writeFile('app/assets/claimants.json', JSON.stringify(data,null,2), (err) => {
    if (err) throw err;
    console.log('Claimant created');
  })
  res.redirect('/results?find='+req.body.nino)
  delete req.session.data['find']
})

// Insert claimant details into edit view
router.get('/claimant/edit/:nino', (req, res) => {
  res.locals.claimants = data;
  const claimantToEdit = data.filter(claimant => claimant.nino === req.params.nino)
  res.locals.claimant = claimantToEdit[0]
  res.render('claimant/edit')
})

// Update claimant record
router.post('/claimant/edit/:nino', (req, res) => {
  res.locals.claimants = data;
  let claimantToEdit = data.filter(claimant => claimant.nino === req.params.nino)
  claimantToEdit[0].nino = req.body.nino.replace(/ /g,'').toUpperCase(),
  claimantToEdit[0].firstName = req.body.firstName,
  claimantToEdit[0].lastName = req.body.lastName,
  claimantToEdit[0].dob = [
    req.body.dobYear,
    req.body.dobMonth,
    req.body.dobDay
  ],
  // phone: req.body.phone,
  claimantToEdit[0].address = {
    street: req.body.addressStreet1,
    street2: req.body.addressStreet2,
    city: req.body.addressCity,
    postcode: req.body.addressPostcode
  },
  claimantToEdit[0].partner = req.body.partner,
  claimantToEdit[0].partnerName = req.body.partnerName,
  claimantToEdit[0].partnerCode = req.body.partnerCode,
  claimantToEdit[0].appointee = req.body.appointee,
  claimantToEdit[0].appointeeName = req.body.appointeeName,
  claimantToEdit[0].legacyBenefits = req.body.legacyBenefits,
  claimantToEdit[0].welsh = req.body.welsh

  fs.writeFile('app/assets/claimants.json', JSON.stringify(data, null, 2), (err) => {
    if (err) throw err;
    console.log('Claimant updated');
  });
  res.redirect('/results?find='+req.body.nino);
})


// Add your routes above the module.exports line
module.exports = router
