/**
* helper function to check whether an element has a specific class
* @param {HTMLElement} el the element
* @param {string} className the class
* @return {boolean} whether the element has the class
*/
function hasClass(el, className) {
    return el.classList ? el.classList.contains(className) : new RegExp('\\b' + className + '\\b').test(el.className);
}

/**
* helper function to add a class to an element
* @param {HTMLElement} el the element
* @param {string} className the class
*/
function addClass(el, className) {
    if (el.classList) {
        el.classList.add(className);
    } else if (!hasClass(el, className)) {
        el.className += ' ' + className;
    }
}

var imgContainers;
var len;

if (!Modernizr.objectfit) {
    imgContainers = document.querySelectorAll('.entry__image');
    len = imgContainers.length;

    for (var i = 0; i < len; i++) {
        var $container = imgContainers[i],
            imgUrl = $container.querySelector('img').getAttribute('src');
        if (imgUrl) {
            $container.style.backgroundImage = 'url(' + imgUrl + ')';
            addClass($container, 'compat-object-fit');
        }
    }
}


$("input[type=range]")
    .on("input", function(e) {
        var min = e.target.min,
            max = e.target.max,
            val = e.target.value;

        $(e.target).css({
            backgroundSize: ((val - min) * 100) / (max - min) + "% 100%"
        });
    })
    .trigger("input");



function trimSvgWhitespace() {

    // get all SVG objects in the DOM
    var svgs = document.getElementsByTagName("svg");

    // go through each one and add a viewbox that ensures all children are visible
    for (var i = 0, l = svgs.length; i < l; i++) {

        var svg = svgs[i],
            box = svg.getBBox(), // <- get the visual boundary required to view all children
            viewBox = [box.x, box.y, box.width, box.height].join(" ");

        // set viewable area based on value above
        svg.setAttribute("viewBox", viewBox);
    }
}