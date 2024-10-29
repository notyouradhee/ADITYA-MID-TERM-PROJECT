
function scrollToAbout() {
    document.getElementById("about").scrollIntoView({ behavior: "smooth" });
}


const sections = document.querySelectorAll('.animate-on-scroll');
const options = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, options);

sections.forEach(section => {
    observer.observe(section);
});


document.addEventListener('DOMContentLoaded', () => {
    const btcPriceContainer = document.getElementById('btc-price');
    fetch('https://api.coindesk.com/v1/bpi/currentprice/BTC.json')
        .then(response => response.json())
        .then(data => {
            const price = data.bpi.USD.rate;
            btcPriceContainer.innerHTML = `1 BTC = $${price}`;
        })
        .catch(() => {
            btcPriceContainer.innerHTML = 'Unable to fetch Bitcoin price at the moment.';
        });
});

document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
    console.log('Form is submitted');
    fetch('https://formspree.io/f/mwpkvbrn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        })
    })
    .then(response => response.ok ? alert('Thank you for contacting LoomLink Technology! We will get back to you shortly.') : alert('Submission failed'))
    .catch(error => console.error('Error:', error));
});
