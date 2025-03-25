import FileUploader from "@/components/Reusable/Form/FileUploader";
import CustomInput from "@/components/Reusable/Form/CustomInput";
import { Checkbox, Form } from "antd";

const GalleryForm = ({ attachment }) => {
  return (
    <>
      <CustomInput name="name" label="Name" />
      <FileUploader
        defaultValue={attachment}
        label="Gallery Image"
        name="attachment"
        required={true}
      />
      <Form.Item name={"isFeatured"} valuePropName="checked">
        <Checkbox className="font-semibold">
          This Gallery Image Will Be Featured
        </Checkbox>
      </Form.Item>
    </>
  );
};

export default GalleryForm;
