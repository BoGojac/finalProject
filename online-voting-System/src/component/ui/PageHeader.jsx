import PropTypes from "prop-types";

const PageHeader = ({ title }) => {
  return (
    <div className="bg-gradient-to-r from-[#455883]/60 to-[#00B5A5]/85 backdrop-blur-sm  text-white px-4 py-3 flex items-center shadow-md">
      {/* Logo */}
      <img src="../src/assets/NEBELOGO.svg" alt="Logo" className="h-10 w-auto" />

      {/* Title */}
      <h1 className="text-lg font-bold flex-1">{title}</h1>

      {/* Back button */}
      <button
        onClick={() => window.history.back()}
        className="bg-[#6B4AA0] hover:bg-[#5a3b91] text-white px-3 py-1 rounded-lg"
      >
        Back
      </button>
    </div>
  );
};

// ✅ Fix ESLint warning
PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PageHeader;
