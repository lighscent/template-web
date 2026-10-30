(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var menuBtn = document.getElementById('menu-btn')
    var navMenu = document.getElementById('nav-menu')
    if (menuBtn && navMenu) {
      menuBtn.addEventListener('click', function () {
        var isHidden = navMenu.classList.contains('hidden')
        if (isHidden) {
          navMenu.classList.remove('hidden')
          navMenu.classList.add('flex', 'flex-col')
          menuBtn.innerHTML = '&#10005;'
        } else {
          navMenu.classList.add('hidden')
          navMenu.classList.remove('flex', 'flex-col')
          menuBtn.innerHTML = '&#9776;'
        }
      })
    }
  })
})()
