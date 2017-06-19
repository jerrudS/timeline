/* eslint-disable no-unused-vars */

var data = []

function formMain() {
  var $mainPage = document.querySelector('.main')
  var $eventForm = document.querySelector('#event')
  $mainPage.setAttribute('class', 'main')
  $eventForm.setAttribute('class', 'hidden container-fluid')
}

window.addEventListener('DOMContentLoaded', function (event) {
  var $eventData = document.querySelector('#data')

  $eventData.addEventListener('submit', function (event) {
    event.preventDefault()

    var userFormData = new FormData($eventData)
    console.log(userFormData)

    var newData = {
      title: userFormData.get('title'),
      date: Date.parse(userFormData.get('date')),
      description: userFormData.get('description'),
      file: userFormData.get('file')
    }
    data.push(newData)

    for (var i = 0; i < data.length; i++) {
      var $newTitle = document.querySelector('.start')
      var $tempLi = document.createElement('li')
      $newTitle.insertAdjacentElement('afterend', $tempLi)
      $tempLi.textContent = data[i].title
      var $tempP = document.createElement('p')
      $tempLi.insertAdjacentElement('beforeend', $tempP)
      $tempP.textContent = data[i].date
      $tempLi.classList.add('event')
    }

    formMain()
  })
})

var $createButton = document.querySelector('#new-button')

$createButton.addEventListener('click', function (event) {
  event.preventDefault()
  var $mainPage = document.querySelector('.main')
  var $eventForm = document.querySelector('#event')

  $mainPage.setAttribute('class', 'hidden main')
  $eventForm.setAttribute('class', 'container-fluid')
})

var $toMain = document.querySelector('#form-return')

$toMain.addEventListener('click', function (event) {
  event.preventDefault()
  var $mainPage = document.querySelector('.main')
  var $eventForm = document.querySelector('#event')

  formMain()
})

var $current = document.querySelector('.end')
$current.textContent = 'Current Date: ' + Date()
