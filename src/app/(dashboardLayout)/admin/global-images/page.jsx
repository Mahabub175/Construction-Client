"use client";

import { SubmitButton } from "@/components/Reusable/Button/CustomButton";
import CustomForm from "@/components/Reusable/Form/CustomForm";
import FileUploader from "@/components/Reusable/Form/FileUploader";
import {
  useGetAllGlobalSettingQuery,
  useUpdateGlobalSettingMutation,
} from "@/redux/services/globalSetting/globalSettingApi";
import { appendToFormData } from "@/utilities/lib/appendToFormData";
import { compressImage } from "@/utilities/lib/compressImage";
import { transformDefaultValues } from "@/utilities/lib/transformedDefaultValues";
import { Divider } from "antd";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const AdminAccountSetting = () => {
  const [fields, setFields] = useState([]);
  const { data } = useGetAllGlobalSettingQuery();
  const [updateGlobalSetting, { isLoading }] = useUpdateGlobalSettingMutation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const onSubmit = async (values) => {
    const toastId = toast.loading("Updating Global Images...");
    try {
      const submittedData = { ...values };

      const fileFields = [
        "logo",
        "favicon",
        "aboutBanner",
        "aboutImage1",
        "aboutImage2",
        "serviceBanner",
        "galleryBanner",
        "workBanner",
        "contactBanner",
        "processBanner",
        "shopBanner",
        "blogBanner",
        "whyUsImage1",
        "whyUsImage2",
        "homeShopImage",
      ];

      for (const field of fileFields) {
        const file = values?.[field]?.[0];

        if (file && !file?.url) {
          submittedData[field] = await compressImage(file.originFileObj);
        } else {
          delete submittedData[field];
        }
      }

      const formData = new FormData();
      appendToFormData(submittedData, formData);

      const updatedData = {
        id: data?.results?._id,
        data: formData,
      };

      const res = await updateGlobalSetting(updatedData);

      if (res?.data?.success) {
        toast.success(res.data.message, { id: toastId });
      } else {
        toast.error(res?.data?.message || "Update failed", { id: toastId });
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating the global Images.", {
        id: toastId,
      });
    }
  };

  useEffect(() => {
    setFields(transformDefaultValues(data?.results));
  }, [data]);

  return (
    <section className="lg:w-4/6 mx-auto overflow-hidden">
      <Divider orientation="left" orientationMargin={0}>
        Global Images
      </Divider>
      <CustomForm fields={fields} onSubmit={onSubmit}>
        <div className="two-grid">
          <FileUploader
            defaultValue={data?.results?.logo}
            label="Website Logo"
            name="logo"
            required
          />
          <FileUploader
            defaultValue={data?.results?.favicon}
            label="Website Favicon"
            name="favicon"
            required
          />
          <FileUploader
            defaultValue={data?.results?.aboutBanner}
            label="Website About Banner"
            name="aboutBanner"
            required
          />
          <FileUploader
            defaultValue={data?.results?.aboutImage1}
            label="Website About Image 1"
            name="aboutImage1"
            required
          />
          <FileUploader
            defaultValue={data?.results?.aboutImage2}
            label="Website About Image 2"
            name="aboutImage2"
            required
          />
          <FileUploader
            defaultValue={data?.results?.serviceBanner}
            label="Website Service Banner"
            name="serviceBanner"
            required
          />
          <FileUploader
            defaultValue={data?.results?.processBanner}
            label="Website Process Banner"
            name="processBanner"
            required
          />
          <FileUploader
            defaultValue={data?.results?.workBanner}
            label="Website Work Banner"
            name="workBanner"
            required
          />
          <FileUploader
            defaultValue={data?.results?.galleryBanner}
            label="Website Gallery Banner"
            name="galleryBanner"
            required
          />
          <FileUploader
            defaultValue={data?.results?.shopBanner}
            label="Website Shop Banner"
            name="shopBanner"
            required
          />
          <FileUploader
            defaultValue={data?.results?.contactBanner}
            label="Website Contact Banner"
            name="contactBanner"
            required
          />
          <FileUploader
            defaultValue={data?.results?.blogBanner}
            label="Website Blog Banner"
            name="blogBanner"
            required
          />
          <FileUploader
            defaultValue={data?.results?.whyUsImage1}
            label="Website Why Us Image 1"
            name="whyUsImage1"
            required
          />
          <FileUploader
            defaultValue={data?.results?.whyUsImage2}
            label="Website Why Us Image 2"
            name="whyUsImage2"
            required
          />
          <FileUploader
            defaultValue={data?.results?.homeShopImage}
            label="Website Home Shop Image"
            name="homeShopImage"
            required
          />
        </div>

        <div className="flex justify-center lg:my-10 mb-5 lg:mb-0">
          <SubmitButton text={"Save"} loading={isLoading} fullWidth />
        </div>
      </CustomForm>
    </section>
  );
};

export default AdminAccountSetting;
