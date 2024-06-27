const Ourgallery = document.querySelector(".gallery-container");
console.log(Ourgallery);
const searchParams = new URLSearchParams(window.location.search);
let country = searchParams.get("query");
const bookBtn = document.querySelector("#book-btn");
let countryPlace;
let countryPrice;

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
    getGalleryData(filteredData);
    countryPlace = filteredData[0].CountryName;
    countryPrice = filteredData[0].TourPrice;
  })
  .catch((err) => {
    console.log(err);
  });
function getGalleryData(galleryData) {
  let cardhtml = `<h1>${galleryData[0].CountryName.toUpperCase()}</h1>
    <div class = "gallery-card">`;
  for (let place of galleryData[0].TouristPlaces) {
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
    console.log(e.target.parentElement);
    e.target.parentElement.setAttribute("href", "details.html");
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
