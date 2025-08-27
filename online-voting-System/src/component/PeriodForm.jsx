import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';


const periodSchema = z.object({
  voting_date_id: z.string().min(1, 'Voting date is required'),
  beginning_date: z.string().min(1, 'Beginning date is required'),
  ending_date: z.string().min(1, 'Ending date is required'),
}).refine(
  d => new Date(d.ending_date) >= new Date(d.beginning_date),
  { message: 'Ending date must be after beginning date', path: ['ending_date'] }
);

export default function PeriodForm({ initial, onSubmit, onCancel, votingDates, isLoading }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(periodSchema),
    defaultValues: initial,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-3 gap-4">
      <select {...register('voting_date_id')} disabled={isLoading}>
        <option value="">Select Voting Date</option>
        {votingDates.map(d => (
          <option key={d.id} value={d.id}>
            {new Date(d.date).toLocaleDateString()}
          </option>
        ))}
      </select>
      {errors.voting_date_id && <p className="text-red-600">{errors.voting_date_id.message}</p>}

      <input type="date" {...register('beginning_date')} disabled={isLoading} />
      {errors.beginning_date && <p className="text-red-600">{errors.beginning_date.message}</p>}

      <input type="date" {...register('ending_date')} disabled={isLoading} />
      {errors.ending_date && <p className="text-red-600">{errors.ending_date.message}</p>}

      <div className="md:col-span-3 flex gap-2">
        <button type="submit" disabled={isLoading}>Save</button>
        <button type="button" onClick={onCancel} disabled={isLoading}>Cancel</button>
      </div>
    </form>
  );
}

PeriodForm.propTypes = {
  initial: PropTypes.shape({
    voting_date_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    beginning_date: PropTypes.string,
    ending_date: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  votingDates: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
};
