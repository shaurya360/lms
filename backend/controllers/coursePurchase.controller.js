import Stripe from "stripe";
import { Course } from "../models/course.model.js";
import { CoursePurchase } from "../models/coursePurchase.model.js";
import { Lecture } from "../models/lecture.model.js";
import { User } from "../models/user.model.js";
import { CourseProgress } from "../models/courseProgress.js";

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
// export const createCheckoutSession = async (req, res) => {
//   try {
//     const userId = req.id;
//     const { courseId } = req.body;

//     const course = await Course.findById(courseId);
//     if (!course) return res.status(404).json({ message: "Course not found!" });

//     // Create a new course purchase record
//     const newPurchase = new CoursePurchase({
//       courseId,
//       userId,
//       amount: course.coursePrice,
//       status: "completed",
//     });

//     const success_url = `http://localhost:5173/course-progress/${courseId}`;
//     const cancel_url  = `http://localhost:5173/course-detail/${courseId}`;

    

//     newPurchase.paymentId = makeid(15);

//     await newPurchase.save();

//     return res.status(200).json({
//       success: true,
//       url:success_url ,
//       id: newPurchase.paymentId// Return the Stripe checkout URL
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
// export const createCheckoutSession = async (req, res) => {
//     try {
//         const userId = req.id;
//         const { courseId } = req.body;

//         const course = await Course.findById(courseId);
//         if (!course) return res.status(404).json({ message: "Course not found!" });

//         // Check if the user has already purchased this course to prevent duplicate entries
//         const existingPurchase = await CoursePurchase.findOne({ userId, courseId, status: "completed" });
//         if (existingPurchase) {
//             return res.status(409).json({
//                 success: false,
//                 message: "You have already purchased this course."
//             });
//         }

//         // Create a new course purchase record
//         const newPurchase = new CoursePurchase({
//             courseId,
//             userId,
//             amount: course.coursePrice,
//             status: "completed", // Assuming 'completed' means the purchase is successful here
//         });

//         // Generate a payment ID
//         newPurchase.paymentId = makeid(15);

//         await newPurchase.save();

//         // --- NEW LOGIC: Create Course Progress upon successful purchase ---
//         // Prepare the initial lecture progress array
//         const initialLectureProgress = course.lectures.map(lecture => ({
//             lectureId: lecture._id, // Assuming lecture objects have an _id
//             viewed: false,
//         }));

//         // Check if a CourseProgress record already exists for this user and course
//         // This is a safety check, though for a new purchase, it should ideally not exist yet.
//         let existingCourseProgress = await CourseProgress.findOne({ userId, courseId });

//         if (existingCourseProgress) {
//             // If it exists, update it (e.g., reset progress if re-purchased, though less common)
//             // For now, we'll just ensure it's not completed and update lecture progress
//             existingCourseProgress.completed = false;
//             existingCourseProgress.lectureProgress = initialLectureProgress;
//             await existingCourseProgress.save();
//         } else {
//             // Create a new CourseProgress record
//             const newCourseProgress = new CourseProgress({
//                 userId,
//                 courseId,
//                 completed: false, // Initially, the course is not completed
//                 lectureProgress: initialLectureProgress, // All lectures marked as not viewed
//             });
//             await newCourseProgress.save();
//         }
//         // --- END NEW LOGIC ---

//         const success_url = `http://localhost:5173/course-progress/${courseId}`;
//         const cancel_url = `http://localhost:5173/course-detail/${courseId}`; // This variable is not used but kept for context

//         return res.status(200).json({
//             success: true,
//             message: "Course purchased successfully and progress initialized.",
//             url: success_url,
//             id: newPurchase.paymentId // Return the payment ID
//         });
//     } catch (error) {
//         console.error("Error creating checkout session:", error); // Use console.error for errors
//         return res.status(500).json({
//             success: false,
//             message: "Failed to process course purchase."
//         });
//     }
// };


