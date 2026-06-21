let dec = document.getElementById("decrement");
let res = document.getElementById("reset");
let inc = document.getElementById("increment");
let digit = document.querySelector(".digit");
let gif = document.getElementById("specialGif");

function updateUI() {
  let num = parseInt(digit.textContent);

  if (num === 67) {
    digit.style.color = "yellow";
    gif.classList.add("show");
  } else {
    digit.style.color = "#e8e6e3";
    gif.classList.remove("show");
  }
}

dec.addEventListener("click", () => {
  digit.textContent = parseInt(digit.textContent) - 1;
  updateUI();
});

res.addEventListener("click", () => {
  digit.textContent = "0";
  updateUI();
});

inc.addEventListener("click", () => {
  digit.textContent = parseInt(digit.textContent) + 1;
  updateUI();
});
