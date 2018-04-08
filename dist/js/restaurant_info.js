"use strict";var map,restaurant=void 0;window.initMap=function(){fetchRestaurantFromURL(function(e,t){e?console.error(e):(self.map=new google.maps.Map(document.getElementById("map"),{zoom:16,center:t.latlng,scrollwheel:!1}),fillBreadcrumb(),DBHelper.mapMarkerForRestaurant(self.restaurant,self.map))})},fetchRestaurantFromURL=function(n){if(self.restaurant)n(null,self.restaurant);else{var e=getParameterByName("id");e?DBHelper.fetchRestaurantById(e,function(e,t){(self.restaurant=t)?(fillRestaurantHTML(),n(null,t)):console.error(e)}):(error="No restaurant id in URL",n(error,null))}},fillRestaurantHTML=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:self.restaurant;document.getElementById("restaurant-name").innerHTML=e.name,document.getElementById("restaurant-address").innerHTML=e.address;var t=DBHelper.imageNameForRestaurant(e),n=document.getElementById("restaurant-pic-container"),r=document.createElement("picture"),a=document.createElement("source");a.setAttribute("media","(max-width:750px)"),a.setAttribute("srcset","/img/"+t+"-650.jpg 1x, /img/"+t+"-800.jpg 2x");var i=document.createElement("source");i.setAttribute("media","(max-width:1200px)"),i.setAttribute("srcset","/img/"+t+"-550.jpg 1x, /img/"+t+"-800.jpg 2x");var l=document.createElement("img");l.src="/img/"+t+"-800.jpg",l.className="restaurant-img",l.id="restaurant-img",l.alt=e.name,r.append(a),r.append(i),r.append(l),n.prepend(r),document.getElementById("map-container").setAttribute("aria-label","Google Maps showing "+e.name+"'s location"),document.getElementById("restaurant-cuisine").innerHTML=e.cuisine_type+" Restaurant",e.operating_hours&&fillRestaurantHoursHTML(),fillReviewsHTML()},fillRestaurantHoursHTML=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:self.restaurant.operating_hours,t=document.getElementById("restaurant-hours");for(var n in e){var r=document.createElement("tr"),a=document.createElement("td");a.innerHTML=n,r.appendChild(a);var i=document.createElement("td");i.innerHTML=e[n],r.appendChild(i),t.appendChild(r)}},fillReviewsHTML=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:self.restaurant.reviews,t=document.getElementById("reviews-container"),n=document.createElement("h3");if(n.innerHTML="Reviews",t.appendChild(n),!e){var r=document.createElement("p");return r.innerHTML="No reviews yet!",void t.appendChild(r)}var a=document.getElementById("reviews-list");e.forEach(function(e){a.appendChild(createReviewHTML(e))}),t.appendChild(a)},createReviewHTML=function(e){var t=document.createElement("li"),n=document.createElement("div");n.className="reviews-author",n.innerHTML=e.name,t.appendChild(n);var r=document.createElement("small");r.className="reviews-date",r.innerHTML=e.date,n.appendChild(r);var a=document.createElement("p");a.innerHTML=e.comments,t.appendChild(a);var i=document.createElement("span");return i.className="reviews-rating",i.title="Rating: "+e.rating,i.setAttribute("aria-label",i.title),i.innerHTML="&#9733;".repeat(parseInt(e.rating)),t.appendChild(i),t},fillBreadcrumb=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:self.restaurant,t=document.getElementById("breadcrumb"),n=document.createElement("li");n.innerHTML=e.name,t.appendChild(n)},getParameterByName=function(e,t){t||(t=window.location.href),e=e.replace(/[\[\]]/g,"\\$&");var n=new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)").exec(t);return n?n[2]?decodeURIComponent(n[2].replace(/\+/g," ")):"":null};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3RhdXJhbnRfaW5mby5qcyJdLCJuYW1lcyI6WyJtYXAiLCJyZXN0YXVyYW50Iiwid2luZG93IiwiaW5pdE1hcCIsImZldGNoUmVzdGF1cmFudEZyb21VUkwiLCJlcnJvciIsInNlbGYiLCJnb29nbGUiLCJtYXBzIiwiTWFwIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImNvbnNvbGUiLCJjZW50ZXIiLCJsYXRsbmciLCJzY3JvbGx3aGVlbCIsImNhbGxiYWNrIiwiaWQiLCJnZXRQYXJhbWV0ZXJCeU5hbWUiLCJEQkhlbHBlciIsImZldGNoUmVzdGF1cmFudEJ5SWQiLCJmaWxsUmVzdGF1cmFudEhUTUwiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJpbm5lckhUTUwiLCJuYW1lIiwiYWRkcmVzcyIsImltZ05hbWUiLCJpbWFnZU5hbWVGb3JSZXN0YXVyYW50IiwicGljdHVyZSIsImNyZWF0ZUVsZW1lbnQiLCJzb3VyY2Vfc21hbGwiLCJzZXRBdHRyaWJ1dGUiLCJwaWN0dXJlX2NvbnRhaW5lciIsInNvdXJjZV9sYXJnZSIsImltYWdlIiwiY2xhc3NOYW1lIiwic3JjIiwicHJlcGVuZCIsImN1aXNpbmVfdHlwZSIsIm9wZXJhdGluZ19ob3VycyIsImZpbGxSZXN0YXVyYW50SG91cnNIVE1MIiwiZmlsbFJldmlld3NIVE1MIiwiaG91cnMiLCJrZXkiLCJvcGVyYXRpbmdIb3VycyIsInJvdyIsImRheSIsInRpbWUiLCJyZXZpZXdzIiwiYXBwZW5kQ2hpbGQiLCJ0aXRsZSIsImNvbnRhaW5lciIsIm5vUmV2aWV3cyIsInJldmlldyIsInVsIiwiY3JlYXRlUmV2aWV3SFRNTCIsImZvckVhY2giLCJsaSIsImRhdGUiLCJjb21tZW50cyIsInJhdGluZyIsInJlcGVhdCIsInBhcnNlSW50IiwiYnJlYWRjcnVtYiIsImZpbGxCcmVhZGNydW1iIiwidXJsIiwibG9jYXRpb24iLCJocmVmIiwicmVzdWx0cyIsImRlY29kZVVSSUNvbXBvbmVu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QUFBZCxZQUFBUSxJQU1GTyxtQkFBaUIsU0FBQXhDLEVBQUF5QyxHQUFDbEUsSUFZZGtFLEVBQU1qRSxPQUFPa0UsU0FBU0MsTUFYeEIzQyxFQUFNdUMsRUFBQUEsUUFBYXZELFVBQVNDLFFBQzVCLElBQ0FnRCxFQURXakQsSUFBU3FCLE9BQVRyQixPQUF1QmdCLEVBQXZCaEIscUJBQ0lULEtBQUFBLEdBQ2ZnRSxPQUFBQSxFQWNLSyxFQUFRLEdBRU5DLG1CQUFtQkQsRUFBUSxHQUFHRSxRQUFRLE1BQU8sTUFidEQsR0FQQSIsImZpbGUiOiJyZXN0YXVyYW50X2luZm8uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKmpzaGludCBlc3ZlcnNpb246IDYgKi9cclxuXHJcbmxldCByZXN0YXVyYW50O1xyXG52YXIgbWFwO1xyXG5cclxuLyoqXHJcbiAqIEluaXRpYWxpemUgR29vZ2xlIG1hcCwgY2FsbGVkIGZyb20gSFRNTC5cclxuICovXHJcbndpbmRvdy5pbml0TWFwID0gKCkgPT4ge1xyXG4gIGZldGNoUmVzdGF1cmFudEZyb21VUkwoKGVycm9yLCByZXN0YXVyYW50KSA9PiB7XHJcbiAgICBpZiAoZXJyb3IpIHsgLy8gR290IGFuIGVycm9yIVxyXG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHNlbGYubWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwJyksIHtcclxuICAgICAgICB6b29tOiAxNixcclxuICAgICAgICBjZW50ZXI6IHJlc3RhdXJhbnQubGF0bG5nLFxyXG4gICAgICAgIHNjcm9sbHdoZWVsOiBmYWxzZVxyXG4gICAgICB9KTtcclxuICAgICAgZmlsbEJyZWFkY3J1bWIoKTtcclxuICAgICAgREJIZWxwZXIubWFwTWFya2VyRm9yUmVzdGF1cmFudChzZWxmLnJlc3RhdXJhbnQsIHNlbGYubWFwKTtcclxuICAgIH1cclxuICB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgY3VycmVudCByZXN0YXVyYW50IGZyb20gcGFnZSBVUkwuXHJcbiAqL1xyXG5mZXRjaFJlc3RhdXJhbnRGcm9tVVJMID0gKGNhbGxiYWNrKSA9PiB7XHJcbiAgaWYgKHNlbGYucmVzdGF1cmFudCkgeyAvLyByZXN0YXVyYW50IGFscmVhZHkgZmV0Y2hlZCFcclxuICAgIGNhbGxiYWNrKG51bGwsIHNlbGYucmVzdGF1cmFudCk7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIGNvbnN0IGlkID0gZ2V0UGFyYW1ldGVyQnlOYW1lKCdpZCcpO1xyXG4gIGlmICghaWQpIHsgLy8gbm8gaWQgZm91bmQgaW4gVVJMXHJcbiAgICBlcnJvciA9ICdObyByZXN0YXVyYW50IGlkIGluIFVSTCc7XHJcbiAgICBjYWxsYmFjayhlcnJvciwgbnVsbCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIERCSGVscGVyLmZldGNoUmVzdGF1cmFudEJ5SWQoaWQsIChlcnJvciwgcmVzdGF1cmFudCkgPT4ge1xyXG4gICAgICBzZWxmLnJlc3RhdXJhbnQgPSByZXN0YXVyYW50O1xyXG4gICAgICBpZiAoIXJlc3RhdXJhbnQpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgZmlsbFJlc3RhdXJhbnRIVE1MKCk7XHJcbiAgICAgIGNhbGxiYWNrKG51bGwsIHJlc3RhdXJhbnQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSByZXN0YXVyYW50IEhUTUwgYW5kIGFkZCBpdCB0byB0aGUgd2VicGFnZVxyXG4gKi9cclxuZmlsbFJlc3RhdXJhbnRIVE1MID0gKHJlc3RhdXJhbnQgPSBzZWxmLnJlc3RhdXJhbnQpID0+IHtcclxuICBjb25zdCBuYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3RhdXJhbnQtbmFtZScpO1xyXG4gIG5hbWUuaW5uZXJIVE1MID0gcmVzdGF1cmFudC5uYW1lO1xyXG5cclxuICBjb25zdCBhZGRyZXNzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3RhdXJhbnQtYWRkcmVzcycpO1xyXG4gIGFkZHJlc3MuaW5uZXJIVE1MID0gcmVzdGF1cmFudC5hZGRyZXNzO1xyXG5cclxuICBjb25zdCBpbWdOYW1lID0gREJIZWxwZXIuaW1hZ2VOYW1lRm9yUmVzdGF1cmFudChyZXN0YXVyYW50KTtcclxuXHJcbiAgY29uc3QgcGljdHVyZV9jb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzdGF1cmFudC1waWMtY29udGFpbmVyJyk7XHJcbiAgY29uc3QgcGljdHVyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BpY3R1cmUnKTtcclxuXHJcbiAgY29uc3Qgc291cmNlX3NtYWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc291cmNlJyk7XHJcbiAgc291cmNlX3NtYWxsLnNldEF0dHJpYnV0ZSgnbWVkaWEnLCAnKG1heC13aWR0aDo3NTBweCknKTtcclxuICBzb3VyY2Vfc21hbGwuc2V0QXR0cmlidXRlKCdzcmNzZXQnLCBgL2ltZy8ke2ltZ05hbWV9LTY1MC5qcGcgMXgsIC9pbWcvJHtpbWdOYW1lfS04MDAuanBnIDJ4YCk7XHJcblxyXG4gIGNvbnN0IHNvdXJjZV9sYXJnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NvdXJjZScpO1xyXG4gIHNvdXJjZV9sYXJnZS5zZXRBdHRyaWJ1dGUoJ21lZGlhJywgJyhtYXgtd2lkdGg6MTIwMHB4KScpO1xyXG4gIHNvdXJjZV9sYXJnZS5zZXRBdHRyaWJ1dGUoJ3NyY3NldCcsIGAvaW1nLyR7aW1nTmFtZX0tNTUwLmpwZyAxeCwgL2ltZy8ke2ltZ05hbWV9LTgwMC5qcGcgMnhgKTtcclxuXHJcbiAgY29uc3QgaW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICBpbWFnZS5zcmMgPSBgL2ltZy8ke2ltZ05hbWV9LTgwMC5qcGdgO1xyXG4gIGltYWdlLmNsYXNzTmFtZSA9ICdyZXN0YXVyYW50LWltZyc7XHJcbiAgaW1hZ2UuaWQgPSAncmVzdGF1cmFudC1pbWcnO1xyXG4gIGltYWdlLmFsdCA9IHJlc3RhdXJhbnQubmFtZTtcclxuXHJcblxyXG4gIHBpY3R1cmUuYXBwZW5kKHNvdXJjZV9zbWFsbCk7XHJcbiAgcGljdHVyZS5hcHBlbmQoc291cmNlX2xhcmdlKTtcclxuICBwaWN0dXJlLmFwcGVuZChpbWFnZSk7XHJcbiAgcGljdHVyZV9jb250YWluZXIucHJlcGVuZChwaWN0dXJlKTtcclxuXHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcC1jb250YWluZXInKS5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCBgR29vZ2xlIE1hcHMgc2hvd2luZyAke3Jlc3RhdXJhbnQubmFtZX0ncyBsb2NhdGlvbmApO1xyXG5cclxuICAvKmNvbnN0IGltYWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3RhdXJhbnQtaW1nJyk7XHJcbiAgaW1hZ2UuYWx0ID0gcmVzdGF1cmFudC5uYW1lO1xyXG4gIGltYWdlLmNsYXNzTmFtZSA9ICdyZXN0YXVyYW50LWltZydcclxuICBpbWFnZS5zcmMgPSBEQkhlbHBlci5pbWFnZVVybEZvclJlc3RhdXJhbnQocmVzdGF1cmFudCk7XHJcbiAgKi9cclxuXHJcbiAgY29uc3QgY3Vpc2luZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN0YXVyYW50LWN1aXNpbmUnKTtcclxuICBjdWlzaW5lLmlubmVySFRNTCA9IGAke3Jlc3RhdXJhbnQuY3Vpc2luZV90eXBlfSBSZXN0YXVyYW50YDtcclxuXHJcbiAgLy8gZmlsbCBvcGVyYXRpbmcgaG91cnNcclxuICBpZiAocmVzdGF1cmFudC5vcGVyYXRpbmdfaG91cnMpIHtcclxuICAgIGZpbGxSZXN0YXVyYW50SG91cnNIVE1MKCk7XHJcbiAgfVxyXG4gIC8vIGZpbGwgcmV2aWV3c1xyXG4gIGZpbGxSZXZpZXdzSFRNTCgpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSByZXN0YXVyYW50IG9wZXJhdGluZyBob3VycyBIVE1MIHRhYmxlIGFuZCBhZGQgaXQgdG8gdGhlIHdlYnBhZ2UuXHJcbiAqL1xyXG5maWxsUmVzdGF1cmFudEhvdXJzSFRNTCA9IChvcGVyYXRpbmdIb3VycyA9IHNlbGYucmVzdGF1cmFudC5vcGVyYXRpbmdfaG91cnMpID0+IHtcclxuICBjb25zdCBob3VycyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN0YXVyYW50LWhvdXJzJyk7XHJcbiAgZm9yIChsZXQga2V5IGluIG9wZXJhdGluZ0hvdXJzKSB7XHJcbiAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpO1xyXG5cclxuICAgIGNvbnN0IGRheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XHJcbiAgICBkYXkuaW5uZXJIVE1MID0ga2V5O1xyXG4gICAgcm93LmFwcGVuZENoaWxkKGRheSk7XHJcblxyXG4gICAgY29uc3QgdGltZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XHJcbiAgICB0aW1lLmlubmVySFRNTCA9IG9wZXJhdGluZ0hvdXJzW2tleV07XHJcbiAgICByb3cuYXBwZW5kQ2hpbGQodGltZSk7XHJcblxyXG4gICAgaG91cnMuYXBwZW5kQ2hpbGQocm93KTtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGFsbCByZXZpZXdzIEhUTUwgYW5kIGFkZCB0aGVtIHRvIHRoZSB3ZWJwYWdlLlxyXG4gKi9cclxuZmlsbFJldmlld3NIVE1MID0gKHJldmlld3MgPSBzZWxmLnJlc3RhdXJhbnQucmV2aWV3cykgPT4ge1xyXG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXZpZXdzLWNvbnRhaW5lcicpO1xyXG4gIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcclxuICB0aXRsZS5pbm5lckhUTUwgPSAnUmV2aWV3cyc7XHJcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRpdGxlKTtcclxuXHJcbiAgaWYgKCFyZXZpZXdzKSB7XHJcbiAgICBjb25zdCBub1Jldmlld3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICBub1Jldmlld3MuaW5uZXJIVE1MID0gJ05vIHJldmlld3MgeWV0ISc7XHJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobm9SZXZpZXdzKTtcclxuICAgIHJldHVybjtcclxuICB9XHJcbiAgY29uc3QgdWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmV2aWV3cy1saXN0Jyk7XHJcbiAgcmV2aWV3cy5mb3JFYWNoKHJldmlldyA9PiB7XHJcbiAgICB1bC5hcHBlbmRDaGlsZChjcmVhdGVSZXZpZXdIVE1MKHJldmlldykpO1xyXG4gIH0pO1xyXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh1bCk7XHJcbn07XHJcblxyXG4vKipcclxuICogQ3JlYXRlIHJldmlldyBIVE1MIGFuZCBhZGQgaXQgdG8gdGhlIHdlYnBhZ2UuXHJcbiAqL1xyXG5jcmVhdGVSZXZpZXdIVE1MID0gKHJldmlldykgPT4ge1xyXG4gIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuICBjb25zdCBuYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgbmFtZS5jbGFzc05hbWUgPSAncmV2aWV3cy1hdXRob3InO1xyXG4gIG5hbWUuaW5uZXJIVE1MID0gcmV2aWV3Lm5hbWU7XHJcbiAgbGkuYXBwZW5kQ2hpbGQobmFtZSk7XHJcblxyXG4gIGNvbnN0IGRhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzbWFsbCcpO1xyXG4gIGRhdGUuY2xhc3NOYW1lID0gJ3Jldmlld3MtZGF0ZSc7XHJcbiAgZGF0ZS5pbm5lckhUTUwgPSByZXZpZXcuZGF0ZTtcclxuICBuYW1lLmFwcGVuZENoaWxkKGRhdGUpO1xyXG5cclxuICBjb25zdCBjb21tZW50cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICBjb21tZW50cy5pbm5lckhUTUwgPSByZXZpZXcuY29tbWVudHM7XHJcbiAgbGkuYXBwZW5kQ2hpbGQoY29tbWVudHMpO1xyXG5cclxuICBjb25zdCByYXRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgcmF0aW5nLmNsYXNzTmFtZSA9ICdyZXZpZXdzLXJhdGluZyc7XHJcbiAgcmF0aW5nLnRpdGxlID0gYFJhdGluZzogJHtyZXZpZXcucmF0aW5nfWA7XHJcbiAgcmF0aW5nLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsIHJhdGluZy50aXRsZSk7XHJcbiAgcmF0aW5nLmlubmVySFRNTCA9ICcmIzk3MzM7Jy5yZXBlYXQocGFyc2VJbnQocmV2aWV3LnJhdGluZykpOyAvL3N0YXIgKHBhc3RpbmcgdGhlIHN5bWJvbCBhcyBzdHJpbmcgaXRzZWxmIGRpZG4ndCB3b3JrKVxyXG4gIGxpLmFwcGVuZENoaWxkKHJhdGluZyk7XHJcblxyXG4gIHJldHVybiBsaTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBBZGQgcmVzdGF1cmFudCBuYW1lIHRvIHRoZSBicmVhZGNydW1iIG5hdmlnYXRpb24gbWVudVxyXG4gKi9cclxuZmlsbEJyZWFkY3J1bWIgPSAocmVzdGF1cmFudCA9IHNlbGYucmVzdGF1cmFudCkgPT4ge1xyXG4gIGNvbnN0IGJyZWFkY3J1bWIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnJlYWRjcnVtYicpO1xyXG4gIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuICBsaS5pbm5lckhUTUwgPSByZXN0YXVyYW50Lm5hbWU7XHJcbiAgYnJlYWRjcnVtYi5hcHBlbmRDaGlsZChsaSk7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0IGEgcGFyYW1ldGVyIGJ5IG5hbWUgZnJvbSBwYWdlIFVSTC5cclxuICovXHJcbmdldFBhcmFtZXRlckJ5TmFtZSA9IChuYW1lLCB1cmwpID0+IHtcclxuICBpZiAoIXVybClcclxuICAgIHVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xyXG4gIG5hbWUgPSBuYW1lLnJlcGxhY2UoL1tcXFtcXF1dL2csICdcXFxcJCYnKTtcclxuICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAoYFs/Jl0ke25hbWV9KD0oW14mI10qKXwmfCN8JClgKSxcclxuICAgIHJlc3VsdHMgPSByZWdleC5leGVjKHVybCk7XHJcbiAgaWYgKCFyZXN1bHRzKVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgaWYgKCFyZXN1bHRzWzJdKVxyXG4gICAgcmV0dXJuICcnO1xyXG4gIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQocmVzdWx0c1syXS5yZXBsYWNlKC9cXCsvZywgJyAnKSk7XHJcbn07Il19