const galleryDiv = document.querySelectorAll(".gallery-img-div");
const tourCountryDiv = document.querySelector(".tour-offering-countries");
const user = document.getElementById("user-span");
console.log(tourCountryDiv);
fetch("https://jsondata-hf5u.onrender.com/Countries", {
  method: "GET",
})
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
    getToursData(data);
  })
  .catch((err) => {
    console.log(err);
  });

for (ele of galleryDiv) {
  ele.addEventListener("click", function (e) {
    const { country } = e.target.dataset;
    console.log(e.target);
    console.log(e.target.closest(".gallery-anchor"));
    e.target
      .closest(".gallery-anchor")
      .setAttribute(
        "href",
        `gallery.html?query=${encodeURIComponent(country)}`
      );
  });
}

function getToursData(countriesData) {
  let card = "";
  for (countries of countriesData) {
    card += `<div class="card" style="width: 18rem;">
  <img src=${countries.CountryFlag} class="card-img-top" />
  <div class="card-body">
    <h5 class="card-title">${countries.CountryName}</h5>
    <p class="card-text">${countries.Description}</p>
    <a href="#" class="button places-btn" data-country-name=${countries.CountryName}>See All places</a>
  </div>
</div>`;
  }
  tourCountryDiv.innerHTML = card;
  //to show tourist places in the country
  const placesBtn = document.querySelectorAll(".places-btn");
  placesBtn.forEach((element) => {
    element.addEventListener("click", (e) => {
      const country = e.target.getAttribute("data-country-name");
      e.target.setAttribute(
        "href",
        `Places.html?query=${encodeURIComponent(country)}`
      );
    });
  });
}
// user checking portion
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

// redirect to login page
user.addEventListener("click", (e) => {
  if (user.innerHTML == "Login") {
    e.target.parentElement.setAttribute("href", "login.html");
  }
});
// redirect to bookings
const bookinglink = document.getElementById("booking-link");
bookinglink.addEventListener("click", (e) => {
  e.target.setAttribute("href", "bookings.html");
});
