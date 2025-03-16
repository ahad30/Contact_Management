"use client";
import React from "react";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZInputTwo from "@/components/Form/ZInputTwo";
import { useAppDispatch } from "@/redux/Hook/Hook";
import { setIsEditModalOpen } from "@/redux/Modal/ModalSlice";
import { useUpdatePartnerGoalsMutation } from "@/redux/Feature/Admin/partnerGoals/partnerGoals";
import ZSelect from "@/components/Form/ZSelect";
import ZMultipleImage from "@/components/Form/ZMultipleImage";
import axios from "axios";
import { toast } from "sonner";
import ZInputTextArea from "@/components/Form/ZInputTextArea";

const EditPartner = ({ selectedPartner }) => {
  const dispatch = useAppDispatch();
  const [updatePartnerGoals, { isLoading, isError, error, isSuccess, data }] = useUpdatePartnerGoalsMutation();

  const handleSubmit = async (formData) => {
    try {
      let uploadedUrls = [...(selectedPartner.brandsImage || [])];

      // Upload new images if any
      if (formData.brandsImage) {
        for (const file of formData.brandsImage) {
          if (file.originFileObj) {
            const image_hosting_key = process.env.NEXT_PUBLIC_HOSTING_KEY;
            const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
            
            const imageFile = new FormData();
            imageFile.append('image', file.originFileObj);
            
            const res = await axios.post(image_hosting_api, imageFile);

            if (res?.data?.success) {
              uploadedUrls.push(res.data.data.display_url);
            }
          }
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

      updatePartnerGoals({
        id: selectedPartner._id,
        data: partnerData
      });
    } catch (error) {
      console.error('Error uploading images:', error);
      toast.error('Error updating partner. Please try again.');
    }
  };

  return (
    <ZFormTwo
      isLoading={isLoading}
      isSuccess={isSuccess}
      isError={isError}
      error={error}
      submit={handleSubmit}
      closeModal={() => dispatch(setIsEditModalOpen())}
      formType={"edit"}
      buttonName={"Update"}
      data={data}
    >
      <div className="grid grid-cols-1 gap-3 mt-10">
        <ZInputTwo
          name="title"
          label="Title"
          placeholder="Enter title"       
          value={selectedPartner?.title}
        />
        <ZInputTextArea
          name="description"
          label="Description"
          placeholder="Enter description"
          
          value={selectedPartner?.description}
        />
        <ZInputTwo
          name="statTitle1"
          label="First Stat Title"
          placeholder="Enter first stat title"
          
          value={selectedPartner?.statTitle1}
        />
        <ZInputTwo
          name="stateValue1"
          label="First Stat Value"
          placeholder="Enter first stat value"
          
          value={selectedPartner?.stateValue1}
        />
        <ZInputTwo
          name="statTitle2"
          label="Second Stat Title"
          placeholder="Enter second stat title"
          
          value={selectedPartner?.statTitle2}
        />
        <ZInputTwo
          name="stateValue2"
          label="Second Stat Value"
          placeholder="Enter second stat value"
          
          value={selectedPartner?.stateValue2}
        />
        <ZMultipleImage
          name="brandsImage"
          label="Images(.jpg, .png, .jpeg)"      
          defaultValue={selectedPartner?.brandsImage?.map((url, index) => ({
            uid: `-${index}`,
            name: `Brand Image ${index + 1}`,
            status: 'done',
            url: url
          }))}
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
            { label: "ServicesOverview", value: "ServicesOverview" }
          ]}
          placeholder="Select layout"
          
          value={selectedPartner?.selectLayout}
        />
      </div>
    </ZFormTwo>
  );
};

export default EditPartner; 