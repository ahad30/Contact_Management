"use client";
import React from "react";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZInputTwo from "@/components/Form/ZInputTwo";
import { useAppDispatch } from "@/redux/Hook/Hook";
import { setIsAddModalOpen } from "@/redux/Modal/ModalSlice";
import { useAddTestimonialMutation } from "@/redux/Feature/Admin/testimonials/testimonials";
import ZImageInput from "@/components/Form/ZImageInput";
import ZInputTextArea from "@/components/Form/ZInputTextArea";
import axios from "axios";
import { toast } from "sonner";

const AddTestimonial = () => {
  const dispatch = useAppDispatch();
  const [addTestimonial, { isLoading, isError, error, isSuccess, data }] = useAddTestimonialMutation();

  const handleSubmit = async (formData) => {
    try {
      if (!formData.profileImage) {
        toast.error('Please upload a profile image');
        return;
      }

      const image_hosting_key = process.env.NEXT_PUBLIC_HOSTING_KEY;
      const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
      
      const imageFile = new FormData();
      imageFile.append('image', formData.profileImage);
      
      const res = await axios.post(image_hosting_api, imageFile);

      if (res?.data?.success) {
        const testimonialData = {
          companyName: formData.companyName,
          description: formData.description,
          authorName: formData.authorName,
          profileImage: res.data.data.display_url,
        };

        addTestimonial(testimonialData);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Error uploading image. Please try again.');
    }
  };

  const handleCloseModal = () => {
    dispatch(setIsAddModalOpen());
  };

  return (
    <div>
      <ZFormTwo
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        error={error}
        submit={handleSubmit}
        closeModal={handleCloseModal}
        formType="create"
        data={data}
        buttonName="Create Testimonial"
      >
        <div className="grid grid-cols-1 gap-3 mt-10">
          <ZInputTwo
            name="companyName"
            label="Company Name"
            placeholder="Enter company name"
          />
          <ZInputTextArea
            name="description"
            label="Testimonial"
            placeholder="Enter testimonial"
          />
          <ZInputTwo
            name="authorName"
            label="Author Name"
            placeholder="Enter author name"
          />
          <ZImageInput
            name="profileImage"
            label="Profile Image"
          />
        </div>
      </ZFormTwo>
    </div>
  );
};

export default AddTestimonial; 