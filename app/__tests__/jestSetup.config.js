import localStorage from 'localStorage';
import { html } from 'snabbdom-jsx';


Object.assign(window, { localStorage });
global.html = html;
