'use strict'
const config = require('./../config')
const store = require('./../store')

const newPlaylist = function (data) {
  const token = store.userData.token
  return $.ajax({
    url: config.apiOrigin + '/playlists',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + token
    },
    data
  })
}

const getPlaylists = function () {
  const order = $('.order-by').val()
  const token = store.userData.token
  const data = {
    order: order
  }
  return $.ajax({
    url: config.apiOrigin + '/playlists',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + token
    },
    data
  })
}

const getAPlaylist = function (id) {
  const order = $('.order-by').val()
  const token = store.userData.token
  const data = {
    order: order
  }
  return $.ajax({
    url: config.apiOrigin + '/playlists/' + id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + token
    },
    data
  })
}

const deletePlaylist = function (selectPlaylistId) {
  const token = store.userData.token
  return $.ajax({
    url: config.apiOrigin + '/playlists/' + selectPlaylistId,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + token
    }
  })
}

const editPlaylist = function (selectPlaylistId, data) {
  const token = store.userData.token
  return $.ajax({
    url: config.apiOrigin + '/playlists/' + selectPlaylistId,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + token
    },
    data
  })
}
module.exports = {
  newPlaylist,
  getPlaylists,
  getAPlaylist,
  deletePlaylist,
  editPlaylist
}
