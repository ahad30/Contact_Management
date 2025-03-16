"use client";
import React, { useState } from "react";
import { Image, Space, Tag, Tooltip } from "antd";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import AddModal from "@/components/Modal/AddModal";
import EditModal from "@/components/Modal/EditModal";
import { useAppDispatch, useAppSelector } from "@/redux/Hook/Hook";
import ButtonWithModal from "@/components/Button/ButtonWithModal";
import { setIsDeleteModalOpen, setIsEditModalOpen } from "@/redux/Modal/ModalSlice";
import DeleteModal from "@/components/Modal/DeleteModal";
import { useDeletePartnerGoalsMutation, useGetPartnerGoalsQuery } from "@/redux/Feature/Admin/partnerGoals/partnerGoals";
import AddPartner from "./AddPartner/page";
import EditPartner from "./EditPartner/page";
import DashboardTable from "@/components/Table/DashboardTable";

const Partners = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetPartnerGoalsQuery();
  const { isAddModalOpen, isEditModalOpen, isDeleteModalOpen } = useAppSelector((state) => state.modal);
  const [selectedPartner, setSelectedPartner] = useState({});
  const [deletePartnerGoals, { isLoading: dIsLoading, isError, isSuccess, data: dData, error: dError }] = useDeletePartnerGoalsMutation();

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 300,
    },
    {
      title: "Stats",
      dataIndex: "stats",
      key: "stats",
      render: (_, record) => (
        <div className="flex flex-col gap-2">
         <div className="">
            <Tag color={'green'}>{record.statTitle1} {record.stateValue1}</Tag>
          </div>
          <div>
            <Tag color={'blue'}>{record.statTitle2} {record.stateValue2}</Tag>
          </div>      
         
        </div>
      ),
    },
    {
      title: "Images",
      dataIndex: "brandsImage",
      key: "brandsImage",
      render: (images) => (
        <div className="flex flex-wrap justify-center gap-2">
          {images?.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`Brand ${index + 1}`}
              width={50}
              height={50}
              className="object-cover rounded"
            />
          ))}
        </div>
      ),
    },
    {
      title: "Layout",
      dataIndex: "selectLayout",
      key: "selectLayout",
      render: (layout) => (
        <Tag color={'green'}>
          {layout}
        </Tag>
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

  const handleEdit = (partner) => {
    setSelectedPartner(partner);
    dispatch(setIsEditModalOpen());
  };

  const handleDelete = (partner) => {
    setSelectedPartner(partner);
    dispatch(setIsDeleteModalOpen());
  };

  const handleDeletePartner = () => {
    deletePartnerGoals(selectedPartner?._id);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row items-center gap-x-2 justify-end my-5">
        <ButtonWithModal title="Add Partner" />
      </div>

      <DashboardTable columns={columns} data={data} loading={isLoading} />
      
      <AddModal isAddModalOpen={isAddModalOpen} title="Add Partner">
        <AddPartner />
      </AddModal>

      <EditModal isEditModalOpen={isEditModalOpen} title="Edit Partner">
        <EditPartner selectedPartner={selectedPartner} />
      </EditModal>

      <DeleteModal
        data={dData}
        error={dError}
        isLoading={dIsLoading}
        isSuccess={isSuccess}
        title="Delete Partner"
        onDelete={handleDeletePartner}
        isDeleteModalOpen={isDeleteModalOpen}
        isError={isError}
      />
    </>
  );
};

export default Partners; 