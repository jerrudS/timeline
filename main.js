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
  var $timeline = document.createElement('ul')
  var $mainLi = document.createElement('li')
  var $title = document.createElement('p')
  var $date = document.createElement('p')
  var $currentTime = document.createElement('li')
  var $startDot = document.createElement('div')
  var $endArrow = document.createElement('div')

  $timeline.appendChild($startDot)
  $timeline.appendChild($endArrow)
  $timeline.appendChild($mainLi)
  $mainLi.appendChild($title)
  $mainLi.appendChild($date)
  $timeline.appendChild($currentTime)

  $timeline.classList.add('timeline')
  $mainLi.classList.add('birthdate')
  $startDot.classList.add('start-dot')
  $endArrow.classList.add('end-arrow')
  $currentTime.classList.add('end')

  $title.textContent = '"name of user" was born.'
  $date.textContent = 'Birthdate'
  $currentTime.textContent = 'Current Date: ' + new Date(Date.now()).toDateString()

  var increment = 80 / data.length
  var currentPosition = 10

  for (var i = 0; i < data.length; i++) {
    var $eventLi = document.createElement('li')
    var $eventTitle = document.createElement('p')
    var $eventDate = document.createElement('p')
    $eventTitle.textContent = data[i].title
    $eventDate.textContent = new Date(data[i].date).toDateString()
    $eventLi.classList.add('events')

    $eventLi.appendChild($eventTitle)
    $eventLi.appendChild($eventDate)

    $eventLi.style.left = currentPosition + '%'
    currentPosition += increment

    if (i % 2 === 1) {
      $eventLi.style.top = 50 + '%'
    }
    $timeline.appendChild($eventLi)
  }
  console.log($timeline)
  return $timeline
}

var $timeline = makeTimeline(data)
var $content = document.querySelector('#timeline-location')
$content.appendChild($timeline)

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

  var $timeline = makeTimeline(data)
  var $content = document.querySelector('#timeline-location')
  $content.innerHTML = ''
  $content.appendChild($timeline)

  formMain()
})

var $createButton = document.querySelector('#new-button')

$createButton.addEventListener('click', mainForm)

var $toMain = document.querySelector('#form-return')

$toMain.addEventListener('click', formMain)
