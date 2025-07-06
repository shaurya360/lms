// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardTitle } from "@/components/ui/card";
// import {
//   useCompleteCourseMutation,
//   useGetCourseProgressQuery,
//   useInCompleteCourseMutation,
//   useUpdateLectureProgressMutation,
// } from "@/features/api/courseProgressApi";
// import { CheckCircle, CheckCircle2, CirclePlay } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { toast } from "sonner";

// const CourseProgress = () => {
//   const params = useParams();
//   const courseId = params.courseId;
//   const { data, isLoading, isError, refetch } =
//     useGetCourseProgressQuery(courseId);

//   const [updateLectureProgress] = useUpdateLectureProgressMutation();
//   const [
//     completeCourse,
//     { data: markCompleteData, isSuccess: completedSuccess },
//   ] = useCompleteCourseMutation();
//   const [
//     inCompleteCourse,
//     { data: markInCompleteData, isSuccess: inCompletedSuccess },
//   ] = useInCompleteCourseMutation();

//   useEffect(() => {
//     console.log(markCompleteData);

//     if (completedSuccess) {
//       refetch();
//       toast.success(markCompleteData.message);
//     }
//     if (inCompletedSuccess) {
//       refetch();
//       toast.success(markInCompleteData.message);
//     }
//   }, [completedSuccess, inCompletedSuccess]);

//   const [currentLecture, setCurrentLecture] = useState(null);

//   if (isLoading) return <p>Loading...</p>;
//   if (isError) return <p>Failed to load course details</p>;

//   console.log(data);

//   const { courseDetails, progress, completed } = data.data;
//   const { courseTitle } = courseDetails;

//   // initialze the first lecture is not exist
//   const initialLecture =
//     currentLecture || (courseDetails.lectures && courseDetails.lectures[0]);

//   const isLectureCompleted = (lectureId) => {
//     return progress.some((prog) => prog.lectureId === lectureId && prog.viewed);
//   };

//   const handleLectureProgress = async (lectureId) => {
//     await updateLectureProgress({ courseId, lectureId });
//     refetch();
//   };
//   // Handle select a specific lecture to watch
//   const handleSelectLecture = (lecture) => {
//     setCurrentLecture(lecture);
//     handleLectureProgress(lecture._id);
//   };


//   const handleCompleteCourse = async () => {
//     await completeCourse(courseId);
//   };
//   const handleInCompleteCourse = async () => {
//     await inCompleteCourse(courseId);
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-4">
//       {/* Display course name  */}
//       <div className="flex justify-between mb-4">
//         <h1 className="text-2xl font-bold">{courseTitle}</h1>
//         <Button
//           onClick={completed ? handleInCompleteCourse : handleCompleteCourse}
//           variant={completed ? "outline" : "default"}
//         >
//           {completed ? (
//             <div className="flex items-center">
//               <CheckCircle className="h-4 w-4 mr-2" /> <span>Completed</span>{" "}
//             </div>
//           ) : (
//             "Mark as completed"
//           )}
//         </Button>
//       </div>

