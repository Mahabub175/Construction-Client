"use client";

import LoadingAnimation from "@/components/Shared/LoadingAnimation";
import { useGetAllBlogsQuery } from "@/redux/services/blog/blogApi";
import { Empty, Input } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";

const AllBlogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: blogsData, isLoading } = useGetAllBlogsQuery();

  const activeBlogs = blogsData?.results?.filter((item) => item?.status);

  const filteredBlogs = activeBlogs?.filter((blog) =>
    blog.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="my-container mb-20">
      <div className="flex justify-between mt-10 relative">
        <div></div>
        <div className="group w-full lg:w-2/6">
          <Input
            size="large"
            label="Search..."
            value={searchTerm}
            className="bg-white/70"
            placeholder="Search Blogs..."
            suffix={
              <CiSearch className="text-black text-2xl group-hover:text-primary duration-300 group-hover:scale-105" />
            }
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      {isLoading ? (
        <LoadingAnimation />
      ) : filteredBlogs?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-wrap gap-10 justify-center items-center mt-10">
          {filteredBlogs.map((item) => (
            <div
              key={item?.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden relative flex flex-col h-[500px] lg:w-[400px] mx-auto group"
            >
              <div className="overflow-hidden">
                <Image
                  src={item?.attachment}
                  alt={item?.title ?? "Blog Image"}
                  width={400}
                  height={250}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h4 className="text-xl font-bold mb-3">{item?.name}</h4>
                <p className="text-gray-600 leading-relaxed flex-grow">
                  {item?.shortDescription?.slice(0, 100)}
                </p>

                <div className="mt-auto pt-4">
                  <Link href={`/blog/${item?.slug}`}>
                    <button className="w-full py-3 font-medium rounded bg-transparent text-primary hover:text-white border border-primary hover:bg-primary transition-all duration-300">
                      Read More
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-lg text-gray-600 mt-20">
          <Empty size="large" />
          No blogs available.
        </div>
      )}
    </section>
  );
};

export default AllBlogs;
