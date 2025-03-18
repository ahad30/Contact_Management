"use client";
import React, { useState } from "react";
import { Space, Tag, Tooltip, Button } from "antd";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import AddModal from "@/components/Modal/AddModal";
import EditModal from "@/components/Modal/EditModal";
import DeleteModal from "@/components/Modal/DeleteModal";
import { useAppDispatch, useAppSelector } from "@/redux/Hook/Hook";
import ButtonWithModal from "@/components/Button/ButtonWithModal";
import { setIsDeleteModalOpen, setIsEditModalOpen } from "@/redux/Modal/ModalSlice";
import DashboardTable from "@/components/Table/DashboardTable";
import { useDeleteContactMutation, useDownloadContactsExcelQuery, useDownloadContactsPDFQuery, useGetContactsQuery } from "@/redux/Feature/Admin/contact/contact";
// import { exportToExcel, exportToPDF } from "@/utils/exportUtils";

const Contact = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetContactsQuery();
  console.log(data)
  const { isAddModalOpen, isEditModalOpen, isDeleteModalOpen } = useAppSelector((state) => state.modal);
  const [selectedContact, setSelectedContact] = useState({});
  const [deleteContact, { isLoading: dIsLoading, isError, isSuccess, data: dData, error: dError }] = useDeleteContactMutation();
  const { data: pdfUrl } = useDownloadContactsPDFQuery();
  const { data: excelUrl } = useDownloadContactsExcelQuery();

  const contactData = data?.contacts?.map((contact , index) => ({
    key: index + 1,
    id: contact?._id,
    name: contact?.name,
    email: contact?.email,
    message: contact?.message,
  }));



  const handleDelete = (contact) => {
    setSelectedContact(contact);
    dispatch(setIsDeleteModalOpen());
  };

  const handleDeleteContact = () => {
    deleteContact(selectedContact?.id);
  };

   // Handle PDF download
   const handleDownloadPDF = () => {
    if (pdfUrl) {
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = "contacts_report.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(pdfUrl); // Clean up the URL
    } else {
      console.error("PDF URL is undefined or invalid");
    }
  };

  // Handle Excel download
  const handleDownloadExcel = () => {
    if (excelUrl) {
      const link = document.createElement("a");
      link.href = excelUrl;
      link.download = "contacts_report.xlsx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(excelUrl); // Clean up the URL
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

      <Button onClick={handleDownloadPDF} icon={<FaFilePdf />} className="ml-2">
          Export PDF
        </Button>
        <Button onClick={handleDownloadExcel} icon={<FaFileExcel />} className="ml-2">
          Export Excel
        </Button>
      </div>

      <DashboardTable columns={columns} data={contactData} loading={isLoading} />
      
     

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
