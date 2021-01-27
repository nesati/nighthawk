function compare(img1, img2) {
    // download images
    let downloaded = 0

    const div = document.createElement("div")
    div.className = "comparison"
    div.innerHTML = `
        <img class="img-right img-comp-overlay" src="` + img2.url + `">
        <div class="img-comp-overlap img-comp-overlay">
            <img class="img-left" src="` + img1.url + `">
        </div>`

    div.getElementsByClassName("img-right")[0].onload = download_progess
    div.getElementsByClassName("img-left")[0].onload = download_progess

    // create comparison title
    const title = document.createElement("h3")

    title.innerHTML = `
        Srovnání mezi lety
        <span id="img-right-year">` + img1.year + `</span>&nbsp;<sup>` + img1.attribution + `</sup>&nbsp;(vlevo) a
        <span id="img-left-year">` + img2.year + `</span>&nbsp;<sup>` + img2.attribution + `</sup>&nbsp;(vpravo)
    `

    document.getElementById("compare").appendChild(title)
    document.getElementById("compare").appendChild(div)

    function download_progess(e) {
        downloaded += 1
        if (downloaded === 2) {
            // update comparator
            resize()
        }
    }
}

function reset() {
    document.getElementById("compare").innerHTML = "";
}

function reset_slider() {
    /*remove all elements with an "img-comp-slider" class:*/
    const x = [].slice.call(document.getElementsByClassName("img-comp-slider"));
    x.forEach(el => {
        el.remove();
    });
}

function heightOffset(el) {
    el.parentElement.style.height = el.offsetHeight + "px"
}

function resize() {
    reset_slider()

    // setup resolutions
    let width = document.getElementById("compare").offsetWidth

    const x = [].slice.call(document.getElementsByClassName("comparison"));
    x.forEach(el => {
        const img = el.getElementsByClassName("img-right")[0]
        if (img.width < img.height) {
            width = Math.min(width, img.width / img.height  * 720)
        }

        el.getElementsByClassName("img-right")[0].style.width = width + "px"
        el.getElementsByClassName("img-left")[0].style.width = width + "px"
        el.getElementsByClassName("img-comp-overlap")[0].style.width = width + "px"
        el.style.width = width + "px"
        window.setTimeout(heightOffset.bind(this, el.getElementsByClassName("img-comp-overlap")[0]), 10)
    });

    const y = [].slice.call(document.getElementsByClassName("img-comp-overlap"));
    y.forEach(el => {
        /*once for each "overlay" element:
        pass the "overlay" element as a parameter when executing the compareImages function:*/
        compareImages(el)
    });

}

function compareImages(img) {
    var slider, img, clicked = 0, w, h;
    /*get the width and height of the img element*/
    w = img.offsetWidth;
    h = img.offsetHeight;
    /*set the width of the img element to 50%:*/
    img.style.width = (w / 2) + "px";
    /*create slider:*/
    slider = document.createElement("DIV");
    slider.setAttribute("class", "img-comp-slider");
    /*insert slider*/
    img.parentElement.insertBefore(slider, img);
    /*position the slider in the middle:*/
    slider.style.top = (h / 2) - (slider.offsetHeight / 2) + "px";
    slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";
    /*execute a function when the mouse button is pressed:*/
    slider.addEventListener("mousedown", slideReady);
    /*and another function when the mouse button is released:*/
    window.addEventListener("mouseup", slideFinish);
    /*or touched (for touch screens:*/
    slider.addEventListener("touchstart", slideReady);
    /*and released (for touch screens:*/
    window.addEventListener("touchend", slideFinish);

    function slideReady(e) {
        /*prevent any other actions that may occur when moving over the image:*/
        e.preventDefault();
        /*the slider is now clicked and ready to move:*/
        clicked = 1;
        /*execute a function when the slider is moved:*/
        window.addEventListener("mousemove", slideMove);
        window.addEventListener("touchmove", slideMove);
    }

    function slideFinish() {
        /*the slider is no longer clicked:*/
        clicked = 0;
    }

    function slideMove(e) {
        var pos;
        /*if the slider is no longer clicked, exit this function:*/
        if (clicked === 0) return false;
        /*get the cursor's x position:*/
        pos = getCursorPos(e)
        /*prevent the slider from being positioned outside the image:*/
        if (pos < 0) pos = 0;
        if (pos > w) pos = w;
        /*execute a function that will resize the overlay image according to the cursor:*/
        slide(pos);
    }

    function getCursorPos(e) {
        var a, x = 0;
        e = e || window.event;
        /*get the x positions of the image:*/
        a = img.getBoundingClientRect();
        /*calculate the cursor's x coordinate, relative to the image:*/
        if (e.type === "touchmove") {
            x = e.targetTouches[0].pageX - a.left;
        } else {
            x = e.pageX - a.left;
        }
        /*consider any page scrolling:*/
        x = x - window.pageXOffset;
        return x;
    }

    function slide(x) {
        /*resize the image:*/
        img.style.width = x + "px";
        /*position the slider:*/
        slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
    }
}