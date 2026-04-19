function loadVideo (element, videoId) {
  let iframe = document.createElement('iframe')
  iframe.setAttribute('src', 'https://www.youtube.com/embed/' + videoId + '?autoplay=1')
  iframe.setAttribute('frameborder', '0')
  iframe.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture')
  iframe.setAttribute('allowfullscreen', 'true')
  iframe.style.width = '100%'
  iframe.style.height = element.offsetHeight + 'px'
  element.innerHTML = ''
  element.style.backgroundImage = ''
  element.appendChild(iframe)
  element.onclick = null // Удалить обработчик клика после загрузки видео
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  window.loadVideo = loadVideo;
}
