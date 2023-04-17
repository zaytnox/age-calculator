const errorMessages = document.querySelectorAll('.message-error');
const dateInputsElement = document.querySelector('.date-inputs');
const ageElements = document.querySelectorAll('.age span');

const getDateUserObj = () => ({
  day: +document.querySelector('#day').value,
  month: +document.querySelector('#month').value,
  year: +document.querySelector('#year').value,
});

const getCurrentDateObj = () => {
  const currentDate = new Date();
  return {
    day: currentDate.getDate(),
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear(),
  };
};

const setMessageError = ({ element, message }) => {
  element.textContent = message;
  dateInputsElement.classList.add('error');
};

const isValidDate = (userDateObj) => {
  const { day, month, year } = userDateObj;
  const currentDate = new Date();

  const userDate = new Date(
    `${userDateObj.month}-${userDateObj.day}-${userDateObj.year}`
  );
  if (userDate.getDate() !== userDateObj.day)
    setMessageError({
      element: errorMessages[0],
      message: 'Must be a valid date',
    });

  const userDateArray = Object.values(userDateObj);
  userDateArray.forEach((date, index) => {
    if (date < 1)
      setMessageError({
        element: errorMessages[index],
        message: 'This field required',
      });
  });

  if (day > 31)
    setMessageError({
      element: errorMessages[0],
      message: 'Must be a valid day',
    });
  if (month > 12)
    setMessageError({
      element: errorMessages[1],
      message: 'Must be a valid month',
    });
  if (year > currentDate.getFullYear())
    setMessageError({
      element: errorMessages[2],
      message: 'Must be in the past',
    });

  return !dateInputsElement.classList.contains('error');
};

const restartErrorMessages = () => {
  dateInputsElement.classList.remove('error');
  errorMessages.forEach((element) => (element.textContent = ''));
};

const setAge = (userDateObj) => {
  const currentDateObj = getCurrentDateObj();
  const age = {
    days: currentDateObj.day - userDateObj.day,
    months: currentDateObj.month - userDateObj.month,
    years: currentDateObj.year - userDateObj.year,
  };

  if (age.months < 0) {
    age.years -= 1;
    age.months += 12;
  }
  if (age.days < 0) {
    if (age.months === 0) {
      age.months = 11;
      age.years -= 1;
    } else {
      age.months -= 1;
    }
    age.days += 31;
  }

  ageElements[0].textContent = age.years;
  ageElements[1].textContent = age.months;
  ageElements[2].textContent = age.days;
};

document.querySelector('#calculate').addEventListener('click', (event) => {
  event.preventDefault();
  restartErrorMessages();
  const userDateObj = getDateUserObj();
  if (isValidDate(userDateObj)) setAge(userDateObj);
});
