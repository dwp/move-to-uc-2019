const express = require('express')
const router = express.Router()

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

// On sign out delete session data
router.get('/signout', function (req, res) {
  req.session.destroy()
  res.redirect('/')
})

// Search claimants from default session data file and render claimant view or no results view
router.get('/results', (req, res) => {
  const search = req.session.data['find'].replace(/ /g,'').toUpperCase()
  const claimant = req.session.data['claimants'].filter(claimant => claimant.nino === search)

  res.locals.claimant = claimant[0]

  if (claimant == false) {
    res.render('find/no-match')
  } else {
    res.render('claimant/index')
  }
})

// Insert claimant details into edit view
router.get('/claimant/edit/:nino', (req, res) => {
  const claimantToEdit = req.session.data['claimants'].filter(claimant => claimant.nino === req.params.nino)
  res.locals.claimant = claimantToEdit[0]
  res.render('claimant/edit')
})

// Update claimant record
router.post('/claimant/edit/:nino', (req, res) => {
  let claimantToEdit = req.session.data['claimants'].filter(claimant => claimant.nino === req.params.nino)
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
  claimantToEdit[0].landline = req.body.landline,
  claimantToEdit[0].mobile = req.body.mobile,
  claimantToEdit[0].partner = req.body.partner,
  claimantToEdit[0].partnerName = req.body.partnerName,
  claimantToEdit[0].partnerCode = req.body.partnerCode,
  claimantToEdit[0].appointee = req.body.appointee,
  claimantToEdit[0].appointeeName = req.body.appointeeName,
  claimantToEdit[0].appointeeNino = req.body.appointeeNino,
  claimantToEdit[0].legacyBenefits = req.body.legacyBenefits,
  claimantToEdit[0].welsh = req.body.welsh

  res.redirect('/results?find='+req.body.nino);
})






// Add your routes above the module.exports line
module.exports = router
