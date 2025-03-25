"use client";

import CustomForm from "@/components/Reusable/Form/CustomForm";
import CustomSelect from "@/components/Reusable/Form/CustomSelect";
import FormButton from "@/components/Shared/FormButton";
import { appendToFormData } from "@/utilities/lib/appendToFormData";
import { transformDefaultValues } from "@/utilities/lib/transformedDefaultValues";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ServiceForm from "./ServiceForm.jsx";
import { compressImage } from "@/utilities/lib/compressImage";
import {
  useGetSingleServiceQuery,
  useUpdateServiceMutation,
} from "@/redux/services/service/serviceApi";
import CustomModal from "@/components/Reusable/Modal/CustomModal.jsx";

const ServiceEdit = ({ open, setOpen, itemId }) => {
  const [fields, setFields] = useState([]);

  const { data: serviceData, isFetching: isServiceFetching } =
    useGetSingleServiceQuery(itemId, {
      skip: !itemId,
    });

  const [updateService, { isLoading }] = useUpdateServiceMutation();

  const onSubmit = async (values) => {
    const toastId = toast.loading("Updating Service...");
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

      const updatedServiceData = new FormData();
      appendToFormData(submittedData, updatedServiceData);

      const updatedData = {
        id: itemId,
        data: updatedServiceData,
      };

      const res = await updateService(updatedData);

      if (res.data.success) {
        toast.success(res.data.message, { id: toastId });
        setOpen(false);
      } else {
        toast.error(res.data.errorMessage, { id: toastId });
      }
    } catch (error) {
      console.error("Error updating Service:", error);
      toast.error("An error occurred while updating the Service.", {
        id: toastId,
      });
    }
  };

  useEffect(() => {
    setFields(
      transformDefaultValues(serviceData, [
        {
          name: "list",
          value: serviceData?.list,
          errors: "",
        },
      ])
    );
  }, [serviceData]);

  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      title="Edit Service"
      loading={isServiceFetching}
    >
      <CustomForm onSubmit={onSubmit} fields={fields}>
        <ServiceForm attachment={serviceData?.attachment} />

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

export default ServiceEdit;
