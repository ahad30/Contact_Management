"use client";
import React, { useState } from "react";
import { Space, Tooltip, Button } from "antd";
import { AiOutlineDelete, AiFillEye } from "react-icons/ai";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import DeleteModal from "@/components/Modal/DeleteModal";
import { useAppDispatch, useAppSelector } from "@/redux/Hook/Hook";
import { setIsDeleteModalOpen, setIsViewModalOpen } from "@/redux/Modal/ModalSlice";
import DashboardTable from "@/components/Table/DashboardTable";
import {
  useDeleteContactMutation,
  useDownloadContactsExcelQuery,
  useDownloadContactsPDFQuery,
  useGetContactsQuery,
} from "@/redux/Feature/Admin/contact/contactApi";
import ViewModal from "@/components/Modal/ViewModal";
import ViewContact from "./ViewContact";

const Contact = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetContactsQuery();
  const { isViewModalOpen, isDeleteModalOpen } = useAppSelector((state) => state.modal);
  const [selectedContact, setSelectedContact] = useState(null);

  const [deleteContact, { isLoading: dIsLoading, isError, isSuccess, data: dData, error: dError }] =
    useDeleteContactMutation();
  // const { data: pdfUrl } = useDownloadContactsPDFQuery();
  // const { data: excelUrl } = useDownloadContactsExcelQuery();

  const contactData = data?.contacts?.map((contact, index) => ({
    key: index + 1,
    id: contact?._id,
    name: contact?.name,
    email: contact?.email,
    message: contact?.message,
  }));

  const handleViewOrder = (contact) => {
    setSelectedContact(contact);
    dispatch(setIsViewModalOpen());
  };

  const handleDownloadUserPDF = (userId) => {
    if (userId) {
      window.open(`${process.env.NEXT_PUBLIC_BACKEND_URL}/contact/pdf/${userId}`, "_blank");
    }
  };

  const handleDownloadUserExcel = (userId) => {
    if (userId) {
      window.open(`${process.env.NEXT_PUBLIC_BACKEND_URL}/contact/excel/${userId}`, "_blank");
    }
  };

  const handleDelete = (contact) => {
    setSelectedContact(contact);
    dispatch(setIsDeleteModalOpen());
  };

  const handleDeleteContact = () => {
    if (selectedContact?.id) {
      deleteContact(selectedContact.id);
    }
  };

  const handleDownloadPDF = () => {
    window.open(`${process.env.NEXT_PUBLIC_BACKEND_URL}/contact/pdf`, "_blank");
  };
  

  const handleDownloadExcel = () => {
    window.open(`${process.env.NEXT_PUBLIC_BACKEND_URL}/contact/excel`, "_blank");
  };

  const columns = [
    {
      title: "S/N",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="View">
            <AiFillEye className="text-green-500 cursor-pointer" size={20} onClick={() => handleViewOrder(record)} />
          </Tooltip>
          <Tooltip title="Download PDF">
            <FaFilePdf className="text-red-500 cursor-pointer" size={20} onClick={() => handleDownloadUserPDF(record.id)} />
          </Tooltip>
          <Tooltip title="Download Excel">
            <FaFileExcel className="text-green-500 cursor-pointer" size={20} onClick={() => handleDownloadUserExcel(record.id)} />
          </Tooltip>
          <Tooltip title="Delete">
            <AiOutlineDelete className="text-red-500 cursor-pointer" size={20} onClick={() => handleDelete(record)} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="flex flex-col lg:flex-row items-center gap-x-2 justify-end my-5">
        <Button onClick={handleDownloadPDF} icon={<FaFilePdf />} className="ml-2">
          Export PDF (All)
        </Button>
        <Button onClick={handleDownloadExcel} icon={<FaFileExcel />} className="ml-2">
          Export Excel (All)
        </Button>
      </div>

      <DashboardTable columns={columns} data={contactData} loading={isLoading} />

      <ViewModal title="View Contact" isViewModalOpen={isViewModalOpen}>
        <ViewContact selectedContact={selectedContact} />
      </ViewModal>

      <DeleteModal
        data={dData}
        error={dError}
        isLoading={dIsLoading}
        isSuccess={isSuccess}
        title="Delete Contact"
        onDelete={handleDeleteContact}
        isDeleteModalOpen={isDeleteModalOpen}
        isError={isError}
      />
    </>
  );
};

export default Contact;
