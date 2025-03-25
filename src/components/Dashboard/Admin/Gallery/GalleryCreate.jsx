import CustomForm from "@/components/Reusable/Form/CustomForm";
import FormButton from "@/components/Shared/FormButton";
import { appendToFormData } from "@/utilities/lib/appendToFormData";
import { toast } from "sonner";
import { compressImage } from "@/utilities/lib/compressImage";
import { useAddGalleryMutation } from "@/redux/services/gallery/galleryApi";
import GalleryForm from "./GalleryForm.jsx";
import CustomModal from "@/components/Reusable/Modal/CustomModal.jsx";

const GalleryCreate = ({ open, setOpen }) => {
  const [addGallery, { isLoading }] = useAddGalleryMutation();

  const onSubmit = async (values) => {
    const toastId = toast.loading("Creating Gallery...");

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
      const res = await addGallery(data);
      if (res.error) {
        toast.error(res?.error?.data?.errorMessage, { id: toastId });
      }
      if (res.data.success) {
        toast.success(res.data.message, { id: toastId });
        setOpen(false);
      }
    } catch (error) {
      console.error("Error creating Gallery:", error);
      toast.error("Error creating Gallery", { id: toastId });
    }
  };

  return (
    <CustomModal open={open} setOpen={setOpen} title="Create Gallery">
      <CustomForm onSubmit={onSubmit}>
        <GalleryForm />

        <FormButton setOpen={setOpen} loading={isLoading} />
      </CustomForm>
    </CustomModal>
  );
};

export default GalleryCreate;
