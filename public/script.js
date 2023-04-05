const myText = document.getElementById('my-text')
const myImage = document.getElementById('my-image')

myText.addEventListener('click', function () {
  myImage.style.display = 'block'
})

myImage.addEventListener('click', function () {
  myImage.style.display = 'none'
})
