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

    var $newTitle = document.querySelector('.middle')
    $newTitle.textContent = data[0].title
    var $tempP = document.createElement('p')
    $tempP.textContent = data[0].date
    $newTitle.insertAdjacentElement('beforeend', $tempP)

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
