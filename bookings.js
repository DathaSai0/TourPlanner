const Bookingdetailsdiv = document.querySelector(".Booking-dtails");
let bookingDetails = JSON.parse(localStorage.getItem("touristCountryData"));
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

let bookedcard = "";
if (bookingDetails) {
  for (data of bookingDetails) {
    bookedcard += `
      <article class="card fl-left">
        <section class="date">
          <time datetime="${data.startDate}">
            <span class="day">${new Date(data.startDate).getDate()}</span>
            <span class="month">${new Date(data.startDate).toLocaleString(
              "default",
              { month: "short" }
            )}</span>
            <span class="year">${new Date(data.startDate).getFullYear()}</span>
          </time>
        </section>
        <section class="card-cont">
          <small>Tourist Booking</small>
          <h3>${data.countryPlace}</h3>
          <div class="even-date">
            <i class="fa fa-calendar"></i>
            <time>
              <span>From: ${data.startDate}</span>
              <span>To: ${data.endDate}</span>
            </time>
          </div>
          <div class="even-info">
            <p>Name: ${data.name}</p>
            <p>Age: ${data.age}</p>
            <p>Mobile: ${data.number}</p>
            <p>Members: ${data.members}</p>
          </div>
          <h3>Total Cost: ${data.countryPrice}</h3>
          <button class="tour-cancel-button" data=${
            data.id
          }>Cancel Tour</button>
        </section>
      </article>`;
  }
  Bookingdetailsdiv.innerHTML = bookedcard;
} else {
  bookedcard += "<h1>Currently you don't have any active bookings..!</h1>";
  Bookingdetailsdiv.innerHTML = bookedcard;
}

const tourCancelBtn = document.querySelectorAll(".tour-cancel-button");
tourCancelBtn.forEach((ele) => {
  ele.addEventListener("click", (e) => {
    let delid = e.target.getAttribute("data");
    let filteredData = bookingDetails.filter((obj) => {
      return obj.id != delid;
    });
    localStorage.setItem("touristCountryData", JSON.stringify(filteredData));
    window.location.reload();
  });
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

// redirect to login
user.addEventListener("click", (e) => {
  if (user.innerHTML == "Login") {
    e.target.parentElement.setAttribute("href", "login.html");
  }
});
