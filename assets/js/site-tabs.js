(() => {
  const isNestedPage = window.location.pathname.split("/").includes("pages");
  const rootPrefix = isNestedPage ? "../" : "";
  const routes = {
    "about me": `${rootPrefix}index.html#about`,
    skills: `${rootPrefix}pages/chet.html`,
    interests: `${rootPrefix}pages/dva.html`,
  };

  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".tabs .tab").forEach((button) => {
    const key = button.textContent.trim().toLowerCase();
    const target = routes[key];

    if (!target) return;

    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();

      const targetUrl = new URL(target, window.location.href);
      const isSamePage = window.location.pathname === targetUrl.pathname;

      if (isSamePage && targetUrl.hash) {
        document.querySelector(targetUrl.hash)?.scrollIntoView({ behavior: "smooth" });
        return;
      }

      window.location.href = targetUrl.href;
    });
  });
})();
