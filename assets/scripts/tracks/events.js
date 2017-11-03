'include strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('../ui')

const onNewTrack = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.newTrack(data)
    .then(ui.newTrackSuccess)
    .catch(ui.newTrackError)
}

const onGetTracks = () => {
  event.preventDefault()
  api.getPlaylists()
    .then(ui.getTracksSuccess)
    .catch(ui.getTracksError)
}

const addHandlers = () => {
  $('.add-track').on('submit', onNewTrack)
}

module.exports = {
  addHandlers,
  onNewTrack,
  onGetTracks
}
