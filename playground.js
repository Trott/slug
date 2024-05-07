const form = document.getElementById("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (form === null) {
    console.error("form element not found");
    return;
  }

  const fd = new FormData(form);

  const [replacement, remove, regex_g, regex_i, lowercase, trim, fallback] =
    Array.from(fd.values());

  const opts = {};

  if (replacement.length > 0) {
    opts.replacement = replacement;
  }

  try {
    if (regex_g !== undefined) {
    }
    const regex = new RegExp(
      remove,
      `${regex_g !== undefined ? "g" : ""}${regex_i !== undefined ? "i" : ""}`
    );
    opts.remove = regex;
  } catch (err) {
    console.error(err);
  }

  opts.lower = lowercase !== undefined;

  opts.trim = trim !== undefined;

  opts.fallback = fallback !== undefined;

  const output = slug(document.getElementById("input").value, opts);
  document.getElementById("slugOutput").innerHTML = output;
});
