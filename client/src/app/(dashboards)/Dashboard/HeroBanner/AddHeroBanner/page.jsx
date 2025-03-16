"use client";
import React from "react";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZInputTwo from "@/components/Form/ZInputTwo";
import { useAppDispatch } from "@/redux/Hook/Hook";
import { setIsAddModalOpen } from "@/redux/Modal/ModalSlice";
import { useAddHeroBannerMutation } from "@/redux/Feature/Admin/heroBanner/heroBanner";
import { toast } from "sonner";
import ZSelect from "@/components/Form/ZSelect";

const AddHeroBanner = () => {
  const dispatch = useAppDispatch();
  const [addHeroBanner, { isLoading, isError, error, isSuccess, data }] = useAddHeroBannerMutation();

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

    addHeroBanner(bannerData);
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
        <ZInputTwo
          name="subTitle"
          label="Sub Title"
          placeholder="Enter sub title"
          required
        />
        <ZInputTwo
          name="buttonTitle"
          label="Button Title"
          placeholder="Enter button title"
          required
        />
        <ZSelect
          name="achievementTitles"
          label="Achievement Titles"
          mode="multiple"
          options={achievementOptions}
          placeholder="Select achievement titles"
          required
        />
      </div>
    </ZFormTwo>
  );
};

export default AddHeroBanner; 