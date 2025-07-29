import {
  IBackendRes,
  type IInterview,
  type IPermission,
  type IPosition,
  type IRole,
} from "./../types/backend.d";
import {
  IBackendRes,
  IAccount,
  IUser,
  type IModelPaginate,
  type ISkill,
  type ICompany,
  type IJob,
  type IResume,
  type FollowJob,
  type FollowCompany,
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

export const callForgotPassword = (email: string) => {
  return axios.post<IBackendRes<string>>(
    `/api/v1/auth/forgot_password?email=${encodeURIComponent(email)}`
  );
};

export const callResetPassword = (token: string, newPassword: string) => {
  return axios.post<IBackendRes<string>>(
    `/api/v1/auth/reset_password?token=${token}`,
    { newPassword }
  );
};
/**
 * 
Module User
 */
export const callCreateUser = (user: IUser) => {
  return axios.post<IBackendRes<IUser>>("/api/v1/users", { ...user });
};

export const callUpdateUser = (user: IUser) => {
  return axios.put<IBackendRes<IUser>>(`/api/v1/users`, { ...user });
};

export const callDeleteUser = (id: string) => {
  return axios.delete<IBackendRes<IUser>>(`/api/v1/users/${id}`);
};

export const callFetchUser = (query: string) => {
  return axios.get<IBackendRes<IModelPaginate<IUser>>>(
    `/api/v1/users?${query}`
  );
};
export const callFetchUserById = (id: string) => {
  return axios.get<IBackendRes<IUser>>(`/api/v1/users/${id}`);
};

//Module Skill

export const callCreateSkill = (name: string) => {
  return axios.post<IBackendRes<ISkill>>("/api/v1/skills", {
    name,
  });
};
export const callUpdateSkill = (id: string, name: string) => {
  return axios.put<IBackendRes<ISkill>>("/api/v1/skills", {
    id,
    name,
  });
};

export const callDeleteSkill = (id: string) => {
  return axios.delete<IBackendRes<ISkill>>(`/api/v1/skills/${id}`);
};

export const callFetchAllSkill = (query: string) => {
  return axios.get<IBackendRes<IModelPaginate<ISkill>>>(
    `/api/v1/skills?${query}`
  );
};

export const callFetchSkillById = (id: string) => {
  return axios.get<IBackendRes<ISkill>>(`/api/v1/skills/${id}`);
};

export const callFetchSkillNoPagination = () => {
  return axios.get<IBackendRes<ISkill>>(`/api/v1/skills/all`);
};

// Module Company
export const callFetchCompany = (query: string) => {
  return axios.get<IBackendRes<IModelPaginate<ICompany>>>(
    `/api/v1/companies?${query}`
  );
};

export const callFetchCompanyLikest = () => {
  return axios.get<IBackendRes<IModelPaginate<ICompany>>>(
    `/api/v1/companies/likest`
  );
};

export const callFetchCompanyById = (id: string) => {
  return axios.get<IBackendRes<ICompany>>(`/api/v1/companies/${id}`);
};

export const callCreateCompany = (
  name: string,
  address: string,
  description: string,
  logo: string,
  banner: string
) => {
  return axios.post<IBackendRes<ICompany>>("/api/v1/companies", {
    name,
    address,
    description,
    logo,
    banner,
  });
};

export const callUpdateCompany = (
  id: string,
  name: string,
  address: string,
  description: string,
  logo: string,
  banner: string
) => {
  return axios.post<IBackendRes<ICompany>>("/api/v1/companies", {
    id,
    name,
    address,
    description,
    logo,
    banner,
  });
};

export const callDeleteCompany = (id: string) => {
  return axios.delete<IBackendRes<ICompany>>(`/api/v1/companies/${id}`);
};

export const followCompany = (payload: FollowCompany) => {
  return axios.post<IBackendRes<FollowCompany>>(`/api/v1/companies/follow`, {
    ...payload,
  });
};

export const likeCompany = (id: string) => {
  return axios.put<IBackendRes<ICompany>>(`/api/v1/companies/${id}/like`);
};

export const disLikeCompany = (id: string) => {
  return axios.put<IBackendRes<ICompany>>(`/api/v1/companies/${id}/dislike`);
};

export const cancelFollowCompany = (payload: FollowCompany) => {
  console.log("cancelFollowJob", payload);
  return axios.delete<IBackendRes<FollowCompany>>(`/api/v1/companies/follow`, {
    data: payload,
  });
};

export const fetchCompanyFollowed = (userId: number) => {
  return axios.get<IBackendRes<IJob>>(`/api/v1/companies/follow/${userId}`);
};

export const checkCompanyStatus = (companyId: number, userId: number) => {
  return axios.get<IBackendRes<{ followed: boolean }>>(
    `/api/v1/companies/${companyId}/follow-status?userId=${userId}`
  );
};

export const countUserFollowCompany = (companyId: number) => {
  return axios.get<IBackendRes<{ followerCount: number }>>(
    `/api/v1/companies/${companyId}/follow-count`
  );
};

// Module Job

export const callCreateJob = (job: IJob) => {
  return axios.post<IBackendRes<IJob>>("/api/v1/jobs", {
    ...job,
  });
};

export const callUpdateJob = (job: IJob, id: string) => {
  return axios.post<IBackendRes<IJob>>("/api/v1/jobs", { id, ...job });
};

export const callDeleteJob = (id: string) => {
  return axios.delete<IBackendRes<IJob>>(`/api/v1/jobs/${id}`);
};

export const callFetchJob = (query: string) => {
  return axios.get<IBackendRes<IModelPaginate<IJob>>>(`/api/v1/jobs?${query}`);
};

export const callFetchJobByCompany = (id: string, query: string) => {
  return axios.get<IBackendRes<IModelPaginate<IJob>>>(
    `/api/v1/jobs/jobCompany/${id}?${query}`
  );
};

export const callFetchJobLatest = (query: string) => {
  return axios.get<IBackendRes<IModelPaginate<IJob>>>(
    `/api/v1/jobs/latest?${query}`
  );
};

export const callFetchJobByIdCompany = (id: string) => {
  return axios.get<IBackendRes<IJob>>(`/api/v1/jobs-company/${id}`);
};

export const callFetchJobById = (id: string) => {
  return axios.get<IBackendRes<IJob>>(`/api/v1/jobs/${id}`);
};

export const followJob = (payload: FollowJob) => {
  return axios.post<IBackendRes<FollowJob>>(`/api/v1/jobs/follow`, {
    ...payload,
  });
};

export const cancelFollowJob = (payload: FollowJob) => {
  console.log("cancelFollowJob", payload);
  return axios.delete<IBackendRes<FollowJob>>(`/api/v1/jobs/follow`, {
    data: payload,
  });
};

export const checkFollowStatus = (jobId: number, userId: number) => {
  return axios.get<IBackendRes<{ followed: boolean }>>(
    `/api/v1/jobs/${jobId}/follow-status?userId=${userId}`
  );
};

export const fetchJobFollowed = (userId: number) => {
  return axios.get<IBackendRes<IJob>>(`/api/v1/jobs/followed/${userId}`);
};

export const recommendJob = () => {
  return axios.post<IBackendRes<IJob>>(`/api/v1/jobs/recommend`);
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

export const callUpdateResumeStatus = (id: any, status: string) => {
  return axios.put<IBackendRes<IResume>>(`/api/v1/resumes`, { id, status });
};

export const callDeleteResume = (id: string) => {
  return axios.delete<IBackendRes<IResume>>(`/api/v1/resumes/${id}`);
};

export const callFetchResume = (query: string) => {
  return axios.get<IBackendRes<IModelPaginate<IResume>>>(
    `/api/v1/resumes?${query}`
  );
};

export const callFetchResumeById = (id: string) => {
  return axios.get<IBackendRes<IResume>>(`/api/v1/resumes/${id}`);
};

export const callFetchResumeByCompany = (id: string, query: string) => {
  return axios.get<IBackendRes<IResume>>(
    `/api/v1/resumes/by-company/${id}?${query}`
  );
};

export const callFetchResumeByUser = () => {
  return axios.get<IBackendRes<IModelPaginate<IResume>>>(
    "/api/v1/resumes/by-user"
  );
};

// Upload single file
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

// Module permission

export const callCreatePermission = (permission: IPermission) => {
  return axios.post<IBackendRes<IPermission>>("/api/v1/permissions", {
    ...permission,
  });
};

export const callUpdatePermission = (permission: IPermission, id: string) => {
  return axios.put<IBackendRes<IPermission>>("/api/v1/permissions", {
    id,
    ...permission,
  });
};

export const callDeletePermission = (id: string) => {
  return axios.delete<IBackendRes<IPermission>>(`/api/v1/permissions/${id}`);
};

export const callFetchPermission = (query: string) => {
  return axios.get<IBackendRes<IModelPaginate<IPermission>>>(
    `/api/v1/permissions?${query}`
  );
};

export const callFetchPermissionById = (id: string) => {
  return axios.get<IBackendRes<IPermission>>(`/api/v1/permissions/${id}`);
};

// Module Role

export const callCreateRole = (role: IRole) => {
  return axios.post<IBackendRes<IRole>>("/api/v1/roles", {
    ...role,
  });
};

export const callUpdateRole = (role: IRole, id: string) => {
  return axios.put<IBackendRes<IRole>>("/api/v1/roles", {
    id,
    ...role,
  });
};

export const callDeleteRole = (id: string) => {
  return axios.delete<IBackendRes<IRole>>(`/api/v1/roles/${id}`);
};

export const callFetchRoleById = (id: string) => {
  return axios.get<IBackendRes<IRole>>(`/api/v1/roles/${id}`);
};

export const callFetchRole = (query: string) => {
  return axios.get<IBackendRes<IModelPaginate<IRole>>>(
    `/api/v1/roles?${query}`
  );
};

// Question Interview
export const callFetchAllQuestion = (query: string) => {
  return axios.get<IBackendRes<IModelPaginate<IInterview>>>(
    `/api/v1/questions/all?${query}`
  );
};

export const callFetchQuestionById = (id: string) => {
  return axios.get<IBackendRes<IInterview>>(`/api/v1/questions/${id}`);
};

export const callFetchAllPosition = (query: string) => {
  return axios.get<IBackendRes<IModelPaginate<IPosition>>>(
    `/api/v1/positions?${query}`
  );
};

export const callDeleteQuestion = (id: string) => {
  return axios.delete<IBackendRes<IInterview>>(`/api/v1/questions/${id}`);
};

export const callCreateQuestion = (question: any) => {
  return axios.post<IBackendRes<any>>("/api/v1/questions", {
    ...question,
  });
};
export const callUpdateQuestion = (question: any) => {
  return axios.put<IBackendRes<any>>("/api/v1/questions", {
    ...question,
  });
};

