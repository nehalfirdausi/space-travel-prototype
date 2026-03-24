const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('/', (req, res) => {
  res.redirect('/start')
})

router.get('/start', (req, res) => {
  req.session.data = {}
  req.session.formErrors = null
  res.render('start')
})

router.get('/destination', (req, res) => {
  const formErrors = req.session.formErrors
  const errors = formErrors && formErrors.page === 'destination' ? formErrors.errors : null
  const errorList = formErrors && formErrors.page === 'destination' ? formErrors.errorList : null
  req.session.formErrors = null
  res.render('destination', { errors, errorList })
})

router.get('/fullname', (req, res) => {
  const formErrors = req.session.formErrors
  const errors = formErrors && formErrors.page === 'fullname' ? formErrors.errors : null
  const errorList = formErrors && formErrors.page === 'fullname' ? formErrors.errorList : null
  req.session.formErrors = null
  res.render('fullname', { errors, errorList })
})

router.get('/address', (req, res) => {
  const formErrors = req.session.formErrors
  const errors = formErrors && formErrors.page === 'address' ? formErrors.errors : null
  const errorList = formErrors && formErrors.page === 'address' ? formErrors.errorList : null
  req.session.formErrors = null
  res.render('address', { errors, errorList })
})

router.get('/check-answers', (req, res) => {
  res.render('check-answers')
})

router.get('/confirmation', (req, res) => {
  res.render('confirmation')
})

router.post('/destination', (req, res) => {
  if (!req.session.data.destination) {
    req.session.formErrors = {
      page: 'destination',
      errors: {
        destination: {
          text: 'Select where you would like to travel'
        }
      },
      errorList: [
        {
          text: 'Select where you would like to travel',
          href: '#destination'
        }
      ]
    }
    return res.redirect('/destination')
  }

  res.redirect('/fullname')
})

router.post('/fullname', (req, res) => {
  if (!req.session.data.fullname || !req.session.data.fullname.trim()) {
    req.session.formErrors = {
      page: 'fullname',
      errors: {
        fullname: {
          text: 'Enter your full name'
        }
      },
      errorList: [
        {
          text: 'Enter your full name',
          href: '#fullname'
        }
      ]
    }
    return res.redirect('/fullname')
  }

  res.redirect('/address')
})

router.post('/address', (req, res) => {
  const errors = {}
  const errorList = []

  if (!req.session.data.addressLine1 || !req.session.data.addressLine1.trim()) {
    errors.addressLine1 = {
      text: 'Enter address line 1'
    }
    errorList.push({
      text: 'Enter address line 1',
      href: '#address-line-1'
    })
  }

  if (!req.session.data.town || !req.session.data.town.trim()) {
    errors.town = {
      text: 'Enter a town or city'
    }
    errorList.push({
      text: 'Enter a town or city',
      href: '#town'
    })
  }

  if (!req.session.data.postcode || !req.session.data.postcode.trim()) {
    errors.postcode = {
      text: 'Enter a postcode'
    }
    errorList.push({
      text: 'Enter a postcode',
      href: '#postcode'
    })
  }

  if (Object.keys(errors).length > 0) {
    req.session.formErrors = {
      page: 'address',
      errors,
      errorList
    }
    return res.redirect('/address')
  }

  res.redirect('/check-answers')
})

router.post('/check-answers', (req, res) => {
  res.redirect('/confirmation')
})