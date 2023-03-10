export default async function checkPosition(callback) {
  const height = document.body.offsetHeight;
  const screenHeight = window.innerHeight;

  const scrolled = window.scrollY;

  const threshold = height - screenHeight / 3;

  const position = scrolled + screenHeight;

  if (position >= threshold) {
    await callback();
  }
}
