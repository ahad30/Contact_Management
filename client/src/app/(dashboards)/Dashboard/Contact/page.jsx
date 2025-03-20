"use client";
import React, { useState } from "react";
import { Space, Tooltip, Button } from "antd";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import AddModal from "@/components/Modal/AddModal";
import EditModal from "@/components/Modal/EditModal";
import DeleteModal from "@/components/Modal/DeleteModal";
import { useAppDispatch, useAppSelector } from "@/redux/Hook/Hook";
import { setIsDeleteModalOpen, setIsEditModalOpen, setIsViewModalOpen } from "@/redux/Modal/ModalSlice";
import DashboardTable from "@/components/Table/DashboardTable";
import { useDeleteContactMutation, useDownloadContactsExcelQuery, useDownloadContactsPDFQuery, useGetContactsQuery } from "@/redux/Feature/Admin/contact/contactApi";
import { AiFillEye } from "react-icons/ai";
import ViewModal from "@/components/Modal/ViewModal";
import ViewContact from "./ViewContact";

const Contact = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetContactsQuery();
  const { isAddModalOpen, isViewModalOpen, isDeleteModalOpen } = useAppSelector((state) => state.modal);
  const [selectedContact, setSelectedContact] = useState({});
  const [deleteContact, { isLoading: dIsLoading, isError, isSuccess, data: dData, error: dError }] = useDeleteContactMutation();
  const { data: pdfUrl } = useDownloadContactsPDFQuery();
  const { data: excelUrl } = useDownloadContactsExcelQuery();

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
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/contact/pdf/${userId}`;
  };

  const handleDownloadUserExcel = (userId) => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/contact/excel/${userId}`;
  };

  const handleDelete = (contact) => {
    setSelectedContact(contact);
    dispatch(setIsDeleteModalOpen());
  };

  const handleDeleteContact = () => {
    deleteContact(selectedContact?.id);
  };

  const handleDownloadPDF = () => {
    if (pdfUrl) {
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = "contacts_report.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(pdfUrl);
    } else {
      console.error("PDF URL is undefined or invalid");
    }
  };

  const handleDownloadExcel = () => {
    if (excelUrl) {
      const link = document.createElement("a");
      link.href = excelUrl;
      link.download = "contacts_report.xlsx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(excelUrl);
    }
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
          <a onClick={() => handleViewOrder(record)}>
            <Tooltip title="View" placement="top">
              <AiFillEye className="text-green-500" size={20} />
            </Tooltip>
          </a>

          <a onClick={() => handleDownloadUserPDF(record.id)}>
            <Tooltip title="Download PDF" placement="top">
              <FaFilePdf className="text-red-500" size={20} />
            </Tooltip>
          </a>
          <a onClick={() => handleDownloadUserExcel(record.id)}>
            <Tooltip title="Download PDF" placement="top">
              <FaFileExcel className="text-green-500" size={20} />
            </Tooltip>
          </a>

          <a onClick={() => handleDelete(record)}>
            <Tooltip title="Delete" placement="top">
              <AiOutlineDelete className="text-red-500" size={20} />
            </Tooltip>
          </a>
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
          Export Excel(All)
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