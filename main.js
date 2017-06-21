/* eslint-disable no-unused-vars */

var data = [
  {
    title: 'Event1',
    date: 555555,
    description: 'Some text'
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

function mainEvent() {
  var $mainPage = document.querySelector('.view-main')
  var $previewForm = document.querySelector('.hidden.view-event')
  $mainPage.setAttribute('class', 'hidden view-main')
  $previewForm.setAttribute('class', 'view-event')
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
    var date = new Date(data[i].date).toUTCString()
    date = date.split(' ').slice(0, 4).join(' ')
    $eventTitle.textContent = data[i].title
    $eventDate.textContent = date
    $eventLi.classList.add('events')

    $eventLi.setAttribute('data-event', true)
    $eventTitle.setAttribute('data-event', true)
    $eventDate.setAttribute('data-event', true)

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
$timeline.addEventListener('click', function (event) {
  console.log(event.target)
  if (event.target.getAttribute('data-event')) {
    console.log(event.target)
    mainEvent()
    makeEventPage()
  }
})
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
  $content.innerHTML = ''
  $content.appendChild($timeline)

  $timeline.addEventListener('click', function (event) {
    console.log(event.target)
    if (event.target.getAttribute('data-event')) {
      mainEvent()
      makeEventPage()
    }
  })
  formMain()
})

var $createButton = document.querySelector('#new-button')
$createButton.addEventListener('click', mainForm)

var $toMain = document.querySelector('#form-return')
$toMain.addEventListener('click', formMain)

function makeEventPage() {
  for (var i = 0; i < data.length; i++) {
    var $titleDiv = document.querySelector('#title-header')
    var $dateDiv = document.querySelector('#date-header')
    var $eventTitle = document.createElement('h2')
    var $eventDate = document.createElement('h3')
    var $description = document.querySelector('.description')
    var date = new Date(data[i].date).toUTCString()
    date = date.split(' ').slice(0, 4).join(' ')

    $titleDiv.appendChild($eventTitle)
    $dateDiv.appendChild($eventDate)

    $eventTitle.textContent = data[i].title
    $eventDate.textContent = date
    $description.textContent = data[i].description
  }
}
