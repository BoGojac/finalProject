import { useEffect, useState } from 'react'
import { usePeriodStore } from '../store/registrationPeriodStore.js'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarRange, Users, UserPlus, Edit2, Trash2, Check, X, AlertCircle, Loader2 } from 'lucide-react'

const periodSchema = z.object({
  voting_date_id: z.string().min(1, 'Voting date is required'),
  beginning_date: z.string().min(1, 'Beginning date is required'),
  ending_date: z.string().min(1, 'Ending date is required'),
}).refine(
  data => new Date(data.ending_date) >= new Date(data.beginning_date),
  { message: 'Ending date must be after beginning date', path: ['ending_date'] }
)

const SetRegistrationTimespan = () => {
  const { votingDates, periods, fetchAll, savePeriod, deletePeriod, isLoading, error } = usePeriodStore()
  const [editingType, setEditingType] = useState(null) // 'voter' | 'candidate' | null
  const [success, setSuccess] = useState('')

  useEffect(() => { fetchAll() }, [fetchAll])

  const defaultValues = editingType && periods[editingType]
    ? {
        voting_date_id: String(periods[editingType].voting_date_id || ''),
        beginning_date: periods[editingType].beginning_date || '',
        ending_date: periods[editingType].ending_date || ''
      }
    : { voting_date_id: '', beginning_date: '', ending_date: '' }

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(periodSchema),
    defaultValues,
  })

  // Reset form when editingType or periods changes
  useEffect(() => {
    reset(defaultValues)
  }, [editingType, periods, reset])

  const onSubmit = async (data) => {
    if (!editingType) return
    const success = await savePeriod(editingType, data)
    if (success) {
      setSuccess(`${editingType.charAt(0).toUpperCase() + editingType.slice(1)} registration period saved`)
      setEditingType(null)
      setTimeout(() => setSuccess(''), 3000)
    }
  }

  const startEdit = (type) => {
    setEditingType(type)
    setSuccess('')
  }

  const cancelEdit = () => {
    setEditingType(null)
  }

  const handleDelete = async (type) => {
    if (!window.confirm(`Delete ${type} registration period?`)) return
    const success = await deletePeriod(type)
    if (success) {
      setSuccess(`${type.charAt(0).toUpperCase() + type.slice(1)} registration period deleted`)
      setEditingType(null)
      setTimeout(() => setSuccess(''), 3000)
    }
  }

  const renderPeriodSection = (type, Icon, label) => {
    const period = periods[type]
    const isEditing = editingType === type

    return (
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="flex items-center gap-2 text-xl font-semibold text-[#4A2C82]">
            <Icon className="text-[#6B4AA0]" /> {label}
          </h3>
          {!isEditing && period && (
            <div className="flex gap-2">
              <button onClick={() => startEdit(type)} title="Edit" disabled={isLoading}>
                <Edit2 size={18} className="text-[#6B4AA0]" />
              </button>
              <button onClick={() => handleDelete(type)} title="Delete" disabled={isLoading}>
                <Trash2 size={18} className="text-red-600" />
              </button>
            </div>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-[#5E5E5E] mb-1">Voting Date</label>
              <select {...register('voting_date_id')} disabled={isLoading} className="w-full px-3 py-2 border rounded">
                <option value="">Select Voting Date</option>
                {votingDates.map(d => (
                  <option key={d.id} value={String(d.id)}>
                    {new Date(d.date).toLocaleDateString()}
                  </option>
                ))}
              </select>
              {errors.voting_date_id && <p className="text-red-600 text-sm mt-1">{errors.voting_date_id.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#5E5E5E] mb-1">Beginning Date</label>
              <input type="date" {...register('beginning_date')} disabled={isLoading} className="w-full px-3 py-2 border rounded" />
              {errors.beginning_date && <p className="text-red-600 text-sm mt-1">{errors.beginning_date.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#5E5E5E] mb-1">Ending Date</label>
              <input type="date" {...register('ending_date')} disabled={isLoading} className="w-full px-3 py-2 border rounded" />
              {errors.ending_date && <p className="text-red-600 text-sm mt-1">{errors.ending_date.message}</p>}
            </div>

            <div className="md:col-span-3 flex gap-2">
              <button type="submit" disabled={isLoading} className="px-4 py-2 bg-[#6B4AA0] text-white rounded hover:bg-[#5D3A8F] flex items-center gap-1">
                <Check size={16} /> Save
              </button>
              <button type="button" onClick={cancelEdit} disabled={isLoading} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 flex items-center gap-1">
                <X size={16} /> Cancel
              </button>
            </div>
          </form>
        ) : period ? (
          <div className="bg-[#F9F5FF] p-4 rounded border border-[#F0EBF8]">
            <p><strong>Voting Date:</strong>{' '}
              {votingDates.find(d => d.id === period.voting_date_id)
                ? new Date(votingDates.find(d => d.id === period.voting_date_id).date).toLocaleDateString()
                : 'Not specified'}
            </p>
            <p><strong>Period:</strong>{' '}
              {new Date(period.beginning_date).toLocaleDateString()} – {new Date(period.ending_date).toLocaleDateString()}
            </p>
          </div>
        ) : (
          <p className="italic text-gray-500">No {label.toLowerCase()} set</p>
        )}
      </div>
    )
  }

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="flex items-center gap-2 text-2xl font-semibold text-[#4A2C82] mb-6">
        <CalendarRange className="text-[#6B4AA0]" /> Manage Registration Periods
      </h2>

      {error && (
        <div className="mb-4 p-2 bg-[#FFEBEE] text-[#C62828] rounded flex items-center gap-2">
          <AlertCircle /> {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-2 bg-[#E8F5E9] text-[#2E7D32] rounded border border-[#C8E6C9]">
          {success}
        </div>
      )}

      {isLoading && votingDates.length === 0 ? (
        <Loader2 className="animate-spin mx-auto" size={32} />
      ) : (
        <>
          {renderPeriodSection('voter', Users, 'Voter Registration')}
          {renderPeriodSection('candidate', UserPlus, 'Candidate Registration')}
        </>
      )}
    </div>
  )
}

export default SetRegistrationTimespan





// import { useEffect } from 'react';
// import { usePeriodStore } from '../store/registrationPeriodStore';
// import PeriodForm from './PeriodForm';
// import { Users, UserPlus, Edit2, Trash2, AlertCircle, Loader2 } from 'lucide-react';

// export default function SetRegistrationTimespan() {
//   const {
//     votingDates,
//     periods,
//     isLoading,
//     error,
//     fetchAll,
//     savePeriod,
//     deletePeriod,
//     setEditing,
//   } = usePeriodStore();

//   useEffect(() => {
//     fetchAll();
//   }, [fetchAll]);

//   const renderSection = (type, Icon, label) => {
//     const period = periods[type];

//     // Debug logs
//     console.log('votingDates:', votingDates);
//     console.log('period:', period);

//     const startEdit = () => setEditing(type, { isEditing: true, ...period });
//     const cancelEdit = () => setEditing(type, { isEditing: false });
//     const onSubmit = async (data) => {
//       await savePeriod(type, data);
//       setEditing(type, { isEditing: false });
//     };
//     const onDelete = async () => {
//       if (window.confirm(`Delete ${label} period?`)) deletePeriod(type);
//     };

//     const votingDateObject =
//       Array.isArray(votingDates) && votingDates.length > 0 && period?.voting_date_id
//         ? votingDates.find((d) => d.id === period.voting_date_id)
//         : null;

//     return (
//       <div className="mb-6">
//         <div className="flex justify-between">
//           <h3 className="flex items-center gap-2"><Icon /> {label}</h3>
//           {period?.id && !period.isEditing && (
//             <div className="flex gap-2">
//               <button onClick={startEdit}><Edit2 /></button>
//               <button onClick={onDelete}><Trash2 /></button>
//             </div>
//           )}
//         </div>

//         {period?.isEditing ? (
//           <PeriodForm
//             initial={{
//               voting_date_id: period.voting_date_id?.toString() || '',
//               beginning_date: period.beginning_date || '',
//               ending_date: period.ending_date || '',
//             }}
//             onSubmit={onSubmit}
//             onCancel={cancelEdit}
//             votingDates={votingDates}
//             isLoading={isLoading}
//           />
//         ) : period ? (
//           <div>
//             <p>
//               <strong>Voting Date:</strong>{' '}
//               {votingDateObject
//                 ? new Date(votingDateObject.date).toLocaleDateString()
//                 : 'Unknown'}
//             </p>
//             <p>
//               <strong>Period:</strong>{' '}
//               {new Date(period.beginning_date).toLocaleDateString()} –{' '}
//               {new Date(period.ending_date).toLocaleDateString()}
//             </p>
//           </div>
//         ) : (
//           <p className="italic text-gray-500">Not set</p>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="p-6 bg-white rounded shadow">
//       <h2>Manage Registration Periods</h2>
//       {error && (
//         <div className="text-red-600 flex items-center gap-2">
//           <AlertCircle /> {error}
//         </div>
//       )}
//       {isLoading && !periods.voter && !periods.candidate && (
//         <Loader2 className="animate-spin mx-auto" />
//       )}

//       {renderSection('voter', Users, 'Voter Registration')}
//       {renderSection('candidate', UserPlus, 'Candidate Registration')}

//       {/* Buttons to start editing if not yet set */}
//       {periods.voter && !periods.voter.isEditing && !periods.voter.id && (
//         <button onClick={() => setEditing('voter', { isEditing: true })}>Set Voter Period</button>
//       )}
//       {periods.candidate && !periods.candidate.isEditing && !periods.candidate.id && (
//         <button onClick={() => setEditing('candidate', { isEditing: true })}>Set Candidate Period</button>
//       )}
//     </div>
//   );
// }



