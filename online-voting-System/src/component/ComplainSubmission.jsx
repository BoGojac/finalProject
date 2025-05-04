// import { useState } from 'react';
// import CandidateComplaintForm from '.CandidateComplainForm.jsx';
// import { submitComplaint } from '../api/complaints'; // Your API function

// const ComplaintSubmissionPage = () => {
//   const [submissionStatus, setSubmissionStatus] = useState(null);

//   const handleSubmit = async (formData) => {
//     try {
//       await submitComplaint(formData); // Your API call
//       setSubmissionStatus('success');
//     } catch (error) {
//       console.error('Error submitting complaint:', error);
//       setSubmissionStatus('error');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-3xl mx-auto">
//         {submissionStatus === 'success' ? (
//           <div className="bg-white p-6 rounded-lg shadow-md text-center">
//             <h2 className="text-xl font-semibold text-green-600 mb-2">Complaint Submitted Successfully!</h2>
//             <p className="text-gray-600">Your complaint has been received. We will review it and get back to you soon.</p>
//           </div>
//         ) : submissionStatus === 'error' ? (
//           <div className="bg-white p-6 rounded-lg shadow-md text-center">
//             <h2 className="text-xl font-semibold text-red-600 mb-2">Submission Failed</h2>
//             <p className="text-gray-600">There was an error submitting your complaint. Please try again.</p>
//             <button
//               onClick={() => setSubmissionStatus(null)}
//               className="mt-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700"
//             >
//               Try Again
//             </button>
//           </div>
//         ) : (
//           <CandidateComplaintForm onSubmit={handleSubmit} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default ComplaintSubmissionPage;