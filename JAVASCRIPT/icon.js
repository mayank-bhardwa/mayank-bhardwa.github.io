function dropMenu()
{
    var x = document.getElementById("right-nav");
    if (x.className == "right-nav-bar") {
      x.className += " responsive";
    } else {
      x.className = "right-nav-bar";
    }
}