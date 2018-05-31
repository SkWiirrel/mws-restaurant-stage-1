"use strict";var _slicedToArray=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var r=[],n=!0,a=!1,i=void 0;try{for(var l,o=e[Symbol.iterator]();!(n=(l=o.next()).done)&&(r.push(l.value),!t||r.length!==t);n=!0);}catch(e){a=!0,i=e}finally{try{!n&&o.return&&o.return()}finally{if(a)throw i}}return r}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")},getParameterByName=function(e,t){t||(t=window.location.href),e=e.replace(/[\[\]]/g,"\\$&");var r=new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)").exec(t);return r?r[2]?decodeURIComponent(r[2].replace(/\+/g," ")):"":null},restaurant=void 0,map=void 0,restaurantId=getParameterByName("id"),dbHelper=new DBHelper;window.initMap=function(){fetchRestaurantFromURL(function(e,t){e?(self.map=new google.maps.Map(document.getElementById("map"),{zoom:16,center:t.latlng,scrollwheel:!1}),fillBreadcrumb(),dbHelper.mapMarkerForRestaurant(self.restaurant,self.map)):console.error(t)})};var fillRestaurantErrorHTML=function(){document.getElementById("restaurant-name").innerHTML="No restaurant found!";var e=document.getElementById("reviews-container");e.parentNode.removeChild(e)},fetchRestaurantFromURL=function(r){!restaurantId||isNaN(restaurantId)?fillRestaurantErrorHTML():(document.getElementById("restaurant_id").value=restaurantId,dbHelper.fetchRestaurantById(restaurantId,function(e,t){if(self.restaurant=t,!e||t){if(!e||t instanceof Error)return console.error(t),void fillRestaurantErrorHTML();fillRestaurantHTML(),r(!0,t)}}))},fillRestaurantHTML=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:self.restaurant;document.getElementById("restaurant-name").innerHTML=e.name,document.getElementById("restaurant-address").innerHTML=e.address;var t=dbHelper.imageNameForRestaurant(e),r=document.getElementById("restaurant-pic-container");if(null===r.querySelector("picture")){var n=document.createElement("picture"),a=document.createElement("source");a.setAttribute("media","(max-width:750px)"),a.setAttribute("srcset","/img/"+t+"-650.webp 1x, /img/"+t+"-800.webp 2x");var i=document.createElement("source");i.setAttribute("media","(max-width:1200px)"),i.setAttribute("srcset","/img/"+t+"-550.webp 1x, /img/"+t+"-800.webp 2x");var l=document.createElement("img");l.src="/img/"+t+"-800.webp",l.className="restaurant-img",l.id="restaurant-img",l.alt=e.name,n.append(a),n.append(i),n.append(l),r.prepend(n),document.getElementById("map-container").setAttribute("aria-label","Google Maps showing "+e.name+"'s location"),document.getElementById("restaurant-cuisine").innerHTML=e.cuisine_type+" Restaurant",e.operating_hours&&fillRestaurantHoursHTML(),fillReviewsHTML()}},fillRestaurantHoursHTML=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:self.restaurant.operating_hours,t=document.getElementById("restaurant-hours");for(var r in e){var n=document.createElement("tr"),a=document.createElement("td");a.innerHTML=r,n.appendChild(a);var i=document.createElement("td");i.innerHTML=e[r],n.appendChild(i),t.appendChild(n)}},fillReviewsHTML=function(){0<arguments.length&&void 0!==arguments[0]?arguments[0]:self.restaurant.reviews;dbHelper.fetchReviewsByRestaurantId(restaurantId,function(e){var t=_slicedToArray(e,2),r=t[0],n=void 0!==r&&r,a=t[1],i=(document.getElementById("reviews-container"),document.getElementById("reviews-list"));if(i.innerHTML="",n&&!a){var l=document.createElement("li");return l.className="no-reviews-yet",l.innerHTML="No reviews yet. Be the first one!",void i.appendChild(l)}!n||a instanceof Error?console.error(a):a.forEach(function(e){i.appendChild(createReviewHTML(e))})})},createReviewHTML=function(e){var t=document.createElement("li"),r=document.createElement("div");r.className="reviews-author",r.innerHTML=e.name,t.appendChild(r);var n=document.createElement("small");n.className="reviews-date";var a=new Date(e.createdAt);n.innerHTML=a.toLocaleDateString()+" - "+a.toLocaleTimeString(),r.appendChild(n);var i=document.createElement("p");i.innerHTML=e.comments,t.appendChild(i);var l=document.createElement("span");return l.className="reviews-rating",l.title="Rating: "+e.rating,l.setAttribute("aria-label",l.title),l.innerHTML="&#9733;".repeat(parseInt(e.rating))+"&#9734;".repeat(5-parseInt(e.rating)),t.appendChild(l),t},fillBreadcrumb=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:self.restaurant,t=document.getElementById("breadcrumb");if(null===t.querySelector("#crumb-restaurant-"+e.id)){var r=document.createElement("li");r.id="crumb-restaurant-"+e.id,r.innerHTML=e.name,t.appendChild(r)}};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3RhdXJhbnRfaW5mby5qcyJdLCJuYW1lcyI6WyJnZXRQYXJhbWV0ZXJCeU5hbWUiLCJuYW1lIiwidXJsIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwicmVwbGFjZSIsInJlc3VsdHMiLCJyZWdleCIsInJlc3RhdXJhbnQiLCJtYXAiLCJEQkhlbHBlciIsImluaXRNYXAiLCJvayIsImZldGNoUmVzdGF1cmFudEZyb21VUkwiLCJzZWxmIiwiZ29vZ2xlIiwibWFwcyIsIk1hcCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJ6b29tIiwic2Nyb2xsd2hlZWwiLCJkYkhlbHBlciIsIm1hcE1hcmtlckZvclJlc3RhdXJhbnQiLCJjb25zb2xlIiwiZXJyb3IiLCJmaWxsUmVzdGF1cmFudEVycm9ySFRNTCIsImlubmVySFRNTCIsInJlbW92ZUNoaWxkIiwicmV2aWV3c0NvbnRhaW5lciIsImNhbGxiYWNrIiwicmVzdGF1cmFudElkIiwiaXNOYU4iLCJmZXRjaFJlc3RhdXJhbnRCeUlkIiwiRXJyb3IiLCJmaWxsUmVzdGF1cmFudEhUTUwiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJhZGRyZXNzIiwiaW1nTmFtZSIsImltYWdlTmFtZUZvclJlc3RhdXJhbnQiLCJwaWN0dXJlX2NvbnRhaW5lciIsInNvdXJjZV9zbWFsbCIsInF1ZXJ5U2VsZWN0b3IiLCJzZXRBdHRyaWJ1dGUiLCJzb3VyY2VfbGFyZ2UiLCJjcmVhdGVFbGVtZW50IiwiaW1hZ2UiLCJhbHQiLCJzcmMiLCJjbGFzc05hbWUiLCJhcHBlbmQiLCJwcmVwZW5kIiwicGljdHVyZSIsImN1aXNpbmVfdHlwZSIsIm9wZXJhdGluZ19ob3VycyIsImZpbGxSZXN0YXVyYW50SG91cnNIVE1MIiwiZmlsbFJldmlld3NIVE1MIiwib3BlcmF0aW5nSG91cnMiLCJob3VycyIsImtleSIsInJvdyIsImRheSIsImFwcGVuZENoaWxkIiwidGltZSIsInJldmlld3MiLCJmZXRjaFJldmlld3NCeVJlc3RhdXJhbnRJZCIsIl9yZWYiLCJfcmVmMiIsIl9zbGljZWRUb0FycmF5IiwiX3JlZjIkIiwidWwiLCJub1Jldmlld3MiLCJyZXZpZXciLCJjcmVhdGVSZXZpZXdIVE1MIiwibGkiLCJkYXRlIiwiY3JlYXRlZEF0IiwiRGF0ZSIsInRvTG9jYWxlRGF0ZVN0cmluZyIsInRvTG9jYWxlVGltZVN0cmluZyIsImNvbW1lbnRzIiwicmF0aW5nIiwidGl0bGUiLCJyZXBlYXQiLCJwYXJzZUludCIsImlkIiwiYnJlYWRjcnVtYiJdLCJtYXBwaW5ncyI6IjRhQUtNQSxtQkFBcUIsU0FBQ0MsRUFBTUMsR0FIbENBLElBS0lBLEVBQU1DLE9BQU9DLFNBQVNDLE1BQ3hCSixFQUFPQSxFQUFLSyxRQUFRLFVBQVcsUUFIakMsSUFDRUMsRUFESVAsSUFBQUEsT0FBQUEsT0FBQUEsRUFBQUEscUJBRUlHLEtBQU9DLEdBQ2ZILE9BQUFBLEVBRUVNLEVBQUFBLEdBR0dBLG1CQUNIQSxFQUFBLEdBQUFELFFBQUEsTUFBQSxNQUhHQyxHQUZDQyxNQVVKQyxnQkFBQUEsRUFBQUEsU0FBQUEsRUFBQUEsYUFBSlQsbUJBQUEsTUFBZ0JVLFNBQWhCLElBQUFDLFNBT0FSLE9BQU9TLFFBQVUsV0FBakJULHVCQUFpQixTQUFBVSxFQUFNSixHQUNyQkssR0FHSUMsS0FBQUwsSUFBQSxJQUFBTSxPQUFBQyxLQUFBQyxJQUFBQyxTQUFBQyxlQUFBLE9BQUEsQ0FGRkMsS0FHTyxHQUNMTixPQUFBTixFQUFlTyxPQUNiSyxhQUQ2RCxJQUc3REMsaUJBSDZEQyxTQUEvREMsdUJBQUFULEtBQUFOLFdBQUFNLEtBQUFMLE1BSkZlLFFBQVNDLE1BQUFqQixNQWtCYixJQUFNa0Isd0JBQTBCLFdBQzlCUixTQUFTQyxlQUFlLG1CQUFtQlEsVUFBWSx1QkFEekQsSUFBTUQsRUFBQUEsU0FBMEJQLGVBQTFCTyxxQkFDSlIsRUFBU0MsV0FBZVMsWUFBQUMsSUFRcEJoQix1QkFBeUIsU0FBQ2lCLElBS3pCQyxjQUFnQkMsTUFBTUQsY0FDekJM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RUFBT0MsR0FDcENWLEVBQUdaLFVBQVltQixFQUFmbkYsS0FjRXdGLEVBQVd4QixZQUFZWSIsImZpbGUiOiJyZXN0YXVyYW50X2luZm8uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKmpzaGludCBlc3ZlcnNpb246IDYgKi9cclxuXHJcbi8qKlxyXG4gKiBHZXQgYSBwYXJhbWV0ZXIgYnkgbmFtZSBmcm9tIHBhZ2UgVVJMLlxyXG4gKi9cclxuY29uc3QgZ2V0UGFyYW1ldGVyQnlOYW1lID0gKG5hbWUsIHVybCkgPT4ge1xyXG4gIGlmICghdXJsKVxyXG4gICAgdXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XHJcbiAgbmFtZSA9IG5hbWUucmVwbGFjZSgvW1xcW1xcXV0vZywgJ1xcXFwkJicpO1xyXG4gIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cChgWz8mXSR7bmFtZX0oPShbXiYjXSopfCZ8I3wkKWApLFxyXG4gICAgcmVzdWx0cyA9IHJlZ2V4LmV4ZWModXJsKTtcclxuICBpZiAoIXJlc3VsdHMpXHJcbiAgICByZXR1cm4gbnVsbDtcclxuICBpZiAoIXJlc3VsdHNbMl0pXHJcbiAgICByZXR1cm4gJyc7XHJcbiAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChyZXN1bHRzWzJdLnJlcGxhY2UoL1xcKy9nLCAnICcpKTtcclxufTtcclxuXHJcblxyXG5sZXQgcmVzdGF1cmFudCwgbWFwLCByZXN0YXVyYW50SWQgPSBnZXRQYXJhbWV0ZXJCeU5hbWUoJ2lkJyk7XHJcbmNvbnN0IGRiSGVscGVyID0gbmV3IERCSGVscGVyKCk7XHJcblxyXG5cclxuLyoqXHJcbiAqIEluaXRpYWxpemUgR29vZ2xlIG1hcCwgY2FsbGVkIGZyb20gSFRNTC5cclxuICovXHJcbndpbmRvdy5pbml0TWFwID0gKCkgPT4ge1xyXG4gIGZldGNoUmVzdGF1cmFudEZyb21VUkwoKG9rLCByZXN0YXVyYW50KSA9PiB7XHJcbiAgICBpZiAoIW9rKSB7IC8vIEdvdCBhbiBlcnJvciFcclxuICAgICAgY29uc29sZS5lcnJvcihyZXN0YXVyYW50KTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc2VsZi5tYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAnKSwge1xyXG4gICAgICAgIHpvb206IDE2LFxyXG4gICAgICAgIGNlbnRlcjogcmVzdGF1cmFudC5sYXRsbmcsXHJcbiAgICAgICAgc2Nyb2xsd2hlZWw6IGZhbHNlXHJcbiAgICAgIH0pO1xyXG4gICAgICBmaWxsQnJlYWRjcnVtYigpO1xyXG4gICAgICBkYkhlbHBlci5tYXBNYXJrZXJGb3JSZXN0YXVyYW50KHNlbGYucmVzdGF1cmFudCwgc2VsZi5tYXApO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSByZXN0YXVyYW50IEVycm9yIEhUTUwgaWYgbm9uZSBpcyBmb3VuZCBhbmQgYWRkcyBpdCB0byB0aGUgd2VicGFnZVxyXG4gKi9cclxuY29uc3QgZmlsbFJlc3RhdXJhbnRFcnJvckhUTUwgPSAoKSA9PiB7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3RhdXJhbnQtbmFtZScpLmlubmVySFRNTCA9ICdObyByZXN0YXVyYW50IGZvdW5kISc7XHJcbiAgdmFyIHJldmlld3NDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJldmlld3MtY29udGFpbmVyXCIpO1xyXG4gIHJldmlld3NDb250YWluZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChyZXZpZXdzQ29udGFpbmVyKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgY3VycmVudCByZXN0YXVyYW50IGZyb20gcGFnZSBVUkwuXHJcbiAqL1xyXG5jb25zdCBmZXRjaFJlc3RhdXJhbnRGcm9tVVJMID0gKGNhbGxiYWNrKSA9PiB7XHJcbiAgLyppZiAoc2VsZi5yZXN0YXVyYW50KSB7IC8vIHJlc3RhdXJhbnQgYWxyZWFkeSBmZXRjaGVkIVxyXG4gICAgY2FsbGJhY2sobnVsbCwgc2VsZi5yZXN0YXVyYW50KTtcclxuICAgIHJldHVybjtcclxuICB9Ki9cclxuICBpZiAoIXJlc3RhdXJhbnRJZCB8fCBpc05hTihyZXN0YXVyYW50SWQpKSB7IC8vIG5vIGlkIGZvdW5kIGluIFVSTFxyXG4gICAgZmlsbFJlc3RhdXJhbnRFcnJvckhUTUwoKTtcclxuICB9IGVsc2Uge1xyXG5cclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN0YXVyYW50X2lkJykudmFsdWUgPSByZXN0YXVyYW50SWQ7XHJcblxyXG4gICAgZGJIZWxwZXIuZmV0Y2hSZXN0YXVyYW50QnlJZChyZXN0YXVyYW50SWQsIChvaywgcmVzdGF1cmFudCkgPT4ge1xyXG5cclxuICAgICAgc2VsZi5yZXN0YXVyYW50ID0gcmVzdGF1cmFudDtcclxuXHJcbiAgICAgIGlmIChvayAmJiAhcmVzdGF1cmFudCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfSBlbHNlIGlmICghb2sgfHwgcmVzdGF1cmFudCBpbnN0YW5jZW9mIEVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihyZXN0YXVyYW50KTtcclxuICAgICAgICBmaWxsUmVzdGF1cmFudEVycm9ySFRNTCgpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBmaWxsUmVzdGF1cmFudEhUTUwoKTtcclxuICAgICAgY2FsbGJhY2sodHJ1ZSwgcmVzdGF1cmFudCk7XHJcbiAgICB9KTtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogQ3JlYXRlIHJlc3RhdXJhbnQgSFRNTCBhbmQgYWRkIGl0IHRvIHRoZSB3ZWJwYWdlXHJcbiAqL1xyXG5jb25zdCBmaWxsUmVzdGF1cmFudEhUTUwgPSAocmVzdGF1cmFudCA9IHNlbGYucmVzdGF1cmFudCkgPT4ge1xyXG5cclxuICBjb25zdCBuYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3RhdXJhbnQtbmFtZScpO1xyXG4gIG5hbWUuaW5uZXJIVE1MID0gcmVzdGF1cmFudC5uYW1lO1xyXG5cclxuICBjb25zdCBhZGRyZXNzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3RhdXJhbnQtYWRkcmVzcycpO1xyXG4gIGFkZHJlc3MuaW5uZXJIVE1MID0gcmVzdGF1cmFudC5hZGRyZXNzO1xyXG5cclxuICBjb25zdCBpbWdOYW1lID0gZGJIZWxwZXIuaW1hZ2VOYW1lRm9yUmVzdGF1cmFudChyZXN0YXVyYW50KTtcclxuXHJcbiAgY29uc3QgcGljdHVyZV9jb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzdGF1cmFudC1waWMtY29udGFpbmVyJyk7XHJcbiAgaWYgKHBpY3R1cmVfY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ3BpY3R1cmUnKSA9PT0gbnVsbCkge1xyXG5cclxuICAgIGNvbnN0IHBpY3R1cmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwaWN0dXJlJyk7XHJcblxyXG4gICAgY29uc3Qgc291cmNlX3NtYWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc291cmNlJyk7XHJcbiAgICBzb3VyY2Vfc21hbGwuc2V0QXR0cmlidXRlKCdtZWRpYScsICcobWF4LXdpZHRoOjc1MHB4KScpO1xyXG4gICAgc291cmNlX3NtYWxsLnNldEF0dHJpYnV0ZSgnc3Jjc2V0JywgYC9pbWcvJHtpbWdOYW1lfS02NTAud2VicCAxeCwgL2ltZy8ke2ltZ05hbWV9LTgwMC53ZWJwIDJ4YCk7XHJcblxyXG4gICAgY29uc3Qgc291cmNlX2xhcmdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc291cmNlJyk7XHJcbiAgICBzb3VyY2VfbGFyZ2Uuc2V0QXR0cmlidXRlKCdtZWRpYScsICcobWF4LXdpZHRoOjEyMDBweCknKTtcclxuICAgIHNvdXJjZV9sYXJnZS5zZXRBdHRyaWJ1dGUoJ3NyY3NldCcsIGAvaW1nLyR7aW1nTmFtZX0tNTUwLndlYnAgMXgsIC9pbWcvJHtpbWdOYW1lfS04MDAud2VicCAyeGApO1xyXG5cclxuICAgIGNvbnN0IGltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICBpbWFnZS5zcmMgPSBgL2ltZy8ke2ltZ05hbWV9LTgwMC53ZWJwYDtcclxuICAgIGltYWdlLmNsYXNzTmFtZSA9ICdyZXN0YXVyYW50LWltZyc7XHJcbiAgICBpbWFnZS5pZCA9ICdyZXN0YXVyYW50LWltZyc7XHJcbiAgICBpbWFnZS5hbHQgPSByZXN0YXVyYW50Lm5hbWU7XHJcblxyXG4gICAgcGljdHVyZS5hcHBlbmQoc291cmNlX3NtYWxsKTtcclxuICAgIHBpY3R1cmUuYXBwZW5kKHNvdXJjZV9sYXJnZSk7XHJcbiAgICBwaWN0dXJlLmFwcGVuZChpbWFnZSk7XHJcblxyXG4gICAgcGljdHVyZV9jb250YWluZXIucHJlcGVuZChwaWN0dXJlKTtcclxuXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwLWNvbnRhaW5lcicpLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsIGBHb29nbGUgTWFwcyBzaG93aW5nICR7cmVzdGF1cmFudC5uYW1lfSdzIGxvY2F0aW9uYCk7XHJcblxyXG4gICAgY29uc3QgY3Vpc2luZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN0YXVyYW50LWN1aXNpbmUnKTtcclxuICAgIGN1aXNpbmUuaW5uZXJIVE1MID0gYCR7cmVzdGF1cmFudC5jdWlzaW5lX3R5cGV9IFJlc3RhdXJhbnRgO1xyXG5cclxuICAgIC8vIGZpbGwgb3BlcmF0aW5nIGhvdXJzXHJcbiAgICBpZiAocmVzdGF1cmFudC5vcGVyYXRpbmdfaG91cnMpIHtcclxuICAgICAgZmlsbFJlc3RhdXJhbnRIb3Vyc0hUTUwoKTtcclxuICAgIH1cclxuICAgIC8vIGZpbGwgcmV2aWV3c1xyXG4gICAgZmlsbFJldmlld3NIVE1MKCk7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSByZXN0YXVyYW50IG9wZXJhdGluZyBob3VycyBIVE1MIHRhYmxlIGFuZCBhZGQgaXQgdG8gdGhlIHdlYnBhZ2UuXHJcbiAqL1xyXG5jb25zdCBmaWxsUmVzdGF1cmFudEhvdXJzSFRNTCA9IChvcGVyYXRpbmdIb3VycyA9IHNlbGYucmVzdGF1cmFudC5vcGVyYXRpbmdfaG91cnMpID0+IHtcclxuICBjb25zdCBob3VycyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN0YXVyYW50LWhvdXJzJyk7XHJcbiAgZm9yIChsZXQga2V5IGluIG9wZXJhdGluZ0hvdXJzKSB7XHJcbiAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpO1xyXG5cclxuICAgIGNvbnN0IGRheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XHJcbiAgICBkYXkuaW5uZXJIVE1MID0ga2V5O1xyXG4gICAgcm93LmFwcGVuZENoaWxkKGRheSk7XHJcblxyXG4gICAgY29uc3QgdGltZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XHJcbiAgICB0aW1lLmlubmVySFRNTCA9IG9wZXJhdGluZ0hvdXJzW2tleV07XHJcbiAgICByb3cuYXBwZW5kQ2hpbGQodGltZSk7XHJcblxyXG4gICAgaG91cnMuYXBwZW5kQ2hpbGQocm93KTtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGFsbCByZXZpZXdzIEhUTUwgYW5kIGFkZCB0aGVtIHRvIHRoZSB3ZWJwYWdlLlxyXG4gKi9cclxuY29uc3QgZmlsbFJldmlld3NIVE1MID0gKHJldmlld3MgPSBzZWxmLnJlc3RhdXJhbnQucmV2aWV3cykgPT4ge1xyXG5cclxuICAgZGJIZWxwZXIuZmV0Y2hSZXZpZXdzQnlSZXN0YXVyYW50SWQocmVzdGF1cmFudElkLCAoW29rID0gZmFsc2UsIHJldmlld3NdKSA9PiB7XHJcblxyXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jldmlld3MtY29udGFpbmVyJyk7XHJcbiAgICBjb25zdCB1bCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXZpZXdzLWxpc3QnKTtcclxuICAgIHVsLmlubmVySFRNTCA9ICcnO1xyXG5cclxuICAgIGlmIChvayAmJiAhcmV2aWV3cykge1xyXG4gICAgICBjb25zdCBub1Jldmlld3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG4gICAgICBub1Jldmlld3MuY2xhc3NOYW1lID0gJ25vLXJldmlld3MteWV0JztcclxuICAgICAgbm9SZXZpZXdzLmlubmVySFRNTCA9ICdObyByZXZpZXdzIHlldC4gQmUgdGhlIGZpcnN0IG9uZSEnO1xyXG4gICAgICB1bC5hcHBlbmRDaGlsZChub1Jldmlld3MpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9IGVsc2UgaWYgKCFvayB8fCByZXZpZXdzIGluc3RhbmNlb2YgRXJyb3IpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihyZXZpZXdzKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHJldmlld3MuZm9yRWFjaChyZXZpZXcgPT4ge1xyXG4gICAgICB1bC5hcHBlbmRDaGlsZChjcmVhdGVSZXZpZXdIVE1MKHJldmlldykpO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogQ3JlYXRlIHJldmlldyBIVE1MIGFuZCBhZGQgaXQgdG8gdGhlIHdlYnBhZ2UuXHJcbiAqL1xyXG5jb25zdCBjcmVhdGVSZXZpZXdIVE1MID0gKHJldmlldykgPT4ge1xyXG4gIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuICBjb25zdCBuYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgbmFtZS5jbGFzc05hbWUgPSAncmV2aWV3cy1hdXRob3InO1xyXG4gIG5hbWUuaW5uZXJIVE1MID0gcmV2aWV3Lm5hbWU7XHJcbiAgbGkuYXBwZW5kQ2hpbGQobmFtZSk7XHJcblxyXG4gIGNvbnN0IGRhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzbWFsbCcpO1xyXG4gIGRhdGUuY2xhc3NOYW1lID0gJ3Jldmlld3MtZGF0ZSc7XHJcbiAgdmFyIGNyZWF0ZWRBdCA9IG5ldyBEYXRlKHJldmlldy5jcmVhdGVkQXQpO1xyXG4gIGRhdGUuaW5uZXJIVE1MID0gYCR7Y3JlYXRlZEF0LnRvTG9jYWxlRGF0ZVN0cmluZygpfSAtICR7Y3JlYXRlZEF0LnRvTG9jYWxlVGltZVN0cmluZygpfWA7XHJcbiAgbmFtZS5hcHBlbmRDaGlsZChkYXRlKTtcclxuXHJcbiAgY29uc3QgY29tbWVudHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgY29tbWVudHMuaW5uZXJIVE1MID0gcmV2aWV3LmNvbW1lbnRzO1xyXG4gIGxpLmFwcGVuZENoaWxkKGNvbW1lbnRzKTtcclxuXHJcbiAgY29uc3QgcmF0aW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gIHJhdGluZy5jbGFzc05hbWUgPSAncmV2aWV3cy1yYXRpbmcnO1xyXG4gIHJhdGluZy50aXRsZSA9IGBSYXRpbmc6ICR7cmV2aWV3LnJhdGluZ31gO1xyXG4gIHJhdGluZy5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCByYXRpbmcudGl0bGUpO1xyXG4gIHJhdGluZy5pbm5lckhUTUwgPSAnJiM5NzMzOycucmVwZWF0KHBhcnNlSW50KHJldmlldy5yYXRpbmcpKSArICcmIzk3MzQ7Jy5yZXBlYXQoNSAtIHBhcnNlSW50KHJldmlldy5yYXRpbmcpKTsgLy9zdGFyIChwYXN0aW5nIHRoZSBzeW1ib2wgYXMgc3RyaW5nIGl0c2VsZiBkaWRuJ3Qgd29yaylcclxuICBsaS5hcHBlbmRDaGlsZChyYXRpbmcpO1xyXG5cclxuICByZXR1cm4gbGk7XHJcbn07XHJcblxyXG4vKipcclxuICogQWRkIHJlc3RhdXJhbnQgbmFtZSB0byB0aGUgYnJlYWRjcnVtYiBuYXZpZ2F0aW9uIG1lbnVcclxuICovXHJcbmNvbnN0IGZpbGxCcmVhZGNydW1iID0gKHJlc3RhdXJhbnQgPSBzZWxmLnJlc3RhdXJhbnQpID0+IHtcclxuICBjb25zdCBicmVhZGNydW1iID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JyZWFkY3J1bWInKTtcclxuICBpZiAoYnJlYWRjcnVtYi5xdWVyeVNlbGVjdG9yKGAjY3J1bWItcmVzdGF1cmFudC0ke3Jlc3RhdXJhbnQuaWR9YCkgPT09IG51bGwpIHtcclxuICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuICAgIGxpLmlkID0gYGNydW1iLXJlc3RhdXJhbnQtJHtyZXN0YXVyYW50LmlkfWA7XHJcbiAgICBsaS5pbm5lckhUTUwgPSByZXN0YXVyYW50Lm5hbWU7XHJcbiAgICBicmVhZGNydW1iLmFwcGVuZENoaWxkKGxpKTtcclxuICB9XHJcbn07XHJcbiJdfQ==
