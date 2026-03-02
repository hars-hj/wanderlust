import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewListingForm() {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [formdata, setFormdata] = useState({
    title: "",
    description: "",
    image: null,
    price: "",
    country: "",
    location: "",
  });

  const handlechange = (e) => {
    const { name, value, files, type } = e.target;

    setFormdata((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      
      const data = new FormData();
      data.append("title", formdata.title);
      data.append("description", formdata.description);
      data.append("price", formdata.price);
      data.append("country", formdata.country);
      data.append("location", formdata.location);

      if (formdata.image) {
        data.append("image", formdata.image); 
      }

      const res = await fetch("/api/listings", {
        method: "POST",
        credentials: "include",
        body: data, 
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to create listing");
      }

      const resData = await res.json();

      //  Redirect to newly created listing
      navigate(`/listings/${resData.data._id}`);
    } catch (err) {
      console.error(err.message);
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
             value={formdata.title}
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
             value={formdata.description}
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
              vlaue = {formdata.image}
              name="image"
              type="file"
              accept="image/*"
               required
              
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
             value={formdata.price}
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
              value={formdata.country}
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
             value={formdata.location}
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
              {loading ? "Saving..." : "Create Listing"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
