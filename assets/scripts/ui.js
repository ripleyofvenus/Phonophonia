'use strict'

const store = require('./store.js')

// Auth Ui

const signUpSuccess = (data) => {
  $('#message').html('<p>sign up success<p>')
  $('#message').show()
  $('#message').removeClass('hidden')
  $('#message').addClass('alert-success')
  $('#message').removeClass('alert-danger')
  $('#message').delay(2000).fadeOut('2000')
  $('#sign-up').trigger('reset')
  $('#signup').modal('hide')
  $('#sign-up-button').hide()
}

const signUpFailure = () => {
  $('#message').html('<p>Something went wrong... try again?<p>')
  $('#message').show()
  $('#message').removeClass('hidden')
  $('#message').addClass('alert-danger')
  $('#message').removeClass('alert-success')
  $('#message').delay(2000).fadeOut('2000')
  $('#sign-up').trigger('reset')
}

const signInSuccess = (data) => {
  store.userData = data.user
  $('#message').html('<p>sign in success<p>')
  $('#message').show()
  $('#message').removeClass('hidden')
  $('#message').addClass('alert-success')
  $('#message').removeClass('alert-danger')
  $('#message').delay(2000).fadeOut('2000')
  $('#sign-in').trigger('reset')
  $('#signin').modal('hide')
  $('.app-page').show()
  $('#sign-up-button').hide()
  $('#sign-in-button').hide()
  $('#change-password-button').show()
  $('#sign-out').show()
}

const signInFailure = () => {
  $('#message').html('<p>Something went wrong... try again?<p>')
  $('#message').show()
  $('#message').removeClass('hidden')
  $('#message').addClass('alert-danger')
  $('#message').removeClass('alert-success')
  $('#message').delay(2000).fadeOut('2000')
  $('#sign-in').trigger('reset')
}

const signOutSuccess = (data) => {
  store.userData = null
  $('#message').html('<p>Signed Out<p>')
  $('#message').show()
  $('#message').removeClass('hidden')
  $('#message').addClass('alert-success')
  $('#message').removeClass('alert-danger')
  $('#message').delay(2000).fadeOut('2000')
  $('#tasklist').trigger('reset')
  $('#sign-in-button').show()
  $('#sign-up-button').show()
  $('#change-password-button').hide()
  $('.tasklist').hide()
  $('#sign-out').hide()
}

const changePasswordSuccess = () => {
  $('#message').html('<p>Password Updated<p>')
  $('#message').show()
  $('#message').removeClass('hidden')
  $('#message').addClass('alert-success')
  $('#message').removeClass('alert-danger')
  $('#message').delay(2000).fadeOut('2000')
  $('#change-password').trigger('reset')
  $('#changepassword').modal('hide')
}

const changePasswordFail = () => {
  $('#message').html('<p>Something went wrong... try again?<p>')
  $('#message').show()
  $('#message').removeClass('hidden')
  $('#message').addClass('alert-danger')
  $('#message').removeClass('alert-success')
  $('#message').delay(2000).fadeOut('2000')
  $('#change-password').trigger('reset')
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  changePasswordSuccess,
  changePasswordFail
}
