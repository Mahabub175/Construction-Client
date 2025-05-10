"use client";

import LoadingAnimation from "@/components/Shared/LoadingAnimation";
import { useGetSingleBlogBySlugQuery } from "@/redux/services/blog/blogApi";
import Image from "next/image";

const SingleBlogDetails = ({ params }) => {
  const { data: item, isLoading } = useGetSingleBlogBySlugQuery(params);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <section className="my-container mb-20 mt-20 lg:mt-32">
      <div className="space-y-4 mb-10">
        <p className="text-xl lg:text-4xl font-bold">{item?.name}</p>
        <p className="text-black/80 font-medium text-sm lg:text-base">
          Published At: {item?.publishedAt}
        </p>
      </div>
      <div>
        <Image
          src={item?.attachment}
          alt={item?.name}
          width={500}
          height={200}
          className="h-fit w-full"
        />
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: item?.content }}
        className="mt-10 lg:mt-20"
      />
    </section>
  );
};

export default SingleBlogDetails;
