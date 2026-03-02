import { useEffect, useState } from "react";

function ListingsTest() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch("/api/listings", {
          credentials: "include"
        });

        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`);
        }

        const data = await res.json();
        console.log("API response:", data);

        setListings(data.data || []);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (loading) return <p>Loading listings…</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Listings Test</h2>
      <ul>
        {listings.map(listing => (
          <li key={listing._id}>
            {listing.title} — ₹{listing.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListingsTest;
