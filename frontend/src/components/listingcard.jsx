import '../tailwind.css'
import { useNavigate } from "react-router-dom";

export default function ListingCard({ listing }) {
  const navigate = useNavigate();
  return (
    
    <div  onClick={() => navigate(`/listings/${listing._id}`)} className="p-1 w-90  rounded-2xl overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.15)] bg-white ">
      
      {/* Image */}
      <img
        src={listing.image.url}
        alt="Property"
        className="h-[260px] w-full object-cover rounded-2xl"
      />

      {/* Content */}
      <div className="px-4 py-3 text-left">
        <h3 className="text-black font-semibold">
          {listing.title}
        </h3>

        <p className="mt-1 text-black font-semibold ">
          {listing.price}
          <span className="text-black-500 font-semibold "> / Night</span>
        </p>
      </div>

    </div>
  );
}
