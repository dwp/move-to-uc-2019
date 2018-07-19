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






router.get('/reissue/:type', (req, res) => {
  const search = req.session.data['find'].replace(/ /g,'').toUpperCase()
  const claimant = req.session.data['claimants'].filter(claimant => claimant.nino === search)
  const type = req.params.type

  res.locals.claimant = claimant[0]

  if (claimant == false) {
    res.render('find/no-match')
  } else {
    res.render('claimant/reissue/index', {type})
  }
})

router.post('/claimant/reissue/confirmation-page/:type', (req, res) => {
  const type = req.params.type
  const search = req.session.data['find'].replace(/ /g,'').toUpperCase()

  let claimantToEdit = req.session.data['claimants'].filter(claimant => claimant.nino === search)

  const newItem = Object.assign({
    title: req.params.type+" resent",
    name: req.session.data['user-name']
  })

  claimantToEdit[0].history.push(newItem)

  res.render('claimant/reissue/confirmation-page', {type})
})






router.get('/claimant/contact', (req, res) => {
  const search = req.session.data['find'].replace(/ /g,'').toUpperCase()
  const claimant = req.session.data['claimants'].filter(claimant => claimant.nino === search)

  res.locals.claimant = claimant[0]

  if (claimant == false) {
    res.render('find/no-match')
  } else {
    res.render('claimant/contact/index')
  }
})

router.post('/claimant/contact/confirmation-page', (req, res) => {
  const search = req.session.data['find'].replace(/ /g,'').toUpperCase()

  let claimantToEdit = req.session.data['claimants'].filter(claimant => claimant.nino === search)

  const newItem = Object.assign({
    title: "Contact with claimant added",
    body: req.body.contactType+" about:",
    reasons: req.body.contactReason,
    name: req.session.data['user-name']
  })

  claimantToEdit[0].history.push(newItem)

  res.render('claimant/contact/confirmation-page')
})





// Add your routes above the module.exports line
module.exports = router
