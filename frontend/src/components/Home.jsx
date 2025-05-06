import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-600">HealthSetu</h1>
            <div className="flex space-x-4">
              <button onClick={() => navigate('/login')} className="text-gray-600 hover:text-blue-600 font-medium">Login</button>
              <button onClick={() => navigate('/signup')} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">Sign Up</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex-grow flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-8">
            Your Health, Our Priority
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto mb-12">
            Book appointments with top healthcare professionals and manage your health journey seamlessly
          </p>
          
          {/* Search/CTA Section */}
          <div className="bg-white p-8 rounded-2xl shadow-xl max-w-4xl mx-auto mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">Find Doctors</h3>
                <button className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl hover:bg-blue-700 transition duration-300 text-lg font-medium">
                  Book an Appointment
                </button>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">Online Consultation</h3>
                <button className="w-full bg-green-600 text-white py-4 px-6 rounded-xl hover:bg-green-700 transition duration-300 text-lg font-medium">
                  Consult Now
                </button>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
              <div className="text-blue-600 text-4xl mb-4">👨‍⚕️</div>
              <h3 className="text-xl font-bold mb-3">Verified Doctors</h3>
              <p className="text-gray-600">Consult with qualified and experienced healthcare professionals</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
              <div className="text-blue-600 text-4xl mb-4">📅</div>
              <h3 className="text-xl font-bold mb-3">Easy Booking</h3>
              <p className="text-gray-600">Book appointments instantly with your preferred doctors</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
              <div className="text-blue-600 text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold mb-3">Digital Records</h3>
              <p className="text-gray-600">Access your medical history and prescriptions anytime</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home