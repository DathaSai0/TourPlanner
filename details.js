const fullNameele = document.getElementById("fullName");
const ageele = document.getElementById("age");
const mobileele = document.getElementById("mobile");
const membersele = document.getElementById("members");
const startDatesele = document.getElementById("start");
const endDatesele = document.getElementById("end");
const detailsbutton = document.getElementById("details-button");
function bookfunction(e) {
  e.preventDefault();
  let isValid = false;
  if (
    fullNameele.value.trim() !== "" &&
    ageele.value.trim() !== "" &&
    mobileele.value.trim().length === 10 &&
    Number(membersele.value.trim()) > 0 &&
    startDatesele.value.trim() !== "" &&
    endDatesele.value.trim() !== ""
  ) {
    let bookingDetails = JSON.parse(localStorage.getItem("touristCountryData"));
    let obj = bookingDetails[bookingDetails.length - 1];
    obj = {
      ...obj,
      name: fullNameele.value,
      age: ageele.value,
      number: mobileele.value,
      members: membersele.value,
      startDate: startDatesele.value,
      endDate: endDatesele.value,
    };
    bookingDetails.pop();
    bookingDetails.push(obj);
    localStorage.setItem("touristCountryData", JSON.stringify(bookingDetails));
    isValid = true;
  }
  if (isValid) {
    Swal.fire({
      title: "Hurray!",
      text: "You Successfully booked your tourist country.",
      icon: "success",
    });
    setTimeout(() => {
      window.location.href = "bookings.html";
    }, 1000);
  } else {
    Swal.fire("Please fill the form correctly");
  }
}
detailsbutton.addEventListener("click", bookfunction);
