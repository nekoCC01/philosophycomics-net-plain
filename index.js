import { registerAvatarComponent } from './components/avatar/avatar.js';
const app = () => {
    registerAvatarComponent();
}
document.addEventListener('DOMContentLoaded', app);