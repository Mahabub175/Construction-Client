"use client";

import CustomForm from "@/components/Reusable/Form/CustomForm";
import CustomSelect from "@/components/Reusable/Form/CustomSelect";
import FormButton from "@/components/Shared/FormButton";
import { appendToFormData } from "@/utilities/lib/appendToFormData";
import { transformDefaultValues } from "@/utilities/lib/transformedDefaultValues";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import WorkForm from "./WorkForm.jsx";
import { compressImage } from "@/utilities/lib/compressImage";
import {
  useGetSingleWorkQuery,
  useUpdateWorkMutation,
} from "@/redux/services/work/workApi";
import CustomModal from "@/components/Reusable/Modal/CustomModal.jsx";
import { base_url_image } from "@/utilities/configs/base_api.js";
import { Form } from "antd";
import dynamic from "next/dynamic.js";

const CustomTextEditor = dynamic(
  () => import("@/components/Reusable/Form/CustomTextEditor"),
  {
    ssr: false,
  }
);

const WorkEdit = ({ open, setOpen, itemId }) => {
  const [fields, setFields] = useState([]);
  const [content, setContent] = useState("");

  const { data: workData, isFetching: isWorkFetching } = useGetSingleWorkQuery(
    itemId,
    {
      skip: !itemId,
    }
  );

  const [updateWork, { isLoading }] = useUpdateWorkMutation();

  const onSubmit = async (values) => {
    const toastId = toast.loading("Updating Work...");
    try {
      const submittedData = { ...values, description: content };

      const existingImages =
        values?.images
          ?.map((image) => image?.url?.replace(`${base_url_image}`, ""))
          .filter(Boolean) || [];

      const newImages = values?.images
        ?.filter((image) => image.originFileObj)
        .map((image) => image.originFileObj);

      submittedData.images = [...existingImages, ...newImages];

      if (
        values?.mainImage &&
        Array.isArray(values.mainImage) &&
        !values.mainImage[0]?.url
      ) {
        submittedData.mainImage = await compressImage(
          values.mainImage[0].originFileObj
        );
      } else {
        delete submittedData.mainImage;
      }

      const updatedWorkData = new FormData();
      appendToFormData(submittedData, updatedWorkData);

      const updatedData = {
        id: itemId,
        data: updatedWorkData,
      };

      const res = await updateWork(updatedData);

      if (res.data.success) {
        toast.success(res.data.message, { id: toastId });
        setOpen(false);
      } else {
        toast.error(res.data.errorMessage, { id: toastId });
      }
    } catch (error) {
      console.error("Error updating Work:", error);
      toast.error("An error occurred while updating the Work.", {
        id: toastId,
      });
    }
  };

  useEffect(() => {
    setFields(
      transformDefaultValues(workData, [
        {
          name: "list",
          value: workData?.list,
          errors: "",
        },
      ])
    );
    setContent(workData?.description);
  }, [workData]);

  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      title="Edit Work"
      loading={isWorkFetching}
    >
      <CustomForm onSubmit={onSubmit} fields={fields}>
        <WorkForm attachment={workData?.mainImage} />

        <Form.Item label={"Project Description"} name={"description"} required>
          <CustomTextEditor value={content} onChange={setContent} />
        </Form.Item>

        <CustomSelect
          name={"status"}
          label={"Status"}
          options={[
            { value: true, label: "Active" },
            { value: false, label: "Inactive" },
          ]}
        />

        <FormButton setOpen={setOpen} loading={isLoading} />
      </CustomForm>
    </CustomModal>
  );
};

export default WorkEdit;
