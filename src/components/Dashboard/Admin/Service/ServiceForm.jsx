import CustomInput from "@/components/Reusable/Form/CustomInput";
import CustomSelect from "@/components/Reusable/Form/CustomSelect";
import FileUploader from "@/components/Reusable/Form/FileUploader";

const BlogForm = ({ attachment }) => {
  return (
    <>
      <CustomInput label={"Service Name"} name={"name"} required={true} />
      <CustomInput
        label={"Description"}
        name={"description"}
        required={true}
        type={"textarea"}
      />
      <CustomSelect
        label={"Service List"}
        name={"list"}
        mode={"tags"}
        required={true}
      />
      <FileUploader
        defaultValue={attachment}
        required={true}
        label={"Service Image"}
        name={"attachment"}
      />
    </>
  );
};

export default BlogForm;
