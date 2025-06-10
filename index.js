// import './assets/components/EveryLayout/import_all.js';

import { registerAvatarComponent } from './assets/components/avatar/avatar.js';
const app = () => {
    registerAvatarComponent();
}
document.addEventListener('DOMContentLoaded', app);