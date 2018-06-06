class ServiceWorkerController {

  constructor() {
    this._registerServiceWorker();
  }

  /**
   *  Register the Service Worker
   */
  _registerServiceWorker() {
    if (navigator.serviceWorker) {
      navigator.serviceWorker.register('sw.js');
    }
  }

}

new ServiceWorkerController();
