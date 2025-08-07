document.addEventListener('DOMContentLoaded', function() {
  // Flash card click to show flavors with animation
  document.querySelectorAll('.flash-card').forEach(card => {
    card.addEventListener('click', function() {
      const category = card.getAttribute('data-category');
      document.querySelectorAll('.menu .flavor-category').forEach(cat => {
        if (cat.querySelector('h3').textContent === category) {
          cat.classList.add('active');
        } else {
          cat.classList.remove('active');
        }
      });
      // Scroll to menu section
      document.getElementById('explore').scrollIntoView({ behavior: 'smooth' });
    });
  });

  document.querySelectorAll('.order-btn').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      const card = btn.closest('.flavor-card');
      const flavor = card ? card.querySelector('.flavor-title').textContent : 'this flavor';
      const name = prompt(`You are ordering ${flavor}.\nPlease enter your name:`);
      if (name) {
        const address = prompt('Please enter your delivery address:');
        if (address) {
          alert(`Thank you, ${name}! Your order for ${flavor} will be delivered to ${address}.`);
        } else {
          alert('Order cancelled: No address entered.');
        }
      } else {
        alert('Order cancelled: No name entered.');
      }
    });
  });

  // Smooth scroll to top button
  const scrollToTopBtn = document.getElementById('scrollToTopBtn');
  if (scrollToTopBtn) {
    window.addEventListener('scroll', function() {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopBtn.style.display = 'block';
      } else {
        scrollToTopBtn.style.display = 'none';
      }
    });

    scrollToTopBtn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }   

  // Mini Quiz Modal logic
  if (!document.getElementById('quiz-modal')) {
    // Create quiz modal
    const quizModal = document.createElement('div');
    quizModal.id = 'quiz-modal';
    quizModal.className = 'modal';
    quizModal.style.display = 'none';
    quizModal.style.position = 'fixed';
    quizModal.style.top = 0;
    quizModal.style.left = 0;
    quizModal.style.width = '100vw';
    quizModal.style.height = '100vh';
    quizModal.style.background = 'rgba(0,0,0,0.4)';
    quizModal.style.zIndex = 20000;
    quizModal.style.justifyContent = 'center';
    quizModal.style.alignItems = 'center';
    quizModal.style.display = 'flex';
    quizModal.innerHTML = `
      <div class="modal-content" style="background:#fff;padding:32px 24px 24px 24px;border-radius:18px;max-width:350px;margin:auto;box-shadow:0 4px 24px rgba(0,0,0,0.18);text-align:center;position:relative;">
        <span class="close" id="close-quiz" style="position:absolute;top:10px;right:18px;font-size:1.5rem;cursor:pointer;">&times;</span>
        <h2>Which Ice Cream Flavor Are You?</h2>
        <form id="quiz-form">
          <div style="margin-bottom:12px;">
            <label>Pick a mood:</label><br>
            <input type="radio" name="mood" value="happy" required> Happy<br>
            <input type="radio" name="mood" value="adventurous"> Adventurous<br>
            <input type="radio" name="mood" value="classic"> Classic<br>
          </div>
          <div style="margin-bottom:12px;">
            <label>Pick a color:</label><br>
            <input type="radio" name="color" value="yellow" required> Yellow<br>
            <input type="radio" name="color" value="pink"> Pink<br>
            <input type="radio" name="color" value="brown"> Brown<br>
          </div>
          <button type="submit" style="background:#f39c12;color:#fff;padding:10px 24px;border:none;border-radius:8px;font-size:1rem;font-weight:bold;cursor:pointer;">See My Flavor!</button>
        </form>
        <div id="quiz-result" style="margin-top:18px;font-weight:bold;"></div>
      </div>
    `;
    document.body.appendChild(quizModal);

    // Add floating quiz button
    const quizBtn = document.createElement('button');
    quizBtn.id = 'quiz-btn';
    quizBtn.textContent = 'Take the Quiz!';
    quizBtn.style.position = 'fixed';
    quizBtn.style.bottom = '100px';
    quizBtn.style.right = '32px';
    quizBtn.style.zIndex = 1000;
    quizBtn.style.background = '#b85c38';
    quizBtn.style.color = '#fff';
    quizBtn.style.padding = '14px 22px';
    quizBtn.style.border = 'none';
    quizBtn.style.borderRadius = '50px';
    quizBtn.style.fontSize = '1.1rem';
    quizBtn.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
    quizBtn.style.cursor = 'pointer';
    document.body.appendChild(quizBtn);

    // Quiz logic
    quizBtn.addEventListener('click', function() {
      quizModal.style.display = 'flex';
      quizModal.querySelector('#quiz-result').textContent = '';
      quizModal.querySelector('#quiz-form').reset();
    });
    quizModal.querySelector('#close-quiz').onclick = function() {
      quizModal.style.display = 'none';
    };
    quizModal.querySelector('#quiz-form').onsubmit = function(e) {
      e.preventDefault();
      var mood = quizModal.querySelector('input[name="mood"]:checked').value;
      var color = quizModal.querySelector('input[name="color"]:checked').value;
      var flavor = '';
      if (mood === 'happy' && color === 'yellow') flavor = 'Mango';
      else if (mood === 'happy' && color === 'pink') flavor = 'Strawberry';
      else if (mood === 'happy' && color === 'brown') flavor = 'Chocolate';
      else if (mood === 'adventurous' && color === 'yellow') flavor = 'Butterscotch';
      else if (mood === 'adventurous' && color === 'pink') flavor = 'Guava';
      else if (mood === 'adventurous' && color === 'brown') flavor = 'Brownie Fudge';
      else if (mood === 'classic' && color === 'yellow') flavor = 'Vanilla';
      else if (mood === 'classic' && color === 'pink') flavor = 'Lychee';
      else if (mood === 'classic' && color === 'brown') flavor = 'Belgium Chocolate';
      else flavor = 'Nutella';
      quizModal.querySelector('#quiz-result').innerHTML = 'You are <b>' + flavor + '</b>!<br><img src="' + flavor.toLowerCase().replace(/ /g,'_') + '.jpg" alt="' + flavor + '" style="width:80px;height:80px;border-radius:50%;margin-top:10px;">';
    };
  }
});