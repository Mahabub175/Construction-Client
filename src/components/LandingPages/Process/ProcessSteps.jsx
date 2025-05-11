import { processData } from "@/assets/data/processData";
import Image from "next/image";
import React from "react";

const ProcessSteps = () => {
  return (
    <section className="mb-10 my-container -mt-5 lg:-mt-10">
      <h3 className="text-center mb-10 font-medium text-lg">
        A good process is more than the end result. You deserve to feel
        comfortable and cared for by every team member, every step of the way.
        Our process makes it easy.
      </h3>
      <div className="lg:mt-20">
        {processData.map((item, i) => (
          <div
            key={item?.id}
            className={`flex flex-col items-center ${
              i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
            } justify-between gap-10 mb-10`}
          >
            <div className="lg:w-3/6">
              <h5 className="mb-2 font-medium">{item?.heading}</h5>
              <h3 className="font-medium text-xl lg:text-3xl mb-3 tracking-widest">
                {item?.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {item?.description}
              </p>
              <ul className="list-disc list-inside pl-5">
                {item?.lists?.map((list, i) => (
                  <li key={i} className="mb-2">
                    {list}
                  </li>
                ))}
              </ul>
            </div>

            <Image src={item?.image} alt="process" width={500} height={500} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProcessSteps;
