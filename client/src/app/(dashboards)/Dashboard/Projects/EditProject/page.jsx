"use client";
import React, { useState } from "react";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZInputTwo from "@/components/Form/ZInputTwo";
import { useAppDispatch } from "@/redux/Hook/Hook";
import { setIsEditModalOpen } from "@/redux/Modal/ModalSlice";
import { useUpdateProjectMutation } from "@/redux/Feature/Admin/projects/projects";
import ZSelect from "@/components/Form/ZSelect";
import ZImageInput from "@/components/Form/ZImageInput";
import axios from "axios";
import ZInputTextArea from "@/components/Form/ZInputTextArea";
import { toast } from "sonner";

const EditProject = ({ selectedProject }) => {
  const dispatch = useAppDispatch();
  const [updateProject, { isLoading, isError, error, isSuccess, data }] = useUpdateProjectMutation();

  const handleSubmit = async (formData) => {
    try {
      let imageUrl = selectedProject?.image;

      if (formData.image) {
        const image_hosting_key = process.env.NEXT_PUBLIC_HOSTING_KEY;
        const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
        
        const imageFile = new FormData();
        imageFile.append('image', formData.image);
        
        const res = await axios.post(image_hosting_api, imageFile);

        if (res?.data?.success) {
          imageUrl = res.data.data.display_url;
        }
      }

      if (!imageUrl && !formData.image) {
        toast.error('Project image is required');
        return;
      }

      const projectData = {
        title: formData.title,
        description: formData.description,
        buttonTitle: formData.buttonTitle,
        image: imageUrl,
        tags: formData.tags,
        isLatest: formData.isLatest
      };

      updateProject({ id: selectedProject.id, data: projectData });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Error updating project. Please try again.');
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
        buttonName="Update Project"
      >
        <div className="grid grid-cols-1 gap-3 mt-10">
          <ZInputTwo
            name="title"
            label="Project Title"
            value={selectedProject?.title}
            placeholder="Enter project title"
          />
          <ZInputTextArea
            name="description"
            label="Project Description"
            value={selectedProject?.description}
            placeholder="Enter project description"
          />
          <ZInputTwo
            name="buttonTitle"
            label="Button Title"
            value={selectedProject?.buttonTitle}
            placeholder="Enter button title"
          />
          <ZImageInput
            name="image"
            label="Project Image"
            defaultValue={selectedProject?.image ? [
              {
                uid: '-1',
                name: 'Current Image',
                status: 'done',
                url: selectedProject?.image,
              },
            ] : []}

          />
          <ZSelect
            name="tags"
            label="Tags"
            mode="multiple"
            value={selectedProject?.tags}
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
            value={selectedProject?.isLatest}
            placeholder="Select latest status"
          />
        </div>
      </ZFormTwo>
    </div>
  );
};

export default EditProject; 