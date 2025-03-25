import FileUploader from "@/components/Reusable/Form/FileUploader";
import CustomInput from "@/components/Reusable/Form/CustomInput";

const ShopForm = ({ attachment }) => {
  return (
    <>
      <CustomInput name="name" label="Project Name" />

      <CustomInput
        name="description"
        label="Project Description"
        type={"textarea"}
      />

      <FileUploader
        defaultValue={attachment}
        label="Project Image"
        name="attachment"
        required={true}
      />
    </>
  );
};

export default ShopForm;
