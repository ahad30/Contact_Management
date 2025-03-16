"use client";
import React from "react";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZInputTwo from "@/components/Form/ZInputTwo";
import { useAppDispatch } from "@/redux/Hook/Hook";
import { setIsEditModalOpen } from "@/redux/Modal/ModalSlice";
import { useUpdateHeroBannerMutation } from "@/redux/Feature/Admin/heroBanner/heroBanner";
import ZSelect from "@/components/Form/ZSelect";

const EditHeroBanner = ({ selectedBanner }) => {
  const dispatch = useAppDispatch();
  const [updateHeroBanner, { isLoading, isError, error, isSuccess, data }] = useUpdateHeroBannerMutation();

  const achievementOptions = [
    { label: "Website Awards", value: "Website Awards" },
    { label: "Years on the market", value: "Years on the market" },
    { label: "Satisfied Customers", value: "Satisfied Customers" },
    { label: "Digital Experiences", value: "Digital Experiences" },
  ];

  const handleSubmit = async (formData) => {
    const bannerData = {
      title: formData.title,
      subTitle: formData.subTitle,
      buttonTitle: formData.buttonTitle,
      achievementTitles: formData.achievementTitles,
  
    };

    updateHeroBanner({
      id: selectedBanner.id,
      data: bannerData
    });
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
          required
          value={selectedBanner?.title}
        />
        <ZInputTwo
          name="subTitle"
          label="Sub Title"
          placeholder="Enter sub title"
          required
          value={selectedBanner?.subTitle}
        />
        <ZInputTwo
          name="buttonTitle"
          label="Button Title"
          placeholder="Enter button title"
          required
          value={selectedBanner?.buttonTitle}
        />
    
        <ZSelect
          name="achievementTitles"
          label="Achievement Titles"
          mode="multiple"
          options={achievementOptions}
          placeholder="Select achievement titles"
          required
          value={selectedBanner?.achievementTitles}
        />
      </div>
    </ZFormTwo>
  );
};

export default EditHeroBanner; 