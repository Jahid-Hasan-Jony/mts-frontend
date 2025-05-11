import React from "react";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Breadcrumb from "../../components/common/Breadcrumb";

// Utility function for form input rendering
const FormField = ({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  error,
}: {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  error?: string;
}) => (
  <div className="relative mb-6">
    <label htmlFor={id} className="text-accent block text-sm font-medium">
      {label}
    </label>
    {type === "textarea" ? (
      <textarea
        id={id}
        name={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border-accent focus:border-primary text-accent placeholder-accent mt-2 h-32 w-full resize-none border-b-2 text-base focus:outline-none"
      />
    ) : (
      <input
        id={id}
        type={type}
        name={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border-accent focus:border-primary text-accent placeholder-accent mt-2 h-10 w-full border-b-2 text-base focus:outline-none"
      />
    )}
    {error && <p className="text-sm text-red-500">{error}</p>}
  </div>
);

const ContactPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    name: string;
    email: string;
    phone: string;
    message: string;
  }>();

  const onSubmit = (data: {
    name: string;
    email: string;
    phone: string;
    message: string;
  }) => {
    console.log("Form Data:", data);
    toast.success(
      "Congratulations, Registration successful! Please Login to continue",
      {
        position: "top-center",
        autoClose: 5000,
      },
    );
    navigate("/success");
  };

  const onError = (errors: FieldErrors) => {
    console.error("Form Errors:", errors);
    toast.error("Please fix the errors and try again.", {
      position: "top-center",
      autoClose: 5000,
    });
  };

  const Contact = "Contact Us";

  return (
    <div className="bg-background font-primary w-full px-4 pt-2 sm:px-6 md:px-8 lg:px-4 xl:px-8">
      <Breadcrumb signin={Contact} />
      {/* Main Form Container  */}
      <div className="mx-auto mt-25 max-w-screen-lg px-4 pb-25 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left Section - Outside the border  */}
          <div className="flex h-full flex-col items-center justify-center space-y-6 text-center">
            <h1 className="text-accent text-5xl font-extrabold">Welcome</h1>
            <p className="text-accent text-lg">
              We would love to hear from you. Please fill out the form below to
              get in touch with us.
            </p>
          </div>

          {/* Right Section - Inside the border  */}
          <div className="rounded-xl border-2 border-gray-400 p-8 shadow-lg">
            <form
              onSubmit={handleSubmit(onSubmit, onError)}
              className="space-y-6"
            >
              {/* Name  */}
              <Controller
                name="name"
                control={control}
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                  <FormField
                    {...field}
                    id="name"
                    label="Your Name"
                    type="text"
                    placeholder="Enter your full name"
                    error={errors.name?.message}
                  />
                )}
              />

              {/* Email  */}
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                    message: "Invalid email address",
                  },
                }}
                render={({ field }) => (
                  <FormField
                    {...field}
                    id="email"
                    label="Your Email"
                    type="email"
                    placeholder="Enter your email address"
                    error={errors.email?.message}
                  />
                )}
              />

              {/* Phone  */}
              <Controller
                name="phone"
                control={control}
                rules={{
                  pattern: {
                    value: /^[0-9]{8,20}$/,
                    message: "Phone number must be between 10 to 15 digits",
                  },
                }}
                render={({ field }) => (
                  <FormField
                    {...field}
                    id="phone"
                    label="Your Phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    error={errors.phone?.message}
                  />
                )}
              />

              {/* Message  */}
              <Controller
                name="message"
                control={control}
                rules={{ required: "Message is required" }}
                render={({ field }) => (
                  <FormField
                    {...field}
                    id="message"
                    label="Your Message"
                    type="textarea"
                    placeholder="Write your message here"
                    error={errors.message?.message}
                  />
                )}
              />

              {/* Submit */}
              <div className="flex justify-center">
                <button
                  className="text-background bg-primary hover:text-accent relative flex items-center overflow-hidden rounded-full px-6 py-2 text-base font-bold shadow-md transition-all duration-400 ease-in-out before:absolute before:top-0 before:-left-full before:z-[-1] before:h-full before:w-full before:rounded-full before:bg-gradient-to-r before:from-blue-800 before:to-blue-300 before:transition-all before:duration-800 before:ease-in-out hover:scale-105 hover:shadow-lg hover:before:left-0 active:scale-90 sm:px-8 sm:text-lg md:px-10 lg:px-12"
                  type="submit"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ContactPage;
