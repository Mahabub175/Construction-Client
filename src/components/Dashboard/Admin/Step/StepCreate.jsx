import CustomForm from "@/components/Reusable/Form/CustomForm";
import FormButton from "@/components/Shared/FormButton";
import { appendToFormData } from "@/utilities/lib/appendToFormData";
import { toast } from "sonner";
import { compressImage } from "@/utilities/lib/compressImage";
import { useAddStepMutation } from "@/redux/services/step/stepApi";
import StepForm from "./StepForm.jsx";
import CustomModal from "@/components/Reusable/Modal/CustomModal.jsx";

const StepCreate = ({ open, setOpen }) => {
  const [addStep, { isLoading }] = useAddStepMutation();

  const onSubmit = async (values) => {
    const toastId = toast.loading("Creating Step...");

    try {
      const submittedData = {
        ...values,
      };

      if (values?.attachment) {
        submittedData.attachment = await compressImage(
          values.attachment[0].originFileObj,
        );
      }

      const data = new FormData();

      appendToFormData(submittedData, data);
      const res = await addStep(data);
      if (res.error) {
        toast.error(res?.error?.data?.errorMessage, { id: toastId });
      }
      if (res.data.success) {
        toast.success(res.data.message, { id: toastId });
        setOpen(false);
      }
    } catch (error) {
      console.error("Error creating Step:", error);
      toast.error("Error creating Step", { id: toastId });
    }
  };

  return (
    <CustomModal open={open} setOpen={setOpen} title="Create Step">
      <CustomForm onSubmit={onSubmit}>
        <StepForm />

        <FormButton setOpen={setOpen} loading={isLoading} />
      </CustomForm>
    </CustomModal>
  );
};

export default StepCreate;
