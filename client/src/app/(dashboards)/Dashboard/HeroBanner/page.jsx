"use client";
import React, { useState } from "react";
import { Space, Tag, Tooltip } from "antd";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import AddModal from "@/components/Modal/AddModal";
import EditModal from "@/components/Modal/EditModal";
import { useAppDispatch, useAppSelector } from "@/redux/Hook/Hook";
import ButtonWithModal from "@/components/Button/ButtonWithModal";
import { setIsDeleteModalOpen, setIsEditModalOpen } from "@/redux/Modal/ModalSlice";
import DeleteModal from "@/components/Modal/DeleteModal";
import { useDeleteHeroBannerMutation, useGetHeroBannersQuery } from "@/redux/Feature/Admin/heroBanner/heroBanner";
import AddHeroBanner from "./AddHeroBanner/page";
import EditHeroBanner from "./EditHeroBanner/page";
import DashboardTable from "@/components/Table/DashboardTable";

const HeroBanner = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetHeroBannersQuery();
  const { isAddModalOpen, isEditModalOpen, isDeleteModalOpen } = useAppSelector((state) => state.modal);
  const [selectedBanner, setSelectedBanner] = useState({});
  const [deleteHeroBanner, { isLoading: dIsLoading, isError, isSuccess, data: dData, error: dError }] = useDeleteHeroBannerMutation();

  const bannerData = data?.map((banner) => ({
    id: banner?._id,
    title: banner?.title,
    subTitle: banner?.subTitle,
    buttonTitle: banner?.buttonTitle,
    achievementTitles: banner?.achievementTitles
  }));

 

  const handleEdit = (banner) => {
    setSelectedBanner(banner);
    dispatch(setIsEditModalOpen());
  };

  const handleDelete = (banner) => {
    setSelectedBanner(banner);
    dispatch(setIsDeleteModalOpen());
  };

  const handleDeleteBanner = () => {
    deleteHeroBanner(selectedBanner?.id);
  };


  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Sub Title",
      dataIndex: "subTitle",
      key: "subTitle",
    },
    {
      title: "Button Title",
      dataIndex: "buttonTitle",
      key: "buttonTitle",
    },
   
    {
      title: "Achievement Titles",
      dataIndex: "achievementTitles",
      key: "achievementTitles",
      render: (titles) => (
        <div className="flex flex-wrap gap-1">
          {titles?.map((title, index) => (
            <Tag key={index} color="blue">{title}</Tag>
          ))}
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>
            <Tooltip title="Edit" placement="top">
              <CiEdit size={20} />
            </Tooltip>
          </a>
          <a onClick={() => handleDelete(record)}>
            <Tooltip title="Delete" placement="top">
              <AiOutlineDelete size={20} />
            </Tooltip>
          </a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="flex flex-col lg:flex-row items-center gap-x-2 justify-end my-5">
        <ButtonWithModal title="Add Hero Banner" />
      </div>

      <DashboardTable columns={columns} data={bannerData} loading={isLoading} />
      
      <AddModal isAddModalOpen={isAddModalOpen} title="Add Hero Banner">
        <AddHeroBanner />
      </AddModal>

      <EditModal isEditModalOpen={isEditModalOpen} title="Edit Hero Banner">
        <EditHeroBanner selectedBanner={selectedBanner} />
      </EditModal>

      <DeleteModal
        data={dData}
        error={dError}
        isLoading={dIsLoading}
        isSuccess={isSuccess}
        title="Delete Hero Banner"
        onDelete={handleDeleteBanner}
        isDeleteModalOpen={isDeleteModalOpen}
        isError={isError}
      />
    </>
  );
};

export default HeroBanner; 