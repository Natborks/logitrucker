export default interface Driver {
  id: string;
  name: string;
  status: "delivering" | "paused" | "idle";
  eta: string;
  location: {
    lat: number;
    lng: number;
  };
}
