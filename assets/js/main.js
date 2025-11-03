import { initCardAnimations, initModalHandlers } from './animation.js';
import { initTestimonialCarousel } from './testimonial.js';

document.addEventListener('DOMContentLoaded', () => {
    initCardAnimations();  
    initModalHandlers();   
    initTestimonialCarousel();
});