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
import AddService from "./AddService/page";
import EditService from "./EditService/page";
import DashboardTable from "@/components/Table/DashboardTable";
import { useDeleteServiceMutation, useGetServicesQuery } from "@/redux/Feature/Admin/services/services";

const Services = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetServicesQuery();
  const { isAddModalOpen, isEditModalOpen, isDeleteModalOpen } = useAppSelector((state) => state.modal);
  const [selectedService, setSelectedService] = useState({});
  const [deleteServices, { isLoading: dIsLoading, isError, isSuccess, data: dData, error: dError }] = useDeleteServiceMutation();

  const columns = [
    {
      title: "Service Title",
      dataIndex: "serviceTitle",
      key: "serviceTitle",
    },
    {
      title: "Service Partner",
      dataIndex: "servicePartner",
      key: "servicePartner",
    },
    {
      title: "Latest",
      dataIndex: "isLatest",
      key: "isLatest",
      render: (isLatest) => (
        <Tag color={isLatest ? 'green' : 'red'}>
          {isLatest ? 'Yes' : 'No'}
        </Tag>
      ),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <Image
          src={image}
          alt="Service"
          width={50}
          height={50}
          className="object-cover rounded"
        />
      ),
    },
    // {
    //   title: "Layout",
    //   dataIndex: "selectLayout",
    //   key: "selectLayout",
    //   render: (layout) => (
    //     <Tag color={'blue'}>
    //       {layout}
    //     </Tag>
    //   ),
    // },
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

  const handleEdit = (service) => {
    setSelectedService(service);
    dispatch(setIsEditModalOpen());
  };

  const handleDelete = (service) => {
    setSelectedService(service);
    dispatch(setIsDeleteModalOpen());
  };

  const handleDeleteService = () => {
    deleteServices(selectedService?._id);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row items-center gap-x-2 justify-end my-5">
        <ButtonWithModal title="Add Service" />
      </div>

      <DashboardTable columns={columns} data={data} loading={isLoading} />
      
      <AddModal isAddModalOpen={isAddModalOpen} title="Add Service">
        <AddService />
      </AddModal>

      <EditModal isEditModalOpen={isEditModalOpen} title="Edit Service">
        <EditService selectedService={selectedService} />
      </EditModal>

      <DeleteModal
        data={dData}
        error={dError}
        isLoading={dIsLoading}
        isSuccess={isSuccess}
        title="Delete Service"
        onDelete={handleDeleteService}
        isDeleteModalOpen={isDeleteModalOpen}
        isError={isError}
      />
    </>
  );
};

export default Services; 