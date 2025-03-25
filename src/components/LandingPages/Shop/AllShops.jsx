"use client";

import LoadingAnimation from "@/components/Shared/LoadingAnimation";
import { useGetAllGlobalSettingQuery } from "@/redux/services/globalSetting/globalSettingApi";
import { useGetAllShopsQuery } from "@/redux/services/shop/shopApi";
import { Empty, Image } from "antd";

const AllShops = () => {
  const { data: shopData, isLoading } = useGetAllShopsQuery();
  const { data: globalData } = useGetAllGlobalSettingQuery();

  if (isLoading) {
    return <LoadingAnimation />;
  }

  const whatsAppUrl = `https://wa.me/${globalData?.results?.businessWhatsapp}`;

  const activeShops = shopData?.results?.filter((shop) => shop.status);

  const generateWhatsAppLink = (shop) => {
    let message = `Hi, I would like to know more about your product.`;

    if (shop?.name) {
      message += `\n\nName: ${shop.name},`;
    }

    if (shop?.description) {
      message += `\nDescription: ${shop.description},`;
    }

    if (shop?.attachment) {
      message += `\nImage: ${shop.attachment}`;
    }

    return `${whatsAppUrl}?text=${encodeURIComponent(message)}`;
  };

  if (!activeShops || activeShops.length === 0) {
    return (
      <section className="mb-20">
        <div className="text-center text-lg text-gray-600 mt-20">
          <Empty size="large" />
          No Shop available.
        </div>
      </section>
    );
  }

  return (
    <section className="mb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center items-center gap-8">
          {activeShops?.map((shop) => (
            <div
              key={shop._id}
              className="bg-white rounded-lg hover:shadow overflow-hidden group transition-all duration-300"
            >
              <div className="relative">
                <Image
                  src={shop.attachment}
                  alt={shop.name}
                  className="w-full h-48 object-cover rounded-lg mx-auto"
                  width={300}
                  height={300}
                />
              </div>

              <div className="p-4 text-center">
                {shop?.name && (
                  <h3 className="text-sm -mt-4 mb-2 font-medium text-primary">
                    {shop.name}
                  </h3>
                )}
                <a
                  href={generateWhatsAppLink(shop)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded-full inline-block transition-all duration-300"
                >
                  Chat with us on WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllShops;
