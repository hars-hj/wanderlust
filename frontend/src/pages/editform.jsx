import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditForm(){

    // form ready. just send the api request on submit feature remaining.
    
  const { id } = useParams();
  const navigate = useNavigate();

  const [newdata, setNewdata] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    country: "",
    image: null,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchListing() {
      try {
        const res = await fetch(`/api/listings/${id}`, {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch listing");

        const data = await res.json();

        // pre-fill form
        setNewdata({
          title: data.data.title,
          description: data.data.description,
          price: data.data.price,
          location: data.data.location,
          country: data.data.country,
          image: null, // never prefill file input
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchListing();
  }, [id]);

    const handlechange = (e) => {
    const { name, value, files, type } = e.target;

    setNewdata((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

 async function handleSubmit(e) {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const form = new FormData();

    form.append("title", newdata.title);
    form.append("description", newdata.description);
    form.append("price", newdata.price);
    form.append("location", newdata.location);
    form.append("country", newdata.country);

    // only send image if user selected a new one
    if (newdata.image) {
      form.append("image", newdata.image);
    }

    const res = await fetch(`/api/listings/${id}`, {
      method: "PUT",
      credentials: "include",
      body: form, // important: no Content-Type header
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to update listing");
    }

    // redirect to show page
    navigate(`/listings/${id}`);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
}

      
 return (
    <div className="bg-gray-100 py-10 px-4 " >
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6">

        <h3 className="text-2xl font-semibold text-gray-900 mb-6">
          Register Your New Property
        </h3>

        <form
          className="space-y-5"
          onSubmit={handleSubmit}
          
        >
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
             onChange={handlechange}
             value={newdata.title}
              name="title"
              type="text"
              required
              placeholder="Title"
              className="w-full rounded-lg border border-gray-300 px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
            onChange={handlechange}
             value={newdata.description}
              name="description"
              rows="3"
              className="w-full rounded-lg border border-gray-300 px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload image
            </label>
            <input
              onChange={handlechange}
              vlaue = {newdata.image}
              name="image"
              type="file"
              accept="image/*"
               
              
              className="block w-full text-sm text-gray-700
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-lg file:border-0
                         file:bg-gray-900 file:text-white
                         hover:file:bg-black"
            />
          </div>

          {/* Price + Country */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <input

              onChange={handlechange}
             value={newdata.price}
                name="price"
                type="number"
                required
                placeholder="Enter price"
                className="w-full rounded-lg border border-gray-300 px-3 py-2
                           focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <input
              value={newdata.country}
              onChange={handlechange}
                name="country"
                type="text"
                required
                placeholder="Country"
                className="w-full rounded-lg border border-gray-300 px-3 py-2
                           focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
            onChange={handlechange}
             value={newdata.location}
              name="location"
              type="text"
              required
              placeholder="Location"
              className="w-full rounded-lg border border-gray-300 px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>

          {/* Button */}
         <div className="pt-4">
            {error && <p className="text-red-600">{error}</p>}
            <button
            disabled={loading}
              type="submit"
              className="bg-orange-700 text-white px-6 py-3 rounded-lg
                         hover:bg-black transition"           
            >
              {loading ? "Saving..." : "Update Changes"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}