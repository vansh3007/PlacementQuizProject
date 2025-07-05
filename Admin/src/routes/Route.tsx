import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import BaseLayout from "@/app/layout/BaseLayout";
import { lazy, Suspense } from "react";
import AuthProvider from "@/app/providers/AuthProvider";
const LoginPage = lazy(() => import("@/app/pages/auth/Login"));
const QuestionPage = lazy(() => import("@/app/pages/questions/QuestionsTable"));
const JobsPage = lazy(() => import("@/app/pages/jobs/JobsTable"));
const Dashboard = lazy(() => import("@/app/pages/dashboard/Dashboard"));
const Student = lazy(() => import("@/app/pages/students/StudentsTable"));
const Branch = lazy(() => import("@/app/pages/branch/BranchTable"));
const Routes = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={
            <AuthProvider>
              <Outlet />
            </AuthProvider>
          }
        >
          <Route
            path="/"
            element={
              <Suspense fallback={<div>Loading.....</div>}>
                <LoginPage></LoginPage>
              </Suspense>
            }
          />
          <Route
            path="/login"
            element={
              <Suspense fallback={<div>Loading.....</div>}>
                <LoginPage></LoginPage>
              </Suspense>
            }
          />
          <Route
            path="/"
            element={
              <BaseLayout>
                <Outlet />
              </BaseLayout>
            }
          >
            <Route
              path="dashboard"
              element={
                <Suspense>
                  <Dashboard />
                </Suspense>
              }
            />
            <Route
              path="questions"
              element={
                <Suspense>
                  <QuestionPage />
                </Suspense>
              }
            />
            <Route
              path="jobs"
              element={
                <Suspense>
                  <JobsPage />
                </Suspense>
              }
            />
            <Route
              path="students"
              element={
                <Suspense>
                  <Student />
                </Suspense>
              }
            />
            <Route
              path="branches"
              element={
                <Suspense>
                  <Branch />
                </Suspense>
              }
            />
          </Route>
        </Route>
      </>
    )
  );
  return <RouterProvider router={router} />;
};

export default Routes;
