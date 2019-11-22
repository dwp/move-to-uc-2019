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

//
// router.post('/migrationnotice/confirm-answer', function (req, res) {
//
//   let migrationnotice = req.session.data['migrationnotice']
//
//   if (migrationnotice === 'yes') {
//     res.redirect('confirm')
//   // } else if (migrationnotice === 'no') {
//   //   res.redirect('no')
//   } else {
//     res.redirect('confirm-nottoday')
//   }
// })
//
//
//
//
//
// router.post('/readytomove-alt/confirm-answer', function (req, res) {
//
//   let readytomove = req.session.data['readytomove']
//
//   if (readytomove === 'Ready to move') {
//     res.redirect('success')
//   // } else if (migrationnotice === 'no') {
//   //   res.redirect('no')
//   } else {
//     res.redirect('success-2')
//   }
// })
//
// router.post('/changecircs/confirm-answer', function (req, res) {
//
//   let changecircs = req.session.data['changecircs']
//
//   if (changecircs === 'yes') {
//     res.redirect('../pause/success')
//   } else {
//     res.redirect('../nomoreaction/success')
//   }
// })
//
// router.post('/changecircs2/confirm-answer', function (req, res) {
//
//  let changecircs2 = req.session.data['changecircs2']
//
//  if (changecircs2 === 'yes') {
//    res.redirect('../extended/confirm')
//  } else if (changecircs2 === 'withdraw') {
//     res.redirect('../nomoreaction/success')
//  } else {
//    res.redirect('../cancel/confirm')
//  }
// })
//
//










// ROUTES FOR SPRINT 39

// Ready to move


router.post('/sprint39/singles/readytomove/confirm-answer', function (req, res) {

  let readytomove = req.session.data['readytomove']

  if (readytomove === 'ready') {
    res.redirect('success')
  // } else if (migrationnotice === 'no') {
  //   res.redirect('no')
  } else {
    res.redirect('success-2')
  }
})


router.post('/sprint39/couples/readytomove/confirm-answer', function (req, res) {

  let readytomove = req.session.data['readytomove']

  if (readytomove === 'ready') {
    res.redirect('success')
  // } else if (migrationnotice === 'no') {
  //   res.redirect('no')
  } else {
    res.redirect('success-2')
  }
})



// No more action

router.post('/sprint39/couples/nomoreaction/confirm-answer', function (req, res) {

  let nomoreaction = req.session.data['nomoreaction']

  if (nomoreaction === 'died') {
    res.redirect('success-died')
  // } else if (migrationnotice === 'no') {
  //   res.redirect('no')
  } else {
    res.redirect('success')
  }
})


// Stop a move

router.post('/sprint39/couples/cancel/confirm-answer', function (req, res) {

 let cancel = req.session.data['cancel']

 if (cancel === 'died') {
   res.redirect('../cancel/success-died')
 } else if (cancel === 'exclude') {
    res.redirect('../cancel/success-exclude')
 } else {
   res.redirect('../cancel/success')
 }
})

router.post('/sprint39/singles/cancel/confirm-answer', function (req, res) {

 let cancel = req.session.data['cancel']

 if (cancel === 'withdraw') {
   res.redirect('../cancel/success-withdraw')
 } else if (cancel === 'exclude') {
    res.redirect('../cancel/success-exclude')
 } else {
   res.redirect('../cancel/success')
 }
})


// Pause/Exclude

router.post('/sprint39/couples/pauseexclude/confirm-answer', function (req, res) {

  let pauseexclude = req.session.data['pauseexclude']

  if (pauseexclude === 'defer') {
    res.redirect('success-defer')
  // } else if (migrationnotice === 'no') {
  //   res.redirect('no')
  } else {
    res.redirect('success-exclude')
  }
})


router.post('/sprint39/singles/pauseexclude/confirm-answer', function (req, res) {

  let pauseexclude = req.session.data['pauseexclude']

  if (pauseexclude === 'defer') {
    res.redirect('success-defer')
  // } else if (migrationnotice === 'no') {
  //   res.redirect('no')
  } else {
    res.redirect('success-exclude')
  }
})


router.post('/sprint39/couples/eligibility/confirm-answer', function (req, res) {

  let pauseexclude = req.session.data['pauseexclude']

  if (pauseexclude === 'defer') {
    res.redirect('success-defer')
  // } else if (migrationnotice === 'no') {
  //   res.redirect('no')
  } else {
    res.redirect('success-exclude')
  }
})



// ROUTES FOR SPRINT 46

// Ready to move


router.post('/sprint46/singles/readytomove/confirm-answer', function (req, res) {

  let readytomove = req.session.data['readytomove']

  if (readytomove === 'ready') {
    res.redirect('success')
  // } else if (migrationnotice === 'no') {
  //   res.redirect('no')
  } else {
    res.redirect('success-2')
  }
})


router.post('/sprint46/couples/readytomove/confirm-answer', function (req, res) {

  let readytomove = req.session.data['readytomove']

  if (readytomove === 'ready') {
    res.redirect('success')
  // } else if (migrationnotice === 'no') {
  //   res.redirect('no')
  } else {
    res.redirect('success-2')
  }
})



