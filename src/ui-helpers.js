/*
const imagePath = './images/';
require(`${imagePath}android-chrome-192x192.png`);
require(`${imagePath}android-chrome-384x384.png`);
require(`${imagePath}apple-touch-icon.png`);
require(`${imagePath}favicon-16x16.png`);
require(`${imagePath}favicon-32x32.png`);
require(`${imagePath}favicon.ico`);
require(`${imagePath}mstile-150x150.png`);
require(`${imagePath}safari-pinned-tab.svg`);*
*/

const modalContactFormElements = ['name', 'phone', 'message'];

export function burgerSetup () {
    const $navbarBurger = document.querySelector('.navbar-burger');
    if ($navbarBurger)
        $navbarBurger.addEventListener('click', () => {
            const $target = document.getElementById($navbarBurger.dataset.target);
            $navbarBurger.classList.toggle('is-active');
            $target.classList.toggle('is-active');
        });
}

export function setupServicesModals () {
    const modals = ['disinfection', 'disinsection', 'deratization', 'acaricide', 'deodorization'];
    modals.forEach(modal => {
        const $open = document.getElementById(`modal-${modal}-open`);
        const $close = document.getElementById(`modal-${modal}-close`);
        $open.addEventListener('click', () => toggleCardModal(`modal-${modal}`));
        $close.addEventListener('click', () => toggleCardModal(`modal-${modal}`));
    });
}

export function setupFormModal (buttonsCount) {
    const buttonIds = Array.from(new Array(buttonsCount), (val, index) => `form-open-${index}`);
    document.getElementById('contacts-form').reset();
    const closeEvent = () => {
        toggleCardModal('modal-form');
        document.getElementById('contacts-form').reset();
        const $button = document.querySelector('#form-submit');
        $button.disabled = false;

        //clear form errors
        $button.classList.remove('is-danger');
        modalContactFormElements.forEach(element => {
            const $element = document.querySelector(`#form-submit-${element}`);
            const $helpElement = document.querySelector(`#form-submit-${element}-help`);
            $element.classList.remove('is-danger');
            $helpElement.textContent='';
        });
        const $submitStatus = document.querySelector('#form-submit-help');
        $submitStatus.classList.remove('is-danger');
        $submitStatus.classList.remove('is-success');
        $submitStatus.textContent = '\u200D';
    };
    buttonIds.forEach(buttonId => {
        const $button = document.getElementById(buttonId);
        $button.addEventListener('click', () => toggleCardModal('modal-form'));
    });
    const $close = document.getElementById('modal-form-close');
    $close.addEventListener('click', closeEvent);
}

export function setupFormSubmission (idsEnding="") {
    function submitSuccess (request, $button, $submitStatus) {
        $button.disabled = true;
        $submitStatus.textContent = 'Успешно отправлено';
        $submitStatus.classList.remove('is-danger');
        $submitStatus.classList.add('is-success');
    }

    function submitError (request, $button, $submitStatus) {
        $button.disabled = false;
        $submitStatus.textContent = 'Ошибка! Попробуйте еще раз';
        $submitStatus.classList.remove('is-success');
        $submitStatus.classList.add('is-danger');
    }

    function formSubmitEvent (event) {
        event.preventDefault();
        const $button = document.querySelector(`#form-submit${idsEnding}`);
        const $submitStatus = document.querySelector(`#form-submit-help${idsEnding}`);
        const url = 'https://nasekomoff.com/mail.php';
        const request = new XMLHttpRequest();
        const formData = new FormData();
        let isFormValid = true;
        modalContactFormElements.forEach(element => {
            const $element = document.querySelector(`#form-submit-${element}${idsEnding}`);
            const $helpElement = document.querySelector(`#form-submit-${element}-help${idsEnding}`);
            const isValid = $element.checkValidity();
            if (isValid) {
                $element.classList.remove('is-danger');
                $helpElement.textContent = '';
                formData.append($element.getAttribute('name'), ($element.value || 'Не указано'));
            } else {
                $element.classList.add('is-danger');
                $helpElement.textContent = $element.validationMessage;
            }
            isFormValid = isFormValid && isValid;
        });
        if (!isFormValid)
            return;
        request.onload = function () {
            if (request.status === 200)
                submitSuccess(request, $button, $submitStatus);
            else
                submitError(request, $button, $submitStatus);
        };
        request.onerror = function () { // request failed
            submitError(request, $button, $submitStatus);
        };
        request.open('POST', url, true);
        request.send(formData); // create FormData from form that triggered event
        $submitStatus.classList.remove('is-success');
        $submitStatus.classList.remove('is-danger');
        $submitStatus.textContent = 'Отправляем заявку...';
        return false;
    }
    document.getElementById(`form-submit${idsEnding}`).addEventListener('click', formSubmitEvent);
}

// move to modal class
// card should contain content inside modal-card-body
export function toggleCardModal (modalId) {
    const $target = document.getElementById(modalId);
    $target.classList.toggle('is-active');
    const $content = $target.getElementsByClassName('modal-card-body')[0];
    $content.scrollTop = 0;
    document.getElementsByTagName('html')[0].classList.toggle('is-clipped'); // to remove scroll
}