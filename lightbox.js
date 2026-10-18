document.addEventListener('DOMContentLoaded', () => {
  const imageSelector = '.profilePic, .experienceFeature img, .timelineThumb img, .achievementCard img, .projectCard img';
  const overlay = document.createElement('div');
  overlay.className = 'lightboxOverlay';
  overlay.hidden = true;
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Expanded image preview');
  overlay.innerHTML = `
    <button class="lightboxClose" type="button" aria-label="Close image preview">&times;</button>
    <img class="lightboxImage" alt="">
  `;
  document.body.appendChild(overlay);

  const preview = overlay.querySelector('.lightboxImage');
  const closeButton = overlay.querySelector('.lightboxClose');
  let lastFocusedElement = null;

  function closeLightbox() {
    overlay.hidden = true;
    document.body.classList.remove('lightboxOpen');
    preview.removeAttribute('src');
    if (lastFocusedElement) lastFocusedElement.focus();
  }

  function openLightbox(image) {
    lastFocusedElement = document.activeElement;
    preview.src = image.currentSrc || image.src;
    preview.alt = image.alt || 'Expanded image';
    overlay.hidden = false;
    document.body.classList.add('lightboxOpen');
    closeButton.focus();
  }

  document.addEventListener('click', (event) => {
    const image = event.target.closest(imageSelector);
    if (image) {
      event.preventDefault();
      openLightbox(image);
      return;
    }

    if (event.target === overlay || event.target === closeButton) closeLightbox();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !overlay.hidden) closeLightbox();
  });
});
