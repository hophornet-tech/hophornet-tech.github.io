document.addEventListener("DOMContentLoaded", () => {
  const blogCards = document.querySelectorAll('.blog-card');
  const expandContainer = document.getElementById('expanded-blog');
  const titleTarget = document.getElementById('expanded-title');
  const blogContent = expandContainer.querySelector('.blog-content');
  let lastFocusedElement = null;

  // Open expanded blog modal on click or Enter/Space key
  blogCards.forEach(card => {
    card.addEventListener('click', () => openBlog(card));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        openBlog(card);
      }
    });
  });

  // Function to open modal and set focus
  function openBlog(card) {
    lastFocusedElement = document.activeElement;
    titleTarget.textContent = card.dataset.title || "Blog Details";
    expandContainer.classList.remove('hidden');
    expandContainer.setAttribute('aria-hidden', 'false');
    // Focus first focusable element in modal or modal itself
    blogContent.focus();
    // Optionally populate more blog details here
  }

  // Close modal function
  function closeBlog() {
    expandContainer.classList.add('hidden');
    expandContainer.setAttribute('aria-hidden', 'true');
    // Return focus to last focused blog card
    if (lastFocusedElement) lastFocusedElement.focus();
  }

  // Close on clicking outside blog content
  expandContainer.addEventListener('click', e => {
    if (!e.target.closest('.blog-content')) {
      closeBlog();
    }
  });

  // Close on close button click (if button with .close-btn added)
  blogContent.querySelector('.close-btn')?.addEventListener('click', closeBlog);

  // Close on Escape key press when modal is open
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !expandContainer.classList.contains('hidden')) {
      closeBlog();
    }
  });
});
