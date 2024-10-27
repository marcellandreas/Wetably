export default function Home() {
  return (
    <>
      <section className=" min-h-screen flex flex-col gap-4">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-indigo-400 to-indigo-600 text-white py-20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">
              Organize Your Life Effortlessly
            </h2>
            <p className="text-lg mb-6 text-gray-700">
              Manage your tasks and notes in one convenient place with Wetably.
            </p>
            <a
              href="#"
              className="px-6 py-3 bg-white text-indigo-600 rounded-md font-semibold hover:bg-gray-200 transition"
            >
              Get Started for Free
            </a>
          </div>
        </section>

        <section id="features" className="py-16">
          <div className="container mx-auto px-6 text-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-10">
              Why Choose Wetably?
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h4 className="text-2xl font-bold text-indigo-600 mb-2">
                  Easy To-Do Management
                </h4>
                <p className="text-gray-700">
                  Organize and prioritize your tasks with our intuitive to-do
                  list feature.
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h4 className="text-2xl font-bold text-indigo-600 mb-2">
                  Quick Notes
                </h4>
                <p className="text-gray-700">
                  Capture ideas instantly with a simple and accessible notes
                  feature.
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h4 className="text-2xl font-bold text-indigo-600 mb-2">
                  Sync Across Devices
                </h4>
                <p className="text-gray-700">
                  Access your notes and tasks on any device with real-time sync.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="about" className="py-16 bg-gray-100">
          <div className="container mx-auto px-6 text-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-10">About Us</h3>
            <p className="text-lg text-gray-700 mb-6">
              At Wetably, we believe that organization is key to success. Our
              mission is to provide an intuitive and efficient platform for
              individuals and teams to manage their tasks and notes seamlessly.
              We are a passionate team of developers and designers dedicated to
              helping you achieve your goals and maximize productivity.
            </p>
            <p className="text-lg text-gray-700">
              Join us on our journey to transform the way you work and live!
            </p>
          </div>
        </section>
      </section>
    </>
  );
}
