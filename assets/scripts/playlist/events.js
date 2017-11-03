'include strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('../ui')

const onNewPlaylist = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.newPlaylist(data)
    .then(ui.newPlaylistSuccess)
    .catch(ui.newPlaylistError)
}

const onGetPlaylists = () => {
  event.preventDefault()
  api.getPlaylists()
    .then(ui.getTasksSuccess)
    .catch(ui.getTasksError)
}

const onGetAPlaylist = () => {
  event.preventDefault()
  api.getAPlaylist()
    .then(ui.getAPlaylistSuccess)
    .catch(ui.getAPlaylistError)
}

const addHandlers = () => {
  $('.add-playlist').on('submit', onNewPlaylist)
}

module.exports = {
  addHandlers,
  onNewPlaylist,
  onGetPlaylists,
  onGetAPlaylist
}
