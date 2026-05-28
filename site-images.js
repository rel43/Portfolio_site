(() => {
  const cacheBust = new URLSearchParams(window.location.search).has("fresh");

  const placeholderFor = (text) => {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="900" height="1200" viewBox="0 0 900 1200">
        <defs>
          <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stop-color="#f7eff2"/>
            <stop offset="1" stop-color="#ded8d6"/>
          </linearGradient>
        </defs>
        <rect width="900" height="1200" rx="54" fill="url(#bg)"/>
        <circle cx="450" cy="520" r="72" fill="#f28aa9" opacity=".42"/>
        <path d="M330 675h240M370 735h160" stroke="#c94d75" stroke-width="22" stroke-linecap="round" opacity=".5"/>
        <text x="450" y="850" text-anchor="middle" font-family="Arial, sans-serif" font-size="44" font-weight="700" fill="#161616">${text}</text>
      </svg>
    `.trim();

    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  };

  document.querySelectorAll("img[data-local-src]").forEach((img) => {
    const localSrc = img.dataset.localSrc;
    const fallbackSrc = img.dataset.fallback || img.getAttribute("src");
    const placeholderSrc = placeholderFor(img.alt || "Image");
    let step = 0;

    if (!localSrc) return;

    img.addEventListener("error", () => {
      step += 1;

      if (step === 1 && fallbackSrc && img.getAttribute("src") !== fallbackSrc) {
        img.src = fallbackSrc;
        return;
      }

      if (img.getAttribute("src") !== placeholderSrc) {
        img.src = placeholderSrc;
      }
    });

    img.src = cacheBust
      ? `${localSrc}${localSrc.includes("?") ? "&" : "?"}v=${Date.now()}`
      : localSrc;
  });
})();
