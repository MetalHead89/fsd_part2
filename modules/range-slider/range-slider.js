let minValueSlider = document.querySelector('.range-slider__min-value-slider');
minValueSlider.onmousedown = onMouseDownMinValueSlider;

function onMouseDownMinValueSlider() {
    if (this.style.left === '')
        this.style.left = '0px';
    
    let xOffset = event.pageX - parseInt(this.style.left);

    document.onmouseup = function() {
        document.onmousemove = null;
        this.onmouseup = null;
    }

    document.onmousemove = () => moveSlider(this, xOffset);
}

function moveSlider(slider, offset) {
    let shift = event.pageX - offset;
    let parent = slider.parentElement;
    console.dir(slider)

    if (shift >= 0 && shift <= parent.offsetWidth - slider.offsetWidth - slider.clientLeft)
        slider.style.left = shift + 'px';
}