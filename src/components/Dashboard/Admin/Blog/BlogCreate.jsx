import { useState } from "react";
import CustomForm from "@/components/Reusable/Form/CustomForm";
import FormButton from "@/components/Shared/FormButton";
import { useAddBlogMutation } from "@/redux/services/blog/blogApi";
import { appendToFormData } from "@/utilities/lib/appendToFormData";
import { toast } from "sonner";
import BlogForm from "./BlogForm";
import { compressImage } from "@/utilities/lib/compressImage";
import { Form } from "antd";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import CustomModal from "@/components/Reusable/Modal/CustomModal";

const CustomTextEditor = dynamic(
  () => import("@/components/Reusable/Form/CustomTextEditor"),
  {
    ssr: false,
  }
);
const BlogCreate = ({ open, setOpen }) => {
  const [content, setContent] = useState("");

  const [addBlog, { isLoading }] = useAddBlogMutation();

  const onSubmit = async (values) => {
    const toastId = toast.loading("Creating Blog...");

    try {
      let submittedData = {
        ...values,
        content,
        publishedAt: dayjs(values.publishedAt).format("YYYY-MM-DD"),
      };

      if (values.attachment) {
        submittedData.attachment = await compressImage(
          values.attachment[0].originFileObj
        );
      }

      const data = new FormData();

      appendToFormData(submittedData, data);
      const res = await addBlog(data);
      if (res.error) {
        toast.error(res?.error?.data?.errorMessage, { id: toastId });
      }
      if (res.data.success) {
        toast.success(res.data.message, { id: toastId });
        setOpen(false);
        setContent("");
      }
    } catch (error) {
      console.error("Error creating Blog:", error);
    }
  };

  return (
    <CustomModal open={open} setOpen={setOpen} title="Create Blog">
      <CustomForm onSubmit={onSubmit}>
        <BlogForm />
        <Form.Item label={"Blog Content"} name={"content"} required>
          <CustomTextEditor value={content} onChange={setContent} />
        </Form.Item>
        <FormButton setOpen={setOpen} loading={isLoading} />
      </CustomForm>
    </CustomModal>
  );
};

export default BlogCreate;
