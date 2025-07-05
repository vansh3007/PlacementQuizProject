import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Outlet,
} from "react-router-dom";

import BaseLayout from "@/app/layouts/BaseLayout";
import AuthProvider from "@/app/providers/AuthProvider";

// Lazy-loaded components
const Login = lazy(() => import("@/app/pages/Login/Login"));
const Signup = lazy(() => import("@/app/pages/SignUp/Signup"));
const VerifyEmail = lazy(() => import("@/app/pages/ForgotPassword/VerifyEmail"));
const VerifyOTP = lazy(() => import("@/app/pages/ForgotPassword/VerifyOTP"));
const ResetPassword = lazy(() => import("@/app/pages/ForgotPassword/ResetPassword"));

import Home from "@/app/pages/Home/Home";
import Quiz from "@/app/pages/Quiz/Quiz";
import HiringUpdates from "@/app/pages/Hiring/Hiring";
import HiringPage from "@/app/pages/HiringPage/HiringPage";
import About from "@/app/pages/About/About";
import QuizPage from "@/app/pages/QuizPage/QuizPage";
import QuizAnalysis from "@/app/pages/QuizAnalysis/QuizAnalysis";
import QuizReview from "@/app/pages/QuizReview/QuizReview";
import PreviousQuizzes from "@/app/pages/PreviousQuizzes/PreviousQuizzes";
import AuthSkeleton from "@/components/skeleton/AuthSkeletion";


export default function Routes() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={
          <AuthProvider>
            <Outlet />
          </AuthProvider>
        }
      >
        {/* Public routes - no BaseLayout */}
        <Route
          path="/login"
          element={
            <Suspense fallback={<AuthSkeleton />}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Suspense fallback={<AuthSkeleton />}>
              <Signup />
            </Suspense>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <Suspense fallback={<AuthSkeleton />}>
              <VerifyEmail />
            </Suspense>
          }
        />
        <Route
          path="/verify-otp"
          element={
            <Suspense fallback={<AuthSkeleton />}>
              <VerifyOTP />
            </Suspense>
          }
        />
        <Route
          path="/reset-password"
          element={
            <Suspense fallback={<AuthSkeleton />}>
              <ResetPassword />
            </Suspense>
          }
        />
        <Route path="quiz/quizScreen" element={<QuizPage />} />

        {/* Protected routes - with BaseLayout */}
        <Route
          path="/"
          element={
            <BaseLayout>
              <Outlet />
            </BaseLayout>
          }
        >
          <Route index element={<Home />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="quiz/:id/analysis" element={<QuizAnalysis />} />
          <Route path="quiz/:id/review" element={<QuizReview />} />
          <Route path="previousQuizzes" element={<PreviousQuizzes />} />
          <Route path="hiring" element={<HiringUpdates />} />
          <Route path="hiring/:id" element={<HiringPage />} />
          <Route path="developer" element={<About />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}
