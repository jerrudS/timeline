/* eslint-disable no-unused-vars */

var data = [
  {
    title: 'Event1',
    date: 555555,
    description: 'Some text',
    url: 'http://www.freeclipart.pw/uploads/small-red-apple-clip-art-at-clker-com--vector-clip-art-online--.png'
    // backend required file: 'lion-image.jpg'
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

function eventMain() {
  var $mainPage = document.querySelector('.hidden.view-main')
  var $eventPage = document.querySelector('.view-event')
  $mainPage.setAttribute('class', 'view-main')
  $eventPage.setAttribute('class', 'hidden view-event')
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
  if (event.target.getAttribute('data-event')) {
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

  var newData = {
    title: userFormData.get('title'),
    date: Date.parse(userFormData.get('date')),
    description: userFormData.get('description'),
    url: userFormData.get('url')
    // backend required file: userFormData.get('file')
  }
  data.push(newData)

  var $timeline = makeTimeline(data)
  $content.innerHTML = ''
  $content.appendChild($timeline)

  $timeline.addEventListener('click', function (event) {
    if (event.target.getAttribute('data-event')) {
      mainEvent()
      makeEventPage()
    }
  })
  formMain()
})

var $createButton = document.querySelector('#new-button')
$createButton.addEventListener('click', mainForm)

var $formMain = document.querySelector('#form-return')
$formMain.addEventListener('click', formMain)

var $eventMain = document.querySelector('#event-return')
$eventMain.addEventListener('click', eventMain)

function makeEventPage() {
  for (var i = 0; i < data.length; i++) {
    var $titleDiv = document.querySelector('#title-header')
    var $dateDiv = document.querySelector('#date-header')
    var $description = document.querySelector('.description')
    var $urlDiv = document.querySelector('#media')

    $titleDiv.textContent = ''
    $dateDiv.textContent = ''
    $description.textContent = ''

    var $eventTitle = document.createElement('h2')
    var $eventDate = document.createElement('h3')
    var $eventUrl = document.createElement('img')

    var date = new Date(data[i].date).toUTCString()
    date = date.split(' ').slice(0, 4).join(' ')

    $titleDiv.appendChild($eventTitle)
    $dateDiv.appendChild($eventDate)
    $urlDiv.appendChild($eventUrl)

    $eventUrl.removeAttribute('src')
    $eventUrl.removeAttribute('alt')
    console.log($eventUrl)

    $eventTitle.textContent = data[i].title
    $eventDate.textContent = date
    $description.textContent = data[i].description
    $eventUrl.setAttribute('alt', 'user media')
    $eventUrl.setAttribute('src', data[i].url)
    console.log($eventUrl)
    console.log(data[i].url)
    console.log($dateDiv)
  }
}
