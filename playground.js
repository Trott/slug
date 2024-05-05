const form = document.getElementById('form')

form.addEventListener('submit', function (e) {
  e.preventDefault()
  if (form === null) {
    console.error('form element not found')
    return
  }

  const fd = new FormData(form)

  const replacement = fd.get('replacement')
  const lowercase = fd.get('lowercase')
  const trim = fd.get('trim')
  const fallback = fd.get('fallback')

  const opts = {}

  if (replacement.length > 0) {
    opts.replacement = replacement
  }

  opts.lower = lowercase !== null

  opts.trim = trim !== null

  opts.fallback = fallback !== null

  const output = window.slug(document.getElementById('input').value, opts)
  document.getElementById('slugOutput').innerText = output
})
