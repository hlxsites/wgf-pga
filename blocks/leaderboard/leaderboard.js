export default function decorate(block) {
  console.log(`here ${block.textContent}`);
  block.textContent = '';
}