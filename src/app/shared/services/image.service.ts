export class ImageService {
  constructor(private value: string) {}

  isBase64(): boolean {
    return this.value.includes("base64");
  }

  getData(): string {
    return this.value.split("base64,")[1];
  }
}
