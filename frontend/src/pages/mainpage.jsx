
import { useEffect, useState } from "react";
import ListingCard from "../components/listingcard";
import { Link } from "react-router-dom";

export default function Landingpage(){
    const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchListings() {
      try {
        const res = await fetch("/api/listings", {
          credentials: "include", //  REQUIRED for sessions
        });

        if (!res.ok) {
          throw new Error("Failed to fetch listings");
        }

        const data = await res.json();
        setListings(data.data);
       
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchListings();
    
  }, []);

  if (loading) return <p>Loading listings...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="
   flex flex-wrap gap-6 justify-center mt-8">
      <br></br><br></br>
      {listings.length === 0 && <p>No listings found</p>}

      {listings.map((listing) => (
        <ListingCard key={listing._id} listing={listing} />
      ))}
    </div>
  );
}