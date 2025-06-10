// import './00_assets/components/EveryLayout/import_all.js';

import { registerAvatarComponent } from './00_assets/components/avatar/avatar.js';
const app = () => {
    registerAvatarComponent();
}
document.addEventListener('DOMContentLoaded', app);