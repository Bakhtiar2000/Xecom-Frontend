
/* 
===========================================================================================
    This component is just for example to show how redux api services are created. 
===========================================================================================
*/

import { TAdmin, TFaculty, TQueryParam, TResponseRedux, TStudent } from "../../../types";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //-----------------Get All Students-----------------
    getAllStudents: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/students",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TStudent[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    //-----------------Get All Faculties-----------------
    getAllFaculties: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/faculties",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TFaculty[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    //-----------------Get All Admins-----------------
    getAllAdmins: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/admins",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TAdmin[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    //-----------------Get Single Student by ID-----------------
    getSingleStudentById: builder.query({
      query: (args: { student: string }) => {
        console.log(args)
        return {
          url: `/students/${args.student}`,
          method: "GET",
        }
      },
      transformResponse: (response: TResponseRedux<TStudent>) => {
        return {
          data: response.data
        };
      },
    }),

    //-----------------Get Single Faculty by ID-----------------
    getSingleFacultyById: builder.query({
      query: (args: { faculty: string }) => {
        return {
          url: `/faculties/${args.faculty}`,
          method: "GET",
        }
      },
      transformResponse: (response: TResponseRedux<TFaculty>) => {
        return {
          data: response.data
        };
      },
    }),

    //-----------------Get Single Admin by ID-----------------
    getSingleAdminById: builder.query({
      query: (args: { admin: string }) => {
        return {
          url: `/admins/${args.admin}`,
          method: "GET",
        }
      },
      transformResponse: (response: TResponseRedux<TAdmin>) => {
        return {
          data: response.data
        };
      },
    }),

    //-----------------Add Students-----------------
    addStudent: builder.mutation({
      query: (data) => ({
        url: "/users/create-student",
        method: "POST",
        body: data,
      }),
    }),

    //-----------------Add Faculty-----------------
    addFaculty: builder.mutation({
      query: (data) => {
        console.log(data)
        return {
          url: "/users/create-faculty",
          method: "POST",
          body: data,
        }
      },
    }),

    //-----------------Add Admin-----------------
    addAdmin: builder.mutation({
      query: (data) => {
        console.log(data)
        return {
          url: "/users/create-admin",
          method: "POST",
          body: data,
        }
      },
    }),

    //-----------------Change Status-----------------
    changeStatus: builder.mutation({
      query: (args) => {
        console.log(args)
        return {
          url: `/users/change-status/${args.userId}`,
          method: "POST",
          body: args.data,
        }
      },
    }),
  }),
});

export const {
  useAddStudentMutation,
  useAddFacultyMutation,
  useAddAdminMutation,
  useGetAllStudentsQuery,
  useGetAllFacultiesQuery,
  useGetAllAdminsQuery,
  useGetSingleStudentByIdQuery,
  useGetSingleFacultyByIdQuery,
  useGetSingleAdminByIdQuery,
  useChangeStatusMutation
} = userManagementApi;
