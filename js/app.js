var input  = document.querySelector('[data-color=input]'),
    output = document.querySelector('[data-color=output]'),
    btn    = document.querySelector('[data-call=colorstring]'),
    lightHeading = "hsl(220, 4%, 85%)",
    darkHeading  = "hsl(214, 4%, 34%)",
    initializeLocalStorage = function() {
      // remember button text
      if ( localStorage.getItem("convertTo")) {
        btn.textContent = localStorage.getItem("convertTo");
      }
      // remember input value
      if ( localStorage.getItem("inputVal")) {
        input.value = localStorage.getItem("inputVal");
      }
      // remember output value
      if ( localStorage.getItem("outputVal")) {
        output.value = localStorage.getItem("outputVal");
      }
    };

var colorConverstion = function() {
  var color  = tinycolor(input.value);
  localStorage.setItem("inputVal", input.value);

  if (input.value) {
    if (color.isValid()) {
      // place output color
      if (btn.textContent === "HEX") {
        output.value = color.toHexString();
        localStorage.setItem("outputVal", output.value);
      } else if (btn.textContent === "RGB") {
        output.value = color.toRgbString();
        localStorage.setItem("outputVal", output.value);
      } else if (btn.textContent === "HSL") {
        output.value = color.toHslString();
        localStorage.setItem("outputVal", output.value);
      }
      
      // output color as body background
      document.body.style.background = color.toRgbString();
      
      // detect if output color is light or dark
	  if (color.isLight()) {
        document.querySelector('.svgcolor').setAttribute('fill', darkHeading);
      } else {
        document.querySelector('.svgcolor').setAttribute('fill', lightHeading);
      }
    } else {
      output.value = "No valid color detected!";
      localStorage.setItem("outputVal", output.value);
    }
    return false;
  } else {
    return false;
  }
}
initializeLocalStorage();
colorConverstion();

// changes color output
btn.onclick = function() {
  if (this.textContent === "RGB") {
    this.textContent = "HSL";
    localStorage.setItem("convertTo", this.textContent);
  } else if (this.textContent === "HSL") {
    this.textContent = "HEX";
    localStorage.setItem("convertTo", this.textContent);
  } else if (this.textContent === "HEX") {
    this.textContent = "RGB";
    localStorage.setItem("convertTo", this.textContent);
  }
  colorConverstion();
};

// convert color from input
input.onkeyup = function() {
  colorConverstion();
};

// do not change output text
output.onkeydown = function(e) {
  e.preventDefault();
};
// select all text in output onclick
output.onclick = function(e) {
  this.select();
};
