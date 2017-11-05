'use strict'

const store = require('./store.js')
const showTracksTemplate = require('./templates/tracks.handlebars')
const showPlaylistsTemplate = require('./templates/playlists.handlebars')
const tracksAPI = require('./tracks/api')
const playlistsAPI = require('./playlist/api')

// Auth Ui

const signUpSuccess = (data) => {
  $('#message').html('<p>sign up success<p>')
  $('#message').show()
  $('#message').removeClass('hidden')
  $('#message').delay(2000).fadeOut('2000')
  $('#sign-up').trigger('reset')
  $('#signup').modal('hide')
  $('.sign-up').addClass('hidden')
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
  $('.sign-up').addClass('hidden')
  $('.sign-in').addClass('hidden')
  $('.change-password').removeClass('hidden')
  $('.sign-out').removeClass('hidden')
  // $('.contents').empty()
  $('.contents').removeClass('hidden')
  $('.new-sound').removeClass('hidden')
  $('.new-playlist').removeClass('hidden')
  getTracks()
  getPlaylists()
}

const signInFailure = () => {
  $('#message').html('<p>Something went wrong... try again?<p>')
  $('#message').show()
  $('#message').removeClass('hidden')
  $('#message').delay(2000).fadeOut('2000')
  $('.sign-in').trigger('reset')
}

const signOutSuccess = (data) => {
  store.userData = null
  $('#message').html('<p>Signed Out<p>')
  $('#message').show()
  $('#message').removeClass('hidden')
  $('#message').delay(2000).fadeOut('2000')
  $('.contents').addClass('hidden')
  $('.change-password').addClass('hidden')
  $('.sign-out').addClass('hidden')
  $('.sign-up').removeClass('hidden')
  $('.sign-in').removeClass('hidden')
  $('.new-sound').addClass('hidden')
  $('.new-playlist').addClass('hidden')
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

// Contents Ui

const getTracks = () => {
  tracksAPI.getTracks()
    .then(getTracksSuccess)
    .catch(getTracksError)
}

const getPlaylists = () => {
  playlistsAPI.getPlaylists()
    .then(getPlaylistsSuccess)
    .catch(getPlaylistsError)
}

const getTracksSuccess = (data) => {
  $('.tracks-list').empty()
  const showTracksHtml = showTracksTemplate({ tracks: data.tracks })
  $('.tracks-list').append(showTracksHtml)
  // $('#message').html('<p>Your very own tracks...<p>')
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

const getPlaylistsSuccess = (data) => {
  $('.playlists-list').empty()
  const showPlaylistsHtml = showPlaylistsTemplate({ playlists: data.playlists })
  $('.playlists-list').append(showPlaylistsHtml)
  $('.select-playlist').on('click', function (event) {
    event.preventDefault()
    const id = $(this).parent().parent().data('id')
    console.log(id)
  })
  // $('#message').html('<p>Your very own tracks...<p>')
  // $('#message').show()
  // $('#message').removeClass('hidden')
  // $('#message').delay(2000).fadeOut('2000')
}

// const onSelectPlaylist = (event) => {
//   console.log('this is')
// }

const getPlaylistsError = () => {
  $('#message').html('<p>Something went wrong... did not retrieve tracks<p>')
  $('#message').show()
  $('#message').removeClass('hidden')
  $('#message').delay(2000).fadeOut('2000')
}

const newPlaylistSuccess = () => {
  $('#message').html('<p>Sounds good to me!<p>')
  $('#message').show()
  $('#message').removeClass('hidden')
  $('#message').delay(2000).fadeOut('2000')
  $('#new-playlist').trigger('reset')
  $('#newplaylist').modal('hide')
}

const newPlaylistError = () => {
  $('#message').html('<p>Something went wrong adding your playlist... try again?<p>')
  $('#message').removeClass('hidden')
  $('#message').delay(2000).fadeOut('2000')
}

const newSoundSuccess = (data) => {
  $('#message').html('<p>Sounds good to me!<p>')
  $('#message').show()
  $('#message').removeClass('hidden')
  $('#message').delay(2000).fadeOut('2000')
  $('#new-sound').trigger('reset')
  $('#newsound').modal('hide')
}

const newSoundError = () => {
  $('#message').html('<p>Something went wrong adding your track... try again?<p>')
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
  getTracksError,
  getPlaylistsSuccess,
  getPlaylistsError,
  newPlaylistSuccess,
  newPlaylistError,
  newSoundError,
  newSoundSuccess
}