// No more action

router.post('/sprint46/couples/nomoreaction/confirm-answer', function (req, res) {

  let nomoreaction = req.session.data['nomoreaction']

  if (nomoreaction === 'died') {
    res.redirect('success-died')
  // } else if (migrationnotice === 'no') {
  //   res.redirect('no')
  } else {
    res.redirect('success')
  }
})


// Stop a move

router.post('/sprint46/couples/cancel/confirm-answer', function (req, res) {

 let cancel = req.session.data['cancel']

 if (cancel === 'died') {
   res.redirect('../cancel/success-died')
 } else if (cancel === 'exclude') {
    res.redirect('../cancel/success-exclude')
 } else {
   res.redirect('../cancel/success')
 }
})

router.post('/sprint46/singles/cancel/confirm-answer', function (req, res) {

 let cancel = req.session.data['cancel']

 if (cancel === 'withdraw') {
   res.redirect('../cancel/success-withdraw')
 } else if (cancel === 'exclude') {
    res.redirect('../cancel/success-exclude')
 } else {
   res.redirect('../cancel/success')
 }
})


// Pause/Exclude

router.post('/sprint46/couples/pauseexclude/confirm-answer', function (req, res) {

  let pauseexclude = req.session.data['pauseexclude']

  if (pauseexclude === 'defer') {
    res.redirect('success-defer')
  // } else if (migrationnotice === 'no') {
  //   res.redirect('no')
  } else {
    res.redirect('success-exclude')
  }
})


router.post('/sprint46/singles/pauseexclude/confirm-answer', function (req, res) {

  let pauseexclude = req.session.data['pauseexclude']

  if (pauseexclude === 'defer') {
    res.redirect('success-defer')
  // } else if (migrationnotice === 'no') {
  //   res.redirect('no')
  } else {
    res.redirect('success-exclude')
  }
})


router.post('/sprint46/couples/eligibility/confirm-answer', function (req, res) {

  let pauseexclude = req.session.data['pauseexclude']

  if (pauseexclude === 'defer') {
    res.redirect('success-defer')
  // } else if (migrationnotice === 'no') {
  //   res.redirect('no')
  } else {
    res.redirect('success-exclude')
  }
})



// ROUTES FOR SPRINT 48

// Ready to move


router.post('/sprint48/singles/readytomove/confirm-answer', function (req, res) {

  let readytomove = req.session.data['readytomove']

  if (readytomove === 'ready') {
    res.redirect('success')
  // } else if (migrationnotice === 'no') {
  //   res.redirect('no')
  } else {
    res.redirect('success-2')
  }
})


router.post('/sprint48/couples/readytomove/confirm-answer', function (req, res) {

  let readytomove = req.session.data['readytomove']

  if (readytomove === 'ready') {
    res.redirect('success')
  // } else if (migrationnotice === 'no') {
  //   res.redirect('no')
  } else {
    res.redirect('success-2')
  }
})



// No more action

router.post('/sprint48/couples/nomoreaction/confirm-answer', function (req, res) {

  let nomoreaction = req.session.data['nomoreaction']

  if (nomoreaction === 'died') {
    res.redirect('success-died')
  // } else if (migrationnotice === 'no') {
  //   res.redirect('no')
  } else {
    res.redirect('success')
  }
})


// Stop a move

router.post('/sprint48/couples/cancel/confirm-answer', function (req, res) {

 let cancel = req.session.data['cancel']

 if (cancel === 'died') {
   res.redirect('../cancel/success-died')
 } else if (cancel === 'exclude') {
    res.redirect('../cancel/success-exclude')
 } else {
   res.redirect('../cancel/success')
 }
})

router.post('/sprint48/singles/cancel/confirm-answer', function (req, res) {

 let cancel = req.session.data['cancel']

 if (cancel === 'withdraw') {
   res.redirect('../cancel/success-withdraw')
 } else if (cancel === 'exclude') {
    res.redirect('../cancel/success-exclude')
 } else {
   res.redirect('../cancel/success')
 }
})


// Pause/Exclude

router.post('/sprint48/couples/pauseexclude/confirm-answer', function (req, res) {

  let pauseexclude = req.session.data['pauseexclude']

  if (pauseexclude === 'defer') {
    res.redirect('success-defer')
  // } else if (migrationnotice === 'no') {
  //   res.redirect('no')
  } else {
    res.redirect('success-exclude')
  }
})


router.post('/sprint48/singles/pauseexclude/confirm-answer', function (req, res) {

  let pauseexclude = req.session.data['pauseexclude']

  if (pauseexclude === 'defer') {
    res.redirect('success-defer')
  // } else if (migrationnotice === 'no') {
  //   res.redirect('no')
  } else {
    res.redirect('success-exclude')
  }
})


router.post('/sprint48/couples/eligibility/confirm-answer', function (req, res) {

  let pauseexclude = req.session.data['pauseexclude']

  if (pauseexclude === 'defer') {
    res.redirect('success-defer')
  // } else if (migrationnotice === 'no') {
  //   res.redirect('no')
  } else {
    res.redirect('success-exclude')
  }
})


// Add your routes above the module.exports line
module.exports = router
