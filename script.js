const sculpture = document.querySelector('#sculpture');
const glow = document.querySelector('.cursor-glow');
const reveals = document.querySelectorAll('.reveal');

window.addEventListener('pointermove', (event) => {
  if (glow) {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  }
  if (sculpture && window.innerWidth > 800) {
    const x = (event.clientX / window.innerWidth - 0.5) * 28;
    const y = (event.clientY / window.innerHeight - 0.5) * -22;
    sculpture.style.transform = `rotateX(${y - 20}deg) rotateY(${x + 35}deg) rotateZ(9deg)`;
  }
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach((element) => revealObserver.observe(element));

window.addEventListener('scroll', () => {
  const rotation = window.scrollY * 0.08;
  document.querySelectorAll('.orbital').forEach((orbital, index) => {
    orbital.style.transform = `rotateX(${65 + index * 3}deg) rotateZ(${rotation * (index % 2 ? -1 : 1)}deg)`;
  });
}, { passive: true });
