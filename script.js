const output = document.getElementById('output');

/**
 * @param {DataTransfer} dataTransfer
 */
function showBase64UrlFromDataTransfer(dataTransfer) {
  [...dataTransfer.files].forEach(file => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', () => {
      const li = document.createElement('li');
      li.appendChild(
        document.createTextNode(`${file.name}: `)
      );
      li.appendChild(Object.assign(
        document.createElement('input'),
        { readonly: true, value: reader.result }
      ));
      li.addEventListener('click', () => {
        navigator.clipboard.writeText(reader.result).then(() => {
          li.className = 'copied';
        }).catch(() => {
          li.className = 'error';
        });
      });
      output.appendChild(li);
    })
  });
}

document.body.addEventListener('drop', e => {
  showBase64UrlFromDataTransfer(e.dataTransfer);
  e.preventDefault();
});
document.body.addEventListener('dragover', e => {
  e.preventDefault();
});
document.body.addEventListener('paste', e => {
  showBase64UrlFromDataTransfer(e.clipboardData);
});
