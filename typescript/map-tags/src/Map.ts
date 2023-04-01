export class Map {
  private googleMap: google.maps.Map;

  constructor(divId: string) {
    this.googleMap = new google.maps.Map(
      document.getElementById(divId) as HTMLElement,
      {
        zoom: 1,
        center: {
          lng: 0,
          lat: 0,
        },
      }
    );
  }

  addMarker(lng: number, lat: number) {
    new google.maps.Marker({
      map: this.googleMap,
      position: { lng, lat },
    });
  }
}
