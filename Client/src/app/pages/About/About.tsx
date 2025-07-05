import logo from "@/assets/MITS-Gwalior-Logo.jpg";

const teamData = [
  {
    name: "Vansh Shrivastava",
    role: "Full Stack Developer",
    degree: "B.Tech - ETE (Batch 2026)",
    desc: "Experienced developer skilled in building complete web applications from scratch, handling both frontend and backend development using React and other web technologies.",
    image: logo,
    socials: [
      { icon: "🌐", link: "#" },
      { icon: "💼", link: "#" },
      { icon: "🔗", link: "#" },
    ],
    gradient: "from-blue-500 to-purple-500",
    button: "View Portfolio",
  },
  {
    name: "Ashwani Sharma",
    role: "Full Stack Developer",
    degree: "B.Tech - ETE (Batch 2026)",
    desc: "Led the overhaul of a full-stack web application by adopting a modern technology stack, significantly improving performance, while optimizing backend systems for reliability and scalability.",
    image: logo,
    socials: [
      { icon: "🌐", link: "#" },
      { icon: "💼", link: "#" },
      { icon: "🔗", link: "#" },
    ],
    gradient: "from-orange-500 to-pink-500",
    button: "View Portfolio",
  },
];

const TeamSection = () => {
  return (
    <section className="h-[calc(100vh-4rem)] bg-gradient-to-b from-white to-blue-50 flex items-center">
      <div className="max-w-7xl mx-auto px-4 md:px-6 w-full">
        {/* Heading */}
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-2xl md:text-4xl font-bold text-blue-800 mb-2">
            Meet Our Development Team
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Passionate engineers crafting high-performance, scalable and
            delightful digital experiences with modern web technologies.
          </p>
        </div>

        {/* Team Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {teamData.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-transform hover:-translate-y-1 duration-300 w-full max-w-sm mx-auto"
            >
              <div
                className={`h-16 md:h-20 rounded-t-2xl bg-gradient-to-r ${member.gradient}`}
              />
              <div className="relative -mt-12 flex justify-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white shadow-md object-cover"
                />
              </div>
              <div className="p-4 md:p-6 text-center">
                <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-500">{member.degree}</p>
                <p className="text-sm text-blue-700 mt-1 font-medium">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                  {member.desc}
                </p>

                <div className="flex justify-center gap-3 mt-4">
                  {member.socials.map((s, i) => (
                    <a
                      key={i}
                      href={s.link}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-blue-100 text-lg transition-colors"
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>

                <button
                  className={`mt-4 px-4 py-2 rounded-full text-white font-medium text-sm bg-gradient-to-r ${member.gradient} hover:scale-105 transition-transform`}
                >
                  {member.button}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
