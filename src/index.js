//  using import instead of require ensures tree shaking and reduces build size
// (because import doesn't support hot module reload)
import {config, dom, library} from '@fortawesome/fontawesome-svg-core';
import {faClock, faEnvelope, faMapMarkerAlt, faPhoneAlt, faUser, faStar, faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {burgerSetup, setupFormModal, setupFormSubmission} from "./ui-helpers";
import Glider from 'glider-js/glider.min';
//import Accordion from 'accordion-js';

require('./customstyle.scss');
require('./browserconfig.xml');
require('./site.webmanifest');

const imagePath = './images/';
require(`${imagePath}android-chrome-192x192.png`);
require(`${imagePath}android-chrome-384x384.png`);
require(`${imagePath}apple-touch-icon.png`);
require(`${imagePath}favicon-16x16.png`);
require(`${imagePath}favicon-32x32.png`);
require(`${imagePath}favicon.ico`);
require(`${imagePath}mstile-150x150.png`);
require(`${imagePath}safari-pinned-tab.svg`);

// certificates images
const certImages = [ // can't use variables because webpack won't pack this resources
  require('./images/cert_1.jpg'),
  require('./images/cert_2.jpg'),
  require('./images/cert_3.jpg'),
  require('./images/cert_4.jpg'),
  require('./images/cert_5.jpg'),
];


// TODO move to separate files
document.addEventListener('DOMContentLoaded', () => {
  carouselSetup();
  setupCertificatesModal();
  fontawesomeSetup();
  burgerSetup();
  setupFormModal(3);
  setupFormSubmission(); //!!! todo ADD MAIL PHP TO SERVER
});

function carouselSetup () {
  // eslint-disable-next-line no-new
  new Glider(document.querySelector('.glider'), {
    slidesToScroll: 'auto',
    slidesToShow: 'auto',
    itemWidth: 200,
    dots: '.dots',
    arrows: {
      prev: '.glider-prev',
      next: '.glider-next'
    }
  });
}

function fontawesomeSetup() {
  config.autoReplaceSvg = true;
  library.add(faEnvelope, faPhoneAlt, faClock, faMapMarkerAlt, faUser, faStar, faChevronLeft, faChevronRight);
  dom.i2svg(); // replace all i tags with svg font awesome icons
}

function setupCertificatesModal () {
  const certificates = certImages.map((v, i) => { return { id: `cert-${i + 1}`, img: v.default }; });

  certificates.forEach(certificate => {
    const $certificatePreview = document.getElementById(certificate.id);
    $certificatePreview.addEventListener('click', () => {
      toggleImageModal('modal-certificate', certificate.img);
    });
  });
  const $close = document.getElementById('modal-certificate-close');
  $close.addEventListener('click', () => toggleImageModal('modal-certificate'));
}

// move to modal class (don't pass imageSrc when modal is closing to set empty img)
function toggleImageModal (modalId, imageSrc = '') {
  const $target = document.getElementById(modalId);
  const $modalImage = $target.getElementsByClassName('modal-image')[0];
  $modalImage.src = imageSrc;
  $target.classList.toggle('is-active');

  document.getElementsByTagName('html')[0].classList.toggle('is-clipped'); // to remove scroll
}
