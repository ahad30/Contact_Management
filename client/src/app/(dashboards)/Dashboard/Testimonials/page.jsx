"use client";
import React, { useState } from "react";
import { Image, Space, Tooltip } from "antd";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import AddModal from "@/components/Modal/AddModal";
import EditModal from "@/components/Modal/EditModal";
import { useAppDispatch, useAppSelector } from "@/redux/Hook/Hook";
import ButtonWithModal from "@/components/Button/ButtonWithModal";
import { setIsDeleteModalOpen, setIsEditModalOpen } from "@/redux/Modal/ModalSlice";
import DeleteModal from "@/components/Modal/DeleteModal";
import { useDeleteTestimonialMutation, useGetTestimonialsQuery } from "@/redux/Feature/Admin/testimonials/testimonials";
import AddTestimonial from "./AddTestimonial/page";
import EditTestimonial from "./EditTestimonial/page";
import DashboardTable from "@/components/Table/DashboardTable";

const Testimonials = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetTestimonialsQuery();
  const { isAddModalOpen, isEditModalOpen, isDeleteModalOpen } = useAppSelector((state) => state.modal);
  const [selectedTestimonial, setSelectedTestimonial] = useState({});
  const [deleteTestimonial, { isLoading: isDeleting, isError, isSuccess, data: deleteData, error }] = useDeleteTestimonialMutation();

  const testimonialsData = data?.map((testimonial, index) => ({
    key: index,
    id: testimonial._id,
    companyName: testimonial.companyName,
    description: testimonial.description,
    authorName: testimonial.authorName,
    profileImage: testimonial.profileImage,
  }));

  const handleEdit = (testimonial) => {
    setSelectedTestimonial(testimonial);
    dispatch(setIsEditModalOpen());
  };

  const handleDelete = (testimonial) => {
    setSelectedTestimonial(testimonial);
    dispatch(setIsDeleteModalOpen());
  };

  const handleDeleteTestimonial = () => {
    deleteTestimonial(selectedTestimonial?.id);
  };

  const columns = [
    {
      title: "Profile Image",
      dataIndex: "profileImage",
      key: "profileImage",
      render: (image) => (
        <div className="w-20 h-20 relative">
          <Image
            src={image}
            alt="Profile"
            className="object-cover rounded-full  "
          />
        </div>
      ),
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: "Author Name",
      dataIndex: "authorName",
      key: "authorName",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>
            <Tooltip title="Edit">
              <CiEdit size={20} />
            </Tooltip>
          </a>
          <a onClick={() => handleDelete(record)}>
            <Tooltip title="Delete">
              <AiOutlineDelete size={20} />
            </Tooltip>
          </a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div>
        <p className="lg:text-2xl text-center font-bold mb-10">
          Manage your testimonials easily from here
        </p>
      </div>
      <div className="flex flex-col lg:flex-row items-center gap-x-2 justify-end my-5">
        <ButtonWithModal title="Add Testimonial" />
      </div>

      <DashboardTable columns={columns} data={testimonialsData} loading={isLoading} />
      
      <AddModal isAddModalOpen={isAddModalOpen} title="Add Testimonial">
        <AddTestimonial />
      </AddModal>

      <EditModal isEditModalOpen={isEditModalOpen} title="Edit Testimonial">
        <EditTestimonial selectedTestimonial={selectedTestimonial} />
      </EditModal>

      <DeleteModal
        data={deleteData}
        error={error}
        isLoading={isDeleting}
        isSuccess={isSuccess}
        title="Delete Testimonial"
        onDelete={handleDeleteTestimonial}
        isDeleteModalOpen={isDeleteModalOpen}
        isError={isError}
        description="This testimonial will be permanently deleted"
      />
    </>
  );
};

export default Testimonials; 