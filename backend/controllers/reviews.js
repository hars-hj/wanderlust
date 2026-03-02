const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.createReview = async (req, res) => {
  const { id } = req.params;

  // Find listing
  const listing = await Listing.findById(id);
  if (!listing) {
    return res.status(404).json({
      success: false,
      message: "Listing not found",
    });
  }

  // 2 Create review 
const newReview = new Review({
    comment: req.body.review.comment,
    rating: req.body.review.rating,
    author: req.user._id,
  });


  // Push review into listing
  listing.reviews.push(newReview._id);

  
  await newReview.save();
  await listing.save();

  res.status(201).json({
    success: true,
    message: "Review created successfully",
    data: newReview,
  });
};


module.exports.deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  
  res.status(200).json({
    success: true,
    message: "review deleted successfully"
  });
};
