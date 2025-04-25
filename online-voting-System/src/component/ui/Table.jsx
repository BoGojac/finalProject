import PropTypes from 'prop-types';
import { Edit2, Trash2 } from 'lucide-react';

const DataTable = ({
  title,
  data,
  columns,
  onDelete,
  onEdit,
  addButtonText,
  addButtonIcon: AddButtonIcon,
  onAdd
}) => {
    return (
        <div className="relative">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
              <button
                onClick={onAdd}
                className="px-4 py-2 rounded-md bg-[#6B4AA0] text-white hover:bg-[#5a3b91] transition-colors shadow-sm flex items-center gap-2"
              >
                <AddButtonIcon className="h-5 w-5" />
                {addButtonText}
              </button>
            </div>
    
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No</th>
                    {columns.map((column) => (
                      <th key={column.key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {column.header}
                      </th>
                    ))}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                      {columns.map((column) => (
                        <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {column.render ? column.render(item[column.key], item) : item[column.key]}
                        </td>
                      ))}
                      <td className="flex px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                        <button 
                          onClick={() => onEdit(item.id)}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 text-xs flex items-center gap-1"
                        >
                          <Edit2 className="h-3 w-3" /> Edit
                        </button>
                        <button 
                          onClick={() => onDelete(item.id)}
                          className="px-3 py-1 bg-red-100 text-red-800 rounded-md hover:bg-red-200 text-xs flex items-center gap-1"
                        >
                          <Trash2 className="h-3 w-3" /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
};

DataTable.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      // Other properties will be validated through the columns prop
    })
  ).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      header: PropTypes.string.isRequired,
      render: PropTypes.func,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  addButtonText: PropTypes.string.isRequired,
  addButtonIcon: PropTypes.elementType.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default DataTable;