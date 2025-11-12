
/* 
===========================================================================================
    This component is just for example to show how redux api services are created. 
===========================================================================================
*/

import {
  TAcademicDepartment,
  TAcademicFaculty,
  TAcademicSemester,
  TQueryParam,
  TResponseRedux,
} from "../../../types";
import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //------------------Get All Semesters----------------
    getAllSemesters: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/academic-semesters",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    //------------------Add Academic Semesters----------------
    addAcademicSemesters: builder.mutation({
      query: (data) => ({
        url: "/academic-semesters/create-academic-semester",
        method: "POST",
        body: data,
      }),
    }),

    //------------------Get Single Academic Faculty----------------
    getSingleAcademicFacultyById: builder.query({
      query: (args: { academicFaculty: string }) => {
        return {
          url: `/academic-faculties/${args.academicFaculty}`,
          method: "GET",
        }
      },
      transformResponse: (response: TResponseRedux<TAcademicFaculty>) => {
        return {
          data: response.data
        };
      },
    }),

    //------------------Get Academic Faculties----------------
    getAcademicFaculties: builder.query({
      query: () => {
        return { url: "/academic-faculties", method: "GET" };
      },
      transformResponse: (response: TResponseRedux<TAcademicFaculty[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    //------------------Add Academic Faculty----------------
    addAcademicFaculty: builder.mutation({
      query: (data) => ({
        url: "/academic-faculties/create-academic-faculty",
        method: "POST",
        body: data,
      }),
    }),

    //------------------Get Academic Departments----------------
    getAcademicDepartments: builder.query({
      query: () => {
        return { url: "/academic-departments", method: "GET" };
      },
      transformResponse: (response: TResponseRedux<TAcademicDepartment[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    //------------------Add Academic Department----------------
    addAcademicDepartment: builder.mutation({
      query: (data) => ({
        url: "/academic-departments/create-academic-department",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllSemestersQuery,
  useAddAcademicSemestersMutation,
  useGetAcademicFacultiesQuery,
  useGetSingleAcademicFacultyByIdQuery,
  useAddAcademicFacultyMutation,
  useGetAcademicDepartmentsQuery,
  useAddAcademicDepartmentMutation,
} = academicManagementApi;
