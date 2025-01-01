export default (text: string, replacement: string) => {
  return text
      .split('')
      .map(char => (char === ' ' ? char : replacement))
      .join('');
}
