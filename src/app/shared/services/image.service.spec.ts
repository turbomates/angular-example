import {ImageService} from "./image.service";

describe('ImageService', () => {
  it('should work with base64 image', () => {
    const service = new ImageService('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD');

    expect(service.getData()).toBe("/9j/4AAQSkZJRgABAQEASABIAAD");
    expect(service.isBase64()).toBe(true);
  });

  it('should not be base64 image', () => {
    const service = new ImageService('https://vie-media.s3.eu-central-1.amazonaws.com/50747ec1-0407-4511-ada2-dc3cf50b24ed');
    expect(service.isBase64()).toBe(false);
  });

});
