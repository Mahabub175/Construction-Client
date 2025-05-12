import CustomInput from "@/components/Reusable/Form/CustomInput";
import FileUploader from "@/components/Reusable/Form/FileUploader";
import MultipleFileUploader from "@/components/Reusable/Form/MultipleFIleUploader";

const WorkForm = ({ attachment }) => {
  return (
    <>
      <CustomInput label={"Project Name"} name={"name"} required={true} />
      <span className="text-primary">
        *Please Upload 2000x450 size images for best result*
      </span>
      <FileUploader
        defaultValue={attachment}
        required={true}
        label={"Project Main Image"}
        name={"mainImage"}
      />

      <MultipleFileUploader
        name={"images"}
        label={"Project Images"}
        required={true}
      />
    </>
  );
};

export default WorkForm;
