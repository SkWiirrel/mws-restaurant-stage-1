/*jshint esversion: 6 */

let restaurant, map;
const dbHelper = new DBHelper();


/**
 * Initialize Google map, called from HTML.
 */
window.initMap = () => {
  fetchRestaurantFromURL((ok, restaurant) => {
    if (!ok) { // Got an error!
      console.error(restaurant);
      return;
    } else {
      self.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: restaurant.latlng,
        scrollwheel: false
      });
      fillBreadcrumb();
      dbHelper.mapMarkerForRestaurant(self.restaurant, self.map);
    }
  });
};

/**
 * Create restaurant Error HTML if none is found and adds it to the webpage
 */
const fillRestaurantErrorHTML = () => {
  document.getElementById('restaurant-name').innerHTML = 'No restaurant found!';
};

/**
 * Get current restaurant from page URL.
 */
const fetchRestaurantFromURL = (callback) => {
  if (self.restaurant) { // restaurant already fetched!
    callback(null, self.restaurant);
    return;
  }
  const id = getParameterByName('id');
  if (!id) { // no id found in URL
    fillRestaurantErrorHTML();
  } else {
    dbHelper.fetchRestaurantById(id, (ok, restaurant) => {
      self.restaurant = restaurant;

      if (!ok || restaurant instanceof Error || !restaurant) {
        console.error(restaurant);
        fillRestaurantErrorHTML();
        return;
      }
      fillRestaurantHTML();
      callback(true, restaurant);
    });
  }
};

/**
 * Create restaurant HTML and add it to the webpage
 */
const fillRestaurantHTML = (restaurant = self.restaurant) => {

  const name = document.getElementById('restaurant-name');
  name.innerHTML = restaurant.name;

  const address = document.getElementById('restaurant-address');
  address.innerHTML = restaurant.address;

  const imgName = dbHelper.imageNameForRestaurant(restaurant);

  const picture_container = document.getElementById('restaurant-pic-container');
  if (picture_container.querySelector('picture') === null) {

    const picture = document.createElement('picture');

    const source_small = document.createElement('source');
    source_small.setAttribute('media', '(max-width:750px)');
    source_small.setAttribute('srcset', `/img/${imgName}-650.jpg 1x, /img/${imgName}-800.jpg 2x`);

    const source_large = document.createElement('source');
    source_large.setAttribute('media', '(max-width:1200px)');
    source_large.setAttribute('srcset', `/img/${imgName}-550.jpg 1x, /img/${imgName}-800.jpg 2x`);

    const image = document.createElement('img');
    image.src = `/img/${imgName}-800.jpg`;
    image.className = 'restaurant-img';
    image.id = 'restaurant-img';
    image.alt = restaurant.name;

    picture.append(source_small);
    picture.append(source_large);
    picture.append(image);

    picture_container.prepend(picture);

    document.getElementById('map-container').setAttribute('aria-label', `Google Maps showing ${restaurant.name}'s location`);

    const cuisine = document.getElementById('restaurant-cuisine');
    cuisine.innerHTML = `${restaurant.cuisine_type} Restaurant`;

    // fill operating hours
    if (restaurant.operating_hours) {
      fillRestaurantHoursHTML();
    }
    // fill reviews
    fillReviewsHTML();
  }
};

/**
 * Create restaurant operating hours HTML table and add it to the webpage.
 */
const fillRestaurantHoursHTML = (operatingHours = self.restaurant.operating_hours) => {
  const hours = document.getElementById('restaurant-hours');
  for (let key in operatingHours) {
    const row = document.createElement('tr');

    const day = document.createElement('td');
    day.innerHTML = key;
    row.appendChild(day);

    const time = document.createElement('td');
    time.innerHTML = operatingHours[key];
    row.appendChild(time);

    hours.appendChild(row);
  }
};

/**
 * Create all reviews HTML and add them to the webpage.
 */
const fillReviewsHTML = (reviews = self.restaurant.reviews) => {
  const container = document.getElementById('reviews-container');
  const title = document.createElement('h3');
  title.innerHTML = 'Reviews';
  container.appendChild(title);

  if (!reviews) {
    const noReviews = document.createElement('p');
    noReviews.innerHTML = 'No reviews yet!';
    container.appendChild(noReviews);
    return;
  }
  const ul = document.getElementById('reviews-list');
  reviews.forEach(review => {
    ul.appendChild(createReviewHTML(review));
  });
  container.appendChild(ul);
};

/**
 * Create review HTML and add it to the webpage.
 */
const createReviewHTML = (review) => {
  const li = document.createElement('li');
  const name = document.createElement('div');
  name.className = 'reviews-author';
  name.innerHTML = review.name;
  li.appendChild(name);

  const date = document.createElement('small');
  date.className = 'reviews-date';
  date.innerHTML = review.date;
  name.appendChild(date);

  const comments = document.createElement('p');
  comments.innerHTML = review.comments;
  li.appendChild(comments);

  const rating = document.createElement('span');
  rating.className = 'reviews-rating';
  rating.title = `Rating: ${review.rating}`;
  rating.setAttribute('aria-label', rating.title);
  rating.innerHTML = '&#9733;'.repeat(parseInt(review.rating)) + '&#9734;'.repeat(5 - parseInt(review.rating)); //star (pasting the symbol as string itself didn't work)
  li.appendChild(rating);

  return li;
};

/**
 * Add restaurant name to the breadcrumb navigation menu
 */
const fillBreadcrumb = (restaurant = self.restaurant) => {
  const breadcrumb = document.getElementById('breadcrumb');
  if (breadcrumb.querySelector(`#crumb-restaurant-${restaurant.id}`) === null) {
    const li = document.createElement('li');
    li.id = `crumb-restaurant-${restaurant.id}`;
    li.innerHTML = restaurant.name;
    breadcrumb.appendChild(li);
  }
};

/**
 * Get a parameter by name from page URL.
 */
const getParameterByName = (name, url) => {
  if (!url)
    url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
    results = regex.exec(url);
  if (!results)
    return null;
  if (!results[2])
    return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};