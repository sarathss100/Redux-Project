import Navbar from "../components/Navbar";

const HomePage = function () {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <h1 className="text-4xl font-bold text-gray-900 text-center">
            Welcome to Home Page
          </h1>
        </div>
      </div>
    )
};

export default HomePage;