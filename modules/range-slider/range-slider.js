let minValueSlider = document.querySelector('.range-slider__min-value-slider');
minValueSlider.onmousedown = onMouseDownMinValueSlider;

function onMouseDownMinValueSlider() {
    // document.body.appendChild(this);
    // this.style.zIndex = 1000;
    // moveSlider(this)

    document.onmouseup = function() {
        document.onmousemove = null;
        this.onmouseup = null;
    }

    document.onmousemove = () => moveSlider(this);
}

function moveSlider(slider) {
    console.dir(slider.style.left);
    slider.style.left = event.pageX + 'px';
}