//       <div className="flex flex-col md:flex-row gap-6">
//         {/* Video section  */}
//         <div className="flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4">
//           <div>
//             <video
//               src={currentLecture?.videoUrl || initialLecture.videoUrl}
//               controls
//               className="w-full h-auto md:rounded-lg"
//               onPlay={() =>
//                 handleLectureProgress(currentLecture?._id || initialLecture._id)
//               }
//             />
//           </div>
//           {/* Display current watching lecture title */}
//           <div className="mt-2 ">
//             <h3 className="font-medium text-lg">
//               {`Lecture ${
//                 courseDetails.lectures.findIndex(
//                   (lec) =>
//                     lec._id === (currentLecture?._id || initialLecture._id)
//                 ) + 1
//               } : ${
//                 currentLecture?.lectureTitle || initialLecture.lectureTitle
//               }`}
//             </h3>
//           </div>
//         </div>
//         {/* Lecture Sidebar  */}
//         <div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0">
//           <h2 className="font-semibold text-xl mb-4">Course Lecture</h2>
//           <div className="flex-1 overflow-y-auto">
//             {courseDetails?.lectures.map((lecture) => (
//               <Card
//                 key={lecture._id}
//                 className={`mb-3 hover:cursor-pointer transition transform ${
//                   lecture._id === currentLecture?._id
//                     ? "bg-gray-200 dark:dark:bg-gray-800"
//                     : ""
//                 } `}
//                 onClick={() => handleSelectLecture(lecture)}
//               >
//                 <CardContent className="flex items-center justify-between p-4">
//                   <div className="flex items-center">
//                     {isLectureCompleted(lecture._id) ? (
//                       <CheckCircle2 size={24} className="text-green-500 mr-2" />
//                     ) : (
//                       <CirclePlay size={24} className="text-gray-500 mr-2" />
//                     )}
//                     <div>
//                       <CardTitle className="text-lg font-medium">
//                         {lecture.lectureTitle}
//                       </CardTitle>
//                     </div>
//                   </div>
//                   {isLectureCompleted(lecture._id) && (
//                     <Badge
//                       variant={"outline"}
//                       className="bg-green-200 text-green-600"
//                     >
//                       Completed
//                     </Badge>
//                   )}
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseProgress;
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  useCompleteCourseMutation,
  useGetCourseProgressQuery,
  useInCompleteCourseMutation,
  useUpdateLectureProgressMutation,
} from "@/features/api/courseProgressApi";
import { CheckCircle, CheckCircle2, CirclePlay } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";




