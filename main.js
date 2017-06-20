/* eslint-disable no-unused-vars */

var data = [
  {
    title: 'Event1',
    date: 555555
  }
]

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

function makeTimeline(events) {
  var $line = document.createElement('ul')
  var $title = document.createElement('li')
  var $date = document.createElement('li')
  var $currentTime = document.createElement('li')
  var $startDot = document.createElement('div')
  var $endArrow = document.createElement('div')

  $line.appendChild($startDot)
  $line.appendChild($endArrow)
  $line.appendChild($title)
  $title.parentNode.appendChild($date)
  $line.appendChild($currentTime)

  $line.classList.add('timeline')
  $title.classList.add('events')
  $startDot.classList.add('start-dot')
  $endArrow.classList.add('end-arrow')
  $currentTime.classList.add('end')

  $title.textContent = events.title
  console.log($title.textContent)
  $date.textContent = events.date
  console.log($date.textContent)
  $currentTime.textContent = 'Current Date: ' + Date()

  console.log($line)
  return $line
}

var timelineDiv = document.querySelector('.main-content')
for (var i = 0; i < data.length; i++) {
  timelineDiv.appendChild(makeTimeline(data[i]))
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

    var $timeline = document.querySelector('.timeline')

    var increment = 80 / data.length
    var currentPosition = 10

    for (var i = 0; i < data.length; i++) {
      var $event = document.createElement('div')
      $event.textContent = data[i].title
      $event.classList.add('events')

      $event.style.left = currentPosition + '%'
      currentPosition += increment

      $timeline.appendChild($event)
    }
    formMain()
  })
})

var $createButton = document.querySelector('#new-button')

$createButton.addEventListener('click', mainForm)

var $toMain = document.querySelector('#form-return')

$toMain.addEventListener('click', formMain)
