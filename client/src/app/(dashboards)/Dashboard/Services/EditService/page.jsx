"use client";
import React from "react";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZInputTwo from "@/components/Form/ZInputTwo";
import { useAppDispatch } from "@/redux/Hook/Hook";
import { setIsEditModalOpen } from "@/redux/Modal/ModalSlice";
import ZSelect from "@/components/Form/ZSelect";
import axios from "axios";
import { toast } from "sonner";
import ZImageInput from "@/components/Form/ZImageInput";
import { useUpdateServiceMutation } from "@/redux/Feature/Admin/services/services";

const EditService = ({ selectedService }) => {
  const dispatch = useAppDispatch();
  const [updateServices, { isLoading, isError, error, isSuccess, data }] = useUpdateServiceMutation();

  const handleSubmit = async (formData) => {
    try {
      let imageUrl = selectedService.image;
      
      // Upload new image if exists
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
        toast.error('Service image is required');
        return;
      }

      const serviceData = {
        serviceTitle: formData.serviceTitle,
        servicePartner: formData.servicePartner,
        isLatest: formData.isLatest,
        image: imageUrl,
        selectLayout: formData.selectLayout
      };

      updateServices({
        id: selectedService._id,
        data: serviceData
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Error updating service. Please try again.');
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
      closeModal={() => dispatch(setIsEditModalOpen())}
      formType={"edit"}
      buttonName={"Update"}
    >
      <div className="grid grid-cols-1 gap-3 mt-10">
        <ZInputTwo
          name="serviceTitle"
          label="Service Title"
          placeholder="Enter service title"
          required
          value={selectedService?.serviceTitle}
        />
        <ZInputTwo
          name="servicePartner"
          label="Service Partner"
          placeholder="Enter service partner"
          required
          value={selectedService?.servicePartner}
        />
        <ZSelect
            name="isLatest"
            label="Latest Case"
            options={[
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
            ]}
            placeholder="Select latest status"
          />
        <ZImageInput
          name="image"
          label="Service Image"
          required
          defaultValue={selectedService?.image ? [{
            uid: '-1',
            name: 'Service Image',
            status: 'done',
            url: selectedService.image
          }] : []}
        />
        {/* <ZSelect
          name="selectLayout"
          label="Select Layout"
          options={[
            { label: "Service", value: "Service" },
            { label: "ServiceOverview", value: "ServiceOverview" },
            { label: "ServiceDetails", value: "ServiceDetails" }
          ]}
          placeholder="Select layout"
          required
          value={selectedService?.selectLayout}
        /> */}
      </div>
    </ZFormTwo>
  );
};

export default EditService; 