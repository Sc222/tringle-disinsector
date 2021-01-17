import {config, dom, library} from "@fortawesome/fontawesome-svg-core";
import {faClock, faEnvelope, faMapMarkerAlt, faPhoneAlt} from "@fortawesome/free-solid-svg-icons";

require('./customstyle.scss');
require('./browserconfig.xml');
require('./site.webmanifest');

document.addEventListener('DOMContentLoaded', () => {
    fontawesomeSetup();
});

function fontawesomeSetup() {
    config.autoReplaceSvg = true;
    library.add(faEnvelope, faPhoneAlt, faClock, faMapMarkerAlt);
    dom.i2svg(); // replace all i tags with svg font awesome icons
}