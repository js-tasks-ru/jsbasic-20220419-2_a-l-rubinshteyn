export default function promiseClick(button) {
  return new Promise((resolve, reject) => {
    button.addEventListener('click', function (e) {
      resolve(e);
    });
  }, {
    once: true
  });

}
