(function () {
  const el = document.getElementById("typed-text");
  if (!el) return;

const phrases = [
  "Technical Support Analyst",
  "IT Support Specialist",
  "Front-End Web Developer",
  "Freelance Web Developer",
];


  let i = 0;       // phrase index
  let j = 0;       // char index
  let deleting = false;

  const typeSpeed = 55;
  const deleteSpeed = 35;
  const pauseTime = 900;

  function tick() {
    const phrase = phrases[i];

    if (!deleting) {
      j++;
      el.textContent = phrase.slice(0, j);

      if (j === phrase.length) {
        deleting = true;
        setTimeout(tick, pauseTime);
        return;
      }
      setTimeout(tick, typeSpeed);
    } else {
      j--;
      el.textContent = phrase.slice(0, j);

      if (j === 0) {
        deleting = false;
        i = (i + 1) % phrases.length;
      }
      setTimeout(tick, deleteSpeed);
    }
  }

  tick();
})();
