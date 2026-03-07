
import { useEffect, useState } from "react";
import ListingCard from "../components/listingcard";
import { Link } from "react-router-dom";

// filter definitions matching backend index.ejs
const FILTERS = [
  { icon: "fa-solid fa-fire", label: "Trending" },
  { icon: "fa-solid fa-bed", label: "Rooms" },
  { icon: "fa-solid fa-mountain-city", label: "Iconic City" },
  { icon: "fa-solid fa-mountain", label: "Mountain" },
  { icon: "fa-brands fa-fort-awesome", label: "Castles" },
  { icon: "fa-solid fa-person-swimming", label: "Amazing pools" },
  { icon: "fa-solid fa-campground", label: "Camping" },
  { icon: "fa-solid fa-tractor", label: "Farms" },
  { icon: "fa-solid fa-snowflake", label: "Arctic" },
  { icon: "fa-solid fa-igloo", label: "Dome" },
  { icon: "fa-solid fa-ship", label: "Boat" },
];

export default function Landingpage(){
    const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
    const [showTax, setShowTax] = useState(false);
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

  // render filter bar above listings

 return (
  <div className="mt-8 max-w-7xl mx-auto px-6">
    <style>{`
      .filter{
        margin-top: 1rem;
        text-align: center;
        opacity:0.7;
        flex: 1 1 0;
      }
      .filter p{
        font-size: 0.8rem;
      }
      .filter:hover{
        opacity:1;
      }
      #filters{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
      }
    `}</style>

    <div id="filters" className="mb-6 flex flex-wrap items-center justify-between w-full">
      {FILTERS.map(({ icon, label }) => (
        <div key={label} className="filter flex flex-col items-center">
          <div><i className={`${icon} text-xl`}></i></div>
          <p>{label}</p>
        </div>
      ))}
      <div className="tax-toggle ml-4">
        <button
          type="button"
          className={`px-4 py-2 rounded text-sm transition-colors duration-150 ${showTax ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-800"}`}
          onClick={() => setShowTax((v) => !v)}
        >
          Display total after taxes
        </button>
      </div>
    </div>

    {listings.length === 0 && <p>No listings found</p>}

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {listings.map((listing) => (
        <ListingCard key={listing._id} listing={listing} showTax={showTax} />
      ))}
    </div>
  </div>
);

}