window.addEventListener('scroll', () => {
  const perfume = document.querySelector('.perfume');
  const scrollY = window.scrollY;

  // Movimiento suave basado en scroll (ajustable)
  const translateY = scrollY * 0.2; // velocidad
  const rotate = scrollY * 0.1; // rotación

  perfume.style.transform = `translateY(${translateY}px) rotate(${rotate}deg)`;
});
