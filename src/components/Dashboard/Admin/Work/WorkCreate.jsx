import CustomForm from "@/components/Reusable/Form/CustomForm";
import FormButton from "@/components/Shared/FormButton";
import { appendToFormData } from "@/utilities/lib/appendToFormData";
import { toast } from "sonner";
import { compressImage } from "@/utilities/lib/compressImage";
import { useAddWorkMutation } from "@/redux/services/work/workApi";
import WorkForm from "./WorkForm.jsx";
import CustomModal from "@/components/Reusable/Modal/CustomModal.jsx";

const WorkCreate = ({ open, setOpen }) => {
  const [addWork, { isLoading }] = useAddWorkMutation();

  const onSubmit = async (values) => {
    const toastId = toast.loading("Creating Work...");

    try {
      const submittedData = {
        ...values,
      };

      if (values?.mainImage) {
        submittedData.mainImage = await compressImage(
          values?.mainImage[0].originFileObj
        );
      }

      if (values?.images?.length > 0) {
        submittedData.images = values?.images.map((image) => {
          return image?.originFileObj;
        });
      }

      const data = new FormData();

      appendToFormData(submittedData, data);
      const res = await addWork(data);
      if (res.error) {
        toast.error(res?.error?.data?.errorMessage, { id: toastId });
      }
      if (res.data.success) {
        toast.success(res.data.message, { id: toastId });
        setOpen(false);
      }
    } catch (error) {
      console.error("Error creating Work:", error);
      toast.error("Error creating Work", { id: toastId });
    }
  };

  return (
    <CustomModal open={open} setOpen={setOpen} title="Create Work">
      <CustomForm onSubmit={onSubmit}>
        <WorkForm />

        <FormButton setOpen={setOpen} loading={isLoading} />
      </CustomForm>
    </CustomModal>
  );
};

export default WorkCreate;
