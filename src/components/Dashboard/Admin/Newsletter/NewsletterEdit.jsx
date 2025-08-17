"use client";

import CustomForm from "@/components/Reusable/Form/CustomForm";
import CustomSelect from "@/components/Reusable/Form/CustomSelect";
import FormButton from "@/components/Shared/FormButton";
import { transformDefaultValues } from "@/utilities/lib/transformedDefaultValues";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import NewsletterForm from "./NewsletterForm.jsx";
import {
  useGetSingleNewsletterQuery,
  useUpdateNewsletterMutation,
} from "@/redux/services/newsletter/newsletterApi";
import CustomModal from "@/components/Reusable/Modal/CustomModal.jsx";

const NewsletterEdit = ({ open, setOpen, itemId }) => {
  const [fields, setFields] = useState([]);

  const { data: newsletterData, isFetching: isNewsletterFetching } =
    useGetSingleNewsletterQuery(itemId, {
      skip: !itemId,
    });

  const [updateNewsletter, { isLoading }] = useUpdateNewsletterMutation();

  const onSubmit = async (values) => {
    const toastId = toast.loading("Updating Newsletter...");
    try {
      const submittedData = {
        ...values,
      };

      const updatedData = {
        id: itemId,
        data: submittedData,
      };

      const res = await updateNewsletter(updatedData);

      if (res.data.success) {
        toast.success(res.data.message, { id: toastId });
        setOpen(false);
      } else {
        toast.error(res.data.errorMessage, { id: toastId });
      }
    } catch (error) {
      console.error("Error updating Newsletter:", error);
      toast.error("An error occurred while updating the Newsletter.", {
        id: toastId,
      });
    }
  };

  useEffect(() => {
    setFields(transformDefaultValues(newsletterData));
  }, [newsletterData]);

  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      title="Edit Newsletter"
      loading={isNewsletterFetching}
    >
      <CustomForm onSubmit={onSubmit} fields={fields}>
        <NewsletterForm />

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

export default NewsletterEdit;
