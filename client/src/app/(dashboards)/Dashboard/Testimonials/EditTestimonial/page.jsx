"use client";
import React, { useState } from "react";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZInputTwo from "@/components/Form/ZInputTwo";
import { useAppDispatch } from "@/redux/Hook/Hook";
import { setIsEditModalOpen } from "@/redux/Modal/ModalSlice";
import { useUpdateTestimonialMutation } from "@/redux/Feature/Admin/testimonials/testimonials";
import ZImageInput from "@/components/Form/ZImageInput";
import ZInputTextArea from "@/components/Form/ZInputTextArea";
import axios from "axios";
import { toast } from "sonner";

const EditTestimonial = ({ selectedTestimonial }) => {
  const dispatch = useAppDispatch();
  const [updateTestimonial, { isLoading, isError, error, isSuccess, data }] = useUpdateTestimonialMutation();

  const handleSubmit = async (formData) => {
    try {
      let imageUrl = selectedTestimonial?.profileImage;

      if (formData.profileImage) {
        const image_hosting_key = process.env.NEXT_PUBLIC_HOSTING_KEY;
        const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
        
        const imageFile = new FormData();
        imageFile.append('image', formData.profileImage);
        
        const res = await axios.post(image_hosting_api, imageFile);

        if (res?.data?.success) {
          imageUrl = res.data.data.display_url;
        }
      }

      if (!imageUrl && !formData.profileImage) {
        toast.error('Profile image is required');
        return;
      }

      const testimonialData = {
        companyName: formData.companyName,
        description: formData.description,
        authorName: formData.authorName,
        profileImage: imageUrl,
      };

      updateTestimonial({ id: selectedTestimonial.id, data: testimonialData });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Error updating testimonial. Please try again.');
    }
  };

  const handleCloseModal = () => {
    dispatch(setIsEditModalOpen());
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
        formType="edit"
        data={data}
        buttonName="Update Testimonial"
      >
        <div className="grid grid-cols-1 gap-3 mt-10">
          <ZInputTwo
            name="companyName"
            label="Company Name"
            value={selectedTestimonial?.companyName}
            placeholder="Enter company name"
          />
          <ZInputTextArea
            name="description"
            label="Testimonial"
            value={selectedTestimonial?.description}
            placeholder="Enter testimonial"
          />
          <ZInputTwo
            name="authorName"
            label="Author Name"
            value={selectedTestimonial?.authorName}
            placeholder="Enter author name"
          />
          <ZImageInput
            name="profileImage"
            label="Profile Image"
            defaultValue={selectedTestimonial?.profileImage ? [
              {
                uid: '-1',
                name: 'Current Image',
                status: 'done',
                url: selectedTestimonial?.profileImage,
              },
            ] : []}
          />
        </div>
      </ZFormTwo>
    </div>
  );
};

export default EditTestimonial; 