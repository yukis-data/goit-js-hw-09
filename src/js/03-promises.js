import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  inputDelay: document.querySelector('[name=delay'),
  inputStep: document.querySelector('[name=step]'),
  inputAmount: document.querySelector('[name=amount]'),
  button: document.querySelector('[type=submit]'),
};

refs.form.addEventListener('submit', submitForm);

function submitForm(e) {
  e.preventDefault();

  setTimeout(() => {
    let position = 0;

    for (let i = 0; i < refs.inputAmount.value; i += 1) {
      const delay = +refs.inputDelay.value + +refs.inputStep.value * i;
      position = i;

      createPromise(position, delay)
        .then(({ position, delay }) => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }
  }, refs.inputDelay.value);
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
