import CustomInput from "@/components/Reusable/Form/CustomInput";

const BrandForm = () => {
  return (
    <>
      <CustomInput
        name="email"
        label="Newsletter Email"
        type={"email"}
        required
      />
    </>
  );
};

export default BrandForm;
