import FileUploader from "@/components/Reusable/Form/FileUploader";
import CustomInput from "@/components/Reusable/Form/CustomInput";

const SliderForm = ({ attachment }) => {
  return (
    <>
      <CustomInput name="name" label="Banner Text" />
      <CustomInput name="buttonText" label="Button Text" />

      <FileUploader
        defaultValue={attachment}
        label="Slider Image"
        name="attachment"
        required={true}
      />
    </>
  );
};

export default SliderForm;
