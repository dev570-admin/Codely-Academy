const siteHeader = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const testimonialTrack = document.getElementById("testimonialTrack");
const testimonialCards = testimonialTrack ? Array.from(testimonialTrack.children) : [];
const dotsContainer = document.getElementById("sliderDots");
const mockTrack = document.getElementById("mockTestTrack");
const mockCards = mockTrack ? Array.from(mockTrack.children) : [];
const mockDotsContainer = document.getElementById("mockTestDots");
let testimonialPage = 0;
let mockPage = 0;

function updateHeader() {
    siteHeader.classList.toggle("scrolled", window.scrollY > 12);
}

function closeMenu() {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
}

function visibleTestimonials() {
    return window.innerWidth <= 575 ? 2 : 4;
}

function updateTestimonials() {
    if (!testimonialTrack || testimonialCards.length === 0) return;
    const visible = visibleTestimonials();
    const viewport = testimonialTrack.parentElement;
    const cardWidth = testimonialCards[0].getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(testimonialTrack).gap) || 0;
    const step = (cardWidth + gap) * visible;
    const maxOffset = Math.max(0, testimonialTrack.scrollWidth - viewport.clientWidth);
    const pages = Math.max(1, Math.ceil(maxOffset / step) + 1);
    testimonialPage = Math.min(testimonialPage, pages - 1);
    const offset = Math.min(testimonialPage * step, maxOffset);
    testimonialTrack.style.transform = `translateX(-${offset}px)`;
    dotsContainer.innerHTML = Array.from({ length: pages }, (_, index) =>
        `<button type="button" aria-label="Show testimonial group ${index + 1}" class="${index === testimonialPage ? "active" : ""}"></button>`
    ).join("");
    dotsContainer.querySelectorAll("button").forEach((button, index) => {
        button.addEventListener("click", () => {
            testimonialPage = index;
            updateTestimonials();
        });
    });
}

function visibleMockTests() {
    if (window.innerWidth <= 575) return 1;
    if (window.innerWidth <= 991) return 2;
    return 3;
}

function updateMockTests() {
    if (!mockTrack || mockCards.length === 0) return;

    const visible = visibleMockTests();
    const viewport = mockTrack.parentElement;
    const cardWidth = mockCards[0].getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(mockTrack).gap) || 0;
    const step = (cardWidth + gap) * visible;
    const maxOffset = Math.max(0, mockTrack.scrollWidth - viewport.clientWidth);
    const pages = Math.max(1, Math.ceil(maxOffset / step) + 1);

    mockPage = Math.min(mockPage, pages - 1);
    const offset = Math.min(mockPage * step, maxOffset);
    mockTrack.style.transform = `translateX(-${offset}px)`;

    mockDotsContainer.innerHTML = Array.from({ length: pages }, (_, index) =>
        `<button type="button" aria-label="Show mock test group ${index + 1}" class="${index === mockPage ? "active" : ""}"></button>`
    ).join("");

    mockDotsContainer.querySelectorAll("button").forEach((button, index) => {
        button.addEventListener("click", () => {
            mockPage = index;
            updateMockTests();
        });
    });
}

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
});
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
document.getElementById("testimonialPrev").addEventListener("click", () => {
    testimonialPage = Math.max(0, testimonialPage - 1);
    updateTestimonials();
});
document.getElementById("testimonialNext").addEventListener("click", () => {
    testimonialPage += 1;
    updateTestimonials();
});
document.getElementById("mockTestPrev").addEventListener("click", () => {
    mockPage = Math.max(0, mockPage - 1);
    updateMockTests();
});
document.getElementById("mockTestNext").addEventListener("click", () => {
    mockPage += 1;
    updateMockTests();
});
window.addEventListener("scroll", updateHeader);
window.addEventListener("resize", () => {
    updateTestimonials();
    updateMockTests();
});
updateHeader();
updateTestimonials();
updateMockTests();
