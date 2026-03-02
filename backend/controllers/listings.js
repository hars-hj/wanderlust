const Listing =  require("../models/listing");


module.exports.index = async (req, res) => {
  const alllisting = await Listing.find({});
   res.status(200).json({
    success: true,
    data: alllisting
  });
};


// module.exports.renderNewForm = (req, res) => {
//   res.json("listing/newform");
  
// };

module.exports.creatNewForm = async (req, res) => {
  const { title, description, location, country, price } = req.body;
  console.log(title);
  // Extract Cloudinary image data
  const url = req.file.path;
  const filename = req.file.filename;
  // Create new listing
  const newListing = new Listing({
    title,
    description,
    image: { url, filename }, 
    price,
    location,
    country,
    owner: req.user._id
  });

  await newListing.save();
  res.status(201).json({
    success: true,
    message: "Listing created successfully",
    data: newListing
  });
};


module.exports.show = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id).populate({path: "reviews", populate: {path: "author"}}).populate("owner");
 
  if (!listing) {
    return res.status(404).json({
      success: false,
      message: "Listing not found"
    });
  }

  res.status(200).json({
    success: true,
    data: listing
  });
};

// module.exports.Edit = async (req, res) => {
//   const { id } = req.params;
//   const listing = await Listing.findById(id);

//   let originalurl = listing.image.url;
//   originalurl.replace("/upload", "/upload/h_300,w_250")
//   res.json("listing/edit", { listing });
// };

module.exports.update = async (req, res) => {
  const { id } = req.params;
  const { title, description, location, country, price } = req.body;

  // Update the text fields
  const listing = await Listing.findByIdAndUpdate(
    id,
    { title, description, price, location, country },
    { new: true }
  );

 
  if (!listing) {
    return res.status(404).json({
      success: false,
      message: "Listing not found"
    });
  }

     // If a new image is uploaded, replace the old one
  if (req.file) {
    listing.image = {
      url: req.file.path,
      filename: req.file.filename
    };
    await listing.save();
  }

  res.status(200).json({
    success: true,
    message: "Listing updated successfully",
    data: listing
  });
};



module.exports.delete = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  
   res.status(200).json({
    success: true,
    message: "Listing deleted successfully"
  });
};