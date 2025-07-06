import { Button } from "@/components/ui/button";
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
import { useCreateCourseMutation } from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("");

  const [createCourse, { data, isLoading, error, isSuccess }] =
    useCreateCourseMutation();

  const navigate = useNavigate();

  const getSelectedCategory = (value) => {
    setCategory(value);
  };

  const createCourseHandler = async () => {
    await createCourse({ courseTitle, category });
  };

  // for displaying toast
  useEffect(()=>{
    if(isSuccess){
        toast.success(data?.message || "Course created.");
        navigate("/admin/course");
    }
  },[isSuccess, error])

  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Lets add course, add some basic course details for your new course
        </h1>
        
      </div>
      <div className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            placeholder="Your Course Name"
          />
        </div>
        <div>
          <Label>Category</Label>
          <Label>Category</Label>
<Select onValueChange={getSelectedCategory}>
  <SelectTrigger className="w-[250px]"> {/* Increased width for longer names */}
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
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate("/admin/course")}>
            Back
          </Button>
          <Button disabled={isLoading} onClick={createCourseHandler}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
