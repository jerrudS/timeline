/* eslint-disable no-unused-vars */
var data = []

window.addEventListener('DOMContentLoaded', function (event) {
  var $eventForm = document.querySelector('#event-form')

  $eventForm.addEventListener('submit', function (event) {
    event.preventDefault()

    var userFormData = new FormData($eventForm)

    var newData = {
      title: userFormData.get('title'),
      date: Date.parse(userFormData.get('date')),
      description: userFormData.get('description'),
      file: userFormData.get('file')
    }
    data.push(newData)
  })
})
