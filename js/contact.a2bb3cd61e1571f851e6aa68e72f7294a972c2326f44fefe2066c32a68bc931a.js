(() => {
  // <stdin>
  (function() {
    "use strict";
    const form = document.querySelector(".contact-form");
    const button = form.querySelector("[type=submit]");
    const action = form.getAttribute("data-protect");
    const activateForm = function() {
      form.setAttribute("action", action);
      button.removeAttribute("disabled");
    };
    form.classList.remove("hidden");
    document.body.addEventListener("mousemove", activateForm, { once: true });
    document.body.addEventListener("touchmove", activateForm, { once: true });
    document.body.addEventListener("keydown", function(e) {
      if (e.key === "Tab" || e.key === "Enter") {
        activateForm();
      }
    }, { once: true });
    button.addEventListener("click", () => form.classList.add("js-submitted"));
    if (location.search.substring(1) !== "") {
      switch (location.search.substring(1)) {
        case "submitted":
          document.querySelector(".contact-submitted").classList.remove("hidden");
          break;
        case "error":
          document.querySelector(".contact-error").classList.remove("hidden");
          break;
      }
    }
  })();
})();
