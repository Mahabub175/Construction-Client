import CustomForm from "@/components/Reusable/Form/CustomForm";
import FormButton from "@/components/Shared/FormButton";
import { appendToFormData } from "@/utilities/lib/appendToFormData";
import { toast } from "sonner";
import { compressImage } from "@/utilities/lib/compressImage";
import { useAddShopMutation } from "@/redux/services/shop/shopApi";
import ShopForm from "./ShopForm.jsx";
import CustomModal from "@/components/Reusable/Modal/CustomModal.jsx";

const ShopCreate = ({ open, setOpen }) => {
  const [addShop, { isLoading }] = useAddShopMutation();

  const onSubmit = async (values) => {
    const toastId = toast.loading("Creating Shop...");

    try {
      const submittedData = {
        ...values,
      };

      if (values?.attachment) {
        submittedData.attachment = await compressImage(
          values.attachment[0].originFileObj
        );
      }

      const data = new FormData();

      appendToFormData(submittedData, data);
      const res = await addShop(data);
      if (res.error) {
        toast.error(res?.error?.data?.errorMessage, { id: toastId });
      }
      if (res.data.success) {
        toast.success(res.data.message, { id: toastId });
        setOpen(false);
      }
    } catch (error) {
      console.error("Error creating Shop:", error);
      toast.error("Error creating Shop", { id: toastId });
    }
  };

  return (
    <CustomModal open={open} setOpen={setOpen} title="Create Shop">
      <CustomForm onSubmit={onSubmit}>
        <ShopForm />

        <FormButton setOpen={setOpen} loading={isLoading} />
      </CustomForm>
    </CustomModal>
  );
};

export default ShopCreate;
