"use client";
import React from "react";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZInputTwo from "@/components/Form/ZInputTwo";
import { useAppDispatch } from "@/redux/Hook/Hook";
import { setIsAddModalOpen } from "@/redux/Modal/ModalSlice";
import ZSelect from "@/components/Form/ZSelect";
import axios from "axios";
import { toast } from "sonner";
import ZImageInput from "@/components/Form/ZImageInput";
import { useAddServiceMutation } from "@/redux/Feature/Admin/services/services";

const AddService = () => {
  const dispatch = useAppDispatch();
  const [addServices, { isLoading, isError, error, isSuccess, data }] = useAddServiceMutation();

  const handleSubmit = async (formData) => {
    try {
      let imageUrl = '';

        if (!formData.image) {
            toast.error('Please upload an image for the servicePartner');
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
        imageUrl = res.data.data.display_url;
      }

      const serviceData = {
        serviceTitle: formData.serviceTitle,
        servicePartner: formData.servicePartner,
        isLatest: formData.isLatest || false,
        image: imageUrl,
        selectLayout: formData.selectLayout
      };

      addServices(serviceData);
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Error uploading image. Please try again.');
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
          name="serviceTitle"
          label="Service Title"
          placeholder="Enter service title"
          required
        />
        <ZInputTwo
          name="servicePartner"
          label="Service Partner"
          placeholder="Enter service partner"
          required
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
        />
        {/* <ZSelect
          name="selectLayout"
          label="Select Layout"
          options={[
            { label: "Service", value: "Service" },
            { label: "ServiceOverview", value: "ServiceOverview" }
          ]}
          placeholder="Select layout"
          required
        /> */}
      </div>
    </ZFormTwo>
  );
};

export default AddService; 