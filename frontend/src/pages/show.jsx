//implementation of these functions in a upper layer pending.
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


export default function Show() {
  
  const { user: currUser } = useAuth();
   const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success,setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchListing() {
      try {
        const res = await fetch(`/api/listings/${id}`, {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Listing not found");
        }
          
        const data = await res.json();
        setSuccess(data.success);
        setListing(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchListing();
  }, [id]);

  if (loading) return <p>Loading listing...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!listing) return null;

  // delete a listing 
  async function onDeleteListing() {
  setError("");

  if (!id) {
    setError("Invalid listing ID");
    return;
  }

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this listing?"
  );

  if (!confirmDelete) return;

  try {
    const res = await fetch(`/api/listings/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to delete listing");
    }

    // Redirect after successful delete
    navigate("/listings");
  } catch (err) {
    setError(err.message);
  }
}



    //  review submission.
 async function onSubmitReview(e) {
  e.preventDefault();
  setError("");

  if (!id) {
    setError("Invalid listing ID");
    return;
  }

  const formData = new FormData(e.target);
  const rating = Number(formData.get("rating"));
  const comment = formData.get("comment");

  try {
    const res = await fetch(`/api/listings/${id}/reviews`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        review: { rating, comment },
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to submit review");
    }

    setListing((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        reviews: [...(prev.reviews || []), data.data],
      };
    });

    e.target.reset();
  } catch (err) {
    setError(err.message);
  }
}


//deleting review 
async function onDeleteReview(reviewId) {
  setError("");

  if (!id) {
    setError("Invalid listing ID");
    return;
  }

  try {
    const res = await fetch(
      `/api/listings/${id}/reviews/${reviewId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to delete review");
    }

    //Remove review from state without refresh
    setListing((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        reviews: prev.reviews.filter(
          (review) => review._id !== reviewId
        ),
      };
    });

  } catch (err) {
    setError(err.message);
  }
}




  return (
    <div className="min-h-screen bg-gray-100 py-8">
      {/* Flash Messages
      {success && (
        <div className="max-w-3xl mx-auto mb-4 bg-green-100 text-green-800 px-4 py-2 rounded">
          {success}
        </div>
      )} */}

      {error && (
        <div className="max-w-3xl mx-auto mb-4 bg-red-100 text-red-800 px-4 py-2 rounded">
          {error}
        </div>
      )}

      {/* Card */}
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Header */}
        <h4 className="sticky top-0 z-10 bg-white text-3xl font-bold text-center py-4 ">
          Listing Details
        </h4>

        {/* Image */}
        <img
          src={
            listing?.image?.url ||
            "https://via.placeholder.com/600x300?text=No+Image+Available"
          }
          alt={listing?.title}
         className="w-4/5 h-90 mx-auto object-cover rounded-xl "

        />

        <div className="p-6">
          {/* Owner */}
          <p className=" text-gray-600 mb-4">
            Owned by{" "}
            <span className="italic font-semibold">
              {listing?.owner?.username}
            </span>
          </p>

          {/* Details */}
          <ul className="space-y-3">
            <li className="text-2xl font-bold">
              {listing?.title || "NO TITLE"}
            </li>

            <li className="text-gray-700">
              {listing?.description}
            </li>

            <li className="text-green-700 text-xl font-bold">
              ₹ {listing?.price?.toLocaleString("en-IN")}
            </li>
          </ul>

          {/* Owner Actions */}
      
           {currUser && currUser.id === listing?.owner?._id && (
            <div className="flex justify-center gap-4 mt-6">
              <a
                href={`/listings/${listing._id}/edit`}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Edit
              </a>

              <button
                 onClick={onDeleteListing}
                className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-black"
              >
                Delete Listing
              </button>
            </div>
          )}

          <hr className="my-8" />

            

          {currUser && (
            <>
              <h4 className="text-lg font-bold mb-4 text-center">
                Leave a Review
              </h4>

              <form
                onSubmit={onSubmitReview}
                className="space-y-4 max-w-xl mx-auto"
              >
                <div>
                  <label className="block font-medium mb-1">Rating</label>
                  <select
                    name="rating"
                    className="w-full border rounded px-3 py-2"
                    required
                  >
                    <option value="">Select rating</option>
                    {[1, 2, 3, 4, 5].map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-medium mb-1">Comment</label>
                  <textarea
                    name="comment"
                    required
                    className="w-full border rounded px-3 py-2"
                  />
                </div>

                <button className="w-full bg-gray-900 text-white py-2 rounded hover:bg-black">
                  Submit
                </button>
              </form>

              <hr className="my-8" />
            </>
          )}


          {/* // Reviews  */}
          <h4 className="text-lg font-bold mb-4 text-center">
            All Reviews
          </h4>

          {listing?.reviews?.map((review) => (
            <div
              key={review._id}
              className="border rounded-lg p-4 mb-4 shadow-sm"
            >
              <h5 className="font-semibold">
                {review.author.username}
              </h5>

              <p className="text-gray-700 mt-1">
                <strong>Comment:</strong> {review.comment}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                ⭐ {review.rating} / 5
              </p>

              {currUser && currUser.id === review.author._id && (
                <button
                  onClick={() => onDeleteReview(review._id)}
                  className="mt-2 text-sm bg-gray-800 text-white px-3 py-1 rounded hover:bg-black"
                >
                  Delete Review
                </button>
              )} 
            </div>
         ))}
        </div>
      </div>
    </div>
  );
}
