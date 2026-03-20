import Link from "next/link";
import Card from "./Card";

export interface VenueItem {
  _id: string;
  name: string;
  address: string;
  district: string;
  province: string;
  postalcode: string;
  tel: string;
  picture: string;
  dailyrate: number;
  __v: number;
  id: string;
}

export interface VenueJson {
  success: boolean;
  count: number;
  pagination: Object;
  data: VenueItem[];
}

export default async function VenueCatalog({ venuesJson }: { venuesJson: Promise<VenueJson> }) {
  const venueJsonReady = await venuesJson;

  return (
    <div className="flex flex-row flex-wrap justify-around p-2 gap-4">
      {venueJsonReady.data.map((venueItem: VenueItem) => (
        <Link href={`/venue/${venueItem.id}`} key={venueItem.id}>
          <Card 
            venueName={venueItem.name} 
            imgSrc={venueItem.picture}
          />
        </Link>
      ))}
    </div>
  );
}