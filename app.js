const modalTriggers = document.querySelectorAll('.modal-trigger');
const modal = document.querySelector('.modal');
const inputs = document.querySelectorAll('input[type=radio]');
const toggleMenu = document.getElementById('toggle-menu');
const forms = document.querySelectorAll('form');
const doneBtn = document.getElementById('btn-done');
const bookmarkBtn = document.getElementById('bookmark');
let totalMoney = 89914;
let totalBackers = 5007;


// Show modal
function showModal(e) {
   e.preventDefault();
   modal.classList.add('show');
}

// Hide modal
function closeModal(e) {
   if (e.target.matches('.modal') || this.id === 'close-modal' || this.id === 'btn-done') {
      modal.classList.remove('show');
      modal.querySelector('#modal-default').style.display = 'block';
      modal.querySelector('#modal-completed').style.display = 'none';
      inputs.forEach(input => {
         input.checked = false;
         input.closest('.card').classList.remove('selected');
      });
   };


}

// Active selected pledge
function activeSelected() {
   inputs.forEach(input => input.closest('.card').classList.remove('selected'));
   if (this.checked) {
      this.closest('.card').classList.add('selected');
   }
}

// Toggle mobile menu
function toggleMobileMenu() {
   this.classList.toggle('active');
   const img = this.querySelector('img');
   const mobileMenu = document.querySelector('.mobile-menu');

   if (this.classList.contains('active')) {
      img.src = './images/icon-close-menu.svg';
      mobileMenu.classList.add('show');
   } else {
      img.src = './images/icon-hamburger.svg';
      mobileMenu.classList.remove('show');
   }
}

// Sticky btn toggle / menu
function stickyMenu() {
   const headerHeight = document.querySelector('header').clientHeight;
   const scrollY = window.scrollY;

   if (scrollY > headerHeight) {
      toggleMenu.classList.add('sticky');
      toggleMenu.style.top = '25px';
      toggleMenu.style.right = '12px';
   } else {
      toggleMenu.classList.remove('sticky');
   }
}

// Update total money
function updateTotalMoney(money) {
   totalMoney += money;
   updateProgressBar(totalMoney);
   document.querySelector('#total-money').textContent = `$${numberFormat(totalMoney)}`;
}

// Format number
function numberFormat(totalMoney) {
   return new Intl.NumberFormat('en-US').format(totalMoney);
}

// Update Progress Bar
function updateProgressBar(width) {
   if (totalMoney > 100000) return;
   const percent = width.toLocaleString().replace(/,/, '.');
   const progressBar = document.querySelector('#progress-bar');
   progressBar.style.width = `${percent}%`;
}

// Update total backers
function updateTotalBackers() {
   totalBackers += 1;

   document.querySelector('#total-backers').textContent = numberFormat(totalBackers);
}

// Handle form
function handleForm(e) {
   e.preventDefault();
   const money = +this['money'].value;

   updateTotalMoney(money);
   updateTotalBackers();

   this.reset();

   modal.querySelector('#modal-default').style.display = 'none';
   modal.querySelector('#modal-completed').style.display = 'block';
}

// Toggle bookmarked
function toggleBookmarked() {
   this.classList.toggle('bookmarked');

   if (this.classList.contains('bookmarked')) {
      this.querySelector('p').textContent = 'Bookmarked';
   } else {
      this.querySelector('p').textContent = 'Bookmark';
   }
}

modalTriggers.forEach(modalTrigger => modalTrigger.addEventListener('click', showModal));
document.getElementById('close-modal').addEventListener('click', closeModal);
inputs.forEach(input => input.addEventListener('change', activeSelected));
modal.addEventListener('click', closeModal);
toggleMenu.addEventListener('click', toggleMobileMenu);
window.addEventListener('scroll', stickyMenu);
forms.forEach(form => form.addEventListener('submit', handleForm));
doneBtn.addEventListener('click', closeModal);
bookmarkBtn.addEventListener('click', toggleBookmarked);