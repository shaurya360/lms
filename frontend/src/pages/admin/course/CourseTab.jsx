import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useEditCourseMutation,
  useGetCourseByIdQuery,
  usePublishCourseMutation,
} from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

// const CourseTab = () => {
  
//   const [input, setInput] = useState({
//     courseTitle: "",
//     subTitle: "",
//     description: "",
//     category: "",
//     courseLevel: "",
//     coursePrice: "",
//     courseThumbnail: "",
//   });

//   const params = useParams();
//   const courseId = params.courseId;
//   const { data: courseByIdData, isLoading: courseByIdLoading , refetch} =
//     useGetCourseByIdQuery(courseId);

//     const [publishCourse, {}] = usePublishCourseMutation();
 
//   useEffect(() => {
//     if (courseByIdData?.course) { 
//         const course = courseByIdData?.course;
//       setInput({
//         courseTitle: course.courseTitle,
//         subTitle: course.subTitle,
//         description: course.description,
//         category: course.category,
//         courseLevel: course.courseLevel,
//         coursePrice: course.coursePrice,
//         courseThumbnail: "",
//       });
//     }
//   }, [courseByIdData]);

//   const [previewThumbnail, setPreviewThumbnail] = useState("");
//   const navigate = useNavigate();

//   const [editCourse, { data, isLoading, isSuccess, error }] =
//     useEditCourseMutation();

//   const changeEventHandler = (e) => {
//     const { name, value } = e.target;
//     setInput({ ...input, [name]: value });
//   };

//   const selectCategory = (value) => {
//     setInput({ ...input, category: value });
//   };
//   const selectCourseLevel = (value) => {
//     setInput({ ...input, courseLevel: value });
//   };
//   // get file
//   const selectThumbnail = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setInput({ ...input, courseThumbnail: file });
//       const fileReader = new FileReader();
//       fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
//       fileReader.readAsDataURL(file);
//     }
//   };

//   const updateCourseHandler = async () => {
//     const formData = new FormData();
//     formData.append("courseTitle", input.courseTitle);
//     formData.append("subTitle", input.subTitle);
//     formData.append("description", input.description);
//     formData.append("category", input.category);
//     formData.append("courseLevel", input.courseLevel);
//     formData.append("coursePrice", input.coursePrice);
//     formData.append("courseThumbnail", input.courseThumbnail);

//     await editCourse({ formData, courseId });
//   };

//   const publishStatusHandler = async (action) => {
//     try {
//       const response = await publishCourse({courseId, query:action});
//       if(response.data){
//         refetch();
//         toast.success(response.data.message);
//       }
//     } catch (error) {
//       toast.error("Failed to publish or unpublish course");
//     }
//   }

//   useEffect(() => {
//     if (isSuccess) {
//       toast.success(data.message || "Course update.");
//     }
//     if (error) {
//       toast.error(error.data.message || "Failed to update course");
//     }
//   }, [isSuccess, error]);

//   if(courseByIdLoading) return <h1>Loading...</h1>
 
