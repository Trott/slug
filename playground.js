const form = document.getElementById("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (form === null) {
    console.error("form element not found");
    return;
  }

  const fd = new FormData(form);

  const [replacement, lowercase, trim, fallback] = Array.from(fd.values());

  const opts = {};

  if (replacement.length > 0) {
    opts.replacement = replacement;
  }

  opts.lower = lowercase !== undefined;

  opts.trim = trim !== undefined;

  opts.fallback = fallback !== undefined;

  const output = slug(document.getElementById("input").value, opts);
  document.getElementById("slugOutput").innerHTML = output;
});
