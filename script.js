const display = document.getElementById("display");
const history = document.getElementById("history");
const buttons = document.querySelectorAll(".calc-btn");
const sound = document.getElementById("clickSound");
const themeToggle = document.getElementById("themeToggle");

let current = "";

const playSound = () => {
  if (!sound) return;
  sound.currentTime = 0;
  sound.play();
};

const calculate = () => {
  try {
    history.innerText = current;
    current = eval(
      current.replace("×","*").replace("÷","/").replace("−","-")
    ).toString();
  } catch {
    current = "Error";
  }
};

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    playSound();
    const val = btn.innerText;

    if (val === "AC") current = "";
    else if (val === "DEL") current = current.slice(0, -1);
    else if (val === "=") calculate();
    else current += val;

    display.value = current;
  });
});

/* Keyboard Support */
document.addEventListener("keydown", e => {
  if ("0123456789+-*/.".includes(e.key)) current += e.key;
  if (e.key === "Enter") calculate();
  if (e.key === "Backspace") current = current.slice(0, -1);
  display.value = current;
});

/* Theme Toggle (isolated logic) */
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent =
    document.body.classList.contains("dark") ? "☀️" : "🌙";
});
