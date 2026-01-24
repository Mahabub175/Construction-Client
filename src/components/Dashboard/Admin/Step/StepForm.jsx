import CustomInput from "@/components/Reusable/Form/CustomInput";
import CustomSelect from "@/components/Reusable/Form/CustomSelect";
import FileUploader from "@/components/Reusable/Form/FileUploader";

const BlogForm = ({ attachment }) => {
  return (
    <>
      <CustomInput label={"Step Order"} name={"order"} />
      <CustomInput label={"Step Heading"} name={"heading"} required={true} />
      <CustomInput label={"Step Title"} name={"title"} required={true} />
      <CustomInput
        label={"Description"}
        name={"description"}
        required={true}
        type={"textarea"}
      />
      <CustomSelect
        label={"Step List"}
        name={"list"}
        mode={"tags"}
        required={true}
      />
      <FileUploader
        defaultValue={attachment}
        required={true}
        label={"Step Image"}
        name={"attachment"}
      />
    </>
  );
};

export default BlogForm;
