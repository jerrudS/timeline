/* eslint-disable no-unused-vars */

/* update form data array */
var data = []

window.addEventListener('DOMContentLoaded', function (event) {
  var $eventForm = document.querySelector('#event')

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

/* navigate from main page to event form */
var $createButton = document.querySelector('#new-button')

$createButton.addEventListener('click', function (event) {
  event.preventDefault()
  var $mainPage = document.querySelector('.main-page')
  var $eventForm = document.querySelector('#event')

  $mainPage.setAttribute('class', 'hidden main-page')
  $eventForm.setAttribute('class', 'container-fluid')
})
