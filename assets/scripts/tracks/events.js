'include strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('../ui')

const onNewSound = function (event) {
  event.preventDefault()
  const data = getFormFields(this)

  api.newSound(data)
    .then(ui.newSoundSuccess)
    .catch(ui.newSoundError)
}

const onGetTracks = () => {
  event.preventDefault()
  api.getTracks()
    .then(ui.getTracksSuccess)
    .catch(ui.getTracksError)
}

const addHandlers = () => {
  $('#new-sound').on('submit', onNewSound)
}

module.exports = {
  addHandlers,
  onNewSound,
  onGetTracks
}
