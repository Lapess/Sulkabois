export default function shuffle(items: any[]): any[] {
  return items.sort(() => Math.random() - 0.5);
}
