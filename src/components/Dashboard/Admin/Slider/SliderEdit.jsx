"use client";

import CustomForm from "@/components/Reusable/Form/CustomForm";
import CustomSelect from "@/components/Reusable/Form/CustomSelect";
import FormButton from "@/components/Shared/FormButton";
import { appendToFormData } from "@/utilities/lib/appendToFormData";
import { transformDefaultValues } from "@/utilities/lib/transformedDefaultValues";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import SliderForm from "./SliderForm.jsx";
import { compressImage } from "@/utilities/lib/compressImage";
import {
  useGetSingleSliderQuery,
  useUpdateSliderMutation,
} from "@/redux/services/slider/sliderApi";
import CustomModal from "@/components/Reusable/Modal/CustomModal.jsx";

const SliderEdit = ({ open, setOpen, itemId }) => {
  const [fields, setFields] = useState([]);

  const { data: sliderData, isFetching: isSliderFetching } =
    useGetSingleSliderQuery(itemId, {
      skip: !itemId,
    });

  const [updateSlider, { isLoading }] = useUpdateSliderMutation();

  const onSubmit = async (values) => {
    const toastId = toast.loading("Updating Slider...");
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

      const updatedSliderData = new FormData();
      appendToFormData(submittedData, updatedSliderData);

      const updatedData = {
        id: itemId,
        data: updatedSliderData,
      };

      const res = await updateSlider(updatedData);

      if (res.data.success) {
        toast.success(res.data.message, { id: toastId });
        setOpen(false);
      } else {
        toast.error(res.data.errorMessage, { id: toastId });
      }
    } catch (error) {
      console.error("Error updating Slider:", error);
      toast.error("An error occurred while updating the Slider.", {
        id: toastId,
      });
    }
  };

  useEffect(() => {
    setFields(transformDefaultValues(sliderData));
  }, [sliderData]);

  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      title="Edit Slider"
      loading={isSliderFetching}
    >
      <CustomForm onSubmit={onSubmit} fields={fields}>
        <SliderForm attachment={sliderData?.attachment} />

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

export default SliderEdit;
