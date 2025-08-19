"use client";

import { SubmitButton } from "@/components/Reusable/Button/CustomButton";
import CustomForm from "@/components/Reusable/Form/CustomForm";
import CustomInput from "@/components/Reusable/Form/CustomInput";
import FileUploader from "@/components/Reusable/Form/FileUploader";
import {
  useGetAllGlobalSettingQuery,
  useUpdateGlobalSettingMutation,
} from "@/redux/services/globalSetting/globalSettingApi";
import { appendToFormData } from "@/utilities/lib/appendToFormData";
import { compressImage } from "@/utilities/lib/compressImage";
import { transformDefaultValues } from "@/utilities/lib/transformedDefaultValues";
import { ColorPicker, Divider, Form } from "antd";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const CustomTextEditor = dynamic(
  () => import("@/components/Reusable/Form/CustomTextEditor"),
  {
    ssr: false,
  }
);

const AdminAccountSetting = () => {
  const [fields, setFields] = useState([]);
  const { data } = useGetAllGlobalSettingQuery();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  const [updateGlobalSetting, { isLoading }] = useUpdateGlobalSettingMutation();

  const onSubmit = async (values) => {
    const toastId = toast.loading("Updating Global Setting...");
    try {
      const submittedData = {
        ...values,
      };

      if (typeof values?.primaryColor === "object") {
        submittedData.primaryColor = values?.primaryColor?.toHexString();
      }
      if (typeof values?.secondaryColor === "object") {
        submittedData.secondaryColor = values?.secondaryColor?.toHexString();
      }

      if (!values?.logo?.[0].url) {
        submittedData.logo = await compressImage(
          values?.logo?.[0].originFileObj
        );
      }
      if (!values?.favicon?.[0].url) {
        submittedData.favicon = await compressImage(
          values?.favicon?.[0].originFileObj
        );
      }
      if (!values?.aboutBanner?.[0].url) {
        submittedData.aboutBanner = await compressImage(
          values?.aboutBanner?.[0].originFileObj
        );
      }
      if (!values?.serviceBanner?.[0].url) {
        submittedData.serviceBanner = await compressImage(
          values?.serviceBanner?.[0].originFileObj
        );
      }
      if (!values?.galleryBanner?.[0].url) {
        submittedData.galleryBanner = await compressImage(
          values?.galleryBanner?.[0].originFileObj
        );
      }
      if (!values?.workBanner?.[0].url) {
        submittedData.workBanner = await compressImage(
          values?.workBanner?.[0].originFileObj
        );
      }
      if (!values?.contactBanner?.[0].url) {
        submittedData.contactBanner = await compressImage(
          values?.contactBanner?.[0].originFileObj
        );
      }
      if (!values?.processBanner?.[0].url) {
        submittedData.processBanner = await compressImage(
          values?.processBanner?.[0].originFileObj
        );
      }
      if (!values?.shopBanner?.[0].url) {
        submittedData.shopBanner = await compressImage(
          values?.shopBanner?.[0].originFileObj
        );
      }
      if (!values?.blogBanner?.[0].url) {
        submittedData.blogBanner = await compressImage(
          values?.blogBanner?.[0].originFileObj
        );
      }
      const updatedUserData = new FormData();
      appendToFormData(submittedData, updatedUserData);

      const updatedData = {
        id: data?.results?._id,
        data: updatedUserData,
      };

      const res = await updateGlobalSetting(updatedData);

      if (res.data.success) {
        toast.success(res.data.message, { id: toastId });
      } else {
        toast.error(res.data.message, { id: toastId });
      }
    } catch (error) {
      console.error("Error updating global setting:", error);
      toast.error("An error occurred while updating the global setting.", {
        id: toastId,
      });
    }
  };

  useEffect(() => {
    setFields(transformDefaultValues(data?.results));
  }, [data]);

  return (
    <section className="lg:w-4/6 mx-auto">
      <Divider orientation="left" orientationMargin={0}>
        Global Settings
      </Divider>
      <CustomForm fields={fields} onSubmit={onSubmit}>
        <CustomInput name={"name"} label={"Website Name"} required={true} />
        <CustomInput
          name={"description"}
          type={"textarea"}
          label={"Website Description"}
          required={false}
        />
        <div className="two-grid">
          <FileUploader
            defaultValue={data?.results?.logo}
            label="Website Logo"
            name="logo"
            required={true}
          />

          <FileUploader
            defaultValue={data?.results?.favicon}
            label="Website Favicon"
            name="favicon"
            required={true}
          />
          <FileUploader
            defaultValue={data?.results?.aboutBanner}
            label="Website About Banner"
            name="aboutBanner"
            required={true}
          />
          <FileUploader
            defaultValue={data?.results?.serviceBanner}
            label="Website Service Banner"
            name="serviceBanner"
            required={true}
          />
          <FileUploader
            defaultValue={data?.results?.processBanner}
            label="Website Process Banner"
            name="processBanner"
            required={true}
          />
          <FileUploader
            defaultValue={data?.results?.workBanner}
            label="Website Work Banner"
            name="workBanner"
            required={true}
          />
          <FileUploader
            defaultValue={data?.results?.galleryBanner}
            label="Website Gallery Banner"
            name="galleryBanner"
            required={true}
          />
          <FileUploader
            defaultValue={data?.results?.shopBanner}
            label="Website Shop Banner"
            name="shopBanner"
            required={true}
          />
          <FileUploader
            defaultValue={data?.results?.contactBanner}
            label="Website Contact Banner"
            name="contactBanner"
            required={true}
          />
          <FileUploader
            defaultValue={data?.results?.blogBanner}
            label="Website Blog Banner"
            name="blogBanner"
            required={true}
          />
          <CustomInput
            name={"businessNumber"}
            label={"Business Number"}
            required={false}
            type={"number"}
          />
          <CustomInput
            name={"businessAddress"}
            label={"Business Address"}
            required={false}
          />
          <CustomInput
            name={"businessLocation"}
            label={"Business Location"}
            required={false}
          />
          <CustomInput
            name={"businessSlogan"}
            label={"Business Slogan"}
            required={false}
          />
          <CustomInput
            name={"businessFacebook"}
            label={"Business Facebook URL"}
            required={false}
          />
          <CustomInput
            name={"businessTwitter"}
            label={"Business Twitter URL"}
            required={false}
          />
          <CustomInput
            name={"businessInstagram"}
            label={"Business Instagram URL"}
            required={false}
          />
          <CustomInput
            name={"businessLinkedin"}
            label={"Business Linkedin URL"}
            required={false}
          />
          <CustomInput
            name={"businessYoutube"}
            label={"Business Youtube URL"}
            required={false}
          />
          <CustomInput
            name={"businessEmail"}
            label={"Business Email"}
            required={false}
          />
          <CustomInput
            name={"businessWhatsapp"}
            label={"Business Whatsapp Number"}
            required={false}
            type={"number"}
          />
          <CustomInput
            name={"businessWorkHours"}
            label={"Business Work Hours"}
            required={false}
          />

          <Form.Item label={"Delivery Details"} name={"delivery"} required>
            <CustomTextEditor />
          </Form.Item>
          <Form.Item label={"Pickup Details"} name={"pickupPoint"} required>
            <CustomTextEditor />
          </Form.Item>
          <Form.Item label={"Payment Details"} name={"paymentTerms"} required>
            <CustomTextEditor />
          </Form.Item>
          <Form.Item
            label={"Privacy Policy Details"}
            name={"privacyPolicy"}
            required
          >
            <CustomTextEditor />
          </Form.Item>
          <Form.Item
            label={"Refund & Return Policy Details"}
            name={"refundAndReturns"}
            required
          >
            <CustomTextEditor />
          </Form.Item>
          <Form.Item
            label={"Terms & Conditions Policy Details"}
            name={"termsAndConditions"}
            required
          >
            <CustomTextEditor />
          </Form.Item>

          <Form.Item
            name="primaryColor"
            label="Website Primary Color"
            required={true}
          >
            <ColorPicker showText />
          </Form.Item>
          <Form.Item
            name="secondaryColor"
            label="Website Secondary Color"
            required={true}
          >
            <ColorPicker showText />
          </Form.Item>
        </div>

        <div className="flex justify-center lg:my-10 mb-5 lg:mb-0">
          <SubmitButton text={"Save"} loading={isLoading} fullWidth={true} />
        </div>
      </CustomForm>
    </section>
  );
};

export default AdminAccountSetting;
