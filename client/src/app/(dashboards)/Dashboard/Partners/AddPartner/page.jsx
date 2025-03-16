"use client";
import React from "react";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZInputTwo from "@/components/Form/ZInputTwo";
import { useAppDispatch } from "@/redux/Hook/Hook";
import { setIsAddModalOpen } from "@/redux/Modal/ModalSlice";
import { useAddPartnerGoalsMutation } from "@/redux/Feature/Admin/partnerGoals/partnerGoals";
import ZSelect from "@/components/Form/ZSelect";
import ZMultipleImage from "@/components/Form/ZMultipleImage";
import axios from "axios";
import { toast } from "sonner";
import ZInputTextArea from "@/components/Form/ZInputTextArea";

const AddPartner = () => {
  const dispatch = useAppDispatch();
  const [addPartnerGoals, { isLoading, isError, error, isSuccess, data }] = useAddPartnerGoalsMutation();

  const handleSubmit = async (formData) => {
    try {
      const uploadedUrls = [];
      
      // Upload each image
      for (const file of formData.brandsImage) {
        const image_hosting_key = process.env.NEXT_PUBLIC_HOSTING_KEY;
        const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
        
        const imageFile = new FormData();
        imageFile.append('image', file.originFileObj);
        console.log(file.originFileObj);
        
        const res = await axios.post(image_hosting_api, imageFile);

        if (res?.data?.success) {
          uploadedUrls.push(res.data.data.display_url);
        }
      }

      const partnerData = {
        title: formData.title,
        description: formData.description,
        statTitle1: formData.statTitle1,
        statTitle2: formData.statTitle2,
        stateValue1: formData.stateValue1,
        stateValue2: formData.stateValue2,
        brandsImage: uploadedUrls,
        selectLayout: formData.selectLayout
      };
      console.log(partnerData);

      addPartnerGoals(partnerData);
    } catch (error) {
      console.error('Error uploading images:', error);
      toast.error('Error uploading images. Please try again.');
    }
  };

  return (
    <ZFormTwo
      data={data}
      isLoading={isLoading}
      isSuccess={isSuccess}
      isError={isError}
      error={error}
      submit={handleSubmit}
      closeModal={() => dispatch(setIsAddModalOpen())}
      formType={"create"}
      buttonName={"Create"}
    >
      <div className="grid grid-cols-1 gap-3 mt-10">
        <ZInputTwo
          name="title"
          label="Title"
          placeholder="Enter title"
          required
        />
        <ZInputTextArea
          name="description"
          label="Description"
          placeholder="Enter description"
          
        />
        <ZInputTwo
          name="statTitle1"
          label="First Stat Title"
          placeholder="Enter first stat title"
          
        />
        <ZInputTwo
          name="stateValue1"
          label="First Stat Value"
          placeholder="Enter first stat value"
          
        />
        <ZInputTwo
          name="statTitle2"
          label="Second Stat Title"
          placeholder="Enter second stat title"
          
        />
        <ZInputTwo
          name="stateValue2"
          label="Second Stat Value"
          placeholder="Enter second stat value"
          
        />
        <ZMultipleImage
          name="brandsImage"
          label="Images(.jpg, .png, .jpeg)"
          
        />
        <ZSelect
          name="selectLayout"
          label="Select Layout"
          options={[
            { label: "Partner", value: "Partner" },
            { label: "Team", value: "Team" },
            { label: "Goals", value: "Goals" },
            { label: "Banner", value: "Banner" },
            { label: "Agency", value: "Agency" },
            { label: "ServicesOverview", value: "ServicesOverview" },
          ]}
          placeholder="Select layout"
          required
        />
      </div>
    </ZFormTwo>
  );
};

export default AddPartner; 