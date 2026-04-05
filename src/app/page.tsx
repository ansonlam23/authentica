import PlaceCard from "@/components/PlaceCard";

async function getPlaces() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/places`, {
    cache: 'no-store'
  });
  if (!res.ok) throw new Error('Failed to fetch places');
  return res.json();
}

export default async function Home() {
  const places = await getPlaces();

  return (
    <div className="p-4 space-y-4">
      <div className="text-center py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Discover Local Places
        </h1>
        <p className="text-gray-600 text-sm">
          Authentic reviews from verified humans
        </p>
      </div>

      <div className="space-y-3">
        {places.map((place: any) => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </div>
    </div>
  );
}
