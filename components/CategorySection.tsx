"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { Category } from "@prisma/client";

import { FullPostType } from "@/types";

import PostCard from "./PostCard";

interface CategorySectionProps {
  posts: FullPostType[] | null | undefined;
}

const CategorySection: React.FC<CategorySectionProps> = ({ posts }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/category");
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col space-y-16 pb-20">
      <div className="flex items-center justify-center flex-nowrap overflow-x-auto space-x-6">
        {categories.map((category) => (
            <Button key={category.id} variant="outline">
              {category.name}
            </Button>
        ))}
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-6">
        {posts ? (
          posts?.map((post) => (
              <PostCard key={post.id} post={post} />
          ))
        ) : (
          <div className="flex items-center justify-center">
            No posts avaible
          </div>
        )}
      </div>
    </div>
  );
};

export default CategorySection;
