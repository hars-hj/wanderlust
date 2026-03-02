const Listing = require("./models/listing");
const { listingSchema } = require("./schema");
const ExpressError = require("./utils/ExpressError");
const Review = require("./models/review");
const { reviewSchema } = require("./schema");



module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      success: false,
      message: "Authentication required"
    });
  }
  next();
};


// module.exports.saveRedirectUrl = (req,res,next)=>{
//     if(req.session.redirectUrl){
//         res.locals.redirectUrl = req.session.redirectUrl;
//     }
//       next();  
// }
module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;

  const listing = await Listing.findById(id);
  if (!listing) {
    return res.status(404).json({
      success: false,
      message: "Listing not found"
    });
  }

  if (listing.owner.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: "You are not the owner of this listing"
    });
  }

  next();
};

module.exports.isAuthor = async (req, res, next) => {
  const { reviewId } = req.params;

  const review = await Review.findById(reviewId);
  if (!review) {
    return res.status(404).json({
      success: false,
      message: "Review not found"
    });
  }

  if (review.author.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: "You are not the author of this review"
    });
  }

  next();
};

module.exports.validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const msg = error.details.map(el => el.message).join(", ");
    return res.status(400).json({
      success: false,
      message: msg
    });
  }

  next();
};

module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const msg = error.details.map(el => el.message).join(", ");
    return res.status(400).json({
      success: false,
      message: msg
    });
  }

  next();
};
