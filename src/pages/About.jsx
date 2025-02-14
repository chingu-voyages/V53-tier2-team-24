import { div } from "framer-motion/m";

const About = () => {
  return (
    <div className="min-h-screen p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center my-10 md:mb-12">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            About Plate Planner
          </h1>
          <div className="w-20 h-1 bg-darkPink mx-auto rounded-full" />
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-8 transition-all duration-300 hover:shadow-xl">
          <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
            Plate Planner revolutionizes workplace meal planning by providing a seamless solution for
            creating transparent, inclusive weekly menus. Our platform empowers managers to craft
            nutritious meal schedules while automatically accommodating dietary restrictions.
          </p>

          <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
            Key features include intelligent allergy filtering, one-click menu generation, and flexible
            day-off scheduling - all designed to promote employee wellbeing and streamline kitchen
            operations.
          </p>

          <div className="bg-lightPink rounded-lg p-4 md:p-6">
            <p className="text-gray-600 text-sm md:text-base italic">
              "We believe good nutrition fuels great work. Plate Planner bridges the gap between
              kitchen efficiency and employee needs, creating happier, healthier workplaces."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
