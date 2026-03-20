import getVenues from "@/libs/getVenues";
import VenueCatalog from "@/components/VenueCatalog";

export default function VenuePage() {
  const venues = getVenues();

  return (
    <main>
      <h1 className="text-3xl font-bold text-center mt-10">Select Your Venue</h1>
      <div className="m-5">
        <VenueCatalog venuesJson={venues} />
      </div>
    </main>
  );
}