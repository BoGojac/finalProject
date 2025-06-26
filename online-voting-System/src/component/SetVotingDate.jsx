import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { create } from "zustand";
import { useEffect } from "react";
import { z } from "zod";
import { Calendar, AlertCircle, Pencil } from "lucide-react";
import axios from "axios";

// Validation schema
const votingSchema = z.object({
  title: z.string({ required_error: "Please enter a title for the voting" }).min(1),
  voting_date: z
    .string({ required_error: "Please choose the voting date" })
    .refine(
      (dateStr) => {
        if (!dateStr) return false;
        const selectedDate = new Date(dateStr);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate >= today;
      },
      { message: "Voting date cannot be in the past" }
    ),
});

// Zustand store for all voting states
const useVotingStore = create((set) => ({
  successMessage: "",
  errorMessage: "",
  votingList: [],
  editingVoting: null, // currently editing voting date object

  // setters
  setVotingList: (list) => set({ votingList: list }),
  setSuccessMessage: (msg) => set({ successMessage: msg, errorMessage: "" }),
  setErrorMessage: (msg) => set({ errorMessage: msg, successMessage: "" }),
  clearMessages: () => set({ successMessage: "", errorMessage: "" }),

  setEditingVoting: (voting) => set({ editingVoting: voting }),
  clearEditingVoting: () => set({ editingVoting: null }),
}));

const SetVotingDate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(votingSchema),
  });

  const votingDate = watch("voting_date");

  const {
    successMessage,
    errorMessage,
    votingList,
    setVotingList,
    setSuccessMessage,
    setErrorMessage,
    clearMessages,
    editingVoting,
    setEditingVoting,
    clearEditingVoting,
  } = useVotingStore();

  // Fetch voting dates on mount
  useEffect(() => {
      axios.get("http://localhost:8000/api/voting-date")
        .then((res) => {
          const filtered = res.data.data.filter((v) => new Date(v.voting_date) >= new Date());
          setVotingList(filtered);
        })
        .catch((err) => {
          setErrorMessage(err.response?.data?.message || "Failed to fetch voting dates");
        });
    }, [setVotingList, setErrorMessage]); // ← include it here


  // When editingVoting changes, reset form values
  useEffect(() => {
    if (editingVoting) {
      reset({
        title: editingVoting.title,
        voting_date: editingVoting.voting_date.slice(0, 10),
      });
    } else {
      reset({ title: "", voting_date: "" });
    }
  }, [editingVoting, reset]);

  // Form submit handler
  const onSubmit = async (data) => {
    clearMessages();

    const isEdit = !!editingVoting;
    const method = isEdit ? "put" : "post";
    const url = isEdit
      ? `http://localhost:8000/api/voting-date/${editingVoting.id}`
      : "http://localhost:8000/api/voting-date";

    try {
      const res = await axios({
        method,
        url,
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        data,
      });

      setSuccessMessage(res.data.message);

      // Refresh voting list after update/create
      const updatedListRes = await axios.get("http://localhost:8000/api/voting-date");
      const filtered = updatedListRes.data.data.filter((v) => new Date(v.voting_date) >= new Date());
      setVotingList(filtered);

      reset();
      clearEditingVoting();

      setTimeout(() => {
        clearMessages();
      }, 3000);
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Failed to connect to server");
    }
  };

  const daysRemaining = votingDate
    ? Math.ceil((new Date(votingDate) - new Date()) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <div className="p-4 sm:p-6 bg-white rounded-lg shadow-md border border-[#F0EBF8] max-w-lr mx-auto">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-[#4A2C82] flex items-center gap-2">
          <Calendar className="text-[#6B4AA0]" /> {editingVoting ? "Update" : "Set"} Voting Date
        </h2>
        <div>
          <button
            className="text-[#6B4AA0] hover:text-[#4A2C82] flex items-center gap-1 text-sm"
            onClick={() => document.getElementById("editDropdown").classList.toggle("hidden")}
            type="button"
          >
            <Pencil size={16} /> Edit
          </button>
          <select
            id="editDropdown"
            className="hidden mt-1 border border-[#D9D9D9] rounded p-1 text-sm"
            onChange={(e) => {
              const selected = votingList.find((v) => v.id == e.target.value);
              if (selected) setEditingVoting(selected);
            }}
            defaultValue=""
          >
            <option value="" disabled>
              Select voting date to edit
            </option>
            {votingList.map((v) => (
              <option key={v.id} value={v.id}>
                {v.title} ({new Date(v.voting_date).toLocaleDateString()})
              </option>
            ))}
          </select>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-[#5E5E5E] mb-1">
            {editingVoting ? "Update Voting Title" : "Voting Title"}
          </label>
          <input
            id="title"
            {...register("title")}
            placeholder="Enter voting title"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#6B4AA0] ${
              errors.title ? "border-red-500" : "border-[#D9D9D9]"
            }`}
          />
          {errors.title && (
            <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
              <AlertCircle size={14} /> {errors.title.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="voting_date" className="block text-sm font-medium text-[#5E5E5E] mb-1">
            {editingVoting ? "Update Voting Date" : "Voting Date"}
          </label>
          <input
            type="date"
            id="voting_date"
            {...register("voting_date")}
            min={new Date().toISOString().split("T")[0]}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#6B4AA0] ${
              errors.voting_date ? "border-red-500" : "border-[#D9D9D9]"
            }`}
          />
          {errors.voting_date && (
            <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
              <AlertCircle size={14} /> {errors.voting_date.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-4 py-2 bg-[#6B4AA0] text-white rounded-md hover:bg-[#5D3A8F] focus:ring-2"
        >
          {isSubmitting
            ? editingVoting
              ? "Updating..."
              : "Submitting..."
            : editingVoting
            ? "Update Voting Date"
            : "Submit Voting Date"}
        </button>

        {errorMessage && (
          <div className="p-2 mt-2 text-sm bg-[#FFEBEE] text-[#C62828] rounded-md flex items-center gap-2">
            <AlertCircle size={16} /> {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="p-2 mt-2 text-sm bg-[#E8F5E9] text-[#2E7D32] rounded-md">
            {successMessage}
          </div>
        )}
      </form>

      {votingDate && !errors.voting_date && (
        <div className="mt-6 border-t border-[#F0EBF8] pt-4">
          <h3 className="text-base font-medium text-[#4A2C82] mb-2">Voting Date Preview</h3>
          <div className="bg-[#F9F5FF] p-3 rounded-lg border border-[#F0EBF8]">
            <p className="text-[#5E5E5E]">
              {new Date(votingDate).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-sm text-[#7C7C7C] mt-1">{daysRemaining} days from today</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SetVotingDate;
