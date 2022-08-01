export default function decorate(block) {
  block.querySelectorAll('img').forEach((img) => {
    img.closest('div').classList.add('cards-contains-image');
  });
  if (block.classList.contains('horizontal')) {
    block.closest('.section').classList.add('cards-horizontal-container');
  }
}
