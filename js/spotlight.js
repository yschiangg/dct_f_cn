var spotlight = document.querySelector(".spotlight");

var spotlightUpdate = function spotlightUpdate(e) {
  var root = document.documentElement;
  var x = e.pageX,
      y = e.pageY;

  if (e.touches && e.touches.length) {
    x = e.touches[0].clientX;
    y = e.touches[0].clientY;
  }

  root.style.setProperty("--x", x);
  root.style.setProperty("--y", y);
};

document.addEventListener("touchmove", spotlightUpdate);
document.addEventListener("mousemove", spotlightUpdate);