import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useHiringStore } from "@/store/useHiringStore";
import { MapPin, BadgeDollarSign } from "lucide-react";
import SkeletonCard from "@/components/skeleton/SkeletonCard";

const Hiring = () => {
  const { hiringData, fetchHiringData, loading } = useHiringStore();

  useEffect(() => {
    fetchHiringData();
  }, [fetchHiringData]);

  // ✅ Skeleton Layout
  if (loading) {
    return (
      <SkeletonCard />
    );
  }

  // ✅ Real Data Layout
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6 sm:p-10 space-y-10">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-blue-800 mb-4">
          Open Hiring Positions
        </h1>
        <p className="text-gray-600 text-lg">
          Explore exciting career opportunities and join amazing teams!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {hiringData.map((job) => (
          <Card
            key={job.id}
            className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 border border-gray-100"
          >
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">
                {job.jobTitle}
              </CardTitle>
              <CardDescription className="text-sm text-gray-500">
                {job.companyName}
              </CardDescription>
            </CardHeader>

            <CardContent className="text-sm text-gray-700 space-y-4">
              <div className="flex items-start gap-2">
                <BadgeDollarSign className="w-5 h-5 text-green-600 mt-0.5" />
                <p>
                  <span className="font-medium">Salary:</span> {job.package}
                </p>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
                <p>
                  <span className="font-medium">Location:</span> {job.location}
                </p>
              </div>
            </CardContent>

            <CardFooter>
              <Link to={`/hiring/${job.id}`} className="w-full">
                <Button className="w-full rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 shadow-md transition">
                  View Details
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Hiring;
