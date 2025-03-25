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
      <span className="text-primary">
        *Please Upload 2000x700 size images for best result*
      </span>
    </>
  );
};

export default SliderForm;
