(() => {
  const routes = {
    "about me": "index.html#about",
    skills: "chet.html",
    interests: "dva.html",
  };

  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".tabs .tab").forEach((button) => {
    const key = button.textContent.trim().toLowerCase();
    const target = routes[key];

    if (!target) return;

    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();

      const [targetPage, targetHash] = target.split("#");
      const isSamePage = currentPage === targetPage || currentPage === "index.html" && targetPage === "index.html" || !currentPage && targetPage === "index.html";

      if (isSamePage && targetHash) {
        document.getElementById(targetHash)?.scrollIntoView({ behavior: "smooth" });
        return;
      }

      window.location.href = target;
    });
  });
})();
