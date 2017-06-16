/* eslint-disable no-unused-vars */

/* update form data array */
var data = []

window.addEventListener('DOMContentLoaded', function (event) {
  var $eventForm = document.querySelector('#data')

  $eventForm.addEventListener('submit', function (event) {
    event.preventDefault()

    var userFormData = new FormData($eventForm)
    console.log(userFormData)

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
  var $mainPage = document.querySelector('.main')
  var $eventForm = document.querySelector('#event')

  $mainPage.setAttribute('class', 'hidden main')
  $eventForm.setAttribute('class', 'container-fluid')
})

/* navigate from event form back to main page */
var $toMain = document.querySelector('#form-return')

$toMain.addEventListener('click', function (event) {
  event.preventDefault()
  var $mainPage = document.querySelector('.main')
  var $eventForm = document.querySelector('#event')

  $mainPage.setAttribute('class', 'main')
  $eventForm.setAttribute('class', 'hidden container-fluid')
})
