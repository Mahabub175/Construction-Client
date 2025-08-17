import CustomForm from "@/components/Reusable/Form/CustomForm";
import FormButton from "@/components/Shared/FormButton";
import { toast } from "sonner";
import { useAddNewsletterMutation } from "@/redux/services/newsletter/newsletterApi";
import NewsletterForm from "./NewsletterForm.jsx";
import CustomModal from "@/components/Reusable/Modal/CustomModal.jsx";

const NewsletterCreate = ({ open, setOpen }) => {
  const [addNewsletter, { isLoading }] = useAddNewsletterMutation();

  const onSubmit = async (values) => {
    const toastId = toast.loading("Creating Newsletter...");

    try {
      const submittedData = {
        ...values,
      };

      const res = await addNewsletter(submittedData);
      if (res.error) {
        toast.error(res?.error?.data?.errorMessage, { id: toastId });
      }
      if (res.data.success) {
        toast.success(res.data.message, { id: toastId });
        setOpen(false);
      }
    } catch (error) {
      console.error("Error creating Newsletter:", error);
      toast.error("Error creating Newsletter", { id: toastId });
    }
  };

  return (
    <CustomModal open={open} setOpen={setOpen} title="Create Newsletter">
      <CustomForm onSubmit={onSubmit}>
        <NewsletterForm />

        <FormButton setOpen={setOpen} loading={isLoading} />
      </CustomForm>
    </CustomModal>
  );
};

export default NewsletterCreate;
