// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Adds a random greeting to the page.
 */
function addRandomGreeting() {
  const greetings =
      ['Hello world!', '¡Hola Mundo!', '你好，世界！', 'Bonjour le monde!'];

  // Pick a random greeting.
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];

  // Add it to the page.
  const greetingContainer = document.getElementById('greeting-container');
  greetingContainer.innerText = greeting;
}

function randomizeImage() {
  // The images directory contains 14 images, so generate a random index between
  // 1 and 13.
  const imageIndex = Math.floor(Math.random() * 14) + 1;
  const imgUrl = 'images/keith-' + imageIndex + '.jpg';

  const imgElement = document.createElement('img');
  imgElement.src = imgUrl;

  const imageContainer = document.getElementById('random-image-container');
  // Remove the previous image.
  imageContainer.innerHTML = '';
  //Add randomly selected image
  imageContainer.appendChild(imgElement);
}

async function getRandomMealUsingAsyncAwait() {
  const response = await fetch('/random-meal');
  const quote = await response.text();
  document.getElementById('meal-container').innerText = quote;
}

/** Creates an <li> element containing text. */
function createListElement(text) {
  const liElement = document.createElement('li');
  liElement.innerText = text;
  return liElement;
}

/**
 * Loads entities from the datastore and adds them to the DOM.
 */
function loadCommentsFromDatastore() {
  let value = document.getElementById('num-comments').value;  
  fetch(`/list-comments?num-comments=${value}`).then(response => response.json()).then((comments) => {
    console.log(comments)
    const commentElement = document.getElementById('comments-container');
    commentElement.innerHTML = '';
    comments.forEach((indComment) => {
      commentElement.appendChild(createListElement(indComment.name + " says: " + indComment.content));
    })
  });
}

function deleteAllComments() {
    fetch('/delete-data', { method: "POST"});
    loadCommentsFromDatastore();
}

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

/** Creates a chart and adds it to the page. */
function drawChart() {
  const data = new google.visualization.DataTable();
  data.addColumn('string', 'Class');
  data.addColumn('number', 'Count');
        data.addRows([
          ['Math', 2],
          ['Computer Science', 2],
          ['Writing', 1],
          ['Music', 2],
          ['Morality', 2]
        ]);

  const options = {
    'title': 'Classes I have taken at Duke',
    'width':500,
    'height':400
  };

  const chart = new google.visualization.PieChart(
      document.getElementById('chart-1'));
  chart.draw(data, options);
}

/** creates map to add to page */
function createMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 33.125866, lng: -96.663563},
        zoom: 10
    });

    addLandmark(map, 33.197802, -96.616136, "Square Burger");
    addLandmark(map, 33.151713, -96.866428, "KPop Burger");
    addLandmark(map, 33.180836, -96.617858, "A&D Buffalo's");
    addLandmark(map, 33.206875, -96.732323, "Italian Garden");
    addLandmark(map, 32.950851, -96.821050, "Hopdoddy Burger Bar");
    addLandmark(map, 33.079834, -96.826410, "Shake Shack");
    addLandmark(map, 33.118615, -96.670386, "Cracker Barrel");
    addLandmark(map, 33.101330, -96.687269, "Torchy's Tacos");
    addLandmark(map, 33.102240, -96.676335, "Krispy Kreme");
    addLandmark(map, 33.040658, -96.735441, "Wing Stop");
}

/** Adds a marker **/
function addLandmark(map, lat, lng, title) {
  const marker = new google.maps.Marker(
      {position: {lat: lat, lng: lng}, map: map, title: title});
}