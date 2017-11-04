'use strict'

const store = require('./store.js')
const showTracksTemplate = require('./templates/tracks.handlebars')
const tracksAPI = require('./tracks/api')

// Auth Ui

const signUpSuccess = (data) => {
  $('#message').html('<p>sign up success<p>')
  $('#message').show()
  $('#message').removeClass('hidden')
  $('#message').delay(2000).fadeOut('2000')
  $('#sign-up').trigger('reset')
  $('#signup').modal('hide')
  $('#sign-up-button').hide()
}

const signUpFailure = () => {
  $('#message').html('<p>Something went wrong... try again?<p>')
  $('#message').removeClass('hidden')
  $('#message').delay(2000).fadeOut('2000')
  $('#sign-up').trigger('reset')
}

const signInSuccess = (data) => {
  store.userData = data.user
  $('#message').html('<p>sign in success<p>')
  $('#message').show()
  $('#message').removeClass('hidden')
  $('#message').delay(2000).fadeOut('2000')
  $('#sign-in').trigger('reset')
  $('#signin').modal('hide')
  $('#sign-up-button').hide()
  $('#sign-in-button').hide()
  $('#change-password-button').show()
  $('#sign-out').show()
  $('.contents').removeClass('hidden')
  tracksAPI.getTracks()
    .then(getTracksSuccess)
    .catch(getTracksError)
}

const signInFailure = () => {
  $('#message').html('<p>Something went wrong... try again?<p>')
  $('#message').show()
  $('#message').removeClass('hidden')
  $('#message').delay(2000).fadeOut('2000')
  $('#sign-in').trigger('reset')
}

const signOutSuccess = (data) => {
  store.userData = null
  $('#message').html('<p>Signed Out<p>')
  $('#message').show()
  $('#message').removeClass('hidden')
  $('#message').delay(2000).fadeOut('2000')
  $('#tasklist').trigger('reset')
  $('#sign-in-button').show()
  $('#sign-up-button').show()
  $('#change-password-button').hide()
  $('#sign-out').hide()
}

const changePasswordSuccess = () => {
  $('#message').html('<p>Password Updated<p>')
  $('#message').show()
  $('#message').removeClass('hidden')
  $('#message').delay(2000).fadeOut('2000')
  $('#change-password').trigger('reset')
  $('#changepassword').modal('hide')
}

const changePasswordFail = () => {
  $('#message').html('<p>Something went wrong... try again?<p>')
  $('#message').show()
  $('#message').removeClass('hidden')
  $('#message').delay(2000).fadeOut('2000')
  $('#change-password').trigger('reset')
}

// Tracks Ui

const getTracksSuccess = (data) => {
  const showTracksHtml = showTracksTemplate({ tracks: data.tracks })
  $('.track-list').append(showTracksHtml)
  $('#message').html('<p>Your very own tracks...<p>')
  $('#message').show()
  $('#message').removeClass('hidden')
  $('#message').delay(2000).fadeOut('2000')
}

const getTracksError = () => {
  $('#message').html('<p>Something went wrong... did not retrieve tracks<p>')
  $('#message').show()
  $('#message').removeClass('hidden')
  $('#message').delay(2000).fadeOut('2000')
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  changePasswordSuccess,
  changePasswordFail,
  getTracksSuccess,
  getTracksError
}
