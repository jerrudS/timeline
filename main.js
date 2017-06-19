/* eslint-disable no-unused-vars */

var data = []

function formMain() {
  var $mainPage = document.querySelector('.hidden.view-main')
  var $eventForm = document.querySelector('.view-form')
  $mainPage.setAttribute('class', 'view-main')
  $eventForm.setAttribute('class', 'hidden view-form')
}

function mainForm() {
  var $mainPage = document.querySelector('.view-main')
  var $eventForm = document.querySelector('.hidden.view-form')
  $mainPage.setAttribute('class', 'hidden view-main')
  $eventForm.setAttribute('class', 'view-form')
}

function makeEvent(events) {
  var $start = document.querySelector('.start')
  var $tempLi = document.createElement('li')
  var $tempP = document.createElement('p')

  $start.insertAdjacentElement('afterend', $tempLi)
  $tempLi.insertAdjacentElement('beforeend', $tempP)

  $tempLi.textContent = events.title
  $tempP.textContent = 'content'

  // $tempLi.textContent = events.title
  // console.log($tempLi.textContent)
  // $tempP.textContent = events.date
  // console.log($tempP.textContent)
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
      makeEvent(data[i])
    }

    formMain()
  })
})

var $createButton = document.querySelector('#new-button')

$createButton.addEventListener('click', mainForm)

var $toMain = document.querySelector('#form-return')

$toMain.addEventListener('click', formMain)

var $current = document.querySelector('.end')
$current.textContent = 'Current Date: ' + Date()
