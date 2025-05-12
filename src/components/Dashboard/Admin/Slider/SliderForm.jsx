import FileUploader from "@/components/Reusable/Form/FileUploader";
import { Checkbox, Form } from "antd";

const SliderForm = ({ attachment }) => {
  return (
    <>
      {/* <CustomInput name="name" label="Banner Text" />
      <CustomInput name="buttonText" label="Button Text" /> */}
      <span className="text-primary">
        *Please Upload 2000x700 size images for best result*
      </span>
      <FileUploader
        defaultValue={attachment}
        label="Slider Image"
        name="attachment"
        required={true}
      />

      <Form.Item name={"bottomBanner"} valuePropName="checked">
        <Checkbox className="font-semibold">
          This Image Will Be Shown On Bottom Homepage Banner
        </Checkbox>
      </Form.Item>
    </>
  );
};

export default SliderForm;
