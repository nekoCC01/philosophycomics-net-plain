import { registerAvatarComponent } from './components/avatar/avatar.js';
const app = async () => {
    await import('./components/EveryLayout/import_all.js');
    registerAvatarComponent();
}
document.addEventListener('DOMContentLoaded', app);