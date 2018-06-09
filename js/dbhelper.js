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
      upgradeDb.createObjectStore('reviews', {
        keyPath: 'id'
      }).createIndex('restaurant_id', 'restaurant_id');

      upgradeDb.createObjectStore('reviews-to-submit', {
        keyPath: 'cache_id',
        autoIncrement: true
      }).createIndex('restaurant_id', 'restaurant_id');

      upgradeDb.createObjectStore('favourite-to-submit', {
        keyPath: 'restaurant_id',
      });

    });
  }

  /**
   * Database URL.
   * Change this to restaurants.json file location on your server.
   */
  get DATABASE_URL() {
    const port = 1337; // Change this to your server port
    return `//localhost:${port}/`;
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
      fetch(this.DATABASE_URL + 'restaurants')
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
      fetch(this.DATABASE_URL + `restaurants/${id}`)
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
        callback(ok, response);
      } else {
        callback(ok, response);
      }
    }, id);
  }

  fetchReviewsByRestaurantId(restaurant_id, callback) {

    this.dbPromise.then(db => {
      return db.transaction('reviews').objectStore('reviews').index('restaurant_id').getAll(parseInt(restaurant_id));
    }).then(reviews => {
      // Display restaurants from the database
      callback([true, reviews]);

      // Get restaurants from the web
      fetch(this.DATABASE_URL + `reviews/?restaurant_id=${restaurant_id}`)
        .then(response => response.json())
        .then(data => {
          callback([true, data]);

          // Add restaurants from the web to the database
          this.dbPromise.then(db => {
            const tx = db.transaction('reviews', 'readwrite');
            const store = tx.objectStore('reviews');

            for (const review of data) {
              store.put(review);
            }

            return tx.complete;
          });
        })
        .catch(error => callback([false, error]));
    });
  }

  /**
   * Fetch restaurants by a cuisine type with proper error handling.
   */
  fetchRestaurantByCuisine(cuisine, callback) {
    // Fetch all restaurants  with proper error handling
    this.fetchRestaurants(([ok = false, response] = []) => {
      if (!ok) {
        callback(ok, response);
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
        callback(ok, response);
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
        callback(ok, response);
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
        callback(ok, response);
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
        callback(
          ok, response);
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
    return (`/img/${restaurant.photograph}.jpf`);
  }

  imageNameForRestaurant(restaurant) {
    return (restaurant.photograph || '5.jpf').replace(/\.jpf$/, '');
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

  submitReview(jsonFormData, callback) {

    fetch(this.DATABASE_URL + 'reviews', {
        method: 'POST',
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(jsonFormData)
      })
      .then(rawData => rawData.json())
      .then(newReview => {
        callback([true, newReview]);
      })
      .catch(error => callback([false, error]));
  }

  cacheReviewSubmission(jsonFormData) {

    this.dbPromise.then(db => {

      return db.transaction('reviews-to-submit', 'readwrite').objectStore('reviews-to-submit').put(jsonFormData);

    }).catch(error => console.error('Wasn\'t able to cache review submission'));

  }

  deleteCachedReview(cache_id) {
    return this.dbPromise.then(db => {
      return db.transaction('reviews-to-submit', 'readwrite').objectStore('reviews-to-submit').delete(cache_id);
    }).catch(error => console.error(`Wasn't able to delete cached review submission of ID: ${cache_id}`, error));
  }

  submitCachedReview(restaurant_id) {
    this.dbPromise.then(db => {
      return db.transaction('reviews-to-submit').objectStore('reviews-to-submit').index('restaurant_id').getAll(restaurant_id);
    }).then(cachedReviews => {

      //There are no cached reviews waiting for submission
      if (!cachedReviews.length) {
        return;
      }

      for (const cachedReview of cachedReviews) {

        this.submitReview(cachedReview, ([ok = false, review] = []) => {

          if (ok) {
            this.deleteCachedReview(cachedReview.cache_id);
          }

        });
      }

    }).catch(error => console.info(`Wasn't able get cached review submissions of restaurant ID: ${restaurant_id}`, error));
  }

  submitCachedFavouriteRestaurant(restaurant_id) {
    const thisdbPromise = this.dbPromise;
    thisdbPromise.then(db => {
      return db.transaction('favourite-to-submit').objectStore('favourite-to-submit').get(restaurant_id);
    }).then(cachedRestaurant => {
      if (cachedRestaurant) {
        this.togglefavouriteRestaurant(restaurant_id, cachedRestaurant.is_favorite, function(ok) {
          if (ok) {
            thisdbPromise.then(db => {
              db.transaction('favourite-to-submit', 'readwrite').objectStore('favourite-to-submit').delete(restaurant_id);
            });
          }
        });
      }
    });
  }

  togglefavouriteRestaurant(restaurant_id, checked, callback) {
    fetch(this.DATABASE_URL + `restaurants/${restaurant_id}/?is_favorite=${checked}`, {
        method: 'PUT'
      }).then(rawData => rawData.json())
      .then(restaurant => {
        this.dbPromise.then(db => {
          const tx = db.transaction('restaurants', 'readwrite');
          tx.objectStore('restaurants').put(restaurant);
          if (callback) {
            callback(tx.complete);
          }
          return tx.complete;
        });
      })
      .catch(error => {
        this.dbPromise.then(db => {
          const tx = db.transaction('favourite-to-submit', 'readwrite');
          tx.objectStore('favourite-to-submit', 'readwrite').put({
            restaurant_id: restaurant_id,
            is_favorite: checked
          });
          if (callback) {
            callback(false);
          }
          return tx.complete;
        });
      });
  }
}
