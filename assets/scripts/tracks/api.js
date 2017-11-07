'use strict'
const config = require('./../config')
const store = require('./../store')

const newSound = function (data) {
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

const deleteTrack = function (id) {
  const token = store.userData.token
  return $.ajax({
    url: config.apiOrigin + '/tracks/' + id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + token
    }
  })
}

const editTrack = function (data, id) {
  const token = store.userData.token
  return $.ajax({
    url: config.apiOrigin + '/tracks/' + id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + token
    },
    data
  })
}

module.exports = {
  newSound,
  getTracks,
  deleteTrack,
  editTrack
}
