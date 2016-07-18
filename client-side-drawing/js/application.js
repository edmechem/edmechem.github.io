$(document).ready(function() {
  mode = tabClick();
  canvasClick();
});

function tabClick() {
  var activeTab = $("li.active > a").attr('href');
  $(activeTab).show();

  $("li a").on("click", function(event){
    event.preventDefault();

    $("li.active").removeClass("active");
    $(this).parent().addClass("active");

    mode = $(this).attr('href').slice(1);
    return mode;
  })
}

clicks = [];
colorVals = ["00", "11", "22", "33", "44", "55", "66", "77", "88", "99", "AA", "BB", "CC", "DD", "EE", "FF"];

function canvasClick() {
  $('body').on('click', '#canvas', function(event) {
    if (typeof mode == 'undefined') {mode = 'twoclickrects'};
    if (mode == "twoclickrects") {
      twoclickrects(event);
    } else if (mode == "dragrects") {
      dragrects(event);
    } else if (mode == "somethingelse") {
      somethingelse(event);
    };
  })
}

function twoclickrects(event) {
  event.preventDefault();
  theCanvas = $('#canvas')[0];
  theContext = theCanvas.getContext("2d");
  var theClick = event.originalEvent;

  var xLoc = theClick.layerX;
  var yLoc = theClick.layerY;
  var clickLoc = {xLoc, yLoc};
  clicks.push(clickLoc);

  if (clicks.length >= 2) {
    var click2 = clicks.pop();
    var click1 = clicks.pop();
    grabAndDrawLastTwoClicks(click1, click2);
  };
}

function dragrects(theClick) {
  // do something, eventually
}

function somethingelse(theClick) {
  // do something, eventually
}

function grabAndDrawLastTwoClicks(click1, click2) {
  var x1 = click1["xLoc"];
  var y1 = click1["yLoc"];
  var x2 = click2["xLoc"];
  var y2 = click2["yLoc"];

  if (x2 >= x1) {
    x = x1;
    width = (x2 - x1);
  } else {
    x = x2;
    width = (x1 - x2);
  }

  if (y2 >= y1) {
    y = y1;
    height = (y2 - y1);
  } else {
    y = y2;
    height = (y1 - y2);
  }

  drawBox(x, y, width, height)
}

function drawBox(x, y, width, height) {
  var color1 = randomColor();
  var color2 = randomColor();

  if (height >= width) {
    var fillRect = [0, 0, 0, height];
  } else {
    var fillRect = [0, 0, width, 0];
  }

  var theGradient = theContext.createLinearGradient(fillRect[0], fillRect[1], fillRect[2], fillRect[3]);
  theGradient.addColorStop(0, color1);
  theGradient.addColorStop(1, color2);
  theContext.fillStyle = theGradient;
  theContext.fillRect(x, y, width, height);
}

function randomColor() {
  var redVal = colorVals[Math.floor(Math.random() * colorVals.length)];
  var greenVal = colorVals[Math.floor(Math.random() * colorVals.length)];
  var blueVal = colorVals[Math.floor(Math.random() * colorVals.length)];
  return "#" + redVal + greenVal + blueVal;
}


function randomOrientation() {
  return orientations[Math.floor(Math.random() * orientations.length)];
}




// function randomColor() {
//   return colors[Math.floor(Math.random() * colors.length)];
// }

// colors = ["AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGrey", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "DarkOrange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Grey", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSlateGrey", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "RebeccaPurple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen"];
