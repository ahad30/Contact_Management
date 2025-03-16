"use client";
import React from "react";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZInputTwo from "@/components/Form/ZInputTwo";
import { useAppDispatch } from "@/redux/Hook/Hook";
import { setIsAddModalOpen } from "@/redux/Modal/ModalSlice";
import { useAddProjectMutation } from "@/redux/Feature/Admin/projects/projects";
import ZSelect from "@/components/Form/ZSelect";
import ZImageInput from "@/components/Form/ZImageInput";
import axios from "axios";
import ZInputTextArea from "@/components/Form/ZInputTextArea";
import { toast } from "sonner";


const AddProject = () => {
  const dispatch = useAppDispatch();
  const [addProject, { isLoading, isError, error, isSuccess, data }] = useAddProjectMutation();

  const handleSubmit = async (formData) => {
    try {
      if (!formData.image) {
        toast.error('Please upload an image for the project');
        return;
      }

      const image_hosting_key = process.env.NEXT_PUBLIC_HOSTING_KEY;
      const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
      
      const imageFile = new FormData();
      imageFile.append('image', formData.image);
      
      const res = await axios.post(image_hosting_api, imageFile, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      });

      if (res?.data?.success) {
        const projectData = {
          title: formData.title,
          description: formData.description,
          buttonTitle: formData.buttonTitle,
          image: res.data.data.display_url,
          tags: formData.tags,
          isLatest: formData.isLatest ? formData.isLatest : "No"
        };

        addProject(projectData);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      message.error('Error uploading image. Please try again.');
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
        buttonName="Create Project"
      >
        <div className="grid grid-cols-1 gap-3 mt-10">
          <ZInputTwo
            name="title"
            label="Project Title"
            placeholder="Enter project title"
          />
          <ZInputTextArea
            name="description"
            label="Project Description"
            placeholder="Enter project description"
          />
          <ZInputTwo
            name="buttonTitle"
            label="Button Title"
            placeholder="Enter button title"
          />
          <ZImageInput
            name="image"
            label="Project Image"
            // dragDrop={true}
          />
          <ZSelect
            name="tags"
            label="Tags"
            mode="multiple"
            options={[
              { label: "UI/UX Design", value: "UI/UX Design" },
              { label: "Development", value: "Development" },
              { label: "E-Commerce", value: "E-Commerce" },
              { label: "Digital Product", value: "Digital Product" },
              { label: "Property Portal", value: "Property Portal" },
            ]}
            placeholder="Add tags"
          />
          <ZSelect
            name="isLatest"
            label="Latest Project"
            options={[
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
            ]}
            placeholder="Select latest status"
          />
        </div>
      </ZFormTwo>
    </div>
  );
};

export default AddProject; 