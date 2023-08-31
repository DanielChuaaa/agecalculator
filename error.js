document.addEventListener("DOMContentLoaded", () => {
  const inputDay = document.querySelector(".input-day");
  const inputMonth = document.querySelector(".input-month");
  const inputYear = document.querySelector(".input-year");

  const button = document.querySelector(".input-button");

  inputDay.addEventListener("input", function () {
    resetErrorState();
    validateDay(inputDay.value);
  });

  function validateDay() {
    if (inputDay.value > 31) {
      displayError("Must be a valid day", inputDay);
    } else {
      displayError("", inputDay);
    }
  }

  inputMonth.addEventListener("input", function () {
    resetErrorState();
    validateMonth(inputMonth.value);
  });

  function validateMonth() {
    if (inputMonth.value > 12) {
      displayError("Must be a valid month", inputMonth);
    } else {
      displayError("", inputMonth);
    }
  }

  inputYear.addEventListener("input", function () {
    resetErrorState();
    validateYear(inputYear.value);
  });

  function validateYear() {
    const currentYear = new Date().getFullYear();
    if (inputYear.value > currentYear) {
      displayError("Must in the past", inputYear);
    } else {
      displayError("", inputYear);
    }
  }

  inputYear.addEventListener("change", function () {
    resetErrorState();
    adjustNegativeYear(inputYear.value);
  });

  function adjustNegativeYear() {
    const currentYear = new Date().getFullYear();
    if (inputYear.value < 0) {
      inputYear.value = -inputYear.value;
      inputYear.value = currentYear - inputYear.value;
    }
  }

  button.addEventListener("click", function () {
    resetErrorState();

    const day = inputDay.value;
    const month = inputMonth.value;
    const year = inputYear.value;

    if (!day || !month || !year) {
      displayError("This field is required", inputDay);
      displayError("This field is required", inputMonth);
      displayError("This field is required", inputYear);
      return;
    }

    const currentDate = new Date();
    const inputDate = new Date(year, month - 1, day);

    if (inputDate > currentDate) {
      displayError("Date must in the past", inputYear);

      return;
    }

    calculateAndDisplayMyAge(inputDate, currentDate);
  });

  function resetErrorState() {
    inputDay.parentElement.classList.remove("error");
    inputMonth.parentElement.classList.remove("error");
    inputYear.parentElement.classList.remove("error");
  }

  function displayError(message, inputElement) {
    inputElement.parentElement.classList.add("error");
    inputElement.nextElementSibling.innerHTML = message;
  }

  function calculateAndDisplayMyAge(inputDate, currentDate) {
    const yearsDiff = currentDate.getFullYear() - inputDate.getFullYear();
    let monthsDiff = currentDate.getMonth() - inputDate.getMonth();
    let daysDiff = currentDate.getDate() - inputDate.getDate();

    if (monthsDiff >= 0) {
      monthsDiff = monthsDiff % 12;
      if (monthsDiff === 0) {
        monthsDiff = 0;
      }
    } else {
      monthsDiff = 12 - (-monthsDiff % 12);
    }

    if (daysDiff >= 0) {
      daysDiff = daysDiff % 31;
      if (daysDiff === 0) {
        daysDiff = 0;
      }
    } else {
      daysDiff = 31 - (-daysDiff % 31);
    }

    const outputYear = document.querySelector(".output-year span");
    const outputMonth = document.querySelector(".output-month span");
    const outputDay = document.querySelector(".output-day span");

    OutputNumber(outputYear, yearsDiff);
    OutputNumber(outputMonth, monthsDiff);
    OutputNumber(outputDay, daysDiff);
  }

  function OutputNumber(el, num) {
    let step = 50;
    if (num > 25) step = 35;
    if (num > 50) step = 25;
    if (num > 75) step = 20;
    if (num > 100) step = 10;
    if (num > 200) step = 1;

    let n = 0;
    if (num === 0) {
      el.innerHTML = n;
    } else {
      let interval = setInterval(() => {
        n = n + 1;
        if (n === num) {
          clearInterval(interval);
        }
        el.innerHTML = n;
      }, step);
    }
  }
});
