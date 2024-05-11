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

  const remove = fd.get('remove')
  const regexG = fd.get('regex_g') === null ? '' : 'g'
  const regexI = fd.get('regex_i') === null ? '' : 'i'

  const opts = {}

  if (replacement.length > 0) {
    opts.replacement = replacement
  }

  if (remove !== null && remove.length > 0) {
    const regex = new RegExp(`/${remove}/${regexG}${regexI}`)
    opts.remove = regex
  }

  opts.lower = lowercase !== null

  opts.trim = trim !== null

  opts.fallback = fallback !== null

  const output = window.slug(document.getElementById('input').value, opts)
  document.getElementById('slugOutput').innerText = output
})
