function getCoords(e) {
  var x=e.clientX;
  var y=e.clientY;
  var setAs = x/3+"deg";
  console.log(x,setAs);
  document.getElementById("lgImage").setAttribute("style", "-webkit-filter:hue-rotate(" + setAs + ")")
}

