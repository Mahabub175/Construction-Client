"use client";

import CustomForm from "@/components/Reusable/Form/CustomForm";
import CustomSelect from "@/components/Reusable/Form/CustomSelect";
import FormButton from "@/components/Shared/FormButton";
import { appendToFormData } from "@/utilities/lib/appendToFormData";
import { transformDefaultValues } from "@/utilities/lib/transformedDefaultValues";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ShopForm from "./ShopForm.jsx";
import { compressImage } from "@/utilities/lib/compressImage";
import {
  useGetSingleShopQuery,
  useUpdateShopMutation,
} from "@/redux/services/shop/shopApi";
import CustomModal from "@/components/Reusable/Modal/CustomModal.jsx";

const ShopEdit = ({ open, setOpen, itemId }) => {
  const [fields, setFields] = useState([]);

  const { data: shopData, isFetching: isShopFetching } = useGetSingleShopQuery(
    itemId,
    {
      skip: !itemId,
    }
  );

  const [updateShop, { isLoading }] = useUpdateShopMutation();

  const onSubmit = async (values) => {
    const toastId = toast.loading("Updating Shop...");
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

      const updatedShopData = new FormData();
      appendToFormData(submittedData, updatedShopData);

      const updatedData = {
        id: itemId,
        data: updatedShopData,
      };

      const res = await updateShop(updatedData);

      if (res.data.success) {
        toast.success(res.data.message, { id: toastId });
        setOpen(false);
      } else {
        toast.error(res.data.errorMessage, { id: toastId });
      }
    } catch (error) {
      console.error("Error updating Shop:", error);
      toast.error("An error occurred while updating the Shop.", {
        id: toastId,
      });
    }
  };

  useEffect(() => {
    setFields(transformDefaultValues(shopData));
  }, [shopData]);

  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      title="Edit Shop"
      loading={isShopFetching}
    >
      <CustomForm onSubmit={onSubmit} fields={fields}>
        <ShopForm attachment={shopData?.attachment} />

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

export default ShopEdit;
