'use strict'

const store = require('./store.js')
const showTracksTemplate = require('./templates/tracks.handlebars')
const showPlaylistsTemplate = require('./templates/playlists.handlebars')
const showCurrentTemplate = require('./templates/currentplaylist.handlebars')
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
  $('.delete-track').on('click', function (event) {
    event.preventDefault()
    const id = $(this).parent().parent().attr('data-id')
    tracksAPI.deleteTrack(id)
      .then(deleteTrackSuccess)
      .catch(deleteTrackFailure)
  })
  $('.edit-track').on('click', function (event) {
    event.preventDefault()
    $('.save-changes').removeClass('hidden')
    const trackID = $(this).parent().parent().attr('data-id')
    const trackTitle = $(this).parent().siblings()[0]
    trackTitle.contentEditable = true
    const trackArtist = $(this).parent().siblings()[1]
    trackArtist.contentEditable = true
    const trackURL = $(this).parent().siblings()[2]
    trackURL.contentEditable = true
    $(trackTitle).css('background-color', 'rgba(39, 43, 43, 0.7)')
    $(trackArtist).css('background-color', 'rgba(39,43,43, 0.7)')
    $(trackURL).css('background-color', 'rgba(39,43,43, 0.7)')
    $('.save-changes').on('click', function () {
      onSaveTrack(trackID, trackTitle, trackArtist, trackURL)
    })
    $('#message').text('Ch-ch-ch-ch-changes!')
  })
  $('.add-to-playlist').on('click', function (event) {
    event.preventDefault()
    const thisTrackDropdown = $(this).parent().siblings()[5]
    const thisTrackSave = $(this).parent().siblings()[6]
    const thisTrackCancel = $(this).parent().siblings()[7]
    $(thisTrackDropdown).children().removeClass('hidden')
    $(thisTrackSave).children().removeClass('hidden')
    $(thisTrackCancel).children().removeClass('hidden')
    $('.add-to-playlist').addClass('hidden')
    $('.cancel-to-playlist').on('click', function (event) {
      event.preventDefault()
      $('.confirm-to-playlist').addClass('hidden')
      $('.selectPlaylist').addClass('hidden')
      $('.add-to-playlist').removeClass('hidden')
      $('.selectPlaylist').empty()
      $('.cancel-to-playlist').addClass('hidden')
    })
    playlistsAPI.getPlaylists()
      .then(populatePlaylistList)
      .catch(populatePlaylistError)
  })
  // $('#message').show()
  // $('#message').removeClass('hidden')
  // $('#message').delay(2000).fadeOut('2000')
}

// const editTrackDetails = (event) => {
//
// }

const onSaveTrack = (trackID, trackTitle, trackArtist, trackURL) => {
  console.log(trackID)
  const id = trackID
  const newTitle = $(trackTitle).text()
  const newArtist = $(trackTitle).text()
  const newURL = $(trackURL).text()
  const data =
{
  track: {
    title: newTitle,
    artist: newArtist,
    host_url: newURL
  }
}
  tracksAPI.editTrack(data, id)
    .then(updateTrackSuccess)
    . catch(updateTrackError)
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
    playlistsAPI.getAPlaylist(id)
      .then(currentPlaylistSuccess)
      .catch(currentPlaylistError)
  })
  $('.edit-playlist').on('click', function (event) {
    event.preventDefault()
    $('.save-changes-playlist').removeClass('hidden')
    const playlistID = $(this).parent().parent().attr('data-id')
    console.log(playlistID)
    const playlistName = $(this).parent().siblings()[0]
    console.log(playlistName)
    playlistName.contentEditable = true
    // $(trackTitle).css('background-color', 'rgba(39, 43, 43, 0.7)')
    // $(trackArtist).css('background-color', 'rgba(39,43,43, 0.7)')
    // $(trackURL).css('background-color', 'rgba(39,43,43, 0.7)')
    // $('.save-changes').on('click', function () {
    //   onSaveTrack(trackID, trackTitle, trackArtist, trackURL)
    // })
    // $('#message').text('Ch-ch-ch-ch-changes!')
  })
  $('.delete-playlist').on('click', function (event) {
    event.preventDefault()
    const id = $(this).parent().parent().attr('data-id')
    console.log(id)
    playlistsAPI.deletePlaylist(id)
      .then(deletePlaylistSuccess)
      .catch(deletePlaylistFailure)
  })
}

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
  getPlaylists()
}

const newPlaylistError = () => {
  $('#message').html('<p>Something went wrong adding your playlist... try again?<p>')
  $('#message').removeClass('hidden')
  $('#message').delay(2000).fadeOut('2000')
}

