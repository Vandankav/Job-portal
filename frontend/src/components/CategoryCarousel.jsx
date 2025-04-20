import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Analyst",
  "Graphic Designer",
  "FullStack Developer",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="my-10 px-4">
      <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
        Explore Jobs by Category
      </h2>

      <Carousel className="w-full max-w-3xl mx-auto">
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <Button
                onClick={() => searchJobHandler(cat)}
                className="w-full rounded-full bg-gradient-to-r from-[#6A38C2] to-[#0072E0] text-white font-medium text-sm sm:text-base py-2 px-4 transition-all hover:scale-105 hover:shadow-md"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-white border-gray-300 hover:bg-gray-100" />
        <CarouselNext className="bg-white border-gray-300 hover:bg-gray-100" />
      </Carousel>
      <hr className="my-10" />
    </div>
  );
};

export default CategoryCarousel;