export const createCheckoutSession = async (req, res) => {
    try {
        const userId = req.id;
        const { courseId } = req.body;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found!" });
        }

        // --- Start of existing and new logic for purchase and progress ---

        // 1. Check if the user has already purchased this course to prevent duplicate entries
        const existingPurchase = await CoursePurchase.findOne({ userId, courseId, status: "completed" });
        if (existingPurchase) {
            return res.status(409).json({
                success: false,
                message: "You have already purchased this course."
            });
        }

        // 2. Create a new course purchase record
        const newPurchase = new CoursePurchase({
            courseId,
            userId,
            amount: course.coursePrice,
            status: "completed", // Assuming 'completed' means the purchase is successful here
        });

        // Generate a payment ID
        newPurchase.paymentId = makeid(15);
        await newPurchase.save();

        // 3. Create/Update Course Progress upon successful purchase
        // Prepare the initial lecture progress array
        const initialLectureProgress = course.lectures.map(lecture => ({
            lectureId: lecture._id, // Assuming lecture objects have an _id
            viewed: false,
        }));

        let existingCourseProgress = await CourseProgress.findOne({ userId, courseId });

        if (existingCourseProgress) {
            // If it exists, update it (e.g., reset progress if re-purchased)
            existingCourseProgress.completed = false;
            existingCourseProgress.lectureProgress = initialLectureProgress;
            await existingCourseProgress.save();
        } else {
            // Create a new CourseProgress record
            const newCourseProgress = new CourseProgress({
                userId,
                courseId,
                completed: false, // Initially, the course is not completed
                lectureProgress: initialLectureProgress, // All lectures marked as not viewed
            });
            await newCourseProgress.save();
        }

        // --- NEW LOGIC: Add course ID to User's enrolledCourses ---
        const user = await User.findById(userId);

        if (!user) {
            // This case should ideally not happen if req.id is reliable
            return res.status(404).json({
                success: false,
                message: "User not found after purchase, contact support."
            });
        }

        // Use $addToSet to add courseId to enrolledCourses if it's not already there
        // This prevents duplicate course IDs in the array
        user.enrolledCourses.addToSet(courseId); // Mongoose's addToSet method
        await user.save();
        // --- END NEW LOGIC ---

        const success_url = `http://localhost:3000/course-progress/${courseId}`;
        const cancel_url = `http://localhost:3000/course-detail/${courseId}`; // This variable is not used but kept for context

        return res.status(200).json({
            success: true,
            message: "Course purchased successfully, progress initialized, and user enrolled.",
            url: success_url,
            id: newPurchase.paymentId
        });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to process course purchase."
        });
    }
};

export const stripeWebhook = async (req, res) => {
  let event;

  try {
    const payloadString = JSON.stringify(req.body, null, 2);
    const secret = process.env.WEBHOOK_ENDPOINT_SECRET;

    const header = stripe.webhooks.generateTestHeaderString({
      payload: payloadString,
      secret,
    });

    event = stripe.webhooks.constructEvent(payloadString, header, secret);
  } catch (error) {
    console.error("Webhook error:", error.message);
    return res.status(400).send(`Webhook error: ${error.message}`);
  }

  // Handle the checkout session completed event
  if (event.type === "checkout.session.completed") {
    console.log("check session complete is called");

    try {
      const session = event.data.object;

      const purchase = await CoursePurchase.findOne({
        paymentId: session.id,
      }).populate({ path: "courseId" });

      if (!purchase) {
        return res.status(404).json({ message: "Purchase not found" });
      }

      if (session.amount_total) {
        purchase.amount = session.amount_total / 100;
      }
      purchase.status = "completed";

      // Make all lectures visible by setting `isPreviewFree` to true
      if (purchase.courseId && purchase.courseId.lectures.length > 0) {
        await Lecture.updateMany(
          { _id: { $in: purchase.courseId.lectures } },
          { $set: { isPreviewFree: true } }
        );
      }

      await purchase.save();

      // Update user's enrolledCourses
      await User.findByIdAndUpdate(
        purchase.userId,
        { $addToSet: { enrolledCourses: purchase.courseId._id } }, // Add course ID to enrolledCourses
        { new: true }
      );

      // Update course to add user ID to enrolledStudents
      await Course.findByIdAndUpdate(
        purchase.courseId._id,
        { $addToSet: { enrolledStudents: purchase.userId } }, // Add user ID to enrolledStudents
        { new: true }
      );
    } catch (error) {
      console.error("Error handling event:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  res.status(200).send();
};
export const getCourseDetailWithPurchaseStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const course = await Course.findById(courseId)
      .populate({ path: "creator" })
      .populate({ path: "lectures" });

    const purchased = await CoursePurchase.findOne({ userId, courseId });
    console.log(purchased);

    if (!course) {
      return res.status(404).json({ message: "course not found!" });
    }

    return res.status(200).json({
      course,
      purchased: !!purchased, // true if purchased, false otherwise
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllPurchasedCourse = async (_, res) => {
  try {
    const purchasedCourse = await CoursePurchase.find({
      status: "completed",
    }).populate("courseId");
    if (!purchasedCourse) {
      return res.status(404).json({
        purchasedCourse: [],
      });
    }
    return res.status(200).json({
      purchasedCourse,
    });
  } catch (error) {
    console.log(error);
  }
};
