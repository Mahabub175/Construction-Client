"use client";

import { SubmitButton } from "@/components/Reusable/Button/CustomButton";
import CustomForm from "@/components/Reusable/Form/CustomForm";
import CustomInput from "@/components/Reusable/Form/CustomInput";
import CustomSelect from "@/components/Reusable/Form/CustomSelect";
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
  },
);

const GlobalSettingPage = () => {
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
    const toastId = toast.loading("Updating Global Setting...");
    try {
      const submittedData = { ...values };

      if (typeof values?.primaryColor === "object") {
        submittedData.primaryColor = values.primaryColor.toHexString();
      }
      if (typeof values?.secondaryColor === "object") {
        submittedData.secondaryColor = values.secondaryColor.toHexString();
      }

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
        if (file) {
          if (file.originFileObj) {
            submittedData[field] = await compressImage(file.originFileObj);
          } else {
            submittedData[field] = file.url;
          }
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
      toast.error("An error occurred while updating the global setting.", {
        id: toastId,
      });
    }
  };

  useEffect(() => {
    setFields(
      transformDefaultValues(data?.results, [
        {
          name: "aboutUsDetails1",
          value: data?.results?.aboutUsDetails1,
          errors: "",
        },
        {
          name: "aboutUsDetails2",
          value: data?.results?.aboutUsDetails2,
          errors: "",
        },
      ]),
    );
  }, [data]);

  return (
    <section className="lg:w-4/6 mx-auto overflow-hidden">
      <Divider orientation="left" orientationMargin={0}>
        Global Settings
      </Divider>
      <CustomForm fields={fields} onSubmit={onSubmit}>
        <CustomInput name={"name"} label={"Website Name"} required />
        <CustomInput
          name={"description"}
          type={"textarea"}
          label={"Website Description"}
        />
        <CustomSelect
          name={"aboutUsDetails1"}
          label={"About Us Details 1"}
          required
          mode="tags"
          options={[]}
        />
        <CustomSelect
          name={"aboutUsDetails2"}
          label={"About Us Details 2"}
          required
          mode="tags"
          options={[]}
        />

        <div className="two-grid">
          <CustomInput
            name={"businessNumber"}
            label={"Business Number"}
            type={"number"}
          />
          <CustomInput name={"businessAddress"} label={"Business Address"} />
          <CustomInput name={"businessLocation"} label={"Business Location"} />
          <CustomInput name={"businessSlogan"} label={"Business Slogan"} />
          <CustomInput
            name={"businessFacebook"}
            label={"Business Facebook URL"}
          />
          <CustomInput
            name={"businessTwitter"}
            label={"Business Twitter URL"}
          />
          <CustomInput
            name={"businessInstagram"}
            label={"Business Instagram URL"}
          />
          <CustomInput
            name={"businessLinkedin"}
            label={"Business Linkedin URL"}
          />
          <CustomInput
            name={"businessYoutube"}
            label={"Business Youtube URL"}
          />
          <CustomInput name={"businessEmail"} label={"Business Email"} />
          <CustomInput
            name={"businessWhatsapp"}
            label={"Business Whatsapp Number"}
            type={"number"}
          />
          <CustomInput
            name={"businessWorkHours"}
            label={"Business Work Hours"}
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

          <Form.Item name="primaryColor" label="Website Primary Color" required>
            <ColorPicker showText />
          </Form.Item>
          <Form.Item
            name="secondaryColor"
            label="Website Secondary Color"
            required
          >
            <ColorPicker showText />
          </Form.Item>
        </div>

        <div className="flex justify-center lg:my-10 mb-5 lg:mb-0">
          <SubmitButton text={"Save"} loading={isLoading} fullWidth />
        </div>
      </CustomForm>
    </section>
  );
};

export default GlobalSettingPage;
