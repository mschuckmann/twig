//wait for Polymer elements to be loaded
document.addEventListener('WebComponentsReady', () => {
  var fullname = document.getElementById("fullname");
  fullname.innerText = "Matt Rules";
  require('./main.ts');
});
