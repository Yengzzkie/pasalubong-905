export function getRandomColor() {
  const hue = Math.floor(Math.random() * 360); // any hue
  const saturation = Math.floor(Math.random() * 30) + 40; // 40% to 70% saturation (not too neon)
  const lightness = Math.floor(Math.random() * 20) + 40;  // 40% to 60% lightness (soft, not too dark or bright)
  
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}