const data = [
  {
    id: 1,
    name: "Fast Building",
    description: "One Time Project Delivery With Quality & Precision",
  },
  {
    id: 2,
    name: "Smartly Execute",
    description: "Carefully Executed With Professionalism",
  },
  {
    id: 3,
    name: "Perfect Craftsmanship",
    description:
      "Desirability. Feasibility. Viability. Designed & Crafted To Meet Your Expectations",
  },
];

const SmallFeature = () => {
  return (
    <section className="py-12 bg-black/95">
      <div className="container mx-auto text-center">
        <div className="lg:grid gap-8 flex flex-wrap justify-center w-full lg:grid-cols-3">
          {data?.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded shadow-md p-6 hover:shadow-xl hover:shadow-primary transition-shadow duration-500 w-full"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {item.name}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SmallFeature;
