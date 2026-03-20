import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/getUserProfile";
import BookingForm from "@/components/BookingForm";

export default async function BookingPage() {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user.token) return null;

    const profile = await getUserProfile(session.user.token);
    const createdAt = new Date(profile.data.createdAt);

    return (
        <main className="w-full flex flex-col items-center justify-center p-10">
            <div className="bg-slate-100 rounded-lg p-6 w-full max-w-md shadow-sm mb-8 text-gray-700">
                <div className="text-2xl font-bold mb-4">{profile.data.name}</div>
                <table className="table-auto border-separate border-spacing-y-2">
                    <tbody>
                        <tr><td className="font-semibold pr-4">Email:</td><td>{profile.data.email}</td></tr>
                        <tr><td className="font-semibold pr-4">Tel.:</td><td>{profile.data.tel}</td></tr>
                        <tr><td className="font-semibold pr-4">Member Since:</td><td>{createdAt.toString()}</td></tr>
                    </tbody>
                </table>
            </div>

            <h1 className="text-2xl font-bold mb-2">Booking Venue</h1>
            <BookingForm />
        </main>
    );
}