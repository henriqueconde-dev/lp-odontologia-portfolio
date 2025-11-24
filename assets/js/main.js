import { initCardAnimations, initModalHandlers } from './animation.js';
import { initTestimonialCarousel } from './testimonial.js';
import { initFormHandler } from "./form.handler.js";

document.addEventListener('DOMContentLoaded', () => {
    initCardAnimations();  
    initModalHandlers();   
    initTestimonialCarousel();
    initFormHandler();
});