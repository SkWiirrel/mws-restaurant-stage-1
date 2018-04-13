/*jshint esversion: 6 */

/**
 * Common database helper functions.
 */
class DBHelper {

  constructor() {
    this.dbPromise = idb.open('restaurant-reviews', 1, upgradeDb => {
      upgradeDb.createObjectStore('restaurants', {
        keyPath: 'id'
      });
    });
  }

  /**
   * Database URL.
   * Change this to restaurants.json file location on your server.
   */
  get DATABASE_URL() {
    const port = 1337; // Change this to your server port
    return `http://192.168.1.132:${port}/restaurants`;
  }

  /**
   * Fetch all restaurants from DB if possible.
   */
  fetchRestaurants(callback) {

    // First get restaurants from the database and then from the web
    this.dbPromise.then(db => {

      return db.transaction('restaurants').objectStore('restaurants').getAll();

    }).then(restaurants => {

      // Display restaurants from the database
      callback([true, restaurants]);

      // Get restaurants from the web
      fetch(this.DATABASE_URL)
        .then(response => response.json())
        .then(data => {
          callback([true, data]);

          // Add restaurants from the web to the database
          this.dbPromise.then(db => {
            const tx = db.transaction('restaurants', 'readwrite');
            const store = tx.objectStore('restaurants');

            for (const restaurant of data) {
              store.put(restaurant);
            }

            return tx.complete;
          });
        })
        .catch(error => callback([false, error]));
    });
  }

  /**
   * Fetch all restaurant by ID from DB if possible.
   */
  fetchRestaurant(callback, id) {

    // First get restaurants from the database and then from the web
    this.dbPromise.then(db => {
      return db.transaction('restaurants').objectStore('restaurants').get(parseInt(id));
    }).then(restaurant => {
      // Display restaurants from the database
      callback([true, restaurant]);

      // Get restaurants from the web
      fetch(this.DATABASE_URL + `/${id}`)
        .then(response => response.json())
        .then(data => {
          callback([true, data]);

          // Add restaurants from the web to the database
          this.dbPromise.then(db => {
            const tx = db.transaction('restaurants', 'readwrite');
            tx.objectStore('restaurants').put(data);

            return tx.complete;
          });
        })
        .catch(error => callback([false, error]));
    });
  }

  /**
   * Fetch a restaurant by its ID.
   */
  fetchRestaurantById(id, callback) {
    // fetch all restaurants with proper error handling.
    this.fetchRestaurant(([ok = false, response] = []) => {
      if (!ok) {
        callback(!ok, response);
      } else {
        callback(ok, response);
        //callback(null, 'Restaurant does not exist');
      }
    }, id);
  }

  /**
   * Fetch restaurants by a cuisine type with proper error handling.
   */
  fetchRestaurantByCuisine(cuisine, callback) {
    // Fetch all restaurants  with proper error handling
    this.fetchRestaurants(([ok = false, response] = []) => {
      if (!ok) {
        callback(!ok, response);
      } else {
        // Filter restaurants to have only given cuisine type
        const results = response.filter(r => r.cuisine_type == cuisine);
        callback(ok, results);
      }
    });
  }

  /**
   * Fetch restaurants by a neighborhood with proper error handling.
   */
  fetchRestaurantByNeighborhood(neighborhood, callback) {
    // Fetch all restaurants
    this.fetchRestaurants(([ok = false, response] = []) => {
      if (!ok) {
        callback(!ok, response);
      } else {
        // Filter restaurants to have only given neighborhood
        const results = response.filter(r => r.neighborhood == neighborhood);
        callback(ok, results);
      }
    });
  }

  /**
   * Fetch restaurants by a cuisine and a neighborhood with proper error handling.
   */
  fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, callback) {
    // Fetch all restaurants
    this.fetchRestaurants(([ok = false, response] = []) => {
      if (!ok) {
        callback(!ok, response);
      } else {
        let results = response;
        if (cuisine != 'all') { // filter by cuisine
          results = results.filter(r => r.cuisine_type == cuisine);
        }
        if (neighborhood != 'all') { // filter by neighborhood
          results = results.filter(r => r.neighborhood == neighborhood);
        }
        callback(ok, results);
      }
    });
  }

  /**
   * Fetch all neighborhoods with proper error handling.
   */
  fetchNeighborhoods(callback) {
    // Fetch all restaurants
    this.fetchRestaurants(([ok = false, response] = []) => {
      if (!ok) {
        callback(!ok, response);
      } else {
        // Get all neighborhoods from all restaurants
        const neighborhoods = response.map((v, i) => response[i].neighborhood);
        // Remove duplicates from neighborhoods
        const uniqueNeighborhoods = neighborhoods.filter((v, i) => neighborhoods.indexOf(v) == i);
        callback(ok, uniqueNeighborhoods);
      }
    });
  }

  /**
   * Fetch all cuisines with proper error handling.
   */
  fetchCuisines(callback) {
    // Fetch all restaurants
    this.fetchRestaurants(([ok = false, response] = []) => {
      if (!ok) {
        callback(!ok, response);
      } else {
        // Get all cuisines from all restaurants
        const cuisines = response.map((v, i) => response[i].cuisine_type);
        // Remove duplicates from cuisines
        const uniqueCuisines = cuisines.filter((v, i) => cuisines.indexOf(v) == i);
        callback(ok, uniqueCuisines);
      }
    });
  }

  /**
   * Restaurant page URL.
   */
  urlForRestaurant(restaurant) {
    return (`./restaurant.html?id=${restaurant.id}`);
  }

  /**
   * Restaurant image URL.
   */
  imageUrlForRestaurant(restaurant) {
    return (`/img/${restaurant.photograph}.jpg`);
  }

  imageNameForRestaurant(restaurant) {
    return (restaurant.photograph || '1.jpg').replace(/\.jpg$/, '');
  }

  /**
   * Map marker for a restaurant.
   */
  mapMarkerForRestaurant(restaurant, map) {
    const marker = new google.maps.Marker({
      position: restaurant.latlng,
      title: restaurant.name,
      url: this.urlForRestaurant(restaurant),
      map: map,
      animation: google.maps.Animation.DROP
    });
    return marker;
  }

}