import ContactForm from "../Contact/ContactForm";

const HomeContact = () => {
  return (
    <section
      style={{
        backgroundImage:
          "url('https://genesisapi.moonsgallerysystem.com/uploads/1743005033166-homeContact.jpg')",
      }}
      className="py-10 bg-no-repeat bg-cover bg-center lg:h-[650px] relative flex items-center justify-center -mt-5 lg:mt-0"
    >
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="px-2 lg:px-5 text-white text-center max-w-3xl mx-auto relative z-10">
        <h2 className="text-xl lg:text-3xl font-medium mb-2 tracking-widest">
          WORK WITH US
        </h2>
        <p className="mb-6">Fill the form or send us an email</p>
        <ContactForm />
      </div>
    </section>
  );
};

export default HomeContact;
