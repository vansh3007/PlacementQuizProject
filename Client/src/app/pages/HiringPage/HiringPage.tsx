import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/reusable/Section";
import { useHiringStore } from "@/store/useHiringStore";
import {
  MapPin,
  BadgeIndianRupee,
  ScrollText,
  Wrench,
  GraduationCap,
  Building2,
} from "lucide-react";
import { SkeletonDetailCard } from "@/components/skeleton/SkeletonDetailCard";

const HiringPage = () => {
  const { id } = useParams();
  const hiringById = useHiringStore((state) => state.hiringById);
  const job = useHiringStore((state) => state.hiringDataById);
  const loading = useHiringStore((state) => state.loading);

  useEffect(() => {
    if (id) hiringById(id);
  }, [id]);

  // ✅ Skeleton View
  if (loading) {
    return (
      <SkeletonDetailCard />
    );
  }

  // ✅ Real Data View
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        {/* Header */}
        <div className="flex gap-4 items-center mb-10">
          <img
            src={job?.logo}
            alt={`${job?.companyName} logo`}
            className="w-16 h-16 rounded-xl border border-gray-200 shadow"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {job?.jobTitle}
            </h1>
            <p className="text-gray-600 text-base">{job?.companyName}</p>
          </div>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {[
            {
              icon: <MapPin className="text-blue-600" size={20} />,
              label: "Location",
              value: job?.location,
            },
            {
              icon: <BadgeIndianRupee className="text-green-600" size={20} />,
              label: "CTC",
              value: job?.package || "Not specified",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 bg-white rounded-xl p-4 shadow"
            >
              {item.icon}
              <div>
                <p className="text-xs text-gray-500">{item.label}</p>
                <p className="font-medium text-gray-800">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        <hr className="my-8 border-gray-200" />

        {/* Job Description */}
        <Section
          title={
            <div className="flex items-center gap-2 text-gray-700 text-lg font-semibold">
              <ScrollText /> Job Description
            </div>
          }
        >
          <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
            {job?.jobDescription}
          </p>
        </Section>

        {/* Required Skills */}
        <Section
          title={
            <div className="flex items-center gap-2 text-gray-700 text-lg font-semibold">
              <Wrench /> Required Skills
            </div>
          }
        >
          <div className="flex flex-wrap gap-2">
            {["AWS", "Next.js", "Node.js", "React", "React Native"].map(
              (skill) => (
                <span
                  key={skill}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold"
                >
                  {skill}
                </span>
              )
            )}
          </div>
        </Section>

        {/* Eligibility */}
        <Section
          title={
            <div className="flex items-center gap-2 text-gray-700 text-lg font-semibold">
              <GraduationCap /> Eligibility Criteria
            </div>
          }
        >
          <ul className="list-disc pl-6 text-sm text-gray-700 space-y-2">
            <li>Final year graduation (B.Tech/B.E. or equivalent)</li>
            <li>Full-time availability post-academics</li>
            <li>Immediate joiners preferred</li>
            <li>Strong interest in web/software development</li>
          </ul>
          <p className="text-gray-600 text-xs mt-3">
            <strong>Note:</strong> Ideal for freshers transitioning into
            full-time roles.
          </p>
        </Section>

        {/* About Company */}
        <Section
          title={
            <div className="flex items-center gap-2 text-gray-700 text-lg font-semibold">
              <Building2 /> About {job?.companyName}
            </div>
          }
        >
          <p className="text-sm text-gray-700 leading-relaxed">
            Kapidron is a tech-driven startup specializing in AI-based
            solutions, modern UI/UX, and scalable full-stack applications. They
            empower young developers through real-world mentorship and agile
            product delivery.
          </p>
        </Section>

        {/* Apply Button */}
        <div className="mt-10">
          <Button
            className="w-full py-3 text-lg font-semibold rounded-2xl text-white bg-blue-600 hover:bg-blue-700 "
            onClick={() =>
              job?.applyLink && window.open(job.applyLink, "_blank")
            }
          >
            Apply Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HiringPage;
