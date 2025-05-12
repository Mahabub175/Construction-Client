"use client";

import CustomForm from "@/components/Reusable/Form/CustomForm";
import CustomSelect from "@/components/Reusable/Form/CustomSelect";
import FormButton from "@/components/Shared/FormButton";
import { appendToFormData } from "@/utilities/lib/appendToFormData";
import { transformDefaultValues } from "@/utilities/lib/transformedDefaultValues";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import BrandForm from "./BrandForm.jsx";
import { compressImage } from "@/utilities/lib/compressImage";
import {
  useGetSingleBrandQuery,
  useUpdateBrandMutation,
} from "@/redux/services/brand/brandApi";
import CustomModal from "@/components/Reusable/Modal/CustomModal.jsx";

const BrandEdit = ({ open, setOpen, itemId }) => {
  const [fields, setFields] = useState([]);

  const { data: brandData, isFetching: isBrandFetching } =
    useGetSingleBrandQuery(itemId, {
      skip: !itemId,
    });

  const [updateBrand, { isLoading }] = useUpdateBrandMutation();

  const onSubmit = async (values) => {
    const toastId = toast.loading("Updating Brand...");
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

      const updatedBrandData = new FormData();
      appendToFormData(submittedData, updatedBrandData);

      const updatedData = {
        id: itemId,
        data: updatedBrandData,
      };

      const res = await updateBrand(updatedData);

      if (res.data.success) {
        toast.success(res.data.message, { id: toastId });
        setOpen(false);
      } else {
        toast.error(res.data.errorMessage, { id: toastId });
      }
    } catch (error) {
      console.error("Error updating Brand:", error);
      toast.error("An error occurred while updating the Brand.", {
        id: toastId,
      });
    }
  };

  useEffect(() => {
    setFields(transformDefaultValues(brandData));
  }, [brandData]);

  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      title="Edit Brand"
      loading={isBrandFetching}
    >
      <CustomForm onSubmit={onSubmit} fields={fields}>
        <BrandForm attachment={brandData?.attachment} />

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

export default BrandEdit;
