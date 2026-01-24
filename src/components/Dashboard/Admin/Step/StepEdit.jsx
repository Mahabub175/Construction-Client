"use client";

import CustomForm from "@/components/Reusable/Form/CustomForm";
import CustomSelect from "@/components/Reusable/Form/CustomSelect";
import FormButton from "@/components/Shared/FormButton";
import { appendToFormData } from "@/utilities/lib/appendToFormData";
import { transformDefaultValues } from "@/utilities/lib/transformedDefaultValues";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import StepForm from "./StepForm.jsx";
import { compressImage } from "@/utilities/lib/compressImage";
import {
  useGetSingleStepQuery,
  useUpdateStepMutation,
} from "@/redux/services/step/stepApi";
import CustomModal from "@/components/Reusable/Modal/CustomModal.jsx";

const StepEdit = ({ open, setOpen, itemId }) => {
  const [fields, setFields] = useState([]);

  const { data: stepData, isFetching: isStepFetching } = useGetSingleStepQuery(
    itemId,
    {
      skip: !itemId,
    },
  );

  const [updateStep, { isLoading }] = useUpdateStepMutation();

  const onSubmit = async (values) => {
    const toastId = toast.loading("Updating Step...");
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
          values.attachment[0].originFileObj,
        );
      } else {
        delete submittedData.attachment;
      }

      const updatedStepData = new FormData();
      appendToFormData(submittedData, updatedStepData);

      const updatedData = {
        id: itemId,
        data: updatedStepData,
      };

      const res = await updateStep(updatedData);

      if (res.data.success) {
        toast.success(res.data.message, { id: toastId });
        setOpen(false);
      } else {
        toast.error(res.data.errorMessage, { id: toastId });
      }
    } catch (error) {
      console.error("Error updating Step:", error);
      toast.error("An error occurred while updating the Step.", {
        id: toastId,
      });
    }
  };

  useEffect(() => {
    setFields(
      transformDefaultValues(stepData, [
        {
          name: "list",
          value: stepData?.list,
          errors: "",
        },
      ]),
    );
  }, [stepData]);

  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      title="Edit Step"
      loading={isStepFetching}
    >
      <CustomForm onSubmit={onSubmit} fields={fields}>
        <StepForm attachment={stepData?.attachment} />

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

export default StepEdit;
