import CustomForm from "@/components/Reusable/Form/CustomForm";
import FormButton from "@/components/Shared/FormButton";
import { appendToFormData } from "@/utilities/lib/appendToFormData";
import { toast } from "sonner";
import { compressImage } from "@/utilities/lib/compressImage";
import { useAddServiceMutation } from "@/redux/services/service/serviceApi";
import ServiceForm from "./ServiceForm.jsx";
import CustomModal from "@/components/Reusable/Modal/CustomModal.jsx";

const ServiceCreate = ({ open, setOpen }) => {
  const [addService, { isLoading }] = useAddServiceMutation();

  const onSubmit = async (values) => {
    const toastId = toast.loading("Creating Service...");

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
      const res = await addService(data);
      if (res.error) {
        toast.error(res?.error?.data?.errorMessage, { id: toastId });
      }
      if (res.data.success) {
        toast.success(res.data.message, { id: toastId });
        setOpen(false);
      }
    } catch (error) {
      console.error("Error creating Service:", error);
      toast.error("Error creating Service", { id: toastId });
    }
  };

  return (
    <CustomModal open={open} setOpen={setOpen} title="Create Service">
      <CustomForm onSubmit={onSubmit}>
        <ServiceForm />

        <FormButton setOpen={setOpen} loading={isLoading} />
      </CustomForm>
    </CustomModal>
  );
};

export default ServiceCreate;
