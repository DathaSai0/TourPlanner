const Ourgallery = document.querySelector(".tourist-places-container");
const bookBtn = document.querySelector("#book-btn");
console.log(Ourgallery);
console.log(bookBtn);
let countryPlace;
let countryPrice;
const searchParams = new URLSearchParams(window.location.search);
let country = searchParams.get("query");

fetch("https://jsondata-hf5u.onrender.com/Countries", {
  method: "GET",
})
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
    let filteredData = data.filter((obj) => {
      return obj.CountryName.toLowerCase() === country.toLowerCase();
    });
    console.log(filteredData);
    getPlacesData(filteredData); // to display the data
    countryPlace = filteredData[0].CountryName;
    countryPrice = filteredData[0].TourPrice;
  })
  .catch((err) => {
    console.log(err);
  });
function getPlacesData(PlacesData) {
  let cardhtml = `<h1>${PlacesData[0].CountryName.toUpperCase()}</h1>
    <div class = "Places-card">`;
  for (let place of PlacesData[0].TouristPlaces) {
    cardhtml += `<div class="card" style="width: 18rem;">
  <img src=${place.image} class="card-img-top"/>
  <div class="card-body">
    <h5 class="card-title">${place.PlaceName}</h5>
    <h5 class="card-title">${place.Location}</h5>
    <p class="card-text">${place.Description}</p>
  </div>
</div>`;
  }
  cardhtml += `</div>`;
  Ourgallery.innerHTML = cardhtml;
}
bookBtn.addEventListener("click", (e) => {
  let userLogin = JSON.parse(localStorage.getItem("userLogin"));
  if (!userLogin) {
    e.target.closest(".book-now-anchor").setAttribute("href", "login.html");
  } else {
    let touristCountryData =
      JSON.parse(localStorage.getItem("touristCountryData")) || [];
    let data = {
      id: crypto.randomUUID(),
      countryPlace: countryPlace,
      countryPrice: countryPrice,
    };
    touristCountryData.push(data);
    localStorage.setItem(
      "touristCountryData",
      JSON.stringify(touristCountryData)
    );
    e.target.closest(".book-now-anchor").setAttribute("href", "details.html");
  }
});
const user = document.getElementById("user-span");
let userLoggedIn = JSON.parse(localStorage.getItem("userLogin"));
if (userLoggedIn) {
  user.innerHTML = `
    <select name="profile" id="profile">
      <option value="profile">Profile</option>
      <option value="logout" id="logout-btn">Logout</option>
    </select>
  `;
} else {
  user.innerHTML = "Login";
}

// Use event delegation to handle the logout click event
document.addEventListener("change", (event) => {
  if (
    event.target &&
    event.target.id === "profile" &&
    event.target.value === "logout"
  ) {
    localStorage.setItem("userLogin", JSON.stringify(false));
    localStorage.removeItem("touristCountryData");
    window.location.reload(); // Reload the page to update the UI after logout
  }
});

// redirect to home
const homeLink = document.getElementById("home-link");

homeLink.addEventListener("click", (e) => {
  e.target.setAttribute("href", "index.html");
});
// redirect to bookings
const bookinglink = document.getElementById("booking-link");
bookinglink.addEventListener("click", (e) => {
  e.target.setAttribute("href", "bookings.html");
});
// redirect to login;
user.addEventListener("click", (e) => {
  if (user.innerHTML == "Login") {
    e.target.parentElement.setAttribute("href", "login.html");
  }
});
