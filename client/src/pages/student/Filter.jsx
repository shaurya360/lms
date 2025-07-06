import { Checkbox } from "@/components/ui/checkbox";
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
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";

const categories = [
  // Web Development
  { id: "Frontend Development", label: "Frontend Development" },
  { id: "Backend Development", label: "Backend Development" },
  { id: "Fullstack Development", label: "Fullstack Development" },
  
  { id: "Next JS", label: "Next JS" },
  { id: "React JS", label: "React JS" },
  { id: "Angular", label: "Angular" },
  { id: "Vue JS", label: "Vue JS" },
  { id: "HTML", label: "HTML" },
  { id: "CSS", label: "CSS" },
  { id: "Tailwind CSS", label: "Tailwind CSS" },

  // Programming Languages
  { id: "Javascript", label: "Javascript" },
  { id: "Python", label: "Python" },
  { id: "Java", label: "Java" },
  { id: "C#", label: "C#" },
  { id: "GoLang", label: "GoLang" },
  { id: "Rust", label: "Rust" },
  { id: "PHP", label: "PHP" },
  { id: "TypeScript", label: "TypeScript" },

  // Data & AI
  { id: "Data Science", label: "Data Science" },
  { id: "Machine Learning", label: "Machine Learning" },
  { id: "Deep Learning", label: "Deep Learning" },
  { id: "Artificial Intelligence", label: "Artificial Intelligence" },
  { id: "Data Analytics", label: "Data Analytics" },
  { id: "Big Data", label: "Big Data" },
  { id: "SQL", label: "SQL" },
  { id: "NoSQL Databases", label: "NoSQL Databases" },
  { id: "MongoDB", label: "MongoDB" },
  { id: "PostgreSQL", label: "PostgreSQL" },

  // Cloud & DevOps
  { id: "Cloud Computing", label: "Cloud Computing" },
  { id: "AWS", label: "AWS" },
  { id: "Azure", label: "Azure" },
  { id: "Google Cloud Platform", label: "Google Cloud Platform" },
  { id: "DevOps", label: "DevOps" },
  { id: "Docker", label: "Docker" },
  { id: "Kubernetes", label: "Kubernetes" },
  { id: "CI/CD", label: "CI/CD" },

  // Mobile Development
  { id: "Android Development", label: "Android Development" },
  { id: "iOS Development", label: "iOS Development" },
  { id: "React Native", label: "React Native" },
  { id: "Flutter", label: "Flutter" },

  // Other Technologies
  { id: "Cybersecurity", label: "Cybersecurity" },
  { id: "Blockchain", label: "Blockchain" },
  { id: "Game Development", label: "Game Development" },
  { id: "UI/UX Design", label: "UI/UX Design" },
  { id: "Version Control (Git)", label: "Version Control (Git)" },
  { id: "Software Testing", label: "Software Testing" },
  { id: "API Development", label: "API Development" },
];

const Filter = ({ handleFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prevCategories) => {
      const newCategories = prevCategories.includes(categoryId)
        ? prevCategories.filter((id) => id !== categoryId)
        : [...prevCategories, categoryId];

        handleFilterChange(newCategories, sortByPrice);
        return newCategories;
    });
  };

  const selectByPriceHandler = (selectedValue) => {
    setSortByPrice(selectedValue);
    handleFilterChange(selectedCategories, selectedValue);
  }
  return (
    <div className="w-full md:w-[20%]">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-lg md:text-xl">Filter Options</h1>
        <Select onValueChange={selectByPriceHandler}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort by price</SelectLabel>
              <SelectItem value="low">Low to High</SelectItem>
              <SelectItem value="high">High to Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Separator className="my-4" />
      <div>
        <h1 className="font-semibold mb-2">CATEGORY</h1>
        {categories.map((category) => (
          <div className="flex items-center space-x-2 my-2">
            <Checkbox
              id={category.id}
              onCheckedChange={() => handleCategoryChange(category.id)}
            />
            <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {category.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