const currentPlaylistSuccess = (data) => {
  $('.current-playlist').empty()
  const showCurrentHtml = showCurrentTemplate({ playlist: data.playlist })
  $('.current-playlist').append(showCurrentHtml)
  $('.edit-current-playlist').on('click', function (event) {
    event.preventDefault()
    $('.remove-current-track').removeClass('hidden')
    $('.edit-current-playlist').addClass('hidden')
    // const id = $(this).parent().parent().data('id')
  })
  $('.remove-current-track').on('click', function (event) {
    event.preventDefault()
    const playlistID = $(this).parent().parent().parent().parent().attr('data-id')
    console.log(playlistID)
    const playlistNameTarget = $(this).parent().parent().parent().siblings()[0]
    const playlistName = $(playlistNameTarget).text()
    console.log(playlistName)
    const trackID = $(this).parent().parent().attr('data-id')
    console.log(trackID)
    const trackIDs = data.playlist.tracks
    console.log(trackIDs)
    const newIDs = trackIDs.filter(function (obj) {
      return trackID.indexOf(obj.id) === -1
    })
    console.log(newIDs)
    const justIDs = []
    for (let i = 0; i < newIDs.length; i++) {
      justIDs.push(newIDs[i].id)
    }

  })
}

const currentPlaylistError = () => {
  $('#message').html('<p>Something went wrong getting playlist... try again?<p>')
  $('#message').removeClass('hidden')
  $('#message').delay(2000).fadeOut('2000')
}

const populatePlaylistList = (data) => {
  $('.selectPlaylist').empty()
  $('.selectPlaylist').append($('<option value=0>Select your Mix</option>'))
  const userPlaylists = data.playlists.filter(playlists => playlists.user_id === store.userData.id)
  $.each(userPlaylists, function (index, value) {
    $('.selectPlaylist').append($('<option></option>').val(value.id).html(value.name))
  })
  $('.selectPlaylist').on('change', function () {
    const value = $(this).val()
    selectedPlaylist(userPlaylists, value)
  })
}

// ISSUE HERE WITH SHOWING THE CURRENT PLAYLIST AS PREVIEW
const selectedPlaylist = (userPlaylists, value) => {
  $('.current-playlist').empty()
  console.log(userPlaylists)
  console.log(value)
  const pickPlaylist = userPlaylists.filter(playlist => playlist.id === value)
  console.log(pickPlaylist)
  const showCurrentHtml = showCurrentTemplate({ playlist: pickPlaylist })
  $('.current-playlist').append(showCurrentHtml)
  $('.confirm-to-playlist').on('click', function (event) {
    event.preventDefault()
    const playlistID = value
    const trackID = $(this).parent().parent().attr('data-id')
    const data =
    {
      playlist_track: {
        playlist_id: playlistID,
        track_id: trackID
      }
    }
    playlistsAPI.addTrackToPlaylist(data)
      .then(updatePlaylistSuccess)
      .catch(updatePlaylistFailure)
  })
}

const populatePlaylistError = () => {
  $('#message').html('<p>Something went wrong getting your playlists... try again?<p>')
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
  getTracks()
}

const newSoundError = () => {
  $('#message').html('<p>Something went wrong adding your track... try again?<p>')
  $('#message').removeClass('hidden')
  $('#message').delay(2000).fadeOut('2000')
}

const deleteTrackSuccess = () => {
  $('#message').html('<p>You will not hear them here anymore...<p>')
  $('#message').show()
  $('#message').removeClass('hidden')
  $('#message').delay(2000).fadeOut('2000')
  getTracks()
}

const deleteTrackFailure = () => {
  $('#message').html('<p>Something went wrong deleting your track... try again?<p>')
  $('#message').removeClass('hidden')
  $('#message').delay(2000).fadeOut('2000')
}

const deletePlaylistSuccess = () => {
  $('#message').html('<p>You will not hear them here anymore...<p>')
  $('#message').show()
  $('#message').removeClass('hidden')
  $('#message').delay(2000).fadeOut('2000')
  getPlaylists()
}

const deletePlaylistFailure = () => {
  $('#message').html('<p>Something went wrong deleting your track... try again?<p>')
  $('#message').removeClass('hidden')
  $('#message').delay(2000).fadeOut('2000')
}

const updatePlaylistSuccess = () => {
  $('#message').html('<p>Sounds good to me!<p>')
  $('#message').removeClass('hidden')
  $('#message').delay(2000).fadeOut('2000')
  $('.selectPlaylist').empty()
  $('.current-playlist').empty()
  $('.tracks-list').empty()
  $('.playlists-list').empty()
  getTracks()
  getPlaylists()
}

const updatePlaylistFailure = () => {
  $('#message').html('<p>Something went wrong updating your playlist... try again?<p>')
  $('#message').removeClass('hidden')
  $('#message').delay(2000).fadeOut('2000')
}

const updateTrackSuccess = () => {
  $('#message').html('<p>Sounds good to me!<p>')
  $('#message').removeClass('hidden')
  $('#message').delay(2000).fadeOut('2000')
  $('.selectPlaylist').empty()
  $('.current-playlist').empty()
  $('.tracks-list').empty()
  $('.playlists-list').empty()
  getTracks()
  getPlaylists()
}

const updateTrackError = () => {
  $('#message').html('<p>Something went wrong updating your track... try again?<p>')
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