//   return (
//     <Card>
//       <CardHeader className="flex flex-row justify-between">
//         <div>
//           <CardTitle>Basic Course Information</CardTitle>
//           <CardDescription>
//             Make changes to your courses here. Click save when you're done.
//           </CardDescription>
//         </div>
//         <div className="space-x-2">
//           <Button disabled={courseByIdData?.course.lectures.length === 0} variant="outline" onClick={()=> publishStatusHandler(courseByIdData?.course.isPublished ? "false" : "true")}>
//             {courseByIdData?.course.isPublished ? "Unpublished" : "Publish"}
//           </Button>
//           <Button>Remove Course</Button>
//         </div>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-4 mt-5">
//           <div>
//             <Label>Title</Label>
//             <Input
//               type="text"
//               name="courseTitle"
//               value={input.courseTitle}
//               onChange={changeEventHandler}
//               placeholder="Ex. Fullstack developer"
//             />
//           </div>
//           <div>
//             <Label>Subtitle</Label>
//             <Input
//               type="text"
//               name="subTitle"
//               value={input.subTitle}
//               onChange={changeEventHandler}
//               placeholder="Ex. Become a Fullstack developer from zero to hero in 2 months"
//             />
//           </div>
//           <div>
//             <Label>Description</Label>
//             <RichTextEditor input={input} setInput={setInput} />
//           </div>
//           <div className="flex items-center gap-5">
//             <div>
//               <Label>Category</Label>
//               <Select
//                 defaultValue={input.category}
//                 onValueChange={selectCategory}
//               >
//                 <SelectTrigger className="w-[180px]">
//                   <SelectValue placeholder="Select a category" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectGroup>
//                     <SelectLabel>Category</SelectLabel>
//                     <SelectItem value="Next JS">Next JS</SelectItem>
//                     <SelectItem value="Data Science">Data Science</SelectItem>
//                     <SelectItem value="Frontend Development">
//                       Frontend Development
//                     </SelectItem>
//                     <SelectItem value="Fullstack Development">
//                       Fullstack Development
//                     </SelectItem>
//                     <SelectItem value="MERN Stack Development">
//                       MERN Stack Development
//                     </SelectItem>
//                     <SelectItem value="Javascript">Javascript</SelectItem>
//                     <SelectItem value="Python">Python</SelectItem>
//                     <SelectItem value="Docker">Docker</SelectItem>
//                     <SelectItem value="MongoDB">MongoDB</SelectItem>
//                     <SelectItem value="HTML">HTML</SelectItem>
//                   </SelectGroup>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div>
//               <Label>Course Level</Label>
//               <Select
//                 defaultValue={input.courseLevel}
//                 onValueChange={selectCourseLevel}
//               >
//                 <SelectTrigger className="w-[180px]">
//                   <SelectValue placeholder="Select a course level" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectGroup>
//                     <SelectLabel>Course Level</SelectLabel>
//                     <SelectItem value="Beginner">Beginner</SelectItem>
//                     <SelectItem value="Medium">Medium</SelectItem>
//                     <SelectItem value="Advance">Advance</SelectItem>
//                   </SelectGroup>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div>
//               <Label>Price in (INR)</Label>
//               <Input
//                 type="number"
//                 name="coursePrice"
//                 value={input.coursePrice}
//                 onChange={changeEventHandler}
//                 placeholder="199"
//                 className="w-fit"
//               />
//             </div>
//           </div>
//           <div>
//             <Label>Course Thumbnail</Label>
//             <Input
//               type="file"
//               onChange={selectThumbnail}
//               accept="image/*"
//               className="w-fit"
//             />
//             {previewThumbnail && (
//               <img
//                 src={previewThumbnail}
//                 className="e-64 my-2"
//                 alt="Course Thumbnail"
//               />
//             )}
//           </div>
//           <div>
//             <Button onClick={() => navigate("/admin/course")} variant="outline">
//               Cancel
//             </Button>
//             <Button disabled={isLoading} onClick={updateCourseHandler}>
//               {isLoading ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Please wait
//                 </>
//               ) : (
//                 "Save"
//               )}
//             </Button>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };




const CourseTab = () => {
  // ... existing state and hooks ...

  

  // ... rest of your component logic
  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: null, // Initialize as null for file input
  });

  const params = useParams();
  const courseId = params.courseId;
  const { data: courseByIdData, isLoading: courseByIdLoading, refetch } =
    useGetCourseByIdQuery(courseId);

  const [publishCourse] = usePublishCourseMutation(); // Destructure only what's needed
