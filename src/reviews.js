//  using import instead of require ensures tree shaking and reduces build size
// (because import doesn't support hot module reload)
import {config, dom, library} from '@fortawesome/fontawesome-svg-core';
import {faClock, faEnvelope, faMapMarkerAlt, faPhoneAlt, faUser, faStar} from '@fortawesome/free-solid-svg-icons';
import {faStar as faStarRegular} from '@fortawesome/free-regular-svg-icons';
import {burgerSetup, setupFormModal, setupFormSubmission} from "./ui-helpers";

require('./customstyle.scss');
require('./browserconfig.xml');
require('./site.webmanifest');


// TODO move to separate files
document.addEventListener('DOMContentLoaded', () => {
    fontawesomeSetup();
    burgerSetup();
    setupFormModal(2);
    setupFormSubmission(); //!!! todo ADD MAIL PHP TO SERVER
});

function fontawesomeSetup() {
    config.autoReplaceSvg = true;
    library.add(faEnvelope, faPhoneAlt, faClock, faMapMarkerAlt, faUser, faStar, faStarRegular);
    dom.i2svg(); // replace all i tags with svg font awesome icons
}
