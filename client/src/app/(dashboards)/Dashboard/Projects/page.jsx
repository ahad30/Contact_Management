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
import { useDeleteProjectMutation, useGetProjectsQuery } from "@/redux/Feature/Admin/projects/projects";
import AddProject from "./AddProject/page";
import EditProject from "./EditProject/page";
import DashboardTable from "@/components/Table/DashboardTable";


const Projects = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading: pIsLoading } = useGetProjectsQuery();
  const { isAddModalOpen, isEditModalOpen, isDeleteModalOpen } = useAppSelector((state) => state.modal);
  const [selectedProject, setSelectedProject] = useState({});
  const [deleteProject, { isLoading: dPIsLoading, isError, isSuccess, data: dPData, error: dError }] = useDeleteProjectMutation();

  const projectsData = data?.map((project, index) => ({
    key: index,
    id: project._id,
    title: project.title,
    description: project.description,
    buttonTitle: project.buttonTitle,
    image: project.image,
    tags: project.tags,
    isLatest: project.isLatest,
  }));

  const handleEdit = (project) => {
    setSelectedProject(project);
    dispatch(setIsEditModalOpen());
  };

  const handleDelete = (project) => {
    setSelectedProject(project);
    dispatch(setIsDeleteModalOpen());
  };

  const handleDeleteProject = () => {
    deleteProject(selectedProject?.id);
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <div className="relative w-20 h-20">
          <Image
            src={image}
            alt="Project"
            className="object-cover rounded-lg"
          />
        </div>
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    // {
    //   title: "Description",
    //   dataIndex: "description",
    //   key: "description",
    // },
    // {
    //   title: "Button Title",
    //   dataIndex: "buttonTitle",
    //   key: "buttonTitle",
    // },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (tags) => (
        <>
          {tags.map((tag) => (
            <Tag color="blue" key={tag}>
              {tag}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: "Latest",
      dataIndex: "isLatest",
      key: "isLatest",
      render: (isLatest) => (
        <Tag color={isLatest === "Yes" ? "green" : "red"}>
          {isLatest }
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

  return (
    <>
      <div>
        <p className="lg:text-2xl text-center font-bold mb-10">
          Manage your projects easily from here
        </p>
      </div>
      <div className="flex flex-col lg:flex-row items-center gap-x-2 justify-end my-5">
        <ButtonWithModal title="Add Project" />
      </div>

      <DashboardTable columns={columns} data={projectsData} loading={pIsLoading} />
      
      <AddModal isAddModalOpen={isAddModalOpen} title="Add Project">
        <AddProject />
      </AddModal>

      <EditModal isEditModalOpen={isEditModalOpen} title="Edit Project">
        <EditProject selectedProject={selectedProject} />
      </EditModal>

      <DeleteModal
        data={dPData}
        error={dError}
        isLoading={dPIsLoading}
        isSuccess={isSuccess}
        title="Delete Project"
        onDelete={handleDeleteProject}
        isDeleteModalOpen={isDeleteModalOpen}
        isError={isError}
        description="This project will be permanently deleted"
      />
    </>
  );
};

export default Projects; 