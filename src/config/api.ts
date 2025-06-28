import {
  IBackendRes,
  IAccount,
  IUser,
  type IModelPaginate,
  type ISkill,
  type ICompany,
  type IJob,
  type IResume,
} from "../types/backend";
import axios from "config/axios-customize";

/**
 * 
Module Auth
 */
export const callRegister = (
  name: string,
  email: string,
  password: string,
  age?: number,
  gender?: string,
  address?: string,
  phoneNumber?: string,
  taxNumber?: string,
  companyName?: string
) => {
  console.log("callRegister", {
    name,
    email,
    password,
    // age,
    // gender,
    // address,
    phoneNumber,
    taxNumber,
    companyName,
  });
  return axios.post<IBackendRes<IUser>>("/api/v1/auth/register", {
    name,
    email,
    password,
    age,
    gender,
    address,
    phoneNumber,
    taxNumber,
    companyName,
  });
};

export const callRegisterRecruiter = (
  name: string,
  email: string,
  password: string,
  phoneNumber?: string,
  taxNumber?: string,
  companyName?: string
) => {
  console.log("callRegister", {
    name,
    email,
    password,
    phoneNumber,
    taxNumber,
    companyName,
  });
  return axios.post<IBackendRes<IUser>>("/api/v1/auth/register", {
    name,
    email,
    password,
    phoneNumber,
    taxNumber,
    companyName,
  });
};

export const callLogin = (username: string, password: string) => {
  return axios.post<IBackendRes<IAccount>>("/api/v1/auth/login", {
    username,
    password,
  });
};
export const callLoginGoogle = (token: string) => {
  return axios.post<IBackendRes<IAccount>>("/api/v1/auth/login-google", {
    token,
  });
};

export const callFetchAccount = () => {
  return axios.get<IBackendRes<IGetAccount>>("/api/v1/auth/account");
};

export const callRefreshToken = () => {
  return axios.get<IBackendRes<IAccount>>("/api/v1/auth/refresh");
};

export const callLogout = () => {
  return axios.post<IBackendRes<string>>("/api/v1/auth/logout");
};

/**
 * 
Module User
 */
export const callCreateUser = (user: IUser) => {
    return axios.post<IBackendRes<IUser>>('/api/v1/users', { ...user })
}

export const callUpdateUser = (user: IUser) => {
    return axios.put<IBackendRes<IUser>>(`/api/v1/users`, { ...user })
}

export const callDeleteUser = (id: string) => {
    return axios.delete<IBackendRes<IUser>>(`/api/v1/users/${id}`);
}

export const callFetchUser = (query: string) => {
    return axios.get<IBackendRes<IModelPaginate<IUser>>>(`/api/v1/users?${query}`);
}

//Module Skill

export const callFetchAllSkill = (query: string) => {
  return axios.get<IBackendRes<IModelPaginate<ISkill>>>(
    `/api/v1/skills?${query}`
  );
};

// Module Company
export const callFetchCompany = (query: string) => {
  return axios.get<IBackendRes<IModelPaginate<ICompany>>>(
    `/api/v1/companies?${query}`
  );
};

export const callFetchCompanyById = (id: string) => {
  return axios.get<IBackendRes<ICompany>>(`/api/v1/companies/${id}`);
};

// Module Job

export const callFetchJob = (query: string) => {
  return axios.get<IBackendRes<IModelPaginate<IJob>>>(`/api/v1/jobs?${query}`);
};

export const callFetchJobByIdCompany = (id: string) => {
  return axios.get<IBackendRes<IJob>>(`/api/v1/jobs-company/${id}`);
};

export const callFetchJobById = (id: string) => {
  return axios.get<IBackendRes<IJob>>(`/api/v1/jobs/${id}`);
};

/**
 * 
Module Resume
 */
export const callCreateResume = (
  url: string,
  jobId: any,
  email: string,
  userId: string | number
) => {
  return axios.post<IBackendRes<IResume>>("/api/v1/resumes", {
    email,
    url,
    status: "PENDING",
    user: {
      id: userId,
    },
    job: {
      id: jobId,
    },
  });
};

/**
 * Upload single file
 */
export const callUploadSingleFile = (file: any, folderType: string) => {
  const bodyFormData = new FormData();
  bodyFormData.append("file", file);
  bodyFormData.append("folder", folderType);

  return axios<IBackendRes<{ fileName: string }>>({
    method: "post",
    url: "/api/v1/files",
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
