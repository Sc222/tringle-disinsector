//  using import instead of require ensures tree shaking and reduces build size
// (because import doesn't support hot module reload)
import {config, dom, library} from '@fortawesome/fontawesome-svg-core';
import {faClock, faEnvelope, faMapMarkerAlt, faPhoneAlt, faUser, faHome, faFileAlt} from '@fortawesome/free-solid-svg-icons';
import {burgerSetup, setupFormModal, setupFormSubmission} from "./ui-helpers";

require('./customstyle.scss');
require('./browserconfig.xml');
require('./site.webmanifest');

document.addEventListener('DOMContentLoaded', () => {
    fontawesomeSetup();
    burgerSetup();
    setupFormModal(2);
    setupFormSubmission(); //!!! todo ADD MAIL PHP TO SERVER
    setupFormSubmission('-contacts');
});

function fontawesomeSetup() {
    config.autoReplaceSvg = true;
    library.add(faEnvelope, faPhoneAlt, faClock, faMapMarkerAlt, faUser, faHome, faFileAlt);
    dom.i2svg(); // replace all i tags with svg font awesome icons
}
