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
    req.session.data['contactMarkers'] = claimant[0].markers
  }
})





router.get('/contact', (req, res) => {
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
    title: "Query from "+req.body.contactPerson+" logged",
    body: req.body.contactType+" about:",
    reasons: req.session.data['contactReason'],
    name: req.session.data['user-name'],
    oldMarkers: claimantToEdit[0].markers,
    newMarkers: req.body.contactMarkers
  })

  claimantToEdit[0].markers = req.body.contactMarkers
  claimantToEdit[0].history.push(newItem)

  res.render('claimant/contact/confirmation-page')
})





router.get('/reissue', (req, res) => {
  const search = req.session.data['find'].replace(/ /g,'').toUpperCase()
  const claimant = req.session.data['claimants'].filter(claimant => claimant.nino === search)

  res.locals.claimant = claimant[0]

  if (claimant == false) {
    res.render('find/no-match')
  } else {
    res.render('claimant/reissue/index')
  }
})

router.post('/claimant/reissue/confirm', (req, res) => {
  const type = req.session.data['reissueType']
  const search = req.session.data['find'].replace(/ /g,'').toUpperCase()
  const claimant = req.session.data['claimants'].filter(claimant => claimant.nino === search)

  res.locals.claimant = claimant[0]

  let claimantToEdit = req.session.data['claimants'].filter(claimant => claimant.nino === search)

  if (type == "print") {
    const newItem = Object.assign({
      title: "Letter printed and handed over",
      name: req.session.data['user-name']
    })
    claimantToEdit[0].history.push(newItem)

    res.render('claimant/reissue/print')
  } else if (type == "newaddress") {
    const newItem = Object.assign({
      title: "Letter reissued to new address",
      name: req.session.data['user-name']
    })
    claimantToEdit[0].history.push(newItem)

    res.render('claimant/reissue/confirmation-page')
  } else {
    const newItem = Object.assign({
      title: "Letter reissued to current address",
      name: req.session.data['user-name']
    })
    claimantToEdit[0].history.push(newItem)

    res.render('claimant/reissue/confirmation-page')
  }
})





router.get('/extend', (req, res) => {
  const search = req.session.data['find'].replace(/ /g,'').toUpperCase()
  const claimant = req.session.data['claimants'].filter(claimant => claimant.nino === search)

  res.locals.claimant = claimant[0]

  if (claimant == false) {
    res.render('find/no-match')
  } else {
    res.render('claimant/extend/index')
  }
})

router.post('/claimant/extend/confirmation-page', (req, res) => {
  const search = req.session.data['find'].replace(/ /g,'').toUpperCase()
  let claimantToEdit = req.session.data['claimants'].filter(claimant => claimant.nino === search)


  claimantToEdit[0].extensionDate = req.body.entendDateYear+"-"+req.body.entendDateMonth+"-"+req.body.entendDateDay

  const newItem = Object.assign({
    title: "Deadline extended",
    body: req.session.data['extendReason'],
    name: req.session.data['user-name']
  })

  claimantToEdit[0].history.push(newItem)

  res.render('claimant/extend/confirmation-page')
})






router.get('/cancel', (req, res) => {
  const search = req.session.data['find'].replace(/ /g,'').toUpperCase()
  const claimant = req.session.data['claimants'].filter(claimant => claimant.nino === search)

  res.locals.claimant = claimant[0]

  if (claimant == false) {
    res.render('find/no-match')
  } else {
    res.render('claimant/cancel/index')
  }
})

router.post('/claimant/cancel/confirmation-page', (req, res) => {
  const search = req.session.data['find'].replace(/ /g,'').toUpperCase()
  let claimantToEdit = req.session.data['claimants'].filter(claimant => claimant.nino === search)


  claimantToEdit[0].status = "Cancelled"

  const newItem = Object.assign({
    title: "Move canceled",
    body: req.session.data['cancelReason'],
    name: req.session.data['user-name']
  })

  claimantToEdit[0].history.push(newItem)

  res.render('claimant/cancel/confirmation-page')
})





router.get('/resume', (req, res) => {
  const search = req.session.data['find'].replace(/ /g,'').toUpperCase()
  const claimant = req.session.data['claimants'].filter(claimant => claimant.nino === search)

  res.locals.claimant = claimant[0]

  if (claimant == false) {
    res.render('find/no-match')
  } else {
    res.render('claimant/resume/index')
  }
})

router.post('/claimant/resume/confirmation-page', (req, res) => {
  const search = req.session.data['find'].replace(/ /g,'').toUpperCase()
  let claimantToEdit = req.session.data['claimants'].filter(claimant => claimant.nino === search)


  claimantToEdit[0].status = "Preparation"

  const newItem = Object.assign({
    title: "Move resumed",
    body: req.session.data['resumeReason'],
    name: req.session.data['user-name']
  })

  claimantToEdit[0].history.push(newItem)

  res.render('claimant/resume/confirmation-page')
})

// Testing routes

router.post('/migrationnotice/confirm-answer', function (req, res) {

  let migrationnotice = req.session.data['migrationnotice']

  if (migrationnotice === 'yes') {
    res.redirect('confirm')
  // } else if (migrationnotice === 'no') {
  //   res.redirect('no')
  } else {
    res.redirect('confirm-nottoday')
  }
})



// Add your routes above the module.exports line
module.exports = router
