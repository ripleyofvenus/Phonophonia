'use strict'
const config = require('./../config')
const store = require('./../store')

const newTrack = function (data) {
  const token = store.userData.token
  return $.ajax({
    url: config.apiOrigin + '/tracks',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + token
    },
    data
  })
}

const getTracks = function () {
  const order = $('.order-by').val()
  const token = store.userData.token
  const data = {
    order: order
  }
  return $.ajax({
    url: config.apiOrigin + '/tracks',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + token
    },
    data
  })
}

const deleteTrack = function (selectTrackId) {
  const token = store.userData.token
  return $.ajax({
    url: config.apiOrigin + '/tracks/' + selectTrackId,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + token
    }
  })
}
// ???
// const editTrack = function (selectTrackId, data) {
//   const token = store.userData.token
//   return $.ajax({
//     url: config.apiOrigin + '/playlists/' + selectTrackId,
//     method: 'PATCH',
//     headers: {
//       Authorization: 'Token token=' + token
//     },
//     data
//   })
// }
module.exports = {
  newTrack,
  getTracks,
  deleteTrack
  // editTrack?
}
