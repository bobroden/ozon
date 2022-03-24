export class Progress {
    spinner = document.querySelector('.progress__spinner');
    inputOfValue = document.querySelector('.progress__input');
    animateCheckbox = document.querySelector('.progress__checkbox-animate');
    hideCheckbox = document.querySelector('.progress__checkbox-hide');

    fillCircle = document.querySelector('.progress__svg-fill');
    
    constructor() {
        this.value = (+localStorage.getItem('value')) ? +localStorage.getItem('value') : 25;
        this.isAnimated = (localStorage.getItem('isAnimated') === 'false') ? false : true;
        this.isHidden = (localStorage.getItem('isHidden') === 'true') ? true : false;

        let radius = this.fillCircle.r.animVal.value;
        this.circleLength = Math.PI * radius * 2;

        this.fillCircle.style.strokeDasharray = this.circleLength;
        this.fillCircle.style.strokeDashoffset = this.circleLength;

        this.setAll(this.value, this.isAnimated, this.isHidden);
        this.inputOfValue.value = this.value;

        this.inputOfValue.addEventListener('input', (event) => {
            this.setMod('normal', event.target.value);
        })

        document.querySelector('.progress__controllers-animate').addEventListener('click', () => {
            if(this.isAnimated)
                this.setMod('animated', false);
            else
                this.setMod('animated', true);
        })

        document.querySelector('.progress__controllers-hide').addEventListener('click', () => {
            if(this.isHidden)
                this.setMod('hidden', false);
            else
                this.setMod('hidden', true);
        })
    }

    setMod(mode, value) {
        if(mode === 'normal') {
            this.setValue(+value);
        }
        else if(mode === 'animated') {
            this.changeAnimation(value);
        }
        else if(mode === 'hidden') {
            this.changeHidden(value);
        }
    }

    setValue(value) {
        if(value > 100) {
            value = 100;
            this.inputOfValue.value = value;
        }
        else if(isNaN(value) || value < 0) {
            value = 0;
            this.inputOfValue.value = value;
        }
        let arcLength = ((100 - value) / 100) * this.circleLength;
        this.fillCircle.style.strokeDashoffset = arcLength;

        localStorage.setItem('value', value);
    }

    changeAnimation(value) {
        if(value) {
            this.isAnimated = true;
            this.spinner.classList.remove('progress__spinner_paused');
            this.animateCheckbox.classList.add('progress__checkbox_checked');
        }
        else {
            this.isAnimated = false;
            this.spinner.classList.add('progress__spinner_paused');
            this.animateCheckbox.classList.remove('progress__checkbox_checked');
        }

        localStorage.setItem('isAnimated', this.isAnimated);
    }

    changeHidden(value) {
        if(value) {
            this.isHidden = true;
            this.spinner.classList.add('progress__spinner_invisible');
            this.hideCheckbox.classList.add('progress__checkbox_checked');
        }
        else {
            this.isHidden = false;
            this.spinner.classList.remove('progress__spinner_invisible');
            this.hideCheckbox.classList.remove('progress__checkbox_checked');
        }

        localStorage.setItem('isHidden', this.isHidden);
    }

    setAll(value, isAnimated, isHidden) {
        this.setValue(value);
        this.changeAnimation(isAnimated);
        this.changeHidden(isHidden);
    }
}