const CourseProgress = () => {
  const params = useParams();
  const courseId = params.courseId;

  // Destructure refetch from the query hook to manually trigger data refresh
  const { data, isLoading, isError, refetch } = useGetCourseProgressQuery(courseId);

  const [updateLectureProgress] = useUpdateLectureProgressMutation();
  const [
    completeCourse,
    { data: markCompleteData, isSuccess: completedSuccess, isError: completeError, error: completeErrData },
  ] = useCompleteCourseMutation();
  const [
    inCompleteCourse,
    { data: markInCompleteData, isSuccess: inCompletedSuccess, isError: incompleteError, error: incompleteErrData },
  ] = useInCompleteCourseMutation();

  // useEffect for course complete/incomplete state changes (triggering full reload for certainty)
  useEffect(() => {
    if (completedSuccess) {
      toast.success(markCompleteData?.message || "Course marked as complete!");
      // Force a full page reload after successful completion
      window.location.reload();
    }
    if (inCompletedSuccess) {
      toast.success(markInCompleteData?.message || "Course marked as incomplete!");
      // Force a full page reload after successful incompleteness
      window.location.reload();
    }

    if (completeError) {
      toast.error(completeErrData?.data?.message || "Failed to mark course as complete.");
    }
    if (incompleteError) {
      toast.error(incompleteErrData?.data?.message || "Failed to mark course as incomplete.");
    }
  }, [
    completedSuccess,
    inCompletedSuccess,
    completeError,
    incompleteError,
    markCompleteData,
    markInCompleteData,
    completeErrData,
    incompleteErrData,
  ]);

  const [currentLecture, setCurrentLecture] = useState(null);

  if (isLoading) {
    console.log("CourseProgress: Loading initial data...");
    return <p>Loading...</p>;
  }
  if (isError) {
    console.error("CourseProgress: Failed to load initial data.", error);
    return <p>Failed to load course details</p>;
  }

  // Safely destructure data.data
  const { courseDetails, progress, completed } = data?.data || {};
  const { courseTitle, lectures } = courseDetails || {};

  // Log the current 'progress' array to see lecture completion states
  console.log("CourseProgress: Current 'progress' array:", progress);
  console.log("CourseProgress: Overall 'completed' status:", completed);


  if (!courseDetails || !lectures || lectures.length === 0) {
    console.log("CourseProgress: No course details or lectures found.");
    return <p>Course details or lectures not available.</p>;
  }
  // Initialize initialLecture safely
  const initialLecture = currentLecture || (lectures && lectures[0]);
  if (!initialLecture) {
      console.log("CourseProgress: No initial lecture found for this course.");
      return <p>No lectures found for this course.</p>;
  }


  const isLectureCompleted = (lectureId) => {
    const isCompleted = progress.some((prog) => prog.lectureId === lectureId && prog.viewed);
    // console.log(`isLectureCompleted(${lectureId}): ${isCompleted}`); // Uncomment for detailed lecture status
    return isCompleted;
  };

  const handleLectureProgress = async (lectureId) => {
    console.log(`handleLectureProgress: Marking lecture ${lectureId} as viewed...`);
    await updateLectureProgress({ courseId, lectureId });
    console.log(`handleLectureProgress: Mutation for lecture ${lectureId} sent. Refetching course progress.`);
    refetch(); // This re-fetches the entire course progress, including the updated 'progress' array
  };

  // Handle select a specific lecture to watch
  const handleSelectLecture = (lecture) => {
    console.log(`handleSelectLecture: Selected lecture ${lecture._id} - ${lecture.lectureTitle}`);
    setCurrentLecture(lecture);
    // When a lecture is selected, it should be marked as completed (viewed)
    if (lecture && lecture._id) {
      handleLectureProgress(lecture._id);
    }
  };


  const handleCompleteCourse = async () => {
    console.log("handleCompleteCourse: Calling completeCourse mutation...");
    await completeCourse(courseId);
  };

  const handleInCompleteCourse = async () => {
    console.log("handleInCompleteCourse: Calling inCompleteCourse mutation...");
    await inCompleteCourse(courseId);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 mt-20 ">
      {/* Display course name  */}
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">{courseTitle}</h1>
        <Button
          onClick={completed ? handleInCompleteCourse : handleCompleteCourse}
          variant={completed ? "default" : "outline"}
        >
          {completed ? (
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" /> <span>Mark as incomplete</span>{" "}
            </div>
          ) : (
            "Mark as complete"
          )}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Video section  */}
        <div className="flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4">
          <div>
            <video
              src={currentLecture?.videoUrl || initialLecture.videoUrl}
              controls
              className="w-full h-auto md:rounded-lg"
              onPlay={() => {
                // Mark lecture as completed when it starts playing
                console.log(`Video onPlay: Marking current lecture ${currentLecture?._id || initialLecture._id} as viewed.`);
                handleLectureProgress(currentLecture?._id || initialLecture._id);
              }}
            />
          </div>
          {/* Display current watching lecture title */}
          <div className="mt-2 ">
            <h3 className="font-medium text-lg">
              {`Lecture ${
                lectures.findIndex(
                  (lec) =>
                    lec._id === (currentLecture?._id || initialLecture._id)
                ) + 1
              } : ${
                currentLecture?.lectureTitle || initialLecture.lectureTitle
              }`}
            </h3>
          </div>
        </div>
        {/* Lecture Sidebar  */}
        <div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0">
          <h2 className="font-semibold text-xl mb-4">Course Lecture</h2>
          <div className="flex-1 overflow-y-auto">
            {lectures.map((lecture) => (
              <Card
                key={lecture._id}
                className={`mb-3 hover:cursor-pointer transition transform ${
                  lecture._id === currentLecture?._id
                    ? "bg-gray-200 dark:dark:bg-gray-800"
                    : ""
                } `}
                onClick={() => handleSelectLecture(lecture)} // This is where the click happens
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    {/* Icon changes based on isLectureCompleted */}
                    {isLectureCompleted(lecture._id) ? (
                      <CheckCircle2 size={24} className="text-green-500 mr-2" />
                    ) : (
                      <CirclePlay size={24} className="text-gray-500 mr-2" />
                    )}
                    <div>
                      <CardTitle className="text-lg font-medium">
                        {lecture.lectureTitle}
                      </CardTitle>
                    </div>
                  </div>
                  {/* Badge appears based on isLectureCompleted */}
                  {isLectureCompleted(lecture._id) && (
                    <Badge
                      variant={"outline"}
                      className="bg-green-200 text-green-600"
                    >
                      Completed
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
