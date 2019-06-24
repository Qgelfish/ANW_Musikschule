const stickyFooter = document.getElementById('stickyFooter');
const homeLink = document.getElementById('homeLink');
const loginButton = document.getElementById('loginButton');
const closeModal = document.getElementById('closeModal');
const modal = document.getElementById('loginModal');

const screenHeight = window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;

window.addEventListener('scroll', (event) => {
    var screenDistance = window.pageYOffset;

    if(screenDistance === 0) {
        stickyFooter.classList.remove('sticky');
    }

    if(screenDistance > screenHeight) {
        stickyFooter.classList.add('sticky');
    }
});

homeLink.addEventListener('click', (event) => {
    stickyFooter.classList.remove('sticky');
})

loginButton.addEventListener('click', function() {
    modal.style.display = 'block';
  })
  
  closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
  })
  
  window.onclick = function(event) {
    if(event.target == modal) {
      modal.style.display = 'none';
    }
  }