import CustomForm from "@/components/Reusable/Form/CustomForm";
import FormButton from "@/components/Shared/FormButton";
import { appendToFormData } from "@/utilities/lib/appendToFormData";
import { toast } from "sonner";
import { compressImage } from "@/utilities/lib/compressImage";
import { useAddBrandMutation } from "@/redux/services/brand/brandApi";
import BrandForm from "./BrandForm.jsx";
import CustomModal from "@/components/Reusable/Modal/CustomModal.jsx";

const BrandCreate = ({ open, setOpen }) => {
  const [addBrand, { isLoading }] = useAddBrandMutation();

  const onSubmit = async (values) => {
    const toastId = toast.loading("Creating Brand...");

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
      const res = await addBrand(data);
      if (res.error) {
        toast.error(res?.error?.data?.errorMessage, { id: toastId });
      }
      if (res.data.success) {
        toast.success(res.data.message, { id: toastId });
        setOpen(false);
      }
    } catch (error) {
      console.error("Error creating Brand:", error);
      toast.error("Error creating Brand", { id: toastId });
    }
  };

  return (
    <CustomModal open={open} setOpen={setOpen} title="Create Brand">
      <CustomForm onSubmit={onSubmit}>
        <BrandForm />

        <FormButton setOpen={setOpen} loading={isLoading} />
      </CustomForm>
    </CustomModal>
  );
};

export default BrandCreate;
