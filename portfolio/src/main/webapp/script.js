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
  fetch('/list-comments').then(response => response.json()).then((comments) => {
    console.log(comments)
    const commentElement = document.getElementById('comments-container');
    comments.forEach((indComment) => {
      commentElement.appendChild(createListElement(indComment.name + " says: " + indComment.content));
    })
  });
}

/**
 * Fetches comments from the servers and adds them to the DOM.
 */
function getComments() {
  fetch('/data').then(response => response.json()).then((comments) => {
    console.log(comments)
    const commentElement = document.getElementById('comments-container');

    comments.forEach((indComment) => {
        commentElement.appendChild(createListElement(indComment));
    });
  });
}
