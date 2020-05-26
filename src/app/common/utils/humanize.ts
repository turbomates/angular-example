export function humanize(content: string): string {
  return content
    .replace(/([A-Z]+)/g, " $1")
    .replace(/_/g, " ")
    .replace(/(\w+)/g, match => {
      return match.charAt(0).toUpperCase() + match.slice(1);
    });
}
