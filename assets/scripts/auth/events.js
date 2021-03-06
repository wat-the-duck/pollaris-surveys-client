'use strict'

const getFormFields = require('./../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

const onSignUp = function (event) {
  // default event reloads page on button click
  event.preventDefault()

  // get user input
  // event.target tells us which item was clicked on the 'submit'
  const form = event.target

  // format data
  const data = getFormFields(form)
  if (data.credentials.password !== data.credentials.password_confirmation) {
    $('.message').show()
    $('.message').text(`Passwords don't match. Try again.`)
    $('.message')[0].scrollIntoView()
    return ui.onSignUpFailure
  }
  // send to API
  api.signUp(data)
    // handle if API succeeds
    .then(ui.onSignUpSuccess)
    // handle if API fails
    .catch(ui.onSignUpFailure)
}

const onSignIn = function (event) {
  // default event reloads page on button click
  event.preventDefault()

  // get user input
  // event.target tells us which item was clicked on the 'submit'
  const form = event.target

  // format data
  const data = getFormFields(form)

  // send to API
  api.signIn(data)
    // handle if API succeeds
    .then(ui.onSignInSuccess)
    // handle if API fails
    .catch(ui.onSignInFailure)
}

const onChangePassword = function (event) {
  $('#change-password').hide()
  $('#back-button').hide()
  // default event reloads page on button click
  event.preventDefault()

  // get user input
  // event.target tells us which item was clicked on the 'submit'
  const form = event.target

  // format data
  const data = getFormFields(form)

  // send to API
  api.changePassword(data)
    // handle if API succeeds
    .then(ui.onChangePasswordSuccess)
    // handle if API fails
    .catch(ui.onChangePasswordFailure)
}

const onSignOut = function (event) {
  // default event reloads page on button click
  event.preventDefault()

  // get user input
  // event.target tells us which item was clicked on the 'submit'
  const form = event.target

  // format data
  const data = getFormFields(form)

  // send to API
  api.signOut(data)
    // handle if API succeeds
    .then(ui.onSignOutSuccess)
    // handle if API fails
    .catch(ui.onSignOutFailure)
}

const eventHandlers = () => {
  // auth event handlers
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#change-password').on('submit', onChangePassword)
  $('#show-password-button').on('click', () => {
    $('#change-password').show()
    $('#show-password-button').hide()
    $('#back-button').show()
  })
  $('#back-button').on('click', () => {
    $('#change-password').hide()
    $('#show-password-button').show()
    $('#back-button').hide()
  })
  $('#sign-out').on('click', onSignOut)
}

module.exports = {
  eventHandlers,
  onSignUp,
  onSignIn,
  onChangePassword,
  onSignOut
}
