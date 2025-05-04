import { useState } from 'react';
import { Upload, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'; // Removed unused FileText

const ComplainForm = () => {
  const [complaint, setComplaint] = useState('');
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const validTypes = ['application/pdf', 
                       'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const isTypeValid = validTypes.includes(selectedFile.type);
    const isSizeValid = selectedFile.size <= 5 * 1024 * 1024;

    if (!isTypeValid || !isSizeValid) {
      setStatus({
        loading: false,
        success: false,
        error: isTypeValid ? 'File must be <5MB' : 'Only PDF/DOCX allowed'
      });
      e.target.value = '';
      return;
    }

    setFile(selectedFile);
    setStatus({ ...status, error: null });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    setTimeout(() => {
      try {
        const complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
        const newComplaint = {
          id: Date.now(),
          text: complaint,
          fileName: file?.name || null,
          date: new Date().toISOString()
        };
        
        localStorage.setItem('complaints', JSON.stringify([...complaints, newComplaint]));
        
        setStatus({ loading: false, success: true, error: null });
        setComplaint('');
        setFile(null);
        e.target.reset();
      } catch {
        // Removed unused 'err' parameter
        setStatus({ loading: false, success: false, error: 'Submission failed' });
      }
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        {status.success ? (
          <CheckCircle className="text-green-500" />
        ) : status.error ? (
          <AlertCircle className="text-red-500" />
        ) : null}
        Candidate Complaint
      </h2>

      {status.success ? (
        <div className="text-center py-8">
          <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Complaint Submitted!</h3>
          <p className="mt-2 text-sm text-gray-500">
            Your complaint has been recorded (stored in browser localStorage).
          </p>
          <button
            onClick={() => setStatus({ loading: false, success: false, error: null })}
            className="mt-6 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Submit Another
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Complaint Details 
            </label>
            <textarea
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
              rows={4}
              required
              placeholder="Describe your issue..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Supporting Document (Optional)
            </label>
            <div className="flex items-center gap-2">
              <label className="flex-1 cursor-pointer bg-gray-50 border border-dashed border-gray-300 rounded-md px-4 py-8 text-center">
                <Upload className="mx-auto h-8 w-8 text-gray-400" />
                <p className="mt-1 text-sm text-gray-600">
                  {file ? file.name : 'Click to upload PDF/DOCX'}
                </p>
                <input
                  type="file"
                  accept=".pdf,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
            <p className="mt-1 text-xs text-gray-500">Max 5MB • Optional</p>
          </div>

          {status.error && (
            <div className="text-red-500 text-sm flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {status.error}
            </div>
          )}

          <button
            type="submit"
            disabled={status.loading}
            className={`w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 ${
              status.loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {status.loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin h-4 w-4" />
                Submitting...
              </span>
            ) : (
              'Submit Complaint'
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default ComplainForm;