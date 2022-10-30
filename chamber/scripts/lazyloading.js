const images = document.querySelectorAll("img[data-src]");
function preloadImage(img) {
    const src = img.getAttribute("data-src");
    if (!src) {
        return;
    }
    img.src = src;
    img.onload = () => {img.removeAttribute('data-src')};
}

const imgOptions = {
    threshhold: .5,
    rootMargin: "0px 0px 0px 0px"
};

console.log("is this working?");

if('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver((entries, imgObserver) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            } else {
                preloadImage(entry.target);
                imgObserver.unobserve(entry.target);
            }
        });
    }, imgOptions);

    images.forEach(image => {
        imgObserver.observe(image);
    });
} else {
    images.forEach((img) => {
        preloadImage(img);
    })
}
