
"use client";
import Title from "@/components/sections/shared/Title";
import { useGetAllReviewsQuery } from "@/redux/features/product/review.api";
import AllReviewTable from "./sections/AllReviewTable";


const AllReviews = () => {

    const { data: reviews, } = useGetAllReviewsQuery([]);


    console.log('all review', reviews);

    return <div className="space-y-6">
        <Title
            mainTitle="All Reviews"
            subTitle="The All Reviews page provides a complete overview of reviews available in the system."
        />
        <div className="mt-4 lg:mt-6">
            <AllReviewTable />
        </div>
    </div>;
};

export default AllReviews;
