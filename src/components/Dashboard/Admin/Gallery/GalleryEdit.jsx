"use client";

import CustomForm from "@/components/Reusable/Form/CustomForm";
import CustomSelect from "@/components/Reusable/Form/CustomSelect";
import FormButton from "@/components/Shared/FormButton";
import { appendToFormData } from "@/utilities/lib/appendToFormData";
import { transformDefaultValues } from "@/utilities/lib/transformedDefaultValues";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import GalleryForm from "./GalleryForm.jsx";
import { compressImage } from "@/utilities/lib/compressImage";
import {
  useGetSingleGalleryQuery,
  useUpdateGalleryMutation,
} from "@/redux/services/gallery/galleryApi";
import CustomModal from "@/components/Reusable/Modal/CustomModal.jsx";

const GalleryEdit = ({ open, setOpen, itemId }) => {
  const [fields, setFields] = useState([]);

  const { data: galleryData, isFetching: isGalleryFetching } =
    useGetSingleGalleryQuery(itemId, {
      skip: !itemId,
    });

  const [updateGallery, { isLoading }] = useUpdateGalleryMutation();

  const onSubmit = async (values) => {
    const toastId = toast.loading("Updating Gallery...");
    try {
      const submittedData = {
        ...values,
      };

      if (
        values?.attachment &&
        Array.isArray(values.attachment) &&
        !values.attachment[0]?.url
      ) {
        submittedData.attachment = await compressImage(
          values.attachment[0].originFileObj
        );
      } else {
        delete submittedData.attachment;
      }

      const updatedGalleryData = new FormData();
      appendToFormData(submittedData, updatedGalleryData);

      const updatedData = {
        id: itemId,
        data: updatedGalleryData,
      };

      const res = await updateGallery(updatedData);

      if (res.data.success) {
        toast.success(res.data.message, { id: toastId });
        setOpen(false);
      } else {
        toast.error(res.data.errorMessage, { id: toastId });
      }
    } catch (error) {
      console.error("Error updating Gallery:", error);
      toast.error("An error occurred while updating the Gallery.", {
        id: toastId,
      });
    }
  };

  useEffect(() => {
    setFields(transformDefaultValues(galleryData));
  }, [galleryData]);

  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      title="Edit Gallery"
      loading={isGalleryFetching}
    >
      <CustomForm onSubmit={onSubmit} fields={fields}>
        <GalleryForm attachment={galleryData?.attachment} />

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

export default GalleryEdit;
