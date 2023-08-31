// function errorHandlers() {
//   var valid = true,
//     error = "";
//   field = "";

//   field = document.querySelectorAll("#day, #month, #year");
//   error = document.querySelectorAll("#errorday, #errormonth, #erroryear");

//   if (!field.checkValidity()) {
//     valid = false;
//     field.classList.add("err");

//     error.innerHTML = "This field is required";
//   } else {
//     field.classList.remove("err");
//     error.innerHTML = "";
//   }

//   return valid;
// }

document.addEventListener("DOMContentLoaded", () => {
  const inputDay = document.querySelector(".input-day");
  const inputMonth = document.querySelector(".input-month");
  const inputYear = document.querySelector(".input-year");

  const button = document.querySelector(".input-button");

  inputDay.addEventListener("input", function () {
    if (inputDay.nextElementSibling.innerHTML == "Must be a valid date") {
      inputDay.parentElement.classList.remove("error");
      inputMonth.parentElement.classList.remove("error");
      inputYear.parentElement.classList.remove("error");
    }

    /* jika inputDay lebih besar daripada 31 muncul Must be a valid day*/
    if (inputDay.value > 31) {
      inputDay.nextElementSibling.innerHTML = "Must be a valid day";
      inputDay.parentElement.classList.add("error");
    } else {
      inputDay.parentElement.classList.remove("error");
    }
  });

  inputMonth.addEventListener("input", function () {
    if (inputDay.nextElementSibling.innerHTML == "Must be a valid date") {
      inputDay.parentElement.classList.remove("error");
      inputMonth.parentElement.classList.remove("error");
      inputYear.parentElement.classList.remove("error");
    }

    /* jika inputMonth lebih besar daripada 12 muncul Must be a valid month*/
    if (inputMonth.value > 12) {
      inputMonth.nextElementSibling.innerHTML = "Must be a valid month";
      inputMonth.parentElement.classList.add("error");
    } else {
      inputMonth.parentElement.classList.remove("error");
    }
  });

  inputYear.addEventListener("input", function () {
    if (inputDay.nextElementSibling.innerHTML == "Must be a valid date") {
      inputDay.parentElement.classList.remove("error");
      inputMonth.parentElement.classList.remove("error");
      inputYear.parentElement.classList.remove("error");
    }

    /* jika inputYear lebih besar daripada tahun yang sekarang muncul Must in the past*/
    let data = new Date();
    if (inputYear.value > data.getFullYear()) {
      inputYear.nextElementSibling.innerHTML = "Must in the past";
      inputYear.parentElement.classList.add("error");
    } else {
      inputYear.parentElement.classList.remove("error");
    }
  });

  /* function untuk jika saat user input -1 outputnya akan 2022 dst */
  inputYear.addEventListener("change", function () {
    let data = new Date();
    if (inputYear.value < 0) {
      inputYear.value = -inputYear.value;
      inputYear.value = data.getFullYear() - inputYear.value;
    }
  });

  /*section ini kalo kosong dia keluar this field is required */
  button.addEventListener("click", function () {
    day = inputDay.value;
    month = inputMonth.value;
    year = inputYear.value;

    if (!day) {
      inputDay.parentElement.classList.add("error");
      inputDay.nextElementSibling.innerHTML = "This field is requried";
    }

    if (!month) {
      inputMonth.parentElement.classList.add("error");
      inputMonth.nextElementSibling.innerHTML = "This field is required";
    }

    if (!year) {
      inputYear.parentElement.classList.add("error");
      inputYear.nextElementSibling.innerHTML = "This field is required";
    }

    if (!day || !month || !year) {
      return;
    }

    //

    let date = new Date(year, month - 1, day);
    let currentData = new Date();

    let age_year = currentData.getFullYear() - date.getFullYear();
    let age_month = 0;
    let age_day = 0;
    if (currentData < new Date(currentData.getFullYear(), month - 1, day)) {
      age_year = age_year - 1;
      age_month = currentData.getMonth() + 1;
      age_day = currentData.getDate();
    } else {
      if (currentData.getMonth() + 1 === month) {
        age_month = 0;
        age_day = currentData.getDate() - day;
        console.log(age_day);
      } else {
        age_month = currentData.getMonth() + 1 - month;
        if (currentData.getDate() < day) {
          age_month = age_month - 1;
          age_day =
            currentData.getDate() +
            new Date(
              currentData.getFullYear(),
              currentData.getMonth(),
              0
            ).getDate() -
            day;
        } else {
          age_day = currentData.getDate() - day;
        }
      }
    }

    const outputDay = document
      .querySelector(".output-day")
      .querySelector("span");
    const outputMonth = document
      .querySelector(".output-month")
      .querySelector("span");
    const outputYear = document
      .querySelector(".input-year")
      .querySelector("span");

    OutputNumber.innerHTML(outputYear, age_year);
    OutputNumber.innerHTML(outputMonth, age_month);
    OutputNumber.innerHTML(outputDay, age_day);
  });

  function OutputNumber(el, num) {
    let step = 50;
    num > 25 && (step = 35);
    num > 50 && (step = 25);
    num > 75 && (step = 20);
    num > 100 && (step = 10);
    num > 200 && (step = 1);

    let n = 0;
    if (num === 0) {
      el.innerHTML = n;
    } else {
      let inteval = setInterval(() => {
        n = n + 1;
        if (n === num) {
          clearInterval(inteval);
        }
        el.innerHTML = n;
      }, step);
    }
  }
});
