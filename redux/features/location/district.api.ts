import { TDistrict, TResponseRedux } from "@/types";
import { baseApi } from "../../api/baseApi";
import { TAddDistrictDto } from "./dto/district.dto";

const districtApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // -----------Get All District--------------------


    getAllDistrict: builder.query({
      query: (args) =>{
        const params = new URLSearchParams();

        if(args){
          args.forEach((item: TDistrict) =>{
            params.append(item.name , item.value as string)
          });
        }
        return { 
          url: "/district",
          method: "GET",
          params: params,
        };

      }
    }), 

    //-----------------Add District-----------------
    addDistrict: builder.mutation({
      query: (data: TAddDistrictDto) => ({
        url: "/district",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["district"],
    }),

    //-----------------Get Single District-----------------
    getSingleDistrict: builder.query({
      query: (id: string) => ({
        url: `/district/${id}`,
        method: "GET",
      }),
      providesTags: ["district"],
      transformResponse: (response: TResponseRedux<TDistrict>) => {
        return {
          data: response.data,
        };
      },
    }),


    //-----------------update District-----------------

    updateDistrict: builder.mutation({
      query: (args: { id: string; data: any }) => ({   
        url: `/district/${args.id}`,
        method: "PUT",
        body: args.data,
      }),
      invalidatesTags: ["district"],
    }),



  }),
});

export const { 
  useAddDistrictMutation,
   useGetSingleDistrictQuery, 
   useGetAllDistrictQuery , 
   useUpdateDistrictMutation 
  } =
  districtApi;
