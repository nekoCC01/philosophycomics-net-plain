// import './00_assets/components/EveryLayout/import_all.js';

console.log("index.js loaded");

import { registerFooterComponent } from './00_assets/components/Footer.js';
const app = () => {
    registerFooterComponent();
}
document.addEventListener('DOMContentLoaded', app);