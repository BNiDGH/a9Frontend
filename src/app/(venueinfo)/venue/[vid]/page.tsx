import Image from "next/image";
import { notFound } from "next/navigation";
import getVenue from "@/libs/getVenue";

export default async function VenueDetailPage({ params }: { params: Promise<{ vid: string }> }) {
  const resolvedParams = await params;
  
  // เรียก API เพื่อดึงข้อมูล Venue จาก Backend
  const venueDetail = await getVenue(resolvedParams.vid);

  // ถ้า API ไม่ตอบกลับมา หรือไม่มีข้อมูล ให้แสดงหน้า 404
  if (!venueDetail || !venueDetail.data) {
    return notFound();
  }

  // เข้าถึงตัวข้อมูลจริงๆ ที่อยู่ในฟิลด์ data
  const venue = venueDetail.data;

  return (
    <main className="max-w-4xl mx-auto my-10 p-5">
      <div className="flex flex-col md:flex-row gap-10 items-center border border-gray-300 p-8 rounded-xl shadow-md bg-white text-black">
        <div className="relative w-full md:w-1/2 h-[300px]">
          <Image 
            src={venue.picture} 
            alt={venue.name} 
            fill
            className="object-cover rounded-lg shadow-sm"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-2">
          <h1 className="text-4xl font-bold mb-4">{venue.name}</h1>
          <p><strong>Address:</strong> {venue.address}</p>
          <p><strong>Province:</strong> {venue.province}</p>
          <p><strong>Postal Code:</strong> {venue.postalcode}</p>
          <p><strong>Tel:</strong> {venue.tel}</p>
          <p><strong>Daily Rate:</strong> {venue.dailyrate}</p>
        </div>
      </div>
    </main>
  );
}