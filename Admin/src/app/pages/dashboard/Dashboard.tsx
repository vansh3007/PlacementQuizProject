import { useEffect } from "react";
import type { ReactElement } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, HelpCircle, Users } from "lucide-react";
import { useDashboardStore } from "@/store/useDashboardStore";
import { Skeleton } from "@/components/ui/skeleton";

const Dashboard = () => {
  const { jobs, questions, students, fetchDashboardData, loading, error } =
    useDashboardStore();

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const renderCard = (
    title: string,
    count: number,
    icon: ReactElement,
    subtitle: string
  ) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{count}</div>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <>
            <Skeleton className="h-[100px] w-full rounded-xl" />
            <Skeleton className="h-[100px] w-full rounded-xl" />
            <Skeleton className="h-[100px] w-full rounded-xl" />
          </>
        ) : (
          <>
            {renderCard(
              "Total Jobs",
              jobs,
              <Briefcase className="w-5 h-5 text-muted-foreground" />,
              "Jobs listed"
            )}
            {renderCard(
              "Total Questions",
              questions,
              <HelpCircle className="w-5 h-5 text-muted-foreground" />,
              "MCQs created"
            )}
            {renderCard(
              "Total Students",
              students,
              <Users className="w-5 h-5 text-muted-foreground" />,
              "Registered students"
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
