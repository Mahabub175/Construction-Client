import FileUploader from "@/components/Reusable/Form/FileUploader";
import CustomInput from "@/components/Reusable/Form/CustomInput";

const BrandForm = ({ attachment }) => {
  return (
    <>
      <CustomInput name="name" label="Client Name" />
      <FileUploader
        defaultValue={attachment}
        label="Client Logo"
        name="attachment"
        required={true}
      />
    </>
  );
};

export default BrandForm;