console.log("DEBUG: CourseByIdData:", courseByIdData);
  console.log("DEBUG: Is Loading:", courseByIdLoading);
  // State for thumbnail preview
  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const navigate = useNavigate();

  const [editCourse, { data, isLoading, isSuccess, error }] =
    useEditCourseMutation();

  // Effect to pre-fill form when course data is loaded
  useEffect(() => {
    if (courseByIdData?.course) {
      const course = courseByIdData.course;
      console.log("DEBUG: Course object from API inside useEffect:", course); // <-- Crucial log!

      setInput({
        courseTitle: course.courseTitle || "",
        subTitle: course.subTitle || "",
        description: course.description || "",
        category: course.category || "",
        courseLevel: course.courseLevel || "",
        coursePrice: course.coursePrice || "", // Ensure this is a number or empty string
        courseThumbnail: null,
      });

      if (course.courseThumbnail) {
        setPreviewThumbnail(course.courseThumbnail);
      } else {
        setPreviewThumbnail("");
      }
      // This console.log will show the state *before* it updates on the next render cycle,
      // but it confirms setInput was called with these values.
      console.log("DEBUG: Input state sent to setInput:", {
          courseTitle: course.courseTitle || "",
          subTitle: course.subTitle || "",
          description: course.description || "",
          category: course.category || "",
          courseLevel: course.courseLevel || "",
          coursePrice: course.coursePrice || "",
      });
    }
  }, [courseByIdData]);

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const selectCategory = (value) => {
    setInput({ ...input, category: value });
  };

  const selectCourseLevel = (value) => {
    setInput({ ...input, courseLevel: value });
  };

  // get file
  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const updateCourseHandler = async () => {
    const formData = new FormData();
    formData.append("courseTitle", input.courseTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);
    
    // Only append thumbnail if a new one is selected
    if (input.courseThumbnail) {
      formData.append("courseThumbnail", input.courseThumbnail);
    }

    await editCourse({ formData, courseId });
  };

  const publishStatusHandler = async (action) => {
    try {
      const response = await publishCourse({ courseId, query: action });
      if (response.data) {
        refetch(); // Refetch to get updated publish status
        toast.success(response.data.message);
      }
    } catch (error) {
      // Access error message if available from RTK Query error object
      toast.error(error?.data?.message || "Failed to publish or unpublish course");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course updated successfully.");
      refetch(); // Refetch after successful edit to update UI with latest data
    }
    if (error) {
      toast.error(error?.data?.message || "Failed to update course");
    }
  }, [isSuccess, error, data, refetch]); // Added data and refetch to dependencies

  if (courseByIdLoading) return <h1>Loading...</h1>;
  
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Basic Course Information</CardTitle>
          <CardDescription>
            Make changes to your courses here. Click save when you're done.
          </CardDescription>
        </div>
        <div className="space-x-2">
          {/* Disable publish button if no lectures */}
          <Button disabled={courseByIdData?.course.lectures.length === 0} variant="outline" onClick={() => publishStatusHandler(courseByIdData?.course.isPublished ? "false" : "true")}>
            {courseByIdData?.course.isPublished ? "Unpublish" : "Publish"}
          </Button>
          <Button variant="destructive">Remove Course</Button> {/* Changed to destructive for clarity */}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-5">
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              name="courseTitle"
              value={input.courseTitle}
              onChange={changeEventHandler}
              placeholder="Ex. Fullstack developer"
            />
          </div>
          <div>
            <Label>Subtitle</Label>
            <Input
              type="text"
              name="subTitle"
              value={input.subTitle}
              onChange={changeEventHandler}
              placeholder="Ex. Become a Fullstack developer from zero to hero in 2 months"
            />
          </div>
          <div>
            <Label>Description</Label>
            {/* Pass description value to RichTextEditor */}
            <RichTextEditor
              input={input}
              setInput={setInput}
              initialContent={input.description} // Pass description explicitly
            />
          </div>
          <div className="flex items-center gap-5">
            <div>
              <Label>Category</Label>
              <Select
                value={input.category} // Changed to 'value'
                onValueChange={selectCategory}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Web Development</SelectLabel>
                      <SelectItem value="Frontend Development">Frontend Development</SelectItem>
                      <SelectItem value="Backend Development">Backend Development</SelectItem>
                      <SelectItem value="Fullstack Development">Fullstack Development</SelectItem>
                      <SelectItem value="Next JS">Next JS</SelectItem>
                      <SelectItem value="React JS">React JS</SelectItem>
                      <SelectItem value="Angular">Angular</SelectItem>
                      <SelectItem value="Vue JS">Vue JS</SelectItem>
                      <SelectItem value="HTML">HTML</SelectItem>
                      <SelectItem value="CSS">CSS</SelectItem>
                      <SelectItem value="Tailwind CSS">Tailwind CSS</SelectItem>
                
                      <SelectLabel>Programming Languages</SelectLabel>
                      <SelectItem value="Javascript">Javascript</SelectItem>
                      <SelectItem value="Python">Python</SelectItem>
                      <SelectItem value="Java">Java</SelectItem>
                      <SelectItem value="C#">C#</SelectItem>
                      <SelectItem value="GoLang">GoLang</SelectItem>
                      <SelectItem value="Rust">Rust</SelectItem>
                      <SelectItem value="PHP">PHP</SelectItem>
                      <SelectItem value="TypeScript">TypeScript</SelectItem>
                
                      <SelectLabel>Data & AI</SelectLabel>
                      <SelectItem value="Data Science">Data Science</SelectItem>
                      <SelectItem value="Machine Learning">Machine Learning</SelectItem>
                      <SelectItem value="Deep Learning">Deep Learning</SelectItem>
                      <SelectItem value="Artificial Intelligence">Artificial Intelligence</SelectItem>
                      <SelectItem value="Data Analytics">Data Analytics</SelectItem>
                      <SelectItem value="Big Data">Big Data</SelectItem>
                      <SelectItem value="SQL">SQL</SelectItem>
                      <SelectItem value="NoSQL Databases">NoSQL Databases</SelectItem>
                      <SelectItem value="MongoDB">MongoDB</SelectItem>
                      <SelectItem value="PostgreSQL">PostgreSQL</SelectItem>
                
                      <SelectLabel>Cloud & DevOps</SelectLabel>
                      <SelectItem value="Cloud Computing">Cloud Computing</SelectItem>
                      <SelectItem value="AWS">AWS</SelectItem>
                      <SelectItem value="Azure">Azure</SelectItem>
                      <SelectItem value="Google Cloud Platform">Google Cloud Platform</SelectItem>
                      <SelectItem value="DevOps">DevOps</SelectItem>
                      <SelectItem value="Docker">Docker</SelectItem>
                      <SelectItem value="Kubernetes">Kubernetes</SelectItem>
                      <SelectItem value="CI/CD">CI/CD</SelectItem>
                
                      <SelectLabel>Mobile Development</SelectLabel>
                      <SelectItem value="Android Development">Android Development</SelectItem>
                      <SelectItem value="iOS Development">iOS Development</SelectItem>
                      <SelectItem value="React Native">React Native</SelectItem>
                      <SelectItem value="Flutter">Flutter</SelectItem>
                
                      <SelectLabel>Other Technologies</SelectLabel>
                      <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
                      <SelectItem value="Blockchain">Blockchain</SelectItem>
                      <SelectItem value="Game Development">Game Development</SelectItem>
                      <SelectItem value="UI/UX Design">UI/UX Design</SelectItem>
                      <SelectItem value="Version Control (Git)">Version Control (Git)</SelectItem>
                      <SelectItem value="Software Testing">Software Testing</SelectItem>
                      <SelectItem value="API Development">API Development</SelectItem>
                    </SelectGroup>
                  </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Course Level</Label>
              <Select
                value={input.courseLevel} // Changed to 'value'
                onValueChange={selectCourseLevel}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a course level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Course Level</SelectLabel>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Advance">Advance</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Price in (INR)</Label>
              <Input
                type="number"
                name="coursePrice"
                value={input.coursePrice}
                onChange={changeEventHandler}
                placeholder="199"
                className="w-fit"
              />
            </div>
          </div>
          <div>
            <Label>Course Thumbnail</Label>
            <Input
              type="file"
              onChange={selectThumbnail}
              accept="image/*"
              className="w-fit"
            />
            {(previewThumbnail || courseByIdData?.course.courseThumbnail) && ( // Show current or new preview
              <img
                src={previewThumbnail || courseByIdData?.course.courseThumbnail} // Display preview or existing thumbnail
                className="w-64 h-auto object-cover my-2" // Corrected className "e-64" to "w-64 h-auto"
                alt="Course Thumbnail"
              />
            )}
          </div>
          <div>
            <Button onClick={() => navigate("/admin/course")} variant="outline">
              Cancel
            </Button>
            <Button disabled={isLoading} onClick={updateCourseHandler}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};


export default CourseTab;
