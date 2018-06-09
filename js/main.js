/*jshint esversion: 6 */

let restaurants,
  neighborhoods,
  cuisines;
let map;
let markers = [];
const dbHelper = new DBHelper();

/**
 * Only load images when they become visible in the viewport
 */
const intersectionObservationCallback = (entries, observer) => {

  entries
    .filter(entry => entry.isIntersecting)
    .forEach(entry => {

      const sources = entry.target.querySelectorAll('source[data-srcset]');
      const img = entry.target.querySelector('img[data-src]');

      sources.forEach(source => {
        source.setAttribute('srcset', source.getAttribute('data-srcset'));
        source.removeAttribute('data-srcset');
      });

      img.setAttribute('src', img.getAttribute('data-src'));
      img.removeAttribute('data-src');

      observer.unobserve(entry.target);
    });
};

const intersectionObserver = new IntersectionObserver(
  intersectionObservationCallback
);

/**
 * Fetch all neighborhoods and set their HTML.
 */
const fetchNeighborhoods = () => {
  dbHelper.fetchNeighborhoods((ok, neighborhoods) => {
    if (!ok) { // Got an error
      console.error(neighborhoods);
    } else {
      self.neighborhoods = neighborhoods;
      fillNeighborhoodsHTML();
    }
  });
};

/**
 * Set neighborhoods HTML.
 */
const fillNeighborhoodsHTML = (neighborhoods = self.neighborhoods) => {
  const select = document.getElementById('neighborhoods-select');
  neighborhoods.forEach(neighborhood => {
    const option = document.createElement('option');
    option.innerHTML = neighborhood;
    option.value = neighborhood;
    select.append(option);
  });
};

/**
 * Fetch all cuisines and set their HTML.
 */
const fetchCuisines = () => {
  dbHelper.fetchCuisines((ok, cuisines) => {
    if (!ok) { // Got an error!
      console.error(cuisines);
    } else {
      self.cuisines = cuisines;
      fillCuisinesHTML();
    }
  });
};

/**
 * Set cuisines HTML.
 */
const fillCuisinesHTML = (cuisines = self.cuisines) => {
  const select = document.getElementById('cuisines-select');

  cuisines.forEach(cuisine => {
    const option = document.createElement('option');
    option.innerHTML = cuisine;
    option.value = cuisine;
    select.append(option);
  });
};

/**
 * Initialize Google map, called from HTML.
 */
window.initMap = () => {
  let loc = {
    lat: 40.722216,
    lng: -73.987501
  };
  self.map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: loc,
    scrollwheel: false
  });
  console.log('INITMAP');
//  updateRestaurants();
};

/**
 * Update page and map for current restaurants.
 */
const updateRestaurants = () => {
  const cSelect = document.getElementById('cuisines-select');
  const nSelect = document.getElementById('neighborhoods-select');

  const cuisine = cSelect[cSelect.selectedIndex].value;
  const neighborhood = nSelect[nSelect.selectedIndex].value;

  dbHelper.fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, (ok, restaurants) => {
    console.log(restaurants);
    if (!ok) { // Got an error!
      console.error(restaurants);
    } else {
      resetRestaurants(restaurants);
      fillRestaurantsHTML();
    }
  });
};

/**
 * Clear current restaurants, their HTML and remove their map markers.
 */
const resetRestaurants = (restaurants) => {
  // Remove all restaurants
  //self.restaurants = [];
  const ul = document.getElementById('restaurants-list');

  const pictures = ul.querySelectorAll('picture');
  pictures.forEach(picture => intersectionObserver.unobserve(picture));
  ul.innerHTML = '';

  // Remove all map markers
  if (self.markers) {
    self.markers.forEach(m => m.setMap(null));
  }
  self.markers = [];
  self.restaurants = restaurants;
};

/**
 * Create all restaurants HTML and add them to the webpage.
 */
const fillRestaurantsHTML = (restaurants = self.restaurants) => {
  const ul = document.getElementById('restaurants-list');
  restaurants.forEach(restaurant => {
    ul.append(createRestaurantHTML(restaurant));
  });
  addMarkersToMap();
};

/**
 * Create restaurant HTML.
 */
const createRestaurantHTML = (restaurant) => {

  const li = document.createElement('li');

  const imgName = restaurant.photograph || 5;

  const figure = document.createElement('figure');
  const picture = document.createElement('picture');

  const source_small = document.createElement('source');
  source_small.setAttribute('media', '(max-width:750px)');
  source_small.setAttribute('data-srcset', `/img/${imgName}-650.webp 1x, /img/${imgName}-800.webp 2x`);

  const source_large = document.createElement('source');
  source_large.setAttribute('media', '(max-width:1200px)');
  source_large.setAttribute('data-srcset', `/img/${imgName}-550.webp 1x, /img/${imgName}-800.webp 2x`);

  const image = document.createElement('img');
  image.setAttribute('data-src', `/img/${imgName}-800.webp`);
  image.className = 'restaurant-img';
  image.alt = restaurant.name;

  picture.append(source_small);
  picture.append(source_large);
  picture.append(image);
  figure.append(picture);

  intersectionObserver.observe(picture);

  const isFavourite = (restaurant.is_favorite === 'true' || (typeof(restaurant.is_favorite) === "boolean" && restaurant.is_favorite));

  const caption = document.createElement('figcaption');
  caption.innerHTML = `${restaurant.cuisine_type} Restaurant` + ((isFavourite) ? '<span aria-label="Favourite Restaurant"> &#9733;</span>' : '');
  figure.append(caption);

  li.append(figure);

  const info = document.createElement('div');
  info.className = 'restaurant-info';

  const name = document.createElement('h3');
  name.innerHTML = restaurant.name;
  info.append(name);

  const neighborhood = document.createElement('p');
  neighborhood.innerHTML = restaurant.neighborhood;
  info.append(neighborhood);

  const address = document.createElement('p');
  address.innerHTML = restaurant.address;
  info.append(address);

  const more = document.createElement('a');
  more.innerHTML = `View Details about ${restaurant.name}`;
  more.href = dbHelper.urlForRestaurant(restaurant);
  info.append(more);

  li.append(info);

  return li;
};

/**
 * Add markers for current restaurants to the map.
 */
const addMarkersToMap = (restaurants = self.restaurants) => {
  restaurants.forEach(restaurant => {
    // Add marker to the map
    const marker = dbHelper.mapMarkerForRestaurant(restaurant, self.map);
    google.maps.event.addListener(marker, 'click', () => {
      window.location.href = marker.url;
    });
    self.markers.push(marker);
  });
};

/**
 * Fetch neighborhoods and cuisines as soon as the page is loaded.
 */
document.addEventListener('DOMContentLoaded', (event) => {
  fetchNeighborhoods();
  fetchCuisines();
  updateRestaurants();
});
