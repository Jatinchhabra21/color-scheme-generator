const getColorSchemeBtn = document.getElementById('color-scheme-btn');
const schemeModeSelectBox = document.getElementById('scheme-mode');
const optionContainer = document.getElementById('option-container');
const selectedOption = document.getElementById('selected-option');
let currentSelectedOption = document.getElementById('selected-option');
const colorContainer = document.getElementById('color-container');

getColorSchemeBtn.addEventListener('click', getColorScheme);

async function getColorScheme() {
  const hexColor = document.getElementById('color').value;
  const schemeMode = document.getElementById('selected-option').dataset.value;
  const data = await fetch(
    `https://www.thecolorapi.com/scheme?hex=${hexColor.substr(
      1,
      6
    )}&mode=${schemeMode}&count=5`
  ).then((response) => response.json());
  const colorContainerChild = Array.from(colorContainer.children);
  colorContainerChild.forEach((color, index) => {
    color.innerHTML = `
		<div class="color-item" style="background: ${data.colors[index].hex.value};" data-color="${data.colors[index].hex.value}"></div>
		<p class="hex" data-color="${data.colors[index].hex.value}">${data.colors[index].hex.value}</p>`;
  });
}

schemeModeSelectBox.addEventListener('click', () => {
  optionContainer.classList.toggle('display-none');
  const selectedMode = selectedOption.dataset.value;
  const optionContainerChildren = Array.from(optionContainer.children);
  currentSelectedOption = optionContainerChildren.filter(
    (childElement) => childElement.dataset.value === selectedMode
  )[0];
  currentSelectedOption.classList.add('current-selected-option');
  currentSelectedOption.classList.add('checked-mode');
});

optionContainer.addEventListener('click', (event) => {
  selectedOption.textContent = event.target.textContent;
  selectedOption.dataset.value = event.target.dataset.value;
  currentSelectedOption.classList.remove('current-selected-option');
  currentSelectedOption.classList.remove('checked-mode');
  currentSelectedOption = event.target;
  currentSelectedOption.classList.add('checked-mode');
});

colorContainer.addEventListener('click', (event) => {
  if (event.target.dataset.color) {
    navigator.clipboard.writeText(event.target.dataset.color);
    document.getElementById('copied-text').classList.remove('display-none');
    setTimeout(() => {
      document.getElementById('copied-text').classList.add('display-none');
    }, 1000);
  }
